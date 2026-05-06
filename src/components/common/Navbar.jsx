import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const LINKS = [
  { to: '/',                     label: 'Accueil' },
  { to: '/presentation',         label: 'Présentation' },
  { to: '/cycles-formation',     label: 'Cycles de Formation' },
  { to: '/informations-parents', label: 'Informations Parents' },
  { to: '/activites-evenements', label: 'Activités et évènements' },
  { to: '/contacts',             label: 'Contacts' },
]

const STYLES = `
  .navbar-root {
    background: #8DC31E;
    transition: box-shadow .3s ease;
  }
  .navbar-root.scrolled {
    box-shadow: 0 4px 24px rgba(45,106,31,.30);
  }
  .navbar-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 32px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* ── Liens desktop */
  .navbar-desktop {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .nav-link {
    padding: 9px 16px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 700;
    text-decoration: none;
    color: #fff;
    white-space: nowrap;
    letter-spacing: .04em;
    text-transform: uppercase;
    transition: background .2s, color .2s;
  }
  .nav-link:hover  { background: rgba(0,0,0,.18); }
  .nav-link.active { background: #1a1a1a; color: #fff; }
  .nav-link.active:hover { background: #111; }

  /* ── Burger */
  .navbar-burger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 10px;
    border-radius: 8px;
    transition: background .2s;
  }
  .navbar-burger:hover { background: rgba(0,0,0,.15); }
  .burger-bar {
    width: 26px; height: 2.5px;
    background: #fff;
    border-radius: 2px;
    transition: transform .3s ease, opacity .3s ease;
    display: block;
  }

  /* ── Drawer mobile */
  .navbar-drawer {
    display: none;
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    transition: max-height .35s ease, opacity .25s ease;
    background: #fff;
    border-top: 1px solid #E5E7EB;
  }
  .navbar-drawer.open { max-height: 600px; opacity: 1; }
  .drawer-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 14px 20px 20px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .drawer-link {
    padding: 13px 18px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 700;
    text-decoration: none;
    color: #374151;
    text-transform: uppercase;
    letter-spacing: .03em;
    transition: background .15s, color .15s;
  }
  .drawer-link:hover  { background: #F2F9E5; color: #2D6A1F; }
  .drawer-link.active { background: #8DC31E; color: #fff; }

  /* Tablette */
  @media (max-width: 1100px) {
    .nav-link { font-size: 12px; padding: 8px 11px; }
    .navbar-inner { padding: 0 20px; }
  }

  /* Mobile */
  @media (max-width: 860px) {
    .navbar-desktop { display: none; }
    .navbar-burger  { display: flex; }
    .navbar-drawer  { display: block; }
    .navbar-inner   { justify-content: flex-end; height: 54px; }
  }

  @media (max-width: 480px) {
    .navbar-inner { padding: 0 16px; }
    .drawer-link  { font-size: 14px; padding: 12px 16px; }
  }
`

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    setMobileOpen(false)
  }, [location])

  return (
    <>
      <style>{STYLES}</style>

      <header className={`navbar-root${scrolled ? ' scrolled' : ''}`}>
        <div className="navbar-inner">

          {/* Liens desktop centrés */}
          <nav className="navbar-desktop">
            {LINKS.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Burger mobile */}
          <button
            className="navbar-burger"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Menu"
          >
            <span className="burger-bar" style={{ transform: mobileOpen ? 'rotate(45deg) translate(0,7.5px)' : 'none' }} />
            <span className="burger-bar" style={{ opacity: mobileOpen ? 0 : 1 }} />
            <span className="burger-bar" style={{ transform: mobileOpen ? 'rotate(-45deg) translate(0,-7.5px)' : 'none' }} />
          </button>

        </div>

        {/* Drawer mobile */}
        <div className={`navbar-drawer${mobileOpen ? ' open' : ''}`}>
          <div className="drawer-inner">
            {LINKS.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => `drawer-link${isActive ? ' active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </header>
    </>
  )
}