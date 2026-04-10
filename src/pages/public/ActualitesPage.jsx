// ═══════════════════════════════════════════════════════
// ActualitesPage.jsx
// ═══════════════════════════════════════════════════════
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Search, ArrowRight, BookOpen, Calendar, Clock, Newspaper, Sparkles, ChevronRight } from 'lucide-react'
import { publicService } from '@services/publicService'
import { useInView } from '@hooks/useInView'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import actualitesImage from '../../assets/images/actualites_marel.jpeg'

const STORAGE = import.meta.env.VITE_STORAGE_URL || 'https://ideal-ilse-freelence-89b443a4.koyeb.app/'

/* ── Hero avec image à droite ── */
function ActualitesHero() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t) }, [])

  const fadeUp = (delay) => ({
    opacity: loaded ? 1 : 0,
    animation: loaded ? `heroFadeUp .7s cubic-bezier(.22,.68,0,1.2) ${delay}ms both` : 'none',
  })

  return (
    <section style={{
      position: 'relative', minHeight: '100vh',
      background: 'linear-gradient(155deg,#0f2a07 0%,#1a4010 30%,#2D6A1F 65%,#5a9c22 85%,#8DC31E 100%)',
      display: 'flex', alignItems: 'center', overflow: 'hidden',
    }}>
      {/* Pattern dots */}
      <div className="bg-dots" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />

      {/* Cercles décoratifs animés */}
      <div style={{
        position: 'absolute', top: '-80px', right: '-80px',
        width: '500px', height: '500px', borderRadius: '50%',
        border: '1px solid rgba(141,195,30,0.15)',
        animation: 'spinSlow 32s linear infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: '-60px', left: '10%',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(141,195,30,0.1) 0%, transparent 70%)',
      }} />

      <div className="wrap" style={{ position: 'relative', zIndex: 10, paddingTop: '100px', paddingBottom: '80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}
          className="grid-cols-1 lg:grid-cols-2">
          
          {/* Texte à gauche */}
          <div>
            {/* Breadcrumb */}
            <div style={{ ...fadeUp(100), display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <Link to="/" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px', textDecoration: 'none', fontWeight: 500 }}>Accueil</Link>
              <ChevronRight size={13} style={{ color: 'rgba(255,255,255,0.3)' }} />
              <span style={{ color: '#8DC31E', fontSize: '13px', fontWeight: 600 }}>Actualités</span>
            </div>

            {/* Badge */}
            <div style={{
              ...fadeUp(150),
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '8px 18px', borderRadius: '50px',
              background: 'rgba(141,195,30,0.18)', border: '1px solid rgba(141,195,30,0.35)',
              marginBottom: '28px',
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#8DC31E', animation: 'pulseGreen 2.5s ease-in-out infinite' }} />
              <span style={{ color: '#B5D95A', fontSize: '12.5px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Blog & Actualités
              </span>
            </div>

            <h1 style={{ ...fadeUp(220), fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(2.4rem,5vw,3.8rem)', color: '#fff', lineHeight: 1.1, marginBottom: '10px', letterSpacing: '-1px' }}>
              Actualités
            </h1>
            <h1 style={{ ...fadeUp(340), fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(2.4rem,5vw,3.8rem)', color: '#8DC31E', lineHeight: 1.1, marginBottom: '10px', letterSpacing: '-1px' }}>
              & vie scolaire
            </h1>
            <h1 style={{ ...fadeUp(460), fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(2.4rem,5vw,3.8rem)', color: '#fff', lineHeight: 1.1, marginBottom: '28px', letterSpacing: '-1px' }}>
              de l'école
            </h1>

            <p style={{ ...fadeUp(580), color: 'rgba(255,255,255,0.75)', fontSize: '17px', maxWidth: '500px', lineHeight: 1.8, marginBottom: '40px' }}>
              Sorties scolaires, résultats, événements et annonces importantes de l'EPV MAREL.
              Restez connectés avec la vie de notre école.
            </p>

            {/* CTA */}
            <div style={{ ...fadeUp(700), display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              <Link to="/contact" className="btn-red" style={{ fontSize: '15px', padding: '14px 28px' }}>
                Nous contacter <ArrowRight size={17} />
              </Link>
              <Link to="/galerie" className="btn-white" style={{ fontSize: '15px', padding: '14px 28px' }}>
                Voir la galerie
              </Link>
            </div>

            {/* Mini stats */}
            <div style={{ ...fadeUp(820), display: 'flex', gap: '32px', marginTop: '52px', flexWrap: 'wrap' }}>
              {[
                { val: '100+', label: 'Articles publiés' },
                { val: '2025', label: 'Année scolaire' },
                { val: '24/7', label: 'Accès en ligne' },
              ].map((s, i) => (
                <div key={s.label} style={{
                  opacity: loaded ? 1 : 0,
                  animation: loaded ? `heroFadeUp .6s ease ${820 + i * 120}ms both` : 'none',
                }}>
                  <p style={{ fontFamily: "'Sora',sans-serif", fontSize: '28px', fontWeight: 800, color: '#8DC31E', lineHeight: 1 }}>{s.val}</p>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', marginTop: '4px', fontWeight: 500 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image à droite avec design spécifique Actualités */}
          <div
            className="hidden lg:flex"
            style={{
              justifyContent: 'center', alignItems: 'center', position: 'relative',
              opacity: loaded ? 1 : 0,
              animation: loaded ? 'scaleIn .9s cubic-bezier(.22,.68,0,1.2) 300ms both' : 'none',
            }}
          >
            {/* Anneau externe avec éléments de presse */}
            <div style={{
              position: 'absolute',
              width: '480px', height: '480px', borderRadius: '50%',
              border: '2px dotted rgba(141,195,30,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }} className="ring-spin-cw">
              {/* Éléments décoratifs autour */}
              <div style={{ position: 'absolute', top: '-15px', right: '20%', background: '#fff', borderRadius: '50%', padding: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <Newspaper size={14} style={{ color: '#D4191A' }} />
              </div>
              <div style={{ position: 'absolute', bottom: '-10px', left: '20%', background: '#fff', borderRadius: '50%', padding: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <Calendar size={14} style={{ color: '#2D6A1F' }} />
              </div>
              <div style={{ position: 'absolute', top: '25%', left: '-15px', background: '#fff', borderRadius: '50%', padding: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <Sparkles size={14} style={{ color: '#8DC31E' }} />
              </div>
              <div style={{ position: 'absolute', bottom: '25%', right: '-15px', background: '#fff', borderRadius: '50%', padding: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <Clock size={14} style={{ color: '#f59e0b' }} />
              </div>
            </div>

            {/* Anneau moyen rotatif */}
            <div style={{
              position: 'absolute',
              width: '400px', height: '400px', borderRadius: '50%',
              border: '1px solid rgba(141,195,30,0.25)',
            }} className="ring-spin-ccw" />

            {/* Cercle fond principal */}
            <div style={{
              width: '380px', height: '380px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(141,195,30,0.15) 0%, rgba(141,195,30,0.05) 100%)',
              border: '2px solid rgba(141,195,30,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}>
              {/* Anneau intérieur */}
              <div style={{
                position: 'absolute',
                width: '300px', height: '300px', borderRadius: '50%',
                border: '2px solid transparent',
                borderTopColor: '#8DC31E',
                borderBottomColor: '#D4191A',
                opacity: 0.6,
              }} className="ring-spin-cw" />

              {/* Image principale avec effet journal */}
              <div style={{
                width: '260px', height: '260px', borderRadius: '20px',
                overflow: 'hidden', border: '4px solid #fff',
                position: 'relative', zIndex: 2,
                boxShadow: '0 0 0 8px rgba(141,195,30,0.1), 0 20px 40px rgba(0,0,0,0.3)',
                transform: 'scale(0.95)',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(0.95)'}>
                <img src={actualitesImage} alt="Actualités ETS MAREL" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {/* Overlay gradient en bas */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '60px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
                }} />
              </div>

              {/* Badge flottant "Dernière minute" */}
              <div
                className="badge-float-a"
                style={{
                  position: 'absolute', top: '-20px', right: '-10px',
                  background: '#D4191A', borderRadius: '20px',
                  padding: '12px 18px', boxShadow: '0 8px 32px rgba(212,25,26,0.3)',
                  display: 'flex', alignItems: 'center', gap: '10px',
                  zIndex: 3,
                }}
              >
                <Newspaper size={18} style={{ color: '#fff' }} />
                <div>
                  <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '13px', color: '#fff', lineHeight: 1 }}>À la une</p>
                  <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.8)', marginTop: '2px' }}>Actualités récentes</p>
                </div>
              </div>

              {/* Badge flottant "100% réussite" */}
              <div
                className="badge-float-b"
                style={{
                  position: 'absolute', bottom: '-15px', left: '-15px',
                  background: '#2D6A1F', borderRadius: '20px',
                  padding: '10px 16px', boxShadow: '0 8px 32px rgba(45,106,31,0.4)',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  zIndex: 3,
                }}
              >
                <Calendar size={16} style={{ color: '#8DC31E' }} />
                <div>
                  <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '12px', color: '#fff', lineHeight: 1 }}>Événements</p>
                  <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>Toute l'année</p>
                </div>
              </div>

              {/* Petite décoration "Articles récents" */}
              <div style={{
                position: 'absolute', bottom: '30px', right: '20px',
                background: 'rgba(255,255,255,0.95)',
                borderRadius: '12px', padding: '6px 12px',
                display: 'flex', alignItems: 'center', gap: '6px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}>
                <BookOpen size={12} style={{ color: '#2D6A1F' }} />
                <span style={{ fontSize: '10px', fontWeight: 600, color: '#2D6A1F' }}>Articles récents</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vague bas */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80L1440 80L1440 30C1200 80 960 0 720 40C480 80 240 20 0 30L0 80Z" fill="#F9FAFB" />
        </svg>
      </div>
    </section>
  )
}

/* ── Article Card ── */
function ArticleCard({ article, inView, index }) {
  return (
    <Link
      to={`/actualites/${article.slug}`}
      className={`card ${inView ? `anim-fade-up d${(index % 3) + 1}` : ''}`}
      style={{ display: 'block', height: '100%' }}
    >
      <div style={{ height: '195px', overflow: 'hidden', backgroundColor: '#F2F9E5', position: 'relative' }}>
        {article.image ? (
          <img 
            src={`${STORAGE}/${article.image}`} 
            alt={article.titre} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookOpen size={36} style={{ color: '#8DC31E', opacity: 0.4 }} />
          </div>
        )}
        {article.categorie && (
          <span style={{ 
            position: 'absolute', top: '12px', left: '12px', 
            backgroundColor: '#8DC31E', color: '#fff', 
            padding: '3px 10px', borderRadius: '50px', 
            fontSize: '11px', fontWeight: 700 
          }}>
            {article.categorie.nom}
          </span>
        )}
      </div>
      <div style={{ padding: '20px 22px 26px' }}>
        <p style={{ fontSize: '11.5px', color: '#9CA3AF', marginBottom: '8px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Calendar size={11} />
          {article.date_publication ? format(new Date(article.date_publication), 'd MMMM yyyy', { locale: fr }) : ''}
        </p>
        <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: '15.5px', color: '#1F2937', lineHeight: 1.4, marginBottom: '8px' }}>
          {article.titre}
        </h3>
        {article.extrait && (
          <p style={{ 
            color: '#9CA3AF', fontSize: '13px', lineHeight: 1.7, 
            overflow: 'hidden', display: '-webkit-box', 
            WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' 
          }}>
            {article.extrait}
          </p>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '16px', color: '#2D6A1F', fontSize: '12.5px', fontWeight: 700 }}>
          Lire <ArrowRight size={13} />
        </div>
      </div>
    </Link>
  )
}

/* ── Page principale ── */
export function ActualitesPage() {
  const [articles,   setArticles]   = useState([])
  const [loading,    setLoading]    = useState(true)
  const [pagination, setPagination] = useState(null)
  const [search,     setSearch]     = useState('')
  const [page,       setPage]       = useState(1)
  const [ref, inView] = useInView()

  const load = async () => {
    setLoading(true)
    try {
      const res = await publicService.getArticles({ page, search, per_page: 9 })
      setArticles(res.data?.data || [])
      setPagination(res.data)
    } catch (_) {}
    setLoading(false)
  }

  useEffect(() => { load() }, [page])

  const handleSearch = e => { e.preventDefault(); setPage(1); load() }

  return (
    <>
      <Helmet>
        <title>Actualités — EPV MAREL | Abidjan</title>
        <meta name="description" content="Suivez les dernières actualités, événements et résultats de l'ETS MAREL à Abidjan." />
      </Helmet>

      <style>{`
        @keyframes spinSlow { to { transform: rotate(360deg); } }
        @keyframes spinSlowRev { to { transform: rotate(-360deg); } }
        @keyframes pulseGreen { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.5; transform:scale(1.35); } }
        @keyframes floatY { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-10px); } }
        @keyframes floatYB { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-14px); } }
        @keyframes heroFadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes heroBadge { from { opacity:0; transform:translateY(-14px) scale(.9); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes fadeBlur { from { opacity:0; filter:blur(6px); } to { opacity:1; filter:blur(0); } }
        @keyframes scaleIn { from { opacity:0; transform:scale(.85); } to { opacity:1; transform:scale(1); } }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        
        .ring-spin-cw { animation: spinSlow 20s linear infinite; transform-origin:center; }
        .ring-spin-ccw { animation: spinSlowRev 14s linear infinite; transform-origin:center; }
        .badge-float-a { animation: floatY 3.8s ease-in-out infinite; }
        .badge-float-b { animation: floatYB 4.6s ease-in-out infinite 0.8s; }
      `}</style>

      <ActualitesHero />

      <section className="section" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="wrap" ref={ref}>
          {/* Barre recherche */}
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', maxWidth: '500px', marginBottom: '48px' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Rechercher un article..."
                className="input" style={{ paddingLeft: '44px' }}
              />
            </div>
            <button type="submit" className="btn-green" style={{ padding: '12px 20px', flexShrink: 0 }}>
              <Search size={15} />
            </button>
          </form>

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }} className="grid grid-cols-1 md:grid-cols-3">
              {[1,2,3].map(i => (
                <div key={i} style={{ borderRadius: '16px', height: '340px', background: 'linear-gradient(90deg,#e5e7eb 25%,#f3f4f6 50%,#e5e7eb 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <BookOpen size={48} style={{ color: '#E5E7EB', margin: '0 auto 16px', display: 'block' }} />
              <p style={{ color: '#9CA3AF', fontSize: '16px' }}>Aucun article disponible pour le moment.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }} className="grid grid-cols-1 md:grid-cols-3">
              {articles.map((a, i) => (
                <ArticleCard key={a.id} article={a} inView={inView} index={i} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination?.last_page > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '48px' }}>
              {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)} style={{
                  width: '40px', height: '40px', borderRadius: '10px', fontSize: '14px', fontWeight: 600,
                  backgroundColor: p === page ? '#8DC31E' : '#fff',
                  color: p === page ? '#fff' : '#6B7280',
                  border: p === page ? 'none' : '1px solid #E5E7EB',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}>{p}</button>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default ActualitesPage