// ═══════════════════════════════════════════════════════
// NotFoundPage.jsx
// ═══════════════════════════════════════════════════════
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Home, ArrowRight } from 'lucide-react'

export function NotFoundPage() {
  return (
    <>
      <Helmet><title>Page introuvable — ETS MAREL</title></Helmet>
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F9FAFB', padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <div style={{ fontFamily: "'Sora',sans-serif", fontSize: '120px', fontWeight: 900, color: '#F2F9E5', lineHeight: 1, marginBottom: '-20px', userSelect: 'none' }}>
            404
          </div>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#F2F9E5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <Home size={32} style={{ color: '#2D6A1F' }} />
          </div>
          <h1 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '26px', color: '#1F2937', marginBottom: '12px' }}>
            Page introuvable
          </h1>
          <p style={{ color: '#6B7280', fontSize: '15px', lineHeight: 1.7, marginBottom: '32px' }}>
            La page que vous recherchez n'existe pas ou a ete deplacee.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" className="btn-green">
              <Home size={16} /> Retour a l'accueil
            </Link>
            <Link to="/contact" className="btn-outline">
              Nous contacter <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFoundPage