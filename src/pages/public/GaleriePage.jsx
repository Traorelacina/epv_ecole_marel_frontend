import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { publicService } from '@services/publicService'
import { useInView } from '@hooks/useInView'
import { ChevronRight, Image, Filter, ArrowRight, Camera, Sparkles, Calendar, Heart } from 'lucide-react'
import galerieImage from '../../assets/images/galerie_marel.jpeg'

const STORAGE = import.meta.env.VITE_STORAGE_URL || 'https://ideal-ilse-freelence-89b443a4.koyeb.app/'

const CATEGORIES = [
  { val: '',           label: 'Tous' },
  { val: 'sorties',    label: 'Sorties' },
  { val: 'ceremonies', label: 'Cérémonies' },
  { val: 'activites',  label: 'Activités' },
  { val: 'resultats',  label: 'Résultats' },
  { val: 'autres',     label: 'Autres' },
]

/* ── Hero avec image à droite ── */
function GalerieHero() {
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
              <span style={{ color: '#8DC31E', fontSize: '13px', fontWeight: 600 }}>Galerie</span>
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
                Galerie multimédia
              </span>
            </div>

            <h1 style={{ ...fadeUp(220), fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(2.4rem,5vw,3.8rem)', color: '#fff', lineHeight: 1.1, marginBottom: '10px', letterSpacing: '-1px' }}>
              Les moments forts
            </h1>
            <h1 style={{ ...fadeUp(340), fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(2.4rem,5vw,3.8rem)', color: '#8DC31E', lineHeight: 1.1, marginBottom: '10px', letterSpacing: '-1px' }}>
              de la vie scolaire
            </h1>
            <h1 style={{ ...fadeUp(460), fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(2.4rem,5vw,3.8rem)', color: '#fff', lineHeight: 1.1, marginBottom: '28px', letterSpacing: '-1px' }}>
              en images
            </h1>

            <p style={{ ...fadeUp(580), color: 'rgba(255,255,255,0.75)', fontSize: '17px', maxWidth: '500px', lineHeight: 1.8, marginBottom: '40px' }}>
              Sorties scolaires, cérémonies, activités culturelles et résultats — revivez les souvenirs d'EPV MAREL à travers nos albums photos.
            </p>

            {/* CTA */}
            <div style={{ ...fadeUp(700), display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              <Link to="/contact" className="btn-red" style={{ fontSize: '15px', padding: '14px 28px' }}>
                Nous contacter <ArrowRight size={17} />
              </Link>
              <Link to="/actualites" className="btn-white" style={{ fontSize: '15px', padding: '14px 28px' }}>
                Voir les actualités
              </Link>
            </div>

            {/* Mini stats */}
            <div style={{ ...fadeUp(820), display: 'flex', gap: '32px', marginTop: '52px', flexWrap: 'wrap' }}>
              {[
                { val: '1000+', label: 'Photos' },
                { val: '50+', label: 'Albums' },
                { val: '10+', label: 'Événements/an' },
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

          {/* Image à droite avec design spécifique Galerie */}
          <div
            className="hidden lg:flex"
            style={{
              justifyContent: 'center', alignItems: 'center', position: 'relative',
              opacity: loaded ? 1 : 0,
              animation: loaded ? 'scaleIn .9s cubic-bezier(.22,.68,0,1.2) 300ms both' : 'none',
            }}
          >
            {/* Anneau externe avec éléments photo */}
            <div style={{
              position: 'absolute',
              width: '480px', height: '480px', borderRadius: '50%',
              border: '2px dotted rgba(141,195,30,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }} className="ring-spin-cw">
              {/* Éléments décoratifs autour */}
              <div style={{ position: 'absolute', top: '-15px', right: '25%', background: '#fff', borderRadius: '50%', padding: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <Camera size={14} style={{ color: '#D4191A' }} />
              </div>
              <div style={{ position: 'absolute', bottom: '-10px', left: '20%', background: '#fff', borderRadius: '50%', padding: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <Heart size={14} style={{ color: '#D4191A' }} />
              </div>
              <div style={{ position: 'absolute', top: '25%', left: '-15px', background: '#fff', borderRadius: '50%', padding: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <Sparkles size={14} style={{ color: '#8DC31E' }} />
              </div>
              <div style={{ position: 'absolute', bottom: '25%', right: '-15px', background: '#fff', borderRadius: '50%', padding: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <Calendar size={14} style={{ color: '#2D6A1F' }} />
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

              {/* Image principale avec effet cadre photo */}
              <div style={{
                width: '260px', height: '260px', borderRadius: '20px',
                overflow: 'hidden', border: '4px solid #fff',
                position: 'relative', zIndex: 2,
                boxShadow: '0 0 0 8px rgba(141,195,30,0.1), 0 20px 40px rgba(0,0,0,0.3)',
                transform: 'rotate(2deg)',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'rotate(0deg) scale(1.02)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'rotate(2deg)'}>
                <img src={galerieImage} alt="Galerie ETS MAREL" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '60px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
                }} />
              </div>

              {/* Badge flottant "Nouveaux albums" */}
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
                <Camera size={18} style={{ color: '#fff' }} />
                <div>
                  <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '13px', color: '#fff', lineHeight: 1 }}>Nouveaux albums</p>
                  <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.8)', marginTop: '2px' }}>Mis à jour régulièrement</p>
                </div>
              </div>

              {/* Badge flottant "Souvenirs" */}
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
                <Heart size={16} style={{ color: '#8DC31E' }} />
                <div>
                  <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '12px', color: '#fff', lineHeight: 1 }}>Souvenirs</p>
                  <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>Moments partagés</p>
                </div>
              </div>

              {/* Petite décoration "Galerie" */}
              <div style={{
                position: 'absolute', bottom: '30px', right: '20px',
                background: 'rgba(255,255,255,0.95)',
                borderRadius: '12px', padding: '6px 12px',
                display: 'flex', alignItems: 'center', gap: '6px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}>
                <Image size={12} style={{ color: '#2D6A1F' }} />
                <span style={{ fontSize: '10px', fontWeight: 600, color: '#2D6A1F' }}>50+ albums</span>
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

/* ── Carte album ── */
function AlbumCard({ galerie, index, inView }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      to={`/galerie/${galerie.slug}`}
      className={inView ? `anim-fade-up d${Math.min(index + 1, 6)}` : ''}
      style={{
        display: 'block', borderRadius: '20px', overflow: 'hidden',
        background: '#ffffff', border: '1px solid #F3F4F6',
        boxShadow: hovered ? '0 12px 40px rgba(45,106,31,0.14)' : '0 2px 12px rgba(0,0,0,0.06)',
        transform: hovered ? 'translateY(-4px)' : 'none',
        transition: 'all 0.28s cubic-bezier(.22,.68,0,1.2)',
        textDecoration: 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div style={{ aspectRatio: '1/1', overflow: 'hidden', backgroundColor: '#F2F9E5', position: 'relative' }}>
        {galerie.image_couverture ? (
          <img
            src={`${STORAGE}/${galerie.image_couverture}`}
            alt={galerie.titre}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transform: hovered ? 'scale(1.08)' : 'scale(1)',
              transition: 'transform 0.5s ease',
            }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image size={40} style={{ color: '#8DC31E', opacity: 0.4 }} />
          </div>
        )}

        {/* Overlay hover */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top,rgba(15,42,7,0.7) 0%,transparent 60%)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }} />

        {/* Compteur médias */}
        {galerie.medias_count > 0 && (
          <div style={{
            position: 'absolute', bottom: '12px', left: '12px',
            opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease',
            display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            <Image size={14} style={{ color: '#fff' }} />
            <span style={{ color: '#fff', fontSize: '13px', fontWeight: 600 }}>{galerie.medias_count} média(s)</span>
          </div>
        )}

        {/* Catégorie badge */}
        {galerie.categorie && (
          <div style={{
            position: 'absolute', top: '12px', left: '12px',
            backgroundColor: '#8DC31E', borderRadius: '50px',
            padding: '3px 10px',
          }}>
            <span style={{ color: '#fff', fontSize: '10.5px', fontWeight: 700, textTransform: 'capitalize' }}>
              {galerie.categorie}
            </span>
          </div>
        )}
      </div>

      {/* Infos */}
      <div style={{ padding: '16px 18px 20px' }}>
        <h3 style={{
          fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: '14.5px',
          color: '#1F2937', lineHeight: 1.4, marginBottom: '8px',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {galerie.titre}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {galerie.annee && (
            <span style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 500 }}>{galerie.annee}</span>
          )}
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12.5px', color: '#2D6A1F', fontWeight: 600, marginLeft: 'auto' }}>
            Voir <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  )
}

/* ── Injection des styles d'animation ── */
const ANIMATION_STYLES = `
  @keyframes spinSlow { to { transform: rotate(360deg); } }
  @keyframes spinSlowRev { to { transform: rotate(-360deg); } }
  @keyframes pulseGreen { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.5; transform:scale(1.35); } }
  @keyframes floatY { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-10px); } }
  @keyframes floatYB { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-14px); } }
  @keyframes heroFadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
  @keyframes heroBadge { from { opacity:0; transform:translateY(-14px) scale(.9); } to { opacity:1; transform:translateY(0) scale(1); } }
  @keyframes fadeBlur { from { opacity:0; filter:blur(6px); } to { opacity:1; filter:blur(0); } }
  @keyframes scaleIn { from { opacity:0; transform:scale(.85); } to { opacity:1; transform:scale(1); } }
  
  .ring-spin-cw { animation: spinSlow 20s linear infinite; transform-origin:center; }
  .ring-spin-ccw { animation: spinSlowRev 14s linear infinite; transform-origin:center; }
  .badge-float-a { animation: floatY 3.8s ease-in-out infinite; }
  .badge-float-b { animation: floatYB 4.6s ease-in-out infinite 0.8s; }
`

/* ── Page principale ── */
export default function GaleriePage() {
  const [galeries,   setGaleries]   = useState([])
  const [annees,     setAnnees]     = useState([])
  const [loading,    setLoading]    = useState(true)
  const [categorie,  setCategorie]  = useState('')
  const [annee,      setAnnee]      = useState('')
  const [page,       setPage]       = useState(1)
  const [pagination, setPagination] = useState(null)
  const [ref, inView] = useInView()

  const load = async () => {
    setLoading(true)
    try {
      const res = await publicService.getGaleries({ categorie, annee, page, per_page: 12 })
      setGaleries(res.data?.galeries?.data || [])
      setPagination(res.data?.galeries)
      setAnnees(res.data?.annees || [])
    } catch (_) {}
    setLoading(false)
  }

  useEffect(() => { load() }, [categorie, annee, page])

  return (
    <>
      <Helmet>
        <title>Galerie Photos — EPV MAREL | Abidjan</title>
        <meta name="description" content="Galerie photos et vidéos d'ETS MAREL : sorties scolaires, cérémonies, activités et résultats. Revivez les moments forts de la vie scolaire." />
      </Helmet>

      <style>{ANIMATION_STYLES}</style>
      <GalerieHero />

      <section className="section" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="wrap" ref={ref}>

          {/* ── Filtres catégorie ── */}
          <div className={inView ? 'anim-fade-up' : ''} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginRight: '4px' }}>
              <Filter size={14} style={{ color: '#9CA3AF' }} />
              <span style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Catégorie</span>
            </div>
            {CATEGORIES.map((c) => {
              const isActive = categorie === c.val
              return (
                <button
                  key={c.val}
                  onClick={() => { setCategorie(c.val); setPage(1) }}
                  style={{
                    padding: '8px 18px', borderRadius: '50px', border: 'none',
                    cursor: 'pointer', fontFamily: "'Sora',sans-serif",
                    fontSize: '13px', fontWeight: 600, transition: 'all 0.22s',
                    backgroundColor: isActive ? '#2D6A1F' : '#ffffff',
                    color: isActive ? '#ffffff' : '#374151',
                    boxShadow: isActive ? '0 4px 14px rgba(45,106,31,0.28)' : '0 1px 6px rgba(0,0,0,0.08)',
                    transform: isActive ? 'translateY(-1px)' : 'none',
                  }}
                >
                  {c.label}
                </button>
              )
            })}
          </div>

          {/* ── Filtre années ── */}
          {annees.length > 0 && (
            <div className={inView ? 'anim-fade-up d1' : ''} style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '44px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginRight: '4px' }}>
                <span style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Année</span>
              </div>
              <button
                onClick={() => { setAnnee(''); setPage(1) }}
                style={{
                  padding: '5px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                  fontSize: '12px', fontWeight: 600, transition: 'all 0.2s',
                  backgroundColor: annee === '' ? '#8DC31E' : '#ffffff',
                  color: annee === '' ? '#ffffff' : '#6B7280',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
                }}
              >
                Toutes
              </button>
              {annees.map((a) => (
                <button
                  key={a}
                  onClick={() => { setAnnee(a); setPage(1) }}
                  style={{
                    padding: '5px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                    fontSize: '12px', fontWeight: 600, transition: 'all 0.2s',
                    backgroundColor: annee === String(a) ? '#8DC31E' : '#ffffff',
                    color: annee === String(a) ? '#ffffff' : '#6B7280',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
                  }}
                >
                  {a}
                </button>
              ))}
            </div>
          )}

          {/* ── Contenu ── */}
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', padding: '80px 0' }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#8DC31E', animation: `pulseGreen 1.4s ease-in-out ${i * 0.2}s infinite` }} />
              ))}
            </div>
          ) : galeries.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '18px', backgroundColor: '#F2F9E5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
                <Image size={28} style={{ color: '#8DC31E', opacity: 0.6 }} />
              </div>
              <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, color: '#1F2937', fontSize: '17px', marginBottom: '6px' }}>Aucun album disponible</p>
              <p style={{ color: '#9CA3AF', fontSize: '14px' }}>Les albums seront bientôt ajoutés.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '20px' }}>
              {galeries.map((g, i) => (
                <AlbumCard key={g.id} galerie={g} index={i} inView={inView} />
              ))}
            </div>
          )}

          {/* ── Pagination ── */}
          {pagination && pagination.last_page > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '52px' }}>
              {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  style={{
                    width: '40px', height: '40px', borderRadius: '12px', border: 'none',
                    cursor: 'pointer', fontFamily: "'Sora',sans-serif",
                    fontSize: '13.5px', fontWeight: 700, transition: 'all 0.2s',
                    backgroundColor: p === page ? '#2D6A1F' : '#ffffff',
                    color: p === page ? '#ffffff' : '#374151',
                    boxShadow: p === page ? '0 4px 14px rgba(45,106,31,0.3)' : '0 1px 6px rgba(0,0,0,0.08)',
                    transform: p === page ? 'translateY(-1px)' : 'none',
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}