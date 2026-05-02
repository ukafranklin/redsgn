import { useRef, useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight, Zap, Trophy, Users, Star, ChevronRight,
  TrendingUp, Award, Flame, Clock, MousePointer2
} from 'lucide-react'
import { liveStats, featuredDesigners, getLevel } from '../data/mockData'

/* ─── Scroll-reveal wrapper ─────────────────────────────────────────── */
function Reveal({ children, delay = 0, direction = 'up', className = '' }) {
  const ref  = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 32 : direction === 'down' ? -32 : 0,
      x: direction === 'left' ? 32 : direction === 'right' ? -32 : 0,
    },
    visible: {
      opacity: 1, y: 0, x: 0,
      transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }
    }
  }
  return (
    <motion.div ref={ref} variants={variants} initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.div>
  )
}

/* ─── Avatar chip ───────────────────────────────────────────────────── */
function Avatar({ name, color, size = 40 }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2)
  return (
    <div style={{
      width: size, height: size,
      borderRadius: '50%',
      background: `linear-gradient(135deg, ${color}cc, ${color}55)`,
      border: `2px solid ${color}44`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 700, fontSize: size * 0.35,
      color: '#fff', flexShrink: 0,
      fontFamily: 'var(--font-display)',
    }}>
      {initials}
    </div>
  )
}

/* ─── Animated counter ──────────────────────────────────────────────── */
function AnimatedNumber({ value, suffix = '', duration = 2000 }) {
  const [displayed, setDisplayed] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayed(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value, duration])

  return (
    <span ref={ref}>
      {displayed.toLocaleString()}{suffix}
    </span>
  )
}

/* ─── Before/After slider ───────────────────────────────────────────── */
function BeforeAfterSlider() {
  const [pos, setPos] = useState(50)
  const [dragging, setDragging] = useState(false)
  const containerRef = useRef(null)

  const getX = useCallback((e) => {
    const rect = containerRef.current.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    return Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
  }, [])

  const onMouseDown = (e) => { setDragging(true); e.preventDefault() }
  const onMouseMove = useCallback((e) => { if (dragging) setPos(getX(e)) }, [dragging, getX])
  const onMouseUp   = () => setDragging(false)
  const onTouchMove = useCallback((e) => setPos(getX(e)), [getX])

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onMouseUp)
      return () => {
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', onMouseUp)
      }
    }
  }, [dragging, onMouseMove])

  return (
    <div className="slider-wrap">
      <div className="slider-label slider-label--before">
        <span>😱 Before</span>
      </div>
      <div className="slider-label slider-label--after">
        <span>✨ After</span>
      </div>

      <div
        ref={containerRef}
        className={`slider-container ${dragging ? 'slider-container--dragging' : ''}`}
        onMouseDown={onMouseDown}
        onTouchMove={onTouchMove}
        onTouchStart={onMouseDown}
        onTouchEnd={onMouseUp}
      >
        {/* BAD UI — Before */}
        <div className="slider-panel slider-panel--before">
          <BadUI />
        </div>

        {/* GOOD UI — After */}
        <div className="slider-panel slider-panel--after" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <GoodUI />
        </div>

        {/* Handle */}
        <div className="slider-handle" style={{ left: `${pos}%` }}>
          <div className="slider-handle__line" />
          <div className="slider-handle__knob">
            <MousePointer2 size={16} />
          </div>
        </div>
      </div>

      <p className="slider-hint">← Drag to compare →</p>
    </div>
  )
}

function BadUI() {
  return (
    <div style={{
      width: '100%', height: '100%',
      fontFamily: '"Comic Sans MS", cursive',
      background: 'linear-gradient(135deg, #ff6600 0%, #ffcc00 50%, #ff0066 100%)',
      padding: '12px', overflow: 'hidden',
    }}>
      <div style={{ background: '#0000FF', padding: '6px 10px', marginBottom: 6, borderRadius: 0 }}>
        <marquee style={{ color: '#FFFF00', fontWeight: 'bold', fontSize: 11 }}>
          *** WELCOME TO MY BANK *** BEST BANK IN THE WORLD *** LOG IN NOW ***
        </marquee>
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <div style={{ flex: 1, background: '#FFFFFF', border: '4px ridge #FF0000', padding: '8px', fontSize: 9 }}>
          <div style={{ background: '#00FF00', textAlign: 'center', fontWeight: 'bold', fontSize: 10, border: '2px solid black', padding: 2, marginBottom: 4 }}>
            !! BALANCE !!
          </div>
          <div style={{ fontSize: 18, color: '#FF0000', fontWeight: 900, textShadow: '2px 2px yellow', textAlign: 'center' }}>
            $1,234.56
          </div>
          <div style={{ fontSize: 7, color: '#0000FF', textAlign: 'center', marginTop: 2 }}>
            CLICK HERE FOR MORE INFO!!!!
          </div>
          <div style={{ marginTop: 6, fontSize: 8 }}>
            <div style={{ background: '#FF00FF', color: 'white', padding: '3px 6px', marginBottom: 2, border: '1px solid black', cursor: 'pointer' }}>
              SEND MONEYS
            </div>
            <div style={{ background: '#00FFFF', color: 'black', padding: '3px 6px', marginBottom: 2, border: '1px solid black', cursor: 'pointer', fontSize: 7 }}>
              RECIEVE MONEYS
            </div>
            <div style={{ background: '#FFFF00', color: 'red', padding: '3px 6px', border: '3px outset gray', cursor: 'pointer', fontWeight: 'bold', fontSize: 9 }}>
              !!! TRANSFER !!!
            </div>
          </div>
        </div>
        <div style={{ flex: 1.2, background: '#FFFFCC', border: '2px dashed #FF0000' }}>
          <div style={{ background: '#FF0000', color: 'white', fontSize: 10, fontWeight: 'bold', padding: '2px 6px', textAlign: 'center' }}>
            RECENT TRANSACTIONS (LAST ONES)
          </div>
          <table style={{ width: '100%', fontSize: 7, borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#0000FF', color: 'white' }}>
                <th style={{ border: '1px solid black', padding: '1px 3px' }}>DATE</th>
                <th style={{ border: '1px solid black', padding: '1px 3px' }}>WHAT</th>
                <th style={{ border: '1px solid black', padding: '1px 3px' }}>AMT</th>
              </tr>
            </thead>
            <tbody>
              {[['01/02','Netflix Subscript','-$15.99'],['30/01','AMAZON.COM LLC','-$47.23'],['29/01','Payroll DEPOSIT','+$2430'],['28/01','Starbucks Coffee C.','-$5.45'],['27/01','WALMART SUPERCE','-$89.12']].map(([d,n,a],i)=>(
                <tr key={i} style={{ background: i%2===0?'#FFFFFF':'#FFFF99' }}>
                  <td style={{ border: '1px solid gray', padding: '1px 3px', whiteSpace: 'nowrap' }}>{d}</td>
                  <td style={{ border: '1px solid gray', padding: '1px 3px', maxWidth: 80, overflow: 'hidden' }}>{n}</td>
                  <td style={{ border: '1px solid gray', padding: '1px 3px', color: a.startsWith('+') ? 'green' : 'red', fontWeight: 'bold' }}>{a}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ marginTop: 6, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {['INVESTMENTS','LOANS','CARDS','INSURANCE','MORTGAGE','SAVINGS','CRYPTO','ABOUT US'].map(item => (
          <div key={item} style={{ background: '#808080', color: 'white', fontSize: 7, padding: '2px 5px', border: '1px outset white', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            {item}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 4, background: '#FFCCCC', border: '1px solid red', padding: 4, fontSize: 8, color: 'red' }}>
        ⚠ WARNING: Do not share your password! Browser not supported. Please use IE6.
      </div>
    </div>
  )
}

function GoodUI() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#0A0A14',
      fontFamily: "'Inter', sans-serif",
      padding: '14px', overflow: 'hidden',
      color: '#EEEEFF',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 9, color: '#9090B8', marginBottom: 2, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Good morning</div>
          <div style={{ fontSize: 13, fontWeight: 700 }}>Sarah Chen</div>
        </div>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#4361EE,#8B31E0)', display:'flex', alignItems:'center', justifyContent:'center', fontSize: 12, fontWeight: 700 }}>SC</div>
      </div>

      <div style={{ background: 'linear-gradient(135deg,#4361EE22,#8B31E022)', border: '1px solid #4361EE44', borderRadius: 14, padding: '12px 14px', marginBottom: 10 }}>
        <div style={{ fontSize: 9, color: '#9090B8', marginBottom: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Total Balance</div>
        <div style={{ fontSize: 26, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.03em' }}>$1,234<span style={{ fontSize: 14, color: '#9090B8' }}>.56</span></div>
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          {[['Send','#4361EE'],['Receive','#0DDB7F'],['Transfer','#8B31E0']].map(([label, color]) => (
            <div key={label} style={{ flex: 1, background: `${color}18`, border: `1px solid ${color}33`, borderRadius: 8, padding: '5px 4px', textAlign: 'center', fontSize: 9, fontWeight: 600, color: color, cursor: 'pointer' }}>
              {label}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 9, color: '#9090B8', marginBottom: 6, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Recent Transactions</div>
        {[
          { name: 'Netflix', amount: '-$15.99', color: '#FF4757', icon: '▶' },
          { name: 'Amazon',  amount: '-$47.23', color: '#FF4757', icon: '📦' },
          { name: 'Payroll', amount: '+$2,430', color: '#0DDB7F', icon: '💼' },
          { name: 'Starbucks', amount: '-$5.45', color: '#FF4757', icon: '☕' },
        ].map((tx, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 22, height: 22, borderRadius: 6, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>
                {tx.icon}
              </div>
              <span style={{ fontSize: 10, fontWeight: 500 }}>{tx.name}</span>
            </div>
            <span style={{ fontSize: 10, fontWeight: 700, color: tx.color }}>{tx.amount}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Designer card for carousel ───────────────────────────────────── */
function DesignerCard({ designer }) {
  const level = getLevel(designer.votes)
  return (
    <div className="designer-card">
      <Avatar name={designer.name} color={designer.color} size={48} />
      <div style={{ minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {designer.name}
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>
          {designer.handle}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <span className="badge badge-accent" style={{ fontSize: 11 }}>
            {designer.votes.toLocaleString()} votes
          </span>
          <span className="badge" style={{ fontSize: 11, background: `${designer.color}18`, color: designer.color, border: `1px solid ${designer.color}33` }}>
            {level.icon} {level.label}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ─── How it works step card ────────────────────────────────────────── */
function StepCard({ number, icon: Icon, title, desc, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="card card-glow step-card">
        <div className="step-number">{number}</div>
        <div className="step-icon">
          <Icon size={24} />
        </div>
        <h3 className="display-md" style={{ marginBottom: 10 }}>{title}</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7 }}>{desc}</p>
      </div>
    </Reveal>
  )
}

/* ─── Stat card ─────────────────────────────────────────────────────── */
function StatCard({ icon: Icon, value, label, suffix = '', color, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="stat-card">
        <div className="stat-icon" style={{ background: `${color}18`, color }}>
          <Icon size={20} />
        </div>
        <div className="stat-value">
          <AnimatedNumber value={value} suffix={suffix} />
        </div>
        <div className="stat-label">{label}</div>
      </div>
    </Reveal>
  )
}

/* ─── Main Home component ───────────────────────────────────────────── */
export default function Home() {
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 400], [0, -80])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3])

  return (
    <main>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="hero-section">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="hero-content container">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="hero-badge"
          >
            <span className="badge badge-accent">
              <Flame size={12} />
              Day 42 Challenge is Live
            </span>
          </motion.div>

          <motion.h1
            className="display-2xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22,1,0.36,1] }}
          >
            Fix Bad Design.<br />
            <span className="gradient-text">Get Noticed.</span>
          </motion.h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
          >
            Daily UI challenges for designers who want to stand out.
            Redesign real UX disasters. Earn votes. Climb the leaderboard.
          </motion.p>

          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          >
            <Link to="/challenge" className="btn btn-primary btn-lg">
              Start Today's Challenge
              <ArrowRight size={18} />
            </Link>
            <Link to="/leaderboard" className="btn btn-secondary btn-lg">
              <Trophy size={18} />
              View Top Designs
            </Link>
          </motion.div>

          <motion.div
            className="hero-avatars"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="avatar-stack">
              {[
                { name: 'Sarah Chen', color: '#4361EE' },
                { name: 'Marcus R', color: '#0DDB7F' },
                { name: 'Aisha P', color: '#8B31E0' },
                { name: 'Tom N', color: '#F5A623' },
              ].map((d, i) => (
                <div key={d.name} style={{ marginLeft: i > 0 ? -10 : 0, zIndex: 4 - i }}>
                  <Avatar name={d.name} color={d.color} size={34} />
                </div>
              ))}
            </div>
            <span className="hero-avatars-text">
              <strong>1,240+</strong> designers active today
            </span>
          </motion.div>
        </motion.div>

        {/* Hero scroll indicator */}
        <motion.div
          className="scroll-hint"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="scroll-hint__dot" />
        </motion.div>
      </section>

      {/* ── Before/After Slider Section ─────────────────────────────── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-header">
              <div className="badge badge-purple" style={{ marginBottom: 16 }}>
                <Star size={12} />
                See the Transformation
              </div>
              <h2 className="display-xl" style={{ marginBottom: 16 }}>
                From UX nightmare<br />to design masterpiece
              </h2>
              <p className="text-lg text-secondary" style={{ maxWidth: 560 }}>
                Every day, we give designers a genuinely terrible UI.
                The best redesigns win votes — and recognition.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <BeforeAfterSlider />
          </Reveal>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <Reveal>
            <div className="section-header">
              <div className="badge badge-success" style={{ marginBottom: 16 }}>
                <Zap size={12} />
                Simple Process
              </div>
              <h2 className="display-xl">How it works</h2>
            </div>
          </Reveal>
          <div className="grid-3" style={{ marginTop: 48 }}>
            <StepCard
              number="01"
              icon={Clock}
              title="Get the Challenge"
              desc="Every 24 hours, a new badly designed UI drops. Real products, real problems — no sugar coating."
              delay={0.1}
            />
            <StepCard
              number="02"
              icon={MousePointer2}
              title="Redesign It"
              desc="Use any tool you love — Figma, Sketch, Framer, code. Upload your redesign before the deadline."
              delay={0.2}
            />
            <StepCard
              number="03"
              icon={Trophy}
              title="Win Votes"
              desc="The community votes head-to-head. Top designers earn badges, climb the leaderboard, get noticed."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ── Live Stats ───────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-header">
              <div className="badge badge-accent" style={{ marginBottom: 16 }}>
                <TrendingUp size={12} />
                Live Activity
              </div>
              <h2 className="display-xl">Growing every day</h2>
            </div>
          </Reveal>
          <div className="grid-4" style={{ marginTop: 48 }}>
            <StatCard icon={Zap}    value={liveStats.submissionsToday} label="Submissions today"     color="#4361EE" delay={0.1} />
            <StatCard icon={Users}  value={liveStats.activeDesigners}  label="Designers active now" color="#0DDB7F" delay={0.2} />
            <StatCard icon={Star}   value={liveStats.votesLast24h}     label="Votes in 24h"         color="#F5A623" delay={0.3} />
            <StatCard icon={Flame}  value={liveStats.challengeStreak}  label="Day streak"  suffix="🔥" color="#FF4757" delay={0.4} />
          </div>

          {/* Top designer spotlight */}
          <Reveal delay={0.3}>
            <div className="top-designer-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <Avatar name={liveStats.topDesigner.name} color={liveStats.topDesigner.color} size={56} />
                <div>
                  <div className="badge badge-gold" style={{ marginBottom: 8 }}>
                    <Award size={12} />
                    Top Designer Today
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700 }}>
                    {liveStats.topDesigner.name}
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
                    {liveStats.topDesigner.handle} · {liveStats.topDesigner.votes.toLocaleString()} total votes
                  </div>
                </div>
              </div>
              <Link to="/leaderboard" className="btn btn-secondary btn-sm hide-mobile">
                View Full Board
                <ChevronRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Featured Designers Carousel ──────────────────────────────── */}
      <section className="section" style={{ overflow: 'hidden', paddingBottom: 80 }}>
        <div className="container">
          <Reveal>
            <div className="section-header">
              <div className="badge badge-purple" style={{ marginBottom: 16 }}>
                <Users size={12} />
                Community
              </div>
              <h2 className="display-xl">Top designers this week</h2>
            </div>
          </Reveal>
        </div>

        <div className="carousel-track-wrap" style={{ marginTop: 40 }}>
          <div className="carousel-track">
            {featuredDesigners.map((d, i) => (
              <DesignerCard key={`${d.id}-${i}`} designer={d} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────── */}
      <section className="section-sm">
        <div className="container">
          <Reveal>
            <div className="cta-banner">
              <div className="cta-banner__glow" />
              <div className="cta-banner__content">
                <div className="badge badge-accent" style={{ marginBottom: 20 }}>
                  <Flame size={12} />
                  Challenge closes in 19h 24m
                </div>
                <h2 className="display-lg" style={{ marginBottom: 16, maxWidth: 560, textAlign: 'center' }}>
                  Ready to show what you've got?
                </h2>
                <p className="text-secondary text-lg" style={{ marginBottom: 32, textAlign: 'center', maxWidth: 460 }}>
                  Join 1,240 designers already competing today. Your best work deserves to be seen.
                </p>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
                  <Link to="/challenge" className="btn btn-primary btn-lg">
                    Enter Today's Challenge
                    <ArrowRight size={18} />
                  </Link>
                  <Link to="/vote" className="btn btn-secondary btn-lg">
                    Vote on Designs
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="footer">
        <div className="container flex-between" style={{ flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 28, height: 28, background: 'var(--accent-grad)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <Zap size={14} fill="currentColor" />
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>RedesignThis</span>
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>
            Built for designers who give a damn.
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Challenge', 'Vote', 'Leaderboard', 'Submit'].map(link => (
              <Link key={link} to={`/${link.toLowerCase()}`} style={{ fontSize: 13, color: 'var(--text-secondary)', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        /* Hero */
        .hero-section {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: var(--nav-h) 24px 80px;
          position: relative;
          text-align: center;
        }
        .hero-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          position: relative;
          z-index: 2;
        }
        .hero-badge { margin-bottom: 28px; }
        .hero-section h1 { margin-bottom: 24px; }
        .hero-sub {
          font-size: clamp(17px, 2.5vw, 21px);
          color: var(--text-secondary);
          max-width: 540px;
          line-height: 1.65;
          margin-bottom: 36px;
        }
        .hero-ctas {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 40px;
        }
        .hero-avatars {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .avatar-stack { display: flex; }
        .hero-avatars-text { font-size: 14px; color: var(--text-secondary); }
        .hero-avatars-text strong { color: var(--text-primary); }

        .scroll-hint {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          width: 26px; height: 42px;
          border: 2px solid var(--border-strong);
          border-radius: 13px;
          display: flex;
          justify-content: center;
          padding-top: 7px;
        }
        .scroll-hint__dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--text-muted);
        }

        /* Section header */
        .section-header {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        /* Slider */
        .slider-wrap {
          position: relative;
          margin-top: 40px;
        }
        .slider-label {
          position: absolute;
          top: 16px;
          z-index: 10;
          pointer-events: none;
        }
        .slider-label span {
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border-strong);
          color: var(--text-primary);
          padding: 5px 12px;
          border-radius: var(--radius-full);
          font-size: 12px;
          font-weight: 600;
        }
        .slider-label--before { left: 16px; }
        .slider-label--after  { right: 16px; }
        .slider-container {
          position: relative;
          height: 320px;
          border-radius: var(--radius-xl);
          overflow: hidden;
          border: 1px solid var(--border-strong);
          cursor: ew-resize;
          box-shadow: var(--shadow-lg);
          user-select: none;
        }
        .slider-container--dragging { cursor: grabbing; }
        .slider-panel {
          position: absolute;
          inset: 0;
        }
        .slider-panel--before {}
        .slider-panel--after {
          z-index: 2;
          border-right: none;
        }
        .slider-handle {
          position: absolute;
          top: 0; bottom: 0;
          z-index: 3;
          width: 2px;
          transform: translateX(-50%);
          pointer-events: none;
        }
        .slider-handle__line {
          position: absolute;
          top: 0; bottom: 0;
          left: 0;
          width: 2px;
          background: rgba(255,255,255,0.8);
          box-shadow: 0 0 12px rgba(255,255,255,0.4);
        }
        .slider-handle__knob {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 44px; height: 44px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 4px 20px rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0A0A14;
          pointer-events: none;
        }
        .slider-hint {
          text-align: center;
          margin-top: 16px;
          font-size: 13px;
          color: var(--text-muted);
          letter-spacing: 0.04em;
        }

        /* Step cards */
        .step-card {
          padding: 32px;
          position: relative;
          overflow: hidden;
        }
        .step-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--accent-grad);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .step-card:hover::before { opacity: 1; }
        .step-number {
          font-family: var(--font-display);
          font-size: 56px;
          font-weight: 800;
          color: var(--border-strong);
          line-height: 1;
          margin-bottom: 16px;
          letter-spacing: -0.04em;
        }
        .step-icon {
          width: 48px; height: 48px;
          background: rgba(67,97,238,0.12);
          border: 1px solid rgba(67,97,238,0.2);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-light);
          margin-bottom: 20px;
        }

        /* Stat cards */
        .stat-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 28px;
          transition: all var(--transition-slow);
        }
        .stat-card:hover {
          border-color: var(--border-strong);
          transform: translateY(-2px);
        }
        .stat-icon {
          width: 44px; height: 44px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }
        .stat-value {
          font-family: var(--font-display);
          font-size: 36px;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          margin-bottom: 6px;
          line-height: 1;
        }
        .stat-label {
          font-size: 14px;
          color: var(--text-secondary);
          font-weight: 500;
        }

        /* Top designer */
        .top-designer-card {
          margin-top: 32px;
          background: var(--bg-card);
          border: 1px solid var(--border-accent);
          border-radius: var(--radius-lg);
          padding: 24px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          position: relative;
          overflow: hidden;
        }
        .top-designer-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: var(--accent-grad);
        }

        /* Carousel */
        .carousel-track-wrap {
          position: relative;
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .carousel-track {
          display: flex;
          gap: 16px;
          width: max-content;
          animation: marquee 30s linear infinite;
          padding: 8px 0;
        }
        .carousel-track:hover { animation-play-state: paused; }
        .designer-card {
          display: flex;
          align-items: center;
          gap: 14px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 18px 22px;
          min-width: 260px;
          transition: all var(--transition);
          cursor: default;
        }
        .designer-card:hover {
          border-color: var(--border-strong);
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }

        /* CTA Banner */
        .cta-banner {
          position: relative;
          background: var(--bg-card);
          border: 1px solid var(--border-accent);
          border-radius: var(--radius-xl);
          padding: 64px 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow: hidden;
        }
        .cta-banner__glow {
          position: absolute;
          inset: -50%;
          background: radial-gradient(ellipse at 50% 50%, rgba(67,97,238,0.12) 0%, transparent 65%);
          pointer-events: none;
        }
        .cta-banner__content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Footer */
        .footer {
          padding: 32px 24px;
          border-top: 1px solid var(--border);
          position: relative;
          z-index: 2;
        }

        @media (max-width: 768px) {
          .hero-ctas { flex-direction: column; align-items: center; }
          .slider-container { height: 240px; }
          .cta-banner { padding: 40px 24px; }
        }
      `}</style>
    </main>
  )
}
