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

  // 🔧 Fonction pour remonter en haut au clic
  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }) // scroll fluide
    // Alternative sans animation : window.scrollTo(0, 0)
  }

  return (
    <footer>
      {/* Bande supérieure verte */}
      <div style={{ height: '5px', background: 'linear-gradient(90deg, #2D6A1F, #8DC31E, #B5D95A, #8DC31E, #2D6A1F)' }} />

      {/* Corps footer */}
      <div style={{ backgroundColor: '#0f1f08' }}>
        <div className="wrap" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '48px' }}>

            {/* Bloc école - Logo agrandi et épuré */}
            <div style={{ gridColumn: 'span 1' }}>
              <Link 
                to="/" 
                onClick={handleLinkClick}  // ✅ Ajout du scroll
                style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}
              >
                <img
                  src={logo}
                  alt="Logo ETS MAREL"
                  style={{
                    width: '64px',
                    height: '64px',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
                <div>
                  <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '18px', color: '#ffffff', lineHeight: 1.2 }}>
                    EPV. MAREL
                  </p>
                  <p style={{ fontSize: '11px', color: '#8DC31E', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Maternelle & Primaire
                  </p>
                </div>
              </Link>
              <p style={{ color: '#9CA3AF', fontSize: '14px', lineHeight: 1.8, maxWidth: '280px' }}>
                Fondée en 2000, l'EPV MAREL forme les enfants de la crèche au CM2 avec
                un taux de réussite de <strong style={{ color: '#8DC31E' }}>100%</strong> au CEPE depuis 2012.
              </p>
            </div>

            {/* Navigation - Polices agrandies */}
            <div>
              <h4 style={{ fontFamily: "'Sora',sans-serif", color: '#ffffff', fontWeight: 700, fontSize: '16px', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '24px' }}>
                Navigation
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {LINKS_NAV.map(l => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      onClick={handleLinkClick}  // ✅ Ajout du scroll
                      style={{ color: '#9CA3AF', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', transition: 'color 0.2s ease' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#8DC31E'}
                      onMouseLeave={e => e.currentTarget.style.color = '#9CA3AF'}
                    >
                      <ChevronRight size={14} style={{ color: '#8DC31E', flexShrink: 0 }} />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Niveaux - Polices agrandies */}
            <div>
              <h4 style={{ fontFamily: "'Sora',sans-serif", color: '#ffffff', fontWeight: 700, fontSize: '16px', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '24px' }}>
                Niveaux scolaires
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {NIVEAUX.map(n => (
                  <li key={n} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#8DC31E', flexShrink: 0 }} />
                    <span style={{ color: '#9CA3AF', fontSize: '14px' }}>{n}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coordonnées - Polices agrandies */}
            <div>
              <h4 style={{ fontFamily: "'Sora',sans-serif", color: '#ffffff', fontWeight: 700, fontSize: '16px', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '24px' }}>
                Coordonnées
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {[
                  { icon: <MapPin size={16} />, text: 'Deux Plateaux 8ème Tranche\nCocody – Abidjan, Côte d\'Ivoire' },
                  { icon: <Phone size={16} />, text: '+225 22 50 35 81\n+225 05 61 56 10' },
                  { icon: <Mail size={16} />, text: 'contact@etsmarel.ci' },
                  { icon: <Clock size={16} />, text: 'Lun – Ven : 7h30 – 16h30' },
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#8DC31E', flexShrink: 0, marginTop: '2px' }}>{item.icon}</span>
                    <span style={{ color: '#9CA3AF', fontSize: '14px', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom bar - Polices agrandies */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '24px 0' }}>
          <div className="wrap" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
            <p style={{ color: '#6B7280', fontSize: '13px' }}>
              &copy; {year} EPV. MAREL — Tous droits réservés
            </p>
            <div style={{ display: 'flex', gap: '24px' }}>
              {['Mentions légales', 'Confidentialité'].map(l => (
                <Link
                  key={l}
                  to="/contact"
                  onClick={handleLinkClick}  // ✅ Ajout du scroll
                  style={{ color: '#6B7280', fontSize: '13px', transition: 'color 0.2s' }}
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