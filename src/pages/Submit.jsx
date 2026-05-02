import { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Upload, Image, Link2, FileText, CheckCircle,
  X, Twitter, Linkedin, Share2, Star, ArrowRight,
  Flame, Trophy, Zap
} from 'lucide-react'

/* ─── File drop zone ────────────────────────────────────────────────── */
function DropZone({ file, onFile, onClear }) {
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef(null)

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped && dropped.type.startsWith('image/')) onFile(dropped)
  }, [onFile])

  const handleChange = (e) => {
    const selected = e.target.files[0]
    if (selected) onFile(selected)
  }

  return (
    <div
      className={`drop-zone ${dragging ? 'drop-zone--drag' : ''} ${file ? 'drop-zone--filled' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => !file && inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleChange}
      />

      <AnimatePresence mode="wait">
        {!file ? (
          <motion.div
            key="empty"
            className="drop-zone__empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="drop-zone__icon"
              animate={dragging ? { scale: 1.1, y: -6 } : { scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Upload size={32} />
            </motion.div>
            <div className="drop-zone__title">
              {dragging ? 'Drop it!' : 'Drop your redesign here'}
            </div>
            <div className="drop-zone__subtitle">
              or <span style={{ color: 'var(--accent-light)', cursor: 'pointer', fontWeight: 600 }}>browse files</span>
            </div>
            <div className="drop-zone__hint">PNG, JPG, WebP — max 10MB</div>
          </motion.div>
        ) : (
          <motion.div
            key="filled"
            className="drop-zone__preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <img src={URL.createObjectURL(file)} alt="Preview" className="drop-zone__img" />
            <button
              className="drop-zone__clear"
              onClick={(e) => { e.stopPropagation(); onClear() }}
              title="Remove file"
            >
              <X size={16} />
            </button>
            <div className="drop-zone__file-info">
              <Image size={14} />
              {file.name}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Share card ────────────────────────────────────────────────────── */
function ShareCard({ title, votes = 47, rank = 12 }) {
  return (
    <div className="share-card">
      {/* Background gradient */}
      <div className="share-card__bg" />

      {/* Logo */}
      <div className="share-card__header">
        <div className="share-card__logo">
          <Zap size={14} fill="currentColor" />
          RedesignThis
        </div>
        <div className="badge badge-accent" style={{ fontSize: 11 }}>
          <Flame size={10} />
          Day 42
        </div>
      </div>

      {/* Content */}
      <div className="share-card__content">
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
          I redesigned today's challenge
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: '#EEEEFF', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 16 }}>
          {title || 'Banking App Dashboard'}
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'column', background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '10px 14px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#EEEEFF', fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}>{votes}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 2 }}>Votes</div>
          </div>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'column', background: 'rgba(67,97,238,0.2)', borderRadius: 12, padding: '10px 14px', border: '1px solid rgba(67,97,238,0.3)' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#6B8FFF', fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}>#{rank}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 2 }}>Rank</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="share-card__footer">
        redesignthis.app
      </div>
    </div>
  )
}

/* ─── Success screen ────────────────────────────────────────────────── */
function SuccessScreen({ title, onReset }) {
  return (
    <motion.div
      className="success-screen"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Confetti burst */}
      <div className="confetti-burst">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="confetti-dot"
            style={{
              background: ['#4361EE','#8B31E0','#0DDB7F','#F5A623','#FF4757'][i % 5],
              left: `${Math.random() * 100}%`,
            }}
            initial={{ y: 0, opacity: 1, scale: 1 }}
            animate={{
              y: -(60 + Math.random() * 80),
              opacity: 0,
              scale: 0,
              x: (Math.random() - 0.5) * 100,
            }}
            transition={{ duration: 0.8 + Math.random() * 0.6, delay: Math.random() * 0.3, ease: 'easeOut' }}
          />
        ))}
      </div>

      <motion.div
        className="success-check"
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
      >
        <CheckCircle size={40} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="display-lg" style={{ marginBottom: 10, textAlign: 'center' }}>
          You're in! 🎉
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 16, textAlign: 'center', maxWidth: 400, lineHeight: 1.6 }}>
          Your redesign is live and collecting votes. Share it to get more eyes on your work.
        </p>
      </motion.div>

      {/* Share card */}
      <motion.div
        style={{ width: '100%', maxWidth: 360 }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
      >
        <ShareCard title={title} votes={0} rank={128} />
      </motion.div>

      {/* Share buttons */}
      <motion.div
        className="share-buttons"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 12, textAlign: 'center' }}>
          Share your result
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="share-btn share-btn--twitter">
            <Twitter size={16} />
            Twitter / X
          </button>
          <button className="share-btn share-btn--linkedin">
            <Linkedin size={16} />
            LinkedIn
          </button>
          <button className="share-btn share-btn--copy">
            <Share2 size={16} />
            Copy Link
          </button>
        </div>
      </motion.div>

      {/* Action links */}
      <motion.div
        style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
      >
        <Link to="/vote" className="btn btn-primary">
          <Star size={16} />
          Vote on others
        </Link>
        <Link to="/leaderboard" className="btn btn-secondary">
          <Trophy size={16} />
          View Leaderboard
        </Link>
        <button className="btn btn-ghost" onClick={onReset}>
          Submit another
          <ArrowRight size={16} />
        </button>
      </motion.div>
    </motion.div>
  )
}

/* ─── Submit page ───────────────────────────────────────────────────── */
export default function Submit() {
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [figmaUrl, setFigmaUrl] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const handleClearFile = () => setFile(null)

  const validate = () => {
    const e = {}
    if (!file) e.file = 'Please upload your redesign'
    if (!title.trim()) e.title = 'Give your design a title'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setErrors({})
    setSubmitting(true)
    // Simulate async upload
    await new Promise(r => setTimeout(r, 1800))
    setSubmitting(false)
    setSubmitted(true)
  }

  const handleReset = () => {
    setFile(null)
    setTitle('')
    setDescription('')
    setFigmaUrl('')
    setSubmitted(false)
    setErrors({})
  }

  return (
    <main style={{ paddingTop: 'var(--nav-h)' }}>
      <section className="section-sm">
        <div className="container-sm">
          <AnimatePresence mode="wait">
            {submitted ? (
              <SuccessScreen key="success" title={title} onReset={handleReset} />
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Header */}
                <div style={{ marginBottom: 40 }}>
                  <div className="badge badge-accent" style={{ marginBottom: 16 }}>
                    <Upload size={12} />
                    Submit Redesign
                  </div>
                  <h1 className="display-xl" style={{ marginBottom: 12 }}>
                    Show your work
                  </h1>
                  <p className="text-secondary text-lg" style={{ maxWidth: 520 }}>
                    Upload your redesign for today's Banking App challenge.
                    The community will vote — best designs win recognition and climb the board.
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="submit-layout">
                    {/* Left col: upload + metadata */}
                    <div className="submit-col">
                      {/* Drop zone */}
                      <div className="form-group">
                        <label className="label">
                          <Image size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
                          Your Redesign *
                        </label>
                        <DropZone file={file} onFile={setFile} onClear={handleClearFile} />
                        {errors.file && (
                          <motion.p
                            className="field-error"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {errors.file}
                          </motion.p>
                        )}
                      </div>

                      {/* Title */}
                      <div className="form-group">
                        <label className="label" htmlFor="title">
                          <FileText size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
                          Design Title *
                        </label>
                        <input
                          id="title"
                          type="text"
                          className={`input ${errors.title ? 'input--error' : ''}`}
                          placeholder="e.g. Clean Dark Dashboard"
                          value={title}
                          onChange={e => { setTitle(e.target.value); setErrors(v => ({ ...v, title: '' })) }}
                          maxLength={60}
                        />
                        {errors.title && (
                          <motion.p
                            className="field-error"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {errors.title}
                          </motion.p>
                        )}
                        <div className="field-count">{title.length}/60</div>
                      </div>

                      {/* Description */}
                      <div className="form-group">
                        <label className="label" htmlFor="desc">
                          Design Notes <span style={{ color: 'var(--text-muted)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
                        </label>
                        <textarea
                          id="desc"
                          className="input"
                          style={{ resize: 'vertical', minHeight: 100 }}
                          placeholder="What design decisions did you make? What were you trying to fix?"
                          value={description}
                          onChange={e => setDescription(e.target.value)}
                          maxLength={500}
                        />
                        <div className="field-count">{description.length}/500</div>
                      </div>

                      {/* Figma link */}
                      <div className="form-group">
                        <label className="label" htmlFor="figma">
                          <Link2 size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
                          Figma / Prototype Link <span style={{ color: 'var(--text-muted)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
                        </label>
                        <input
                          id="figma"
                          type="url"
                          className="input"
                          placeholder="https://figma.com/file/..."
                          value={figmaUrl}
                          onChange={e => setFigmaUrl(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Right col: preview + submit */}
                    <div className="submit-col">
                      {/* Preview card */}
                      <div className="preview-card">
                        <div className="preview-card__header">
                          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
                            Preview
                          </span>
                          <span className="badge badge-accent" style={{ fontSize: 11 }}>
                            Day 42
                          </span>
                        </div>

                        <div className="preview-card__design">
                          {file ? (
                            <motion.img
                              src={URL.createObjectURL(file)}
                              alt="Design preview"
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            />
                          ) : (
                            <div className="preview-card__placeholder">
                              <Image size={28} style={{ color: 'var(--text-muted)', marginBottom: 8 }} />
                              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Your design will appear here</span>
                            </div>
                          )}
                        </div>

                        <div className="preview-card__meta">
                          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 3 }}>
                            {title || <span style={{ color: 'var(--text-muted)' }}>Design title...</span>}
                          </div>
                          {description && (
                            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                              {description}
                            </p>
                          )}
                          {figmaUrl && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: 12, color: 'var(--accent-light)' }}>
                              <Link2 size={12} />
                              Figma prototype attached
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Gamification reminder */}
                      <div className="submit-reward-box">
                        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                          <span style={{ fontSize: 20 }}>🏆</span>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>What you can win</div>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                              {[
                                'Votes from the community',
                                'Leaderboard ranking',
                                '"Top 10" badge if you crack it',
                                'Streak extended by 1 day 🔥',
                              ].map((item, i) => (
                                <li key={i} style={{ display: 'flex', gap: 7, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                  <span style={{ color: 'var(--success)', flexShrink: 0 }}>→</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Submit button */}
                      <motion.button
                        type="submit"
                        className="btn btn-primary btn-lg submit-btn"
                        disabled={submitting}
                        whileTap={{ scale: 0.98 }}
                      >
                        <AnimatePresence mode="wait">
                          {submitting ? (
                            <motion.span
                              key="loading"
                              style={{ display: 'flex', alignItems: 'center', gap: 10 }}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              <span className="spinner" />
                              Uploading...
                            </motion.span>
                          ) : (
                            <motion.span
                              key="idle"
                              style={{ display: 'flex', alignItems: 'center', gap: 10 }}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              <Upload size={18} />
                              Submit Redesign
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>

                      <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.5 }}>
                        By submitting you agree to share your work publicly.
                        You retain all rights to your design.
                      </p>
                    </div>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <style>{`
        /* Drop zone */
        .drop-zone {
          border: 2px dashed var(--border-strong);
          border-radius: var(--radius-lg);
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
          background: var(--bg-surface);
        }
        .drop-zone:hover, .drop-zone--drag {
          border-color: var(--accent);
          background: rgba(67,97,238,0.05);
          box-shadow: 0 0 0 4px rgba(67,97,238,0.08);
        }
        .drop-zone--drag { border-color: var(--accent-light); }
        .drop-zone--filled {
          cursor: default;
          border-style: solid;
          border-color: var(--border-strong);
          min-height: 240px;
        }
        .drop-zone__empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 32px;
        }
        .drop-zone__icon {
          width: 64px; height: 64px;
          background: rgba(67,97,238,0.1);
          border: 1px solid rgba(67,97,238,0.2);
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-light);
          margin-bottom: 8px;
        }
        .drop-zone__title { font-size: 16px; font-weight: 700; color: var(--text-primary); }
        .drop-zone__subtitle { font-size: 14px; color: var(--text-secondary); }
        .drop-zone__hint { font-size: 12px; color: var(--text-muted); margin-top: 4px; }
        .drop-zone__preview {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 240px;
        }
        .drop-zone__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .drop-zone__clear {
          position: absolute;
          top: 10px; right: 10px;
          width: 30px; height: 30px;
          background: rgba(0,0,0,0.7);
          border: 1px solid var(--border-strong);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.2s;
          z-index: 5;
        }
        .drop-zone__clear:hover { background: rgba(255,71,87,0.8); }
        .drop-zone__file-info {
          position: absolute;
          bottom: 0;
          left: 0; right: 0;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(8px);
          padding: 8px 14px;
          font-size: 12px;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Form */
        .submit-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: start;
        }
        .submit-col {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .field-error {
          font-size: 12px;
          color: var(--danger);
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .field-count {
          font-size: 11px;
          color: var(--text-muted);
          text-align: right;
        }
        .input--error {
          border-color: var(--danger);
          box-shadow: 0 0 0 3px rgba(255,71,87,0.12);
        }

        /* Preview card */
        .preview-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }
        .preview-card__header {
          padding: 14px 18px;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .preview-card__design {
          height: 200px;
          background: var(--bg-surface);
          overflow: hidden;
        }
        .preview-card__placeholder {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .preview-card__meta {
          padding: 16px 18px;
          border-top: 1px solid var(--border);
        }

        .submit-reward-box {
          background: rgba(13,219,127,0.06);
          border: 1px solid rgba(13,219,127,0.15);
          border-radius: var(--radius-md);
          padding: 16px;
        }
        .submit-btn {
          width: 100%;
          justify-content: center;
          font-size: 16px;
          padding: 16px;
        }
        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none !important;
        }
        .spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        /* Share card */
        .share-card {
          background: linear-gradient(135deg, #0D0D1A 0%, #14142A 100%);
          border: 1px solid var(--border-accent);
          border-radius: var(--radius-xl);
          padding: 24px;
          position: relative;
          overflow: hidden;
        }
        .share-card__bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 80% 20%, rgba(67,97,238,0.15) 0%, transparent 60%),
                      radial-gradient(ellipse at 20% 80%, rgba(139,49,224,0.1) 0%, transparent 60%);
          pointer-events: none;
        }
        .share-card__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          position: relative;
        }
        .share-card__logo {
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .share-card__content { position: relative; margin-bottom: 20px; }
        .share-card__footer {
          position: relative;
          font-size: 11px;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-align: right;
        }

        /* Success */
        .success-screen {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
          padding: 40px 0;
          position: relative;
        }
        .confetti-burst {
          position: absolute;
          top: 80px;
          left: 50%;
          transform: translateX(-50%);
          width: 300px;
          height: 0;
          pointer-events: none;
        }
        .confetti-dot {
          position: absolute;
          width: 8px; height: 8px;
          border-radius: 50%;
        }
        .success-check {
          width: 80px; height: 80px;
          background: rgba(13,219,127,0.12);
          border: 2px solid rgba(13,219,127,0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--success);
        }

        /* Share buttons */
        .share-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: var(--radius-full);
          font-size: 14px;
          font-weight: 600;
          transition: all 0.2s;
          cursor: pointer;
          border: 1px solid var(--border-strong);
          background: var(--bg-card);
          color: var(--text-primary);
        }
        .share-btn:hover { transform: translateY(-2px); }
        .share-btn--twitter:hover { border-color: #1DA1F2; color: #1DA1F2; }
        .share-btn--linkedin:hover { border-color: #0A66C2; color: #0A66C2; }
        .share-btn--copy:hover { border-color: var(--accent); color: var(--accent-light); }

        @media (max-width: 768px) {
          .submit-layout { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  )
}
