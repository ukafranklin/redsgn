import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Zap, Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { to: '/challenge',   label: 'Challenge' },
  { to: '/vote',        label: 'Vote' },
  { to: '/leaderboard', label: 'Leaderboard' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner">
          {/* Logo */}
          <Link to="/" className="navbar__logo">
            <div className="navbar__logo-icon">
              <Zap size={16} fill="currentColor" />
            </div>
            <span className="navbar__logo-text">Redesign<strong>This</strong></span>
          </Link>

          {/* Desktop links */}
          <div className="navbar__links hide-mobile">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`navbar__link ${location.pathname === to ? 'navbar__link--active' : ''}`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div className="navbar__actions">
            <Link to="/submit" className="btn btn-primary btn-sm hide-mobile">
              Submit Design
            </Link>
            <button
              className="navbar__hamburger"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
        <div className="mobile-menu__inner">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`mobile-menu__link ${location.pathname === to ? 'mobile-menu__link--active' : ''}`}
            >
              {label}
            </Link>
          ))}
          <Link to="/submit" className="btn btn-primary" style={{ marginTop: 8 }}>
            Submit Design
          </Link>
        </div>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          height: var(--nav-h);
          display: flex;
          align-items: center;
          transition: all 0.3s ease;
        }
        .navbar--scrolled {
          background: rgba(7,7,14,0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
        }
        .navbar__inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .navbar__logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display);
          font-size: 18px;
          color: var(--text-primary);
          text-decoration: none;
        }
        .navbar__logo-icon {
          width: 32px; height: 32px;
          background: var(--accent-grad);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          flex-shrink: 0;
        }
        .navbar__logo-text strong { font-weight: 700; }
        .navbar__links {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .navbar__link {
          padding: 8px 14px;
          border-radius: var(--radius-full);
          font-size: 14px;
          font-weight: 500;
          color: var(--text-secondary);
          transition: all var(--transition);
        }
        .navbar__link:hover { color: var(--text-primary); background: var(--bg-subtle); }
        .navbar__link--active {
          color: var(--text-primary);
          background: rgba(67,97,238,0.12);
          color: var(--accent-light);
        }
        .navbar__actions { display: flex; align-items: center; gap: 12px; }
        .navbar__hamburger {
          display: none;
          color: var(--text-secondary);
          padding: 8px;
          border-radius: var(--radius-sm);
          transition: all var(--transition);
        }
        .navbar__hamburger:hover { color: var(--text-primary); background: var(--bg-subtle); }

        .mobile-menu {
          display: none;
          position: fixed;
          top: var(--nav-h);
          left: 0; right: 0;
          z-index: 999;
          background: rgba(7,7,14,0.97);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
          transform: translateY(-8px);
          opacity: 0;
          pointer-events: none;
          transition: all 0.25s ease;
        }
        .mobile-menu--open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: all;
        }
        .mobile-menu__inner {
          padding: 16px 24px 24px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .mobile-menu__link {
          padding: 14px 16px;
          font-size: 16px;
          font-weight: 500;
          color: var(--text-secondary);
          border-radius: var(--radius-md);
          transition: all var(--transition);
        }
        .mobile-menu__link:hover, .mobile-menu__link--active {
          color: var(--text-primary);
          background: var(--bg-card);
        }

        @media (max-width: 768px) {
          .navbar__hamburger { display: flex; }
          .mobile-menu { display: block; }
        }
      `}</style>
    </>
  )
}
