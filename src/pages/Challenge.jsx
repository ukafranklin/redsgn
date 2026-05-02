import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Clock, Upload, Eye, AlertTriangle, Target,
  Flame, ChevronRight, Users, Zap, ArrowRight
} from 'lucide-react'
import { todaysChallenge } from '../data/mockData'

/* ─── Countdown timer ───────────────────────────────────────────────── */
function useCountdown(targetMs) {
  const [remaining, setRemaining] = useState(Math.max(0, targetMs - Date.now()))
  useEffect(() => {
    const tick = () => setRemaining(Math.max(0, targetMs - Date.now()))
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [targetMs])

  const h = Math.floor(remaining / 3600000)
  const m = Math.floor((remaining % 3600000) / 60000)
  const s = Math.floor((remaining % 60000) / 1000)
  return { h, m, s, done: remaining === 0 }
}

function TimeUnit({ value, label }) {
  const prev = useRef(value)
  const changed = prev.current !== value
  prev.current = value

  return (
    <div className="time-unit">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={value}
          className="time-value"
          initial={changed ? { y: -20, opacity: 0 } : false}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {String(value).padStart(2, '0')}
        </motion.div>
      </AnimatePresence>
      <div className="time-label">{label}</div>
    </div>
  )
}

/* ─── The "Bad UI" mockup ───────────────────────────────────────────── */
function BadUIFrame() {
  return (
    <div className="bad-ui-frame">
      {/* Browser chrome */}
      <div className="frame-chrome">
        <div className="frame-dots">
          <span style={{ background: '#FF5F56' }} />
          <span style={{ background: '#FFBD2E' }} />
          <span style={{ background: '#27C93F' }} />
        </div>
        <div className="frame-address">
          <span>🔒</span>
          <span>mybank-online.biz/dashboard</span>
        </div>
      </div>

      {/* The terrible UI */}
      <div className="bad-ui-content">
        <div style={{
          fontFamily: '"Comic Sans MS", cursive',
          background: 'linear-gradient(180deg, #003399 0%, #0055CC 40%, #003399 100%)',
          minHeight: '100%',
          color: '#FFFFFF',
          fontSize: 10,
          overflow: 'auto',
        }}>
          {/* Marquee header */}
          <div style={{ background: '#FFFF00', color: '#FF0000', fontWeight: 'bold', textAlign: 'center', padding: '3px', fontSize: 10, overflow: 'hidden' }}>
            <div style={{ display: 'inline-block', animation: 'marquee 8s linear infinite', whiteSpace: 'nowrap' }}>
              ★ WELCOME TO FIRST NATIONAL BANK OF THE INTERNET ★ YOUR TRUSTED PARTNER FOR OVER 12 YEARS ★ NEW: MOBILE APP NOW AVAILABLE FOR WINDOWS PHONE ★
            </div>
          </div>

          <div style={{ display: 'flex', gap: 0 }}>
            {/* Left nav */}
            <div style={{ width: 90, background: '#001166', borderRight: '3px ridge #6688CC', flexShrink: 0 }}>
              <div style={{ background: '#FF6600', textAlign: 'center', padding: '5px 3px', fontWeight: 'bold', fontSize: 9, borderBottom: '2px solid #FFAA00' }}>
                NAVIGATE!!
              </div>
              {['MY ACCOUNT','CHECK BAL','TRANSFER $','PAY BILL$','STATMENT','SETTING$','LOG OUTT','HELP ME','ABOUT US','CONTACT','SECURITY','PRIVACY','FORM$.PDF'].map((item, i) => (
                <div key={i} style={{
                  padding: '4px 6px',
                  borderBottom: '1px solid #334488',
                  cursor: 'pointer',
                  color: i === 0 ? '#FFFF00' : '#AACCFF',
                  background: i === 0 ? '#003399' : 'transparent',
                  fontSize: 9,
                  fontWeight: i === 0 ? 'bold' : 'normal',
                }}>
                  {item}
                </div>
              ))}
            </div>

            {/* Main content */}
            <div style={{ flex: 1, padding: '6px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr>
                    <td style={{ width: '55%', verticalAlign: 'top', paddingRight: 4 }}>
                      {/* Balance */}
                      <div style={{ border: '3px inset #6688CC', background: '#001144', padding: 6, marginBottom: 6 }}>
                        <div style={{ background: '#CC0000', color: '#FFFFFF', fontWeight: 'bold', textAlign: 'center', padding: '2px', marginBottom: 4, fontSize: 9, border: '1px solid #FF0000' }}>
                          ACCOUNT BALANCE INFORMATIONS
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 9 }}>
                          <tbody>
                            {[['Checking(#****1234)', '$1,234.56'],['Savings(#****5678)', '$8,901.23'],['Money Mkt(#****9012)', '$500.00'],['Total All Accounts:', '$10,635.79']].map(([label, val], i) => (
                              <tr key={i} style={{ background: i%2===0 ? 'rgba(255,255,255,0.05)' : 'transparent' }}>
                                <td style={{ padding: '2px 4px', borderBottom: '1px solid #334488', color: i===3?'#FFFF00':'#AACCFF', fontWeight: i===3?'bold':'normal', textDecoration: i<3?'underline':'none' }}>{label}</td>
                                <td style={{ padding: '2px 4px', borderBottom: '1px solid #334488', textAlign: 'right', color: '#00FF00', fontWeight: 'bold' }}>{val}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div style={{ marginTop: 4, display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                          {[['TRANSFER','#FF6600'],['WITHDRAW','#006600'],['DEPOSIT','#990099'],['HISTORY','#CC0000']].map(([lbl, bg]) => (
                            <button key={lbl} style={{ padding: '2px 5px', background: bg, color: 'white', border: '2px outset #999', fontSize: 8, fontWeight: 'bold', cursor: 'pointer', fontFamily: 'Comic Sans MS' }}>
                              {lbl}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Alerts */}
                      <div style={{ border: '2px solid #FF0000', background: '#330000', padding: 5, fontSize: 9 }}>
                        <div style={{ color: '#FF0000', fontWeight: 'bold', marginBottom: 3 }}>⚠ IMPORTANT ALERTS (3)</div>
                        <div style={{ color: '#FFAAAA', marginBottom: 2 }}>• Your password expires in 3 days!!!</div>
                        <div style={{ color: '#FFAAAA', marginBottom: 2 }}>• Please update your securtiy questions</div>
                        <div style={{ color: '#FFAAAA' }}>• Download NEW adobe flash player</div>
                      </div>
                    </td>

                    <td style={{ width: '45%', verticalAlign: 'top', paddingLeft: 4 }}>
                      {/* Transactions */}
                      <div style={{ border: '3px inset #6688CC', background: '#001144', padding: 5 }}>
                        <div style={{ background: '#006600', textAlign: 'center', fontWeight: 'bold', padding: '2px', marginBottom: 4, fontSize: 9 }}>
                          RECENT TRANSACTION HISTORY LOG
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 8 }}>
                          <thead>
                            <tr style={{ background: '#334488' }}>
                              <th style={{ padding: '2px 3px', border: '1px solid #6688CC', textAlign: 'left' }}>Date</th>
                              <th style={{ padding: '2px 3px', border: '1px solid #6688CC', textAlign: 'left' }}>Description of Transaction</th>
                              <th style={{ padding: '2px 3px', border: '1px solid #6688CC', textAlign: 'right' }}>Amt $</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ['02/01','Netflix Subscription Services LLC','-15.99'],
                              ['01/01','AMAZON MARKETPLACE PMTS WA','-47.23'],
                              ['01/01','PAYROLL DIRECT DEP ACME CO','+2430.00'],
                              ['31/12','STARBUCKS STORE #12345','-5.45'],
                              ['30/12','WALMART SUPERCENTER #9876','-89.12'],
                              ['30/12','ATM WITHDRAWAL FEE','-3.00'],
                              ['29/12','UTILITY PAYMENT ELEC CO','-127.50'],
                            ].map(([d,n,a], i) => (
                              <tr key={i} style={{ background: i%2===0?'rgba(255,255,255,0.04)':'transparent' }}>
                                <td style={{ padding: '2px 3px', border: '1px solid #223366', whiteSpace: 'nowrap', color: '#AACCFF' }}>{d}</td>
                                <td style={{ padding: '2px 3px', border: '1px solid #223366', maxWidth: 100, overflow: 'hidden', color: '#CCDDFF', fontSize: 7 }}>{n}</td>
                                <td style={{ padding: '2px 3px', border: '1px solid #223366', textAlign: 'right', color: a.startsWith('+')?'#00FF00':'#FF6666', fontWeight: 'bold' }}>{a}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div style={{ marginTop: 4, display: 'flex', justifyContent: 'space-between', fontSize: 8 }}>
                          <span style={{ color: '#AACCFF', textDecoration: 'underline', cursor: 'pointer' }}>Previous 10</span>
                          <span style={{ color: '#AACCFF' }}>Page 1 of 47</span>
                          <span style={{ color: '#AACCFF', textDecoration: 'underline', cursor: 'pointer' }}>Next 10</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          <div style={{ background: '#000033', borderTop: '2px solid #334488', padding: '4px 8px', fontSize: 7, color: '#667799', textAlign: 'center' }}>
            © 2009 First National Bank. Best viewed in Internet Explorer 6.0 at 800x600. This site uses cookies. | Privacy | Terms | Sitemap | Contact | Jobs | Investor Relations | Download Our App (WAP)
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Challenge page ────────────────────────────────────────────────── */
export default function Challenge() {
  const [activeTab, setActiveTab] = useState('problem')
  const countdown = useCountdown(todaysChallenge.nextChallenge)

  const { brief } = todaysChallenge

  return (
    <main style={{ paddingTop: 'var(--nav-h)' }}>
      {/* Header */}
      <section className="section-sm">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <span className="badge badge-accent">
              <Flame size={12} />
              Day 42
            </span>
            <span className="badge badge-warning">
              {todaysChallenge.difficulty}
            </span>
            <span className="badge" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)', border: '1px solid var(--border-strong)' }}>
              {todaysChallenge.category}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <div>
              <h1 className="display-xl" style={{ marginBottom: 10 }}>
                {todaysChallenge.title}
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: 18, maxWidth: 560 }}>
                {todaysChallenge.subtitle}
              </p>
            </div>

            {/* Countdown */}
            <div className="countdown-block">
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, color: 'var(--text-secondary)', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                <Clock size={14} />
                Next challenge in
              </div>
              <div className="countdown">
                <TimeUnit value={countdown.h} label="HRS" />
                <div className="countdown-sep">:</div>
                <TimeUnit value={countdown.m} label="MIN" />
                <div className="countdown-sep">:</div>
                <TimeUnit value={countdown.s} label="SEC" />
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 24, marginTop: 28, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', fontSize: 14 }}>
              <Users size={16} style={{ color: 'var(--accent-light)' }} />
              <strong style={{ color: 'var(--text-primary)' }}>{todaysChallenge.submissionsCount}</strong> submissions
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', fontSize: 14 }}>
              <Clock size={16} style={{ color: 'var(--accent-light)' }} />
              {todaysChallenge.timeLimit} to submit
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', fontSize: 14 }}>
              <Zap size={16} style={{ color: '#F5A623' }} />
              Voting starts after deadline
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Main content: UI frame + brief */}
      <section className="section-sm">
        <div className="container">
          <div className="challenge-layout">
            {/* Left: The bad UI */}
            <div className="challenge-ui-col">
              <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                <AlertTriangle size={16} style={{ color: '#F5A623' }} />
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)' }}>Today's disaster</span>
              </div>
              <BadUIFrame />
              <p style={{ marginTop: 12, fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.5 }}>
                This is a real-world banking dashboard still in production. <br />Your mission: make it actually usable.
              </p>
            </div>

            {/* Right: Brief tabs */}
            <div className="challenge-brief-col">
              {/* Tab switcher */}
              <div className="tab-bar">
                <button
                  className={`tab-btn ${activeTab === 'problem' ? 'tab-btn--active' : ''}`}
                  onClick={() => setActiveTab('problem')}
                >
                  <AlertTriangle size={15} />
                  Problems
                </button>
                <button
                  className={`tab-btn ${activeTab === 'brief' ? 'tab-btn--active' : ''}`}
                  onClick={() => setActiveTab('brief')}
                >
                  <Target size={15} />
                  Brief
                </button>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'problem' ? (
                  <motion.div
                    key="problem"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="brief-header">
                      <h3 className="display-md">What's broken</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginTop: 8 }}>
                        We found {brief.problem.length} critical UX problems with this design.
                      </p>
                    </div>
                    <div className="problem-list">
                      {brief.problem.map((p, i) => (
                        <motion.div
                          key={i}
                          className="problem-item"
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.07 }}
                        >
                          <div className="problem-index">{i + 1}</div>
                          <p>{p}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="brief"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="brief-header">
                      <h3 className="display-md">Design Brief</h3>
                    </div>
                    <div className="brief-section">
                      <div className="brief-section-label">
                        <Target size={14} />
                        Goal
                      </div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7 }}>{brief.goal}</p>
                    </div>
                    <div className="brief-section">
                      <div className="brief-section-label">
                        <Zap size={14} />
                        Constraints
                      </div>
                      <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {brief.constraints.map((c, i) => (
                          <li key={i} style={{ display: 'flex', gap: 8, color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.6 }}>
                            <span style={{ color: 'var(--accent-light)', marginTop: 2, flexShrink: 0 }}>→</span>
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action buttons */}
              <div className="challenge-actions">
                <Link to="/submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  <Upload size={17} />
                  Upload Redesign
                </Link>
                <Link to="/vote" className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                  <Eye size={17} />
                  View Submissions
                  <span className="badge badge-accent btn-badge">{todaysChallenge.submissionsCount}</span>
                </Link>
              </div>

              {/* Tip */}
              <div className="challenge-tip">
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 18 }}>💡</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Pro tip</div>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      The highest-voted submissions focus on mobile-first layout and reducing cognitive load.
                      Less is more — cut ruthlessly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More challenges teaser */}
      <section className="section-sm" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h3 className="display-md" style={{ marginBottom: 8 }}>Want more practice?</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
                Browse 41 past challenges — from e-commerce disasters to government form hell.
              </p>
            </div>
            <button className="btn btn-secondary">
              Past Challenges
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <style>{`
        .challenge-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }
        .challenge-ui-col {}
        .challenge-brief-col { display: flex; flex-direction: column; gap: 0; }

        /* Browser frame */
        .bad-ui-frame {
          border: 1px solid var(--border-strong);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }
        .frame-chrome {
          background: #1A1A2E;
          border-bottom: 1px solid var(--border);
          padding: 10px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .frame-dots {
          display: flex;
          gap: 6px;
        }
        .frame-dots span {
          width: 11px; height: 11px;
          border-radius: 50%;
          display: block;
        }
        .frame-address {
          flex: 1;
          background: rgba(255,255,255,0.06);
          border-radius: 6px;
          padding: 4px 12px;
          font-size: 11px;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-body);
        }
        .bad-ui-content {
          height: 340px;
          overflow: hidden;
          position: relative;
        }
        .bad-ui-content > div {
          height: 100%;
        }

        /* Countdown */
        .countdown-block {
          background: var(--bg-card);
          border: 1px solid var(--border-accent);
          border-radius: var(--radius-lg);
          padding: 20px 24px;
          flex-shrink: 0;
        }
        .countdown {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .time-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 60px;
          overflow: hidden;
        }
        .time-value {
          font-family: var(--font-display);
          font-size: 36px;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          line-height: 1;
        }
        .time-label {
          font-size: 10px;
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: 0.1em;
          margin-top: 4px;
        }
        .countdown-sep {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 800;
          color: var(--text-muted);
          margin-bottom: 14px;
        }

        /* Tabs */
        .tab-bar {
          display: flex;
          gap: 4px;
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-full);
          padding: 4px;
          margin-bottom: 24px;
        }
        .tab-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 10px 16px;
          border-radius: var(--radius-full);
          font-size: 14px;
          font-weight: 600;
          color: var(--text-secondary);
          transition: all var(--transition);
        }
        .tab-btn:hover { color: var(--text-primary); }
        .tab-btn--active {
          background: var(--bg-card);
          color: var(--text-primary);
          box-shadow: var(--shadow-sm);
        }

        /* Brief content */
        .brief-header { margin-bottom: 24px; }
        .problem-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 32px;
        }
        .problem-item {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 14px 16px;
          transition: all var(--transition);
        }
        .problem-item:hover { border-color: var(--border-strong); }
        .problem-index {
          width: 24px; height: 24px;
          background: rgba(255,71,87,0.15);
          border: 1px solid rgba(255,71,87,0.25);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          color: var(--danger);
          flex-shrink: 0;
          margin-top: 1px;
        }
        .problem-item p { font-size: 14px; color: var(--text-secondary); line-height: 1.6; }

        .brief-section {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 20px;
          margin-bottom: 14px;
        }
        .brief-section-label {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 12px;
          font-weight: 700;
          color: var(--accent-light);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .challenge-actions {
          display: flex;
          gap: 12px;
          margin-top: 28px;
          margin-bottom: 16px;
        }
        .btn-badge {
          margin-left: 4px;
          padding: 2px 7px;
          font-size: 11px;
        }

        .challenge-tip {
          background: rgba(67,97,238,0.06);
          border: 1px solid rgba(67,97,238,0.15);
          border-radius: var(--radius-md);
          padding: 16px;
        }

        @media (max-width: 900px) {
          .challenge-layout { grid-template-columns: 1fr; }
          .bad-ui-content { height: 280px; }
        }
        @media (max-width: 600px) {
          .challenge-actions { flex-direction: column; }
          .time-value { font-size: 28px; }
          .time-unit { min-width: 48px; }
        }
      `}</style>
    </main>
  )
}
