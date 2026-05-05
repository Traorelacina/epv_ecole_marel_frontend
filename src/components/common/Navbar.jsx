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
    position: fixed;
    left: 0; right: 0;
    z-index: 1000;
    background: #fff;
    border-bottom: 1px solid rgba(141,195,30,.2);
    transition: box-shadow .3s ease, border-color .3s ease;
  }
  .navbar-root.scrolled {
    box-shadow: 0 4px 24px rgba(45,106,31,.12);
    border-color: #E5E7EB;
  }
  .navbar-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 32px;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .navbar-desktop {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    flex-wrap: wrap;
  }
  .nav-link {
    padding: 10px 16px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 700;
    text-decoration: none;
    color: #374151;
    white-space: nowrap;
    letter-spacing: .01em;
    transition: background .2s, color .2s;
  }
  .nav-link:hover { background: #F2F9E5; color: #2D6A1F; }
  .nav-link.active { background: #8DC31E; color: #fff; }
  .nav-link.active:hover { background: #7ab518; color: #fff; }

  .navbar-burger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 10px;
    border-radius: 10px;
    transition: background .2s;
  }
  .navbar-burger:hover { background: #F2F9E5; }
  .burger-bar {
    width: 26px; height: 2.5px;
    background: #2D6A1F;
    border-radius: 2px;
    transition: transform .3s ease, opacity .3s ease;
    display: block;
  }

  .navbar-drawer {
    display: none;
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    transition: max-height .35s ease, opacity .25s ease;
    background: #fff;
    border-top: 1px solid #E5E7EB;
  }
  .navbar-drawer.open {
    max-height: 600px;
    opacity: 1;
  }
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
    border-radius: 10px;
    font-size: 16px;
    font-weight: 700;
    text-decoration: none;
    color: #374151;
    letter-spacing: .01em;
    transition: background .15s, color .15s;
  }
  .drawer-link:hover { background: #F2F9E5; color: #2D6A1F; }
  .drawer-link.active { background: #8DC31E; color: #fff; }

  @media (max-width: 1100px) {
    .nav-link { font-size: 14px; padding: 9px 12px; }
    .navbar-inner { padding: 0 20px; }
  }

  @media (max-width: 860px) {
    .navbar-desktop { display: none; }
    .navbar-burger { display: flex; }
    .navbar-drawer { display: block; }
    .navbar-inner { justify-content: flex-end; }

    .navbar-root {
      position: relative !important;
      top: auto !important;
      box-shadow: none !important;
    }
  }

  @media (max-width: 480px) {
    .navbar-inner { padding: 0 16px; height: 60px; }
    .drawer-link { font-size: 15px; padding: 12px 16px; }
  }
`

function useTopbarHeight() {
  const [h, setH] = useState(83)
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth
      if (w <= 360) setH(230)
      else if (w <= 480) setH(210)
      else if (w <= 720) setH(165)
      else setH(83)
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])
  return h
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const topbarH = useTopbarHeight()
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 860)

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 860)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    setMobileOpen(false)
  }, [location])

  const navbarH = window.innerWidth <= 480 ? 60 : 72

  return (
    <>
      <style>{STYLES}</style>

      <header
        className={`navbar-root${scrolled ? ' scrolled' : ''}`}
        style={isDesktop ? { top: `${topbarH}px` } : {}}
      >
        <div className="navbar-inner">
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

          <button
            className="navbar-burger"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Menu"
          >
            <span className="burger-bar" style={{ transform: mobileOpen ? 'rotate(45deg) translate(0, 7.5px)' : 'none' }} />
            <span className="burger-bar" style={{ opacity: mobileOpen ? 0 : 1 }} />
            <span className="burger-bar" style={{ transform: mobileOpen ? 'rotate(-45deg) translate(0, -7.5px)' : 'none' }} />
          </button>
        </div>

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

      {isDesktop && <div style={{ height: `${topbarH + navbarH}px` }} />}
    </>
  )
}