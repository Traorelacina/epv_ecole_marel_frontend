import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

/**
 * Hero banner pour toutes les pages internes.
 * @param {string} label - chip supérieur
 * @param {string} title - titre principal
 * @param {string} titleGreen - titre en vert (2eme ligne)
 * @param {string} subtitle - description
 * @param {Array}  breadcrumb - [{ to, label }]
 */
export default function PageHero({ label, title, titleGreen, subtitle, breadcrumb = [] }) {
  return (
    <section style={{
      position: 'relative',
      background: 'linear-gradient(155deg,#0f2a07 0%,#1a4010 30%,#2D6A1F 65%,#5a9c22 85%,#8DC31E 100%)',
      paddingTop: '72px', paddingBottom: '0', overflow: 'hidden',
    }}>
      {/* Fond décoratif */}
      <div className="bg-dots" style={{ position: 'absolute', inset: 0, opacity: 0.25 }} />
      <div style={{
        position: 'absolute', top: '-100px', right: '-100px', width: '500px', height: '500px',
        borderRadius: '50%', border: '1px solid rgba(141,195,30,0.15)',
        animation: 'spinSlow 30s linear infinite',
      }} />

      <div className="wrap" style={{ position: 'relative', zIndex: 5, paddingTop: '56px', paddingBottom: '72px' }}>
        {/* Breadcrumb */}
        {breadcrumb.length > 0 && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '28px', flexWrap: 'wrap' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'rgba(255,255,255,0.55)', fontSize: '12.5px', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#8DC31E'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}>
              <Home size={12} /> Accueil
            </Link>
            {breadcrumb.map((item, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ChevronRight size={12} style={{ color: 'rgba(255,255,255,0.3)' }} />
                {item.to ? (
                  <Link to={item.to} style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12.5px' }}>{item.label}</Link>
                ) : (
                  <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '12.5px', fontWeight: 600 }}>{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {label && (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '6px 16px', borderRadius: '50px',
            background: 'rgba(141,195,30,0.18)', border: '1px solid rgba(141,195,30,0.3)',
            color: '#B5D95A', fontSize: '11.5px', fontWeight: 700, letterSpacing: '0.07em',
            textTransform: 'uppercase', marginBottom: '20px',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#8DC31E' }} />
            {label}
          </span>
        )}

        <h1 className="anim-fade-up" style={{
          fontFamily: "'Sora',sans-serif", fontWeight: 800,
          fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
          color: '#ffffff', lineHeight: 1.15, marginBottom: '6px',
        }}>
          {title}
        </h1>
        {titleGreen && (
          <h1 className="anim-fade-up d1" style={{
            fontFamily: "'Sora',sans-serif", fontWeight: 800,
            fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
            color: '#8DC31E', lineHeight: 1.15, marginBottom: '20px',
          }}>
            {titleGreen}
          </h1>
        )}
        {subtitle && (
          <p className="anim-fade-up d2" style={{
            color: 'rgba(255,255,255,0.72)', fontSize: '16px', maxWidth: '560px', lineHeight: 1.8,
          }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Vague bas */}
      <svg viewBox="0 0 1440 60" fill="none" style={{ display: 'block' }}>
        <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 30C480 60 240 10 0 20L0 60Z" fill="#F9FAFB" />
      </svg>
    </section>
  )
}