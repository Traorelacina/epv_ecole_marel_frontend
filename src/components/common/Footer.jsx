import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, ChevronRight } from 'lucide-react'
import logo from '../../assets/images/logo_marel.jpeg'

const LINKS_NAV = [
  { to: '/',          label: 'Accueil' },
  { to: '/ecole',     label: "L'Ecole" },
  { to: '/pedagogie', label: 'Pedagogie' },
  { to: '/informations-pratiques', label: 'Infos pratiques' },
  { to: '/actualites', label: 'Actualites' },
  { to: '/galerie',   label: 'Galerie' },
  { to: '/contact',   label: 'Contact' },
]

const NIVEAUX = ['Creche', 'Garderie', 'Petite Section', 'Moyenne Section', 'Grande Section', 'CP1 – CM2']

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer>
      {/* Bande supérieure verte */}
      <div style={{ height: '5px', background: 'linear-gradient(90deg, #2D6A1F, #8DC31E, #B5D95A, #8DC31E, #2D6A1F)' }} />

      {/* Corps footer */}
      <div style={{ backgroundColor: '#0f1f08' }}>
        <div className="wrap" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '48px' }}>

            {/* Bloc école */}
            <div style={{ gridColumn: 'span 1' }}>
              <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #8DC31E', flexShrink: 0 }}>
                  <img src={logo} alt="Logo ETS MAREL" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '16px', color: '#ffffff', lineHeight: 1.1 }}>ETS. MAREL</p>
                  <p style={{ fontSize: '10px', color: '#8DC31E', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Maternelle &amp; Primaire</p>
                </div>
              </Link>
              <p style={{ color: '#9CA3AF', fontSize: '13.5px', lineHeight: 1.8, maxWidth: '260px' }}>
                Fondee en 2000, l'ETS MAREL forme les enfants de la creche au CM2 avec
                un taux de reussite de <strong style={{ color: '#8DC31E' }}>100%</strong> au CEPE depuis 2012.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 style={{ fontFamily: "'Sora',sans-serif", color: '#ffffff', fontWeight: 700, fontSize: '14px', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '20px' }}>Navigation</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {LINKS_NAV.map(l => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      style={{ color: '#9CA3AF', fontSize: '13.5px', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color 0.2s ease' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#8DC31E'}
                      onMouseLeave={e => e.currentTarget.style.color = '#9CA3AF'}
                    >
                      <ChevronRight size={13} style={{ color: '#8DC31E', flexShrink: 0 }} />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Niveaux */}
            <div>
              <h4 style={{ fontFamily: "'Sora',sans-serif", color: '#ffffff', fontWeight: 700, fontSize: '14px', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '20px' }}>Niveaux scolaires</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {NIVEAUX.map(n => (
                  <li key={n} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#8DC31E', flexShrink: 0 }} />
                    <span style={{ color: '#9CA3AF', fontSize: '13.5px' }}>{n}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coordonnées */}
            <div>
              <h4 style={{ fontFamily: "'Sora',sans-serif", color: '#ffffff', fontWeight: 700, fontSize: '14px', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '20px' }}>Coordonnees</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { icon: <MapPin size={15} />, text: 'Deux Plateaux 8eme Tranche\nCocody – Abidjan, Cote d\'Ivoire' },
                  { icon: <Phone size={15} />, text: '+225 22 50 35 81\n+225 05 61 56 10' },
                  { icon: <Mail size={15} />, text: 'contact@etsmarel.ci' },
                  { icon: <Clock size={15} />, text: 'Lun – Ven : 7h30 – 16h30' },
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#8DC31E', flexShrink: 0, marginTop: '2px' }}>{item.icon}</span>
                    <span style={{ color: '#9CA3AF', fontSize: '13px', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '20px 0' }}>
          <div className="wrap" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
            <p style={{ color: '#6B7280', fontSize: '12.5px' }}>
              &copy; {year} ETS. MAREL — Tous droits reserves
            </p>
            <div style={{ display: 'flex', gap: '20px' }}>
              {['Mentions legales', 'Confidentialite'].map(l => (
                <Link
                  key={l}
                  to="/contact"
                  style={{ color: '#6B7280', fontSize: '12.5px', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#8DC31E'}
                  onMouseLeave={e => e.currentTarget.style.color = '#6B7280'}
                >
                  {l}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}