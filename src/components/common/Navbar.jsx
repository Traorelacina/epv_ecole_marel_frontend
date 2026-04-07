import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

import logo from '../../assets/images/logo_marel.jpeg'

const LINKS = [
  { to: '/',                       label: "Accueil" },
  { to: '/ecole',                  label: "L'Ecole" },
  { to: '/pedagogie',              label: "Pedagogie" },
  { to: '/informations-pratiques', label: "Infos pratiques" },
  { to: '/actualites',             label: "Actualites" },
  { to: '/galerie',                label: "Galerie" },
  { to: '/contact',                label: "Contact" },
]

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setMobileOpen(false), [location])

  return (
    <>
      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          backgroundColor: '#ffffff',
          borderBottom: scrolled ? '1px solid #E5E7EB' : '1px solid transparent',
          boxShadow: scrolled ? '0 2px 20px rgba(45,106,31,0.10)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <div className="wrap">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>

            {/* ── Logo ── */}
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                overflow: 'hidden', border: '2px solid #8DC31E',
                flexShrink: 0,
              }}>
                <img
                  src={logo}
                  alt="Logo ETS MAREL"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div>
                <p style={{
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 800, fontSize: '17px',
                  color: '#2D6A1F', lineHeight: 1.1, letterSpacing: '-0.3px',
                }}>
                  ETS. MAREL
                </p>
                <p style={{ fontSize: '10px', color: '#8DC31E', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  Maternelle &amp; Primaire
                </p>
              </div>
            </Link>

            {/* ── Nav Desktop ── */}
            <nav style={{ alignItems: 'center', gap: '2px' }} className="lg:flex hidden">
              {LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  style={({ isActive }) => ({
                    padding: '8px 14px',
                    borderRadius: '10px',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    backgroundColor: isActive ? '#8DC31E' : 'transparent',
                    color: isActive ? '#ffffff' : '#374151',
                    letterSpacing: '-0.1px',
                  })}
                  onMouseEnter={e => {
                    if (e.currentTarget.getAttribute('aria-current') !== 'page') {
                      e.currentTarget.style.backgroundColor = '#F2F9E5'
                      e.currentTarget.style.color = '#2D6A1F'
                    }
                  }}
                  onMouseLeave={e => {
                    if (e.currentTarget.getAttribute('aria-current') !== 'page') {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.color = '#374151'
                    }
                  }}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* ── CTA + Burger ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link
                to="/contact"
                className="hidden md:flex"
                style={{
                  backgroundColor: '#D4191A', color: '#fff',
                  padding: '10px 20px', borderRadius: '10px',
                  fontSize: '13px', fontWeight: 700,
                  boxShadow: '0 3px 12px rgba(212,25,26,0.28)',
                  transition: 'all 0.25s ease', letterSpacing: '0.01em',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#A01010'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#D4191A'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                Nous contacter
              </Link>

              {/* Burger */}
              <button
                onClick={() => setMobileOpen(o => !o)}
                className="lg:hidden"
                style={{
                  padding: '8px', borderRadius: '8px',
                  backgroundColor: mobileOpen ? '#F2F9E5' : 'transparent',
                  transition: 'all 0.2s ease',
                }}
                aria-label="Menu"
              >
                <span style={{
                  display: 'block', width: '22px', height: '2px',
                  backgroundColor: '#2D6A1F', borderRadius: '2px',
                  transition: 'all 0.3s ease',
                  transform: mobileOpen ? 'rotate(45deg) translate(3px,3px)' : 'none',
                }} />
                <span style={{
                  display: 'block', width: '22px', height: '2px',
                  backgroundColor: '#2D6A1F', borderRadius: '2px',
                  margin: '5px 0',
                  transition: 'all 0.3s ease',
                  opacity: mobileOpen ? 0 : 1,
                }} />
                <span style={{
                  display: 'block', width: '22px', height: '2px',
                  backgroundColor: '#2D6A1F', borderRadius: '2px',
                  transition: 'all 0.3s ease',
                  transform: mobileOpen ? 'rotate(-45deg) translate(3px,-3px)' : 'none',
                }} />
              </button>
            </div>

          </div>
        </div>

        {/* ── Menu Mobile ── */}
        <div
          className="lg:hidden"
          style={{
            backgroundColor: '#ffffff',
            borderTop: '1px solid #E5E7EB',
            overflow: 'hidden',
            maxHeight: mobileOpen ? '600px' : '0',
            opacity: mobileOpen ? 1 : 0,
            transition: 'max-height 0.35s ease, opacity 0.25s ease',
          }}
        >
          <div className="wrap" style={{ paddingTop: '16px', paddingBottom: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                style={({ isActive }) => ({
                  padding: '12px 16px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: isActive ? '#ffffff' : '#374151',
                  backgroundColor: isActive ? '#8DC31E' : 'transparent',
                  transition: 'all 0.2s ease',
                })}
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              style={{
                marginTop: '8px', padding: '13px 16px', borderRadius: '10px',
                backgroundColor: '#D4191A', color: '#fff',
                fontSize: '14px', fontWeight: 700, textAlign: 'center',
              }}
            >
              Nous contacter
            </Link>
          </div>
        </div>

      </header>

      {/* Spacer pour compenser le header fixe */}
      <div style={{ height: '72px' }} />
    </>
  )
}