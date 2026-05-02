import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Trophy, Flame, Star, TrendingUp, Award,
  Zap, ArrowRight, ChevronUp, ChevronDown, Minus,
  Crown
} from 'lucide-react'
import { designers, weeklyDesigners, todayDesigners, getLevel } from '../data/mockData'

/* ─── Avatar ────────────────────────────────────────────────────────── */
function Avatar({ name, color, size = 44 }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2)
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: `linear-gradient(135deg, ${color}cc, ${color}55)`,
      border: `2px solid ${color}44`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 700, fontSize: size * 0.33,
      color: '#fff', flexShrink: 0,
      fontFamily: 'var(--font-display)',
    }}>
      {initials}
    </div>
  )
}

/* ─── Level badge ────────────────────────────────────────────────────── */
function LevelBadge({ votes }) {
  const level = getLevel(votes)
  const colors = {
    rookie:    { bg: 'rgba(144,144,184,0.1)', border: 'rgba(144,144,184,0.2)', color: '#9090B8' },
    designer:  { bg: 'rgba(67,97,238,0.12)',  border: 'rgba(67,97,238,0.2)',   color: '#6B8FFF' },
    pro:       { bg: 'rgba(13,219,127,0.1)',  border: 'rgba(13,219,127,0.2)',  color: '#0DDB7F' },
    pixelGod:  { bg: 'rgba(245,166,35,0.12)', border: 'rgba(245,166,35,0.25)', color: '#F5A623' },
  }
  const key = Object.keys(colors).find(k => level.label.toLowerCase().replace(' ', '') === k.replace('pixelgod', 'pixelgod')) || 'rookie'
  const keyMap = { 'Rookie': 'rookie', 'Designer': 'designer', 'Pro': 'pro', 'Pixel God': 'pixelGod' }
  const c = colors[keyMap[level.label]] || colors.rookie
  return (
    <span className="badge" style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.color, fontSize: 11 }}>
      {level.icon} {level.label}
    </span>
  )
}

/* ─── Podium (top 3) ─────────────────────────────────────────────────── */
function Podium({ designers: list }) {
  const [first, second, third] = list
  const heights = { 0: 120, 1: 96, 2: 80 }
  const order   = [second, first, third]
  const indices = [2, 1, 3]
  const podiumHeights = [heights[1], heights[0], heights[2]]

  return (
    <div className="podium">
      {order.map((d, i) => {
        if (!d) return null
        const rank = indices[i]
        const level = getLevel(d.votes)
        return (
          <motion.div
            key={d.id}
            className={`podium-slot podium-slot--${rank === 1 ? 'first' : rank === 2 ? 'second' : 'third'}`}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (3 - rank) * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="podium-avatar-wrap">
              {rank === 1 && (
                <motion.div
                  className="podium-crown"
                  initial={{ scale: 0, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
                >
                  <Crown size={18} />
                </motion.div>
              )}
              <Avatar name={d.name} color={d.color} size={rank === 1 ? 64 : 52} />
              <div className={`podium-rank-badge podium-rank-badge--${rank}`}>{rank}</div>
            </div>
            <div className="podium-info">
              <div style={{ fontWeight: 700, fontSize: rank === 1 ? 16 : 14, textAlign: 'center', marginBottom: 2 }}>
                {d.name}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', textAlign: 'center', marginBottom: 8 }}>
                {d.handle}
              </div>
              <div style={{ display: 'flex', gap: 5, justifyContent: 'center', flexWrap: 'wrap' }}>
                <span className="badge badge-accent" style={{ fontSize: 11 }}>
                  {d.votes.toLocaleString()} votes
                </span>
                <LevelBadge votes={d.votes} />
              </div>
            </div>
            <div className="podium-base" style={{ height: podiumHeights[i] }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-display)' }}>
                #{rank}
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

/* ─── Rank change indicator ──────────────────────────────────────────── */
function RankChange({ change }) {
  if (change === 0) return <Minus size={12} style={{ color: 'var(--text-muted)' }} />
  if (change > 0) return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 11, fontWeight: 700, color: 'var(--success)' }}>
      <ChevronUp size={13} />
      {change}
    </span>
  )
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 11, fontWeight: 700, color: 'var(--danger)' }}>
      <ChevronDown size={13} />
      {Math.abs(change)}
    </span>
  )
}

/* ─── Leaderboard row ────────────────────────────────────────────────── */
function LeaderRow({ designer, rank, delay }) {
  const changes = [0, 2, -1, 3, 0, -2, 1, 4, -1, 2]
  const change = changes[(rank - 1) % changes.length]

  return (
    <motion.div
      className={`leader-row ${rank <= 3 ? 'leader-row--top' : ''}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ x: 4 }}
    >
      {/* Rank */}
      <div className="leader-rank">
        {rank <= 3 ? (
          <div className={`rank-medal rank-medal--${rank === 1 ? 'gold' : rank === 2 ? 'silver' : 'bronze'}`}>
            {rank}
          </div>
        ) : (
          <div className="rank-number">{rank}</div>
        )}
      </div>

      {/* Avatar */}
      <Avatar name={designer.name} color={designer.color} size={44} />

      {/* Info */}
      <div className="leader-info">
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{designer.name}</div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{designer.handle}</div>
      </div>

      {/* Badges */}
      <div className="leader-badges hide-mobile">
        <LevelBadge votes={designer.votes} />
        {designer.streak >= 7 && (
          <span className="badge badge-warning" style={{ fontSize: 11 }}>
            <Flame size={10} />
            {designer.streak}d streak
          </span>
        )}
      </div>

      {/* Stats */}
      <div className="leader-stats">
        <div className="leader-stat">
          <span className="leader-stat-value">{designer.votes.toLocaleString()}</span>
          <span className="leader-stat-label">Votes</span>
        </div>
        <div className="leader-stat hide-mobile">
          <span className="leader-stat-value">{designer.designs}</span>
          <span className="leader-stat-label">Designs</span>
        </div>
        <div className="leader-stat hide-mobile">
          <span className="leader-stat-value" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Flame size={12} style={{ color: '#F5A623' }} />
            {designer.streak}
          </span>
          <span className="leader-stat-label">Streak</span>
        </div>
        <div className="rank-change">
          <RankChange change={change} />
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Leaderboard page ────────────────────────────────────────────────── */
export default function Leaderboard() {
  const [tab, setTab] = useState('today')

  const tabData = {
    today:  { designers: todayDesigners,  label: 'Today' },
    week:   { designers: weeklyDesigners, label: 'This week' },
    allTime:{ designers: designers,       label: 'All time' },
  }
  const current = tabData[tab]

  return (
    <main style={{ paddingTop: 'var(--nav-h)' }}>
      {/* Header */}
      <section className="section-sm">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 40 }}>
            <div>
              <div className="badge badge-gold" style={{ marginBottom: 16 }}>
                <Crown size={12} />
                Leaderboard
              </div>
              <h1 className="display-xl" style={{ marginBottom: 10 }}>
                The best designers,<br /><span className="gradient-text">ranked.</span>
              </h1>
              <p className="text-secondary text-lg">
                Voted by the community. Updated in real time.
              </p>
            </div>

            {/* Quick stats */}
            <div className="board-stats">
              <div className="board-stat">
                <TrendingUp size={16} style={{ color: 'var(--accent-light)' }} />
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-display)' }}>1,240</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Submissions</div>
                </div>
              </div>
              <div className="board-stat-divider" />
              <div className="board-stat">
                <Star size={16} style={{ color: '#F5A623' }} />
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-display)' }}>18.4k</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Votes cast</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab bar */}
          <div className="board-tabs">
            {[
              { key: 'today',   icon: Flame,      label: 'Today' },
              { key: 'week',    icon: TrendingUp, label: 'This week' },
              { key: 'allTime', icon: Trophy,     label: 'All time' },
            ].map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                className={`board-tab ${tab === key ? 'board-tab--active' : ''}`}
                onClick={() => setTab(key)}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Podium */}
      <section className="section-sm" style={{ paddingTop: 0, paddingBottom: 20 }}>
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab + '-podium'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Podium designers={current.designers.slice(0, 3)} />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Full rankings */}
      <section className="section-sm" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="leader-table-header">
            <span>Designer</span>
            <span className="hide-mobile">Level</span>
            <span>Stats</span>
          </div>

          <div className="leader-table">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {current.designers.map((d, i) => (
                  <LeaderRow key={d.id} designer={d} rank={i + 1} delay={i * 0.05} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Gamification section */}
      <section className="section-sm" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div style={{ marginBottom: 32 }}>
            <div className="badge badge-purple" style={{ marginBottom: 14 }}>
              <Zap size={12} />
              Earn Your Rank
            </div>
            <h2 className="display-md">Levels & Badges</h2>
          </div>

          <div className="levels-grid">
            {[
              { icon: '🌱', level: 'Rookie',    range: '0–49 votes',   color: '#9090B8', desc: 'Just getting started. Submit your first designs.' },
              { icon: '✏️', level: 'Designer',  range: '50–199 votes', color: '#6B8FFF', desc: 'You\'re consistent. The community is noticing.' },
              { icon: '⚡', level: 'Pro',       range: '200–999 votes',color: '#0DDB7F', desc: 'Top tier. Your designs regularly crack the top 10.' },
              { icon: '👑', level: 'Pixel God', range: '1000+ votes',  color: '#F5A623', desc: 'Legendary. Your work defines the platform.' },
            ].map(({ icon, level, range, color, desc }, i) => (
              <motion.div
                key={level}
                className="level-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ '--level-color': color }}
              >
                <div className="level-card__icon">{icon}</div>
                <div className="level-card__name" style={{ color }}>{level}</div>
                <div className="level-card__range">{range}</div>
                <p className="level-card__desc">{desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Badges */}
          <div style={{ marginTop: 48 }}>
            <h3 className="display-md" style={{ marginBottom: 24 }}>Special Badges</h3>
            <div className="badges-grid">
              {[
                { icon: '🏆', name: 'Top 10 Today',  desc: 'Crack the daily top 10', color: '#F5A623' },
                { icon: '🔥', name: 'Streak 7',       desc: '7-day submission streak', color: '#FF4757' },
                { icon: '⚡', name: 'First Blood',    desc: 'First to submit today', color: '#4361EE' },
                { icon: '❤️', name: 'Community Fav',  desc: 'Most votes in one day', color: '#FF6B9D' },
                { icon: '🎯', name: 'Perfect Pitch',  desc: 'Figma link on every sub', color: '#0DDB7F' },
                { icon: '🌍', name: 'Globetrotter',   desc: 'Voted by 10+ countries', color: '#8B31E0' },
              ].map(({ icon, name, desc, color }) => (
                <div key={name} className="badge-card">
                  <div className="badge-card__icon" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>{icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 3 }}>{name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <h3 className="display-md" style={{ marginBottom: 8 }}>Your turn to climb</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
                Today's challenge is live. 127 submissions in. Are you next?
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/challenge" className="btn btn-primary">
                Enter Challenge
                <ArrowRight size={16} />
              </Link>
              <Link to="/vote" className="btn btn-secondary">
                <Star size={16} />
                Vote Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* Board stats */
        .board-stats {
          display: flex;
          align-items: center;
          gap: 0;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 16px 24px;
          flex-shrink: 0;
        }
        .board-stat {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 20px;
        }
        .board-stat:first-child { padding-left: 0; }
        .board-stat:last-child  { padding-right: 0; }
        .board-stat-divider { width: 1px; height: 40px; background: var(--border); }

        /* Tabs */
        .board-tabs {
          display: flex;
          gap: 4px;
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-full);
          padding: 4px;
          display: inline-flex;
        }
        .board-tab {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 10px 20px;
          border-radius: var(--radius-full);
          font-size: 14px;
          font-weight: 600;
          color: var(--text-secondary);
          transition: all var(--transition);
          white-space: nowrap;
        }
        .board-tab:hover { color: var(--text-primary); }
        .board-tab--active {
          background: var(--bg-card);
          color: var(--text-primary);
          box-shadow: var(--shadow-sm);
        }

        /* Podium */
        .podium {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 12px;
          padding: 20px 0 0;
        }
        .podium-slot {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          flex: 0 0 auto;
          width: 180px;
        }
        .podium-slot--first  { width: 200px; }
        .podium-slot--second, .podium-slot--third { width: 160px; }
        .podium-avatar-wrap {
          position: relative;
          margin-bottom: 12px;
        }
        .podium-crown {
          position: absolute;
          top: -24px;
          left: 50%;
          transform: translateX(-50%);
          color: #F5A623;
          filter: drop-shadow(0 2px 8px rgba(245,166,35,0.5));
        }
        .podium-rank-badge {
          position: absolute;
          bottom: -4px;
          right: -4px;
          width: 22px; height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 800;
          border: 2px solid var(--bg-base);
          font-family: var(--font-display);
        }
        .podium-rank-badge--1 { background: linear-gradient(135deg, #F5A623, #FF8C00); color: #fff; }
        .podium-rank-badge--2 { background: linear-gradient(135deg, #C0C0C0, #A0A0A0); color: #fff; }
        .podium-rank-badge--3 { background: linear-gradient(135deg, #CD7F32, #A0522D); color: #fff; }
        .podium-info {
          padding-bottom: 16px;
        }
        .podium-base {
          width: 100%;
          background: linear-gradient(180deg, var(--bg-card), var(--bg-surface));
          border: 1px solid var(--border);
          border-bottom: none;
          border-radius: var(--radius-md) var(--radius-md) 0 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .podium-slot--first .podium-base {
          background: linear-gradient(180deg, rgba(67,97,238,0.15), rgba(67,97,238,0.05));
          border-color: var(--border-accent);
        }

        /* Leader table */
        .leader-table-header {
          display: grid;
          grid-template-columns: 48px 44px 1fr auto 200px;
          gap: 12px;
          align-items: center;
          padding: 0 16px 12px;
          font-size: 11px;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border-bottom: 1px solid var(--border);
          margin-bottom: 8px;
        }
        .leader-table { display: flex; flex-direction: column; gap: 4px; }
        .leader-row {
          display: grid;
          grid-template-columns: 48px 44px 1fr auto 200px;
          gap: 12px;
          align-items: center;
          padding: 14px 16px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          transition: all var(--transition);
          cursor: default;
        }
        .leader-row:hover {
          border-color: var(--border-strong);
          background: var(--bg-card-hover);
        }
        .leader-row--top {
          border-color: var(--border-accent);
          background: rgba(67,97,238,0.04);
        }
        .leader-rank {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .rank-medal {
          width: 32px; height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 800;
          font-family: var(--font-display);
        }
        .rank-medal--gold   { background: rgba(245,166,35,0.2);  color: #F5A623; border: 1px solid rgba(245,166,35,0.4); }
        .rank-medal--silver { background: rgba(192,192,192,0.15); color: #C0C0C0; border: 1px solid rgba(192,192,192,0.3); }
        .rank-medal--bronze { background: rgba(205,127,50,0.15);  color: #CD7F32; border: 1px solid rgba(205,127,50,0.3); }
        .rank-number {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-muted);
          font-family: var(--font-display);
          text-align: center;
          width: 32px;
        }
        .leader-info { min-width: 0; }
        .leader-badges {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          justify-content: flex-end;
          flex: 0 0 auto;
          max-width: 200px;
        }
        .leader-stats {
          display: flex;
          align-items: center;
          gap: 24px;
          justify-content: flex-end;
        }
        .leader-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          min-width: 44px;
        }
        .leader-stat-value {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }
        .leader-stat-label {
          font-size: 10px;
          color: var(--text-muted);
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .rank-change {
          min-width: 36px;
          display: flex;
          justify-content: flex-end;
        }
        .badge-gold {
          background: rgba(245,166,35,0.15);
          color: #FFC94D;
          border: 1px solid rgba(245,166,35,0.3);
        }

        /* Levels grid */
        .levels-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .level-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 24px 20px;
          transition: all var(--transition-slow);
          position: relative;
          overflow: hidden;
        }
        .level-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--level-color);
          opacity: 0.5;
        }
        .level-card:hover {
          border-color: var(--border-strong);
          transform: translateY(-4px);
        }
        .level-card__icon { font-size: 28px; margin-bottom: 12px; }
        .level-card__name { font-family: var(--font-display); font-size: 17px; font-weight: 700; margin-bottom: 4px; }
        .level-card__range { font-size: 12px; color: var(--text-muted); font-weight: 600; margin-bottom: 10px; }
        .level-card__desc  { font-size: 13px; color: var(--text-secondary); line-height: 1.6; }

        /* Badges grid */
        .badges-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 12px;
        }
        .badge-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 16px 12px;
          text-align: center;
          transition: all var(--transition);
        }
        .badge-card:hover { border-color: var(--border-strong); transform: translateY(-2px); }
        .badge-card__icon {
          width: 44px; height: 44px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          margin: 0 auto 10px;
        }

        @media (max-width: 1024px) {
          .levels-grid  { grid-template-columns: repeat(2, 1fr); }
          .badges-grid  { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 900px) {
          .leader-row, .leader-table-header {
            grid-template-columns: 36px 40px 1fr 160px;
          }
          .leader-badges { display: none; }
          .leader-stats { gap: 16px; }
        }
        @media (max-width: 768px) {
          .podium-slot { width: 120px; }
          .podium-slot--first { width: 140px; }
          .leader-row, .leader-table-header {
            grid-template-columns: 36px 40px 1fr auto;
          }
          .board-stats { display: none; }
          .badges-grid  { grid-template-columns: repeat(2, 1fr); }
          .levels-grid  { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  )
}
