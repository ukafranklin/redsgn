import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThumbsUp, Zap, ChevronRight, Star, SkipForward, Users, Award } from 'lucide-react'
import { submissionPairs, getLevel } from '../data/mockData'

/* ─── Design preview renderer ───────────────────────────────────────── */
function DesignPreview({ style, palette }) {
  const [bg, surface, accent, text] = palette

  if (style === 'minimal') return (
    <div style={{ background: bg, width: '100%', height: '100%', padding: 16, fontFamily: 'Inter, sans-serif', color: text }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.02em' }}>Dashboard</div>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: accent, opacity: 0.15 }} />
      </div>
      <div style={{ background: surface, borderRadius: 12, padding: 16, marginBottom: 12 }}>
        <div style={{ fontSize: 10, color: '#999', marginBottom: 4 }}>BALANCE</div>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em' }}>$1,234.56</div>
      </div>
      {[1,2,3].map(i => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${surface}` }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: surface }} />
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 2 }}>Transaction {i}</div>
              <div style={{ fontSize: 9, color: '#999' }}>Jan {i}, 2025</div>
            </div>
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, color: i===2 ? '#10B981' : '#EF4444' }}>{i===2?'+':'-'}$45.{i*10}</div>
        </div>
      ))}
    </div>
  )

  if (style === 'dark') return (
    <div style={{ background: bg, width: '100%', height: '100%', padding: 16, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: '#9090B8' }}>Good morning</div>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: `linear-gradient(135deg,${accent},#4361EE)` }} />
      </div>
      <div style={{ background: `linear-gradient(135deg,${accent}22,${accent}11)`, border: `1px solid ${accent}33`, borderRadius: 14, padding: 14, marginBottom: 12 }}>
        <div style={{ fontSize: 9, color: '#9090B8', marginBottom: 3 }}>Total Balance</div>
        <div style={{ fontSize: 26, fontWeight: 800, color: text, letterSpacing: '-0.03em' }}>$1,234<span style={{ fontSize: 13, color: '#9090B8' }}>.56</span></div>
        <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
          {['Send','Receive','More'].map(lbl => (
            <div key={lbl} style={{ flex: 1, background: `${accent}20`, border: `1px solid ${accent}30`, borderRadius: 8, padding: '5px 4px', textAlign: 'center', fontSize: 9, fontWeight: 600, color: accent }}>{lbl}</div>
          ))}
        </div>
      </div>
      {[['Netflix','-$15.99','▶'],['Amazon','-$47.23','📦'],['Salary','+$2,430','💼']].map(([name,amt,ic],i)=>(
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: `1px solid rgba(255,255,255,0.05)` }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 14 }}>{ic}</span>
            <span style={{ fontSize: 11, color: text }}>{name}</span>
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: amt.startsWith('+') ? '#0DDB7F' : '#FF4757' }}>{amt}</span>
        </div>
      ))}
    </div>
  )

  if (style === 'glass') return (
    <div style={{ background: `linear-gradient(135deg, ${bg}, ${surface})`, width: '100%', height: '100%', padding: 16, fontFamily: 'Inter, sans-serif', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -30, right: -30, width: 100, height: 100, borderRadius: '50%', background: accent, opacity: 0.15, filter: 'blur(20px)' }} />
      <div style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', borderRadius: 16, padding: 14, marginBottom: 12, border: '1px solid rgba(255,255,255,0.8)' }}>
        <div style={{ fontSize: 9, color: '#666', marginBottom: 4 }}>ACCOUNT BALANCE</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: '#1E40AF', letterSpacing: '-0.03em' }}>$1,234.56</div>
        <div style={{ marginTop: 8, height: 4, borderRadius: 2, background: `linear-gradient(to right, ${accent}, ${surface.replace('E','F')})` }} />
      </div>
      <div style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)', borderRadius: 12, padding: 12, border: '1px solid rgba(255,255,255,0.7)' }}>
        {[1,2,3].map(i=>(
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: i<3 ? '1px solid rgba(0,0,0,0.07)' : 'none' }}>
            <span style={{ fontSize: 11, color: '#334' }}>Transaction {i}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: accent }}>-$4{i}.00</span>
          </div>
        ))}
      </div>
    </div>
  )

  if (style === 'brutalist') return (
    <div style={{ background: bg, width: '100%', height: '100%', padding: 14, fontFamily: '"Space Grotesk", sans-serif', color: text }}>
      <div style={{ border: `3px solid ${text}`, padding: 10, marginBottom: 8 }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>BALANCE</div>
        <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>$1,234.56</div>
      </div>
      <div style={{ background: accent, padding: '6px 10px', marginBottom: 8 }}>
        <div style={{ color: '#fff', fontSize: 10, fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase' }}>QUICK ACTIONS</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginBottom: 8 }}>
        {['SEND','RECEIVE','TRANSFER','HISTORY'].map((lbl,i)=>(
          <div key={i} style={{ border: `2px solid ${text}`, padding: '8px 6px', textAlign: 'center', fontSize: 9, fontWeight: 800, letterSpacing: '0.06em', cursor: 'pointer', background: i===0?text:'transparent', color: i===0?bg:text }}>
            {lbl}
          </div>
        ))}
      </div>
      <div style={{ borderTop: `2px solid ${text}`, paddingTop: 8 }}>
        {[['Netflix','-$15.99'],['Amazon','-$47.23']].map(([n,a],i)=>(
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: `1px solid rgba(0,0,0,0.15)` }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.02em', textTransform: 'uppercase' }}>{n}</span>
            <span style={{ fontSize: 10, fontWeight: 900, color: accent }}>{a}</span>
          </div>
        ))}
      </div>
    </div>
  )

  // Default gradient style
  return (
    <div style={{ background: `linear-gradient(135deg, ${bg}, ${surface})`, width: '100%', height: '100%', padding: 16, fontFamily: 'Inter, sans-serif', color: text }}>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 12 }}>REDESIGNED DASHBOARD</div>
      <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 16, padding: 14, marginBottom: 10, backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', marginBottom: 3 }}>Balance</div>
        <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em' }}>$1,234.56</div>
      </div>
      {[1,2,3].map(i=>(
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Transaction {i}</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: accent }}>-${i*20}.00</span>
        </div>
      ))}
    </div>
  )
}

/* ─── Vote card ─────────────────────────────────────────────────────── */
function VoteCard({ submission, onVote, voted, winner, loser, side }) {
  const level = getLevel(submission.designer.votes)

  return (
    <motion.div
      className={`vote-card ${voted && winner ? 'vote-card--winner' : ''} ${voted && loser ? 'vote-card--loser' : ''}`}
      whileHover={!voted ? { y: -4, scale: 1.01 } : {}}
      transition={{ duration: 0.2 }}
      layout
    >
      {/* Winner crown */}
      <AnimatePresence>
        {voted && winner && (
          <motion.div
            className="winner-badge"
            initial={{ scale: 0, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Star size={14} fill="currentColor" />
            Winner!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Design preview */}
      <div className="vote-preview" onClick={!voted ? onVote : undefined} style={{ cursor: voted ? 'default' : 'pointer' }}>
        <DesignPreview style={submission.style} palette={submission.palette} />

        {/* Hover overlay */}
        {!voted && (
          <div className="vote-hover-overlay">
            <motion.div
              className="vote-overlay-inner"
              initial={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <ThumbsUp size={28} />
              <span>Vote for this</span>
            </motion.div>
          </div>
        )}

        {/* Vote count overlay when voted */}
        {voted && (
          <motion.div
            className="vote-count-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="vote-count-pill">
              <ThumbsUp size={12} />
              {submission.votes + (winner ? 1 : 0)} votes
            </div>
          </motion.div>
        )}
      </div>

      {/* Card info */}
      <div className="vote-card-info">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ minWidth: 0 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {submission.title}
            </h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {submission.description}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg,${submission.designer.color}cc,${submission.designer.color}55)`, border: `2px solid ${submission.designer.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
            {submission.designer.name.split(' ').map(w=>w[0]).join('').slice(0,2)}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{submission.designer.name}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{submission.designer.handle}</div>
          </div>
          <div className="badge" style={{ marginLeft: 'auto', flexShrink: 0, background: `${submission.designer.color}18`, color: submission.designer.color, border: `1px solid ${submission.designer.color}33`, fontSize: 11 }}>
            {level.icon} {level.label}
          </div>
        </div>

        {!voted && (
          <button className="btn btn-primary vote-btn" onClick={onVote}>
            <ThumbsUp size={16} />
            Vote for this design
          </button>
        )}
      </div>
    </motion.div>
  )
}

/* ─── Vote page ─────────────────────────────────────────────────────── */
export default function Vote() {
  const [pairIndex, setPairIndex] = useState(0)
  const [voted, setVoted] = useState(null)
  const [votedPairs, setVotedPairs] = useState([])
  const [transitioning, setTransitioning] = useState(false)
  const totalPairs = submissionPairs.length

  const currentPair = submissionPairs[pairIndex % totalPairs]

  const handleVote = useCallback((side) => {
    if (voted) return
    setVoted(side)
    setVotedPairs(prev => [...prev, { pairId: currentPair.id, vote: side }])
  }, [voted, currentPair])

  const handleNext = useCallback(() => {
    if (transitioning) return
    setTransitioning(true)
    setTimeout(() => {
      setVoted(null)
      setPairIndex(i => i + 1)
      setTransitioning(false)
    }, 300)
  }, [transitioning])

  const handleSkip = () => {
    setVoted(null)
    setPairIndex(i => i + 1)
  }

  const progress = votedPairs.length / totalPairs

  return (
    <main style={{ paddingTop: 'var(--nav-h)' }}>
      {/* Header */}
      <section className="section-sm">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
            <div>
              <div className="badge badge-accent" style={{ marginBottom: 14 }}>
                <Zap size={12} />
                Live Voting
              </div>
              <h1 className="display-xl" style={{ marginBottom: 10 }}>Pick your favourite</h1>
              <p className="text-secondary text-lg">Vote head-to-head. Your choices shape the leaderboard.</p>
            </div>
            <div className="vote-stats-row">
              <div className="vote-stat">
                <span className="vote-stat-value">{votedPairs.length}</span>
                <span className="vote-stat-label">Voted</span>
              </div>
              <div className="vote-stat-divider" />
              <div className="vote-stat">
                <span className="vote-stat-value">{totalPairs - votedPairs.length}</span>
                <span className="vote-stat-label">Remaining</span>
              </div>
              <div className="vote-stat-divider" />
              <div className="vote-stat">
                <span className="vote-stat-value">{currentPair.a.votes + currentPair.b.votes}</span>
                <span className="vote-stat-label">Total votes</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="vote-progress">
            <div className="vote-progress-bar">
              <motion.div
                className="vote-progress-fill"
                initial={false}
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
            <span className="vote-progress-label">
              {votedPairs.length} / {totalPairs} pairs
            </span>
          </div>
        </div>
      </section>

      {/* Voting arena */}
      <section className="section-sm" style={{ paddingTop: 0 }}>
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div
              key={pairIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="vote-arena">
                <VoteCard
                  submission={currentPair.a}
                  onVote={() => handleVote('a')}
                  voted={!!voted}
                  winner={voted === 'a'}
                  loser={voted === 'b'}
                  side="a"
                />

                {/* VS divider */}
                <div className="vs-divider">
                  <div className="vs-line" />
                  <div className="vs-chip">
                    <motion.span
                      animate={voted ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.4 }}
                    >
                      VS
                    </motion.span>
                  </div>
                  <div className="vs-line" />
                </div>

                <VoteCard
                  submission={currentPair.b}
                  onVote={() => handleVote('b')}
                  voted={!!voted}
                  winner={voted === 'b'}
                  loser={voted === 'a'}
                  side="b"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Post-vote actions */}
          <AnimatePresence>
            {voted && (
              <motion.div
                className="post-vote"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="post-vote-icon">✓</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>Vote recorded!</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
                      You voted for <strong style={{ color: 'var(--text-primary)' }}>
                        {voted === 'a' ? currentPair.a.title : currentPair.b.title}
                      </strong>
                    </div>
                  </div>
                </div>
                <button className="btn btn-primary" onClick={handleNext}>
                  Next pair
                  <ChevronRight size={18} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Skip button */}
          {!voted && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
              <button className="btn btn-ghost" onClick={handleSkip}>
                <SkipForward size={16} />
                Skip this pair
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Leaderboard teaser */}
      {votedPairs.length >= 2 && (
        <motion.section
          className="section-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ background: 'var(--bg-surface)' }}
        >
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 48, height: 48, background: 'rgba(245,166,35,0.15)', border: '1px solid rgba(245,166,35,0.25)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award size={22} style={{ color: '#F5A623' }} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 3 }}>You've voted on {votedPairs.length} pairs!</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>See how your picks match the community vote</div>
                </div>
              </div>
              <a href="/leaderboard" className="btn btn-secondary">
                <Users size={16} />
                View Leaderboard
              </a>
            </div>
          </div>
        </motion.section>
      )}

      <style>{`
        .vote-stats-row {
          display: flex;
          align-items: center;
          gap: 0;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 16px 24px;
          flex-shrink: 0;
        }
        .vote-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 20px;
        }
        .vote-stat:first-child { padding-left: 0; }
        .vote-stat:last-child  { padding-right: 0; }
        .vote-stat-value {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          line-height: 1;
        }
        .vote-stat-label {
          font-size: 11px;
          color: var(--text-muted);
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-top: 4px;
        }
        .vote-stat-divider {
          width: 1px;
          height: 36px;
          background: var(--border);
        }

        .vote-progress {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 8px;
        }
        .vote-progress-bar {
          flex: 1;
          height: 6px;
          background: var(--border);
          border-radius: 3px;
          overflow: hidden;
        }
        .vote-progress-fill {
          height: 100%;
          background: var(--accent-grad);
          border-radius: 3px;
        }
        .vote-progress-label {
          font-size: 12px;
          color: var(--text-muted);
          font-weight: 600;
          white-space: nowrap;
        }

        /* Arena */
        .vote-arena {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 0;
          align-items: start;
        }

        /* Vote card */
        .vote-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          overflow: hidden;
          transition: all 0.3s ease;
          position: relative;
        }
        .vote-card--winner {
          border-color: var(--accent);
          box-shadow: 0 0 40px rgba(67,97,238,0.25), inset 0 0 0 1px rgba(67,97,238,0.3);
        }
        .vote-card--loser {
          opacity: 0.5;
          filter: saturate(0.4);
        }

        .winner-badge {
          position: absolute;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          background: var(--accent-grad);
          color: #fff;
          padding: 6px 16px;
          border-radius: var(--radius-full);
          font-size: 13px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          box-shadow: 0 4px 20px rgba(67,97,238,0.4);
        }

        .vote-preview {
          position: relative;
          height: 280px;
          overflow: hidden;
          border-bottom: 1px solid var(--border);
        }
        .vote-preview > div:first-child {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .vote-hover-overlay {
          position: absolute;
          inset: 0;
          background: rgba(7,7,14,0.6);
          backdrop-filter: blur(2px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s;
          z-index: 5;
        }
        .vote-card:not(.vote-card--winner):not(.vote-card--loser) .vote-preview:hover .vote-hover-overlay {
          opacity: 1;
        }
        .vote-overlay-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: #fff;
          font-weight: 700;
          font-size: 15px;
        }
        .vote-count-overlay {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 6;
        }
        .vote-count-pill {
          background: rgba(0,0,0,0.75);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border-strong);
          color: var(--text-primary);
          padding: 5px 12px;
          border-radius: var(--radius-full);
          font-size: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 5px;
          white-space: nowrap;
        }

        .vote-card-info {
          padding: 20px;
        }
        .vote-btn {
          width: 100%;
          justify-content: center;
          margin-top: 16px;
        }

        /* VS divider */
        .vs-divider {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 20px;
          padding-top: 120px;
          gap: 10px;
        }
        .vs-line {
          width: 1px;
          flex: 1;
          background: var(--border);
          min-height: 30px;
        }
        .vs-chip {
          width: 44px; height: 44px;
          background: var(--bg-card);
          border: 1px solid var(--border-strong);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 800;
          color: var(--text-secondary);
          flex-shrink: 0;
        }

        /* Post vote */
        .post-vote {
          margin-top: 24px;
          background: rgba(13,219,127,0.08);
          border: 1px solid rgba(13,219,127,0.2);
          border-radius: var(--radius-lg);
          padding: 18px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .post-vote-icon {
          width: 36px; height: 36px;
          background: var(--success);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 700;
          color: #000;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .vote-arena {
            grid-template-columns: 1fr;
          }
          .vs-divider {
            flex-direction: row;
            padding: 0;
            padding-left: 0;
          }
          .vs-line { height: 1px; width: auto; flex: 1; min-height: unset; }
          .vote-stats-row { display: none; }
          .vote-preview { height: 220px; }
        }
      `}</style>
    </main>
  )
}
