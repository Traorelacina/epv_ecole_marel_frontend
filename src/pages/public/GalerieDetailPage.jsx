import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { publicService } from '@services/publicService'
import { useInView } from '@hooks/useInView'
import { ChevronRight, Image, Play, ArrowLeft, ZoomIn, ArrowRight } from 'lucide-react'

const STORAGE = import.meta.env.VITE_STORAGE_URL || 'http://localhost:8000/storage'

/* ── Spinner chargement ── */
function Spinner() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', gap: '10px' }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#8DC31E', animation: `pulseGreen 1.4s ease-in-out ${i * 0.2}s infinite` }} />
      ))}
    </div>
  )
}

/* ── Hero détail ── */
function DetailHero({ galerie, photosCount, videosCount }) {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t) }, [])

  const fadeUp = (delay) => ({
    opacity: loaded ? 1 : 0,
    animation: loaded ? `heroFadeUp .7s cubic-bezier(.22,.68,0,1.2) ${delay}ms both` : 'none',
  })

  return (
    <section style={{
      position: 'relative', padding: '110px 0 80px',
      background: 'linear-gradient(155deg,#0f2a07 0%,#1a4010 30%,#2D6A1F 65%,#5a9c22 85%,#8DC31E 100%)',
      overflow: 'hidden',
    }}>
      <div className="bg-dots" style={{ position: 'absolute', inset: 0, opacity: 0.25 }} />
      <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '380px', height: '380px', borderRadius: '50%', border: '1px dashed rgba(141,195,30,0.25)', animation: 'spinSlow 30s linear infinite' }} />
      <div style={{ position: 'absolute', bottom: '-40px', left: '8%', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(141,195,30,0.1) 0%,transparent 70%)' }} />

      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        {/* Breadcrumb */}
        <div style={{ ...fadeUp(100), display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', textDecoration: 'none', fontWeight: 500 }}>Accueil</Link>
          <ChevronRight size={13} style={{ color: 'rgba(255,255,255,0.3)' }} />
          <Link to="/galerie" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', textDecoration: 'none', fontWeight: 500 }}>Galerie</Link>
          <ChevronRight size={13} style={{ color: 'rgba(255,255,255,0.3)' }} />
          <span style={{ color: '#8DC31E', fontSize: '13px', fontWeight: 600 }}>{galerie.titre}</span>
        </div>

        {/* Badge catégorie */}
        {galerie.categorie && (
          <div style={{
            ...fadeUp(150),
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '7px 16px', borderRadius: '50px',
            background: 'rgba(141,195,30,0.18)', border: '1px solid rgba(141,195,30,0.35)',
            marginBottom: '22px',
          }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#8DC31E', animation: 'pulseGreen 2.5s ease-in-out infinite' }} />
            <span style={{ color: '#B5D95A', fontSize: '11.5px', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
              {galerie.categorie}
            </span>
          </div>
        )}

        <h1 style={{ ...fadeUp(220), fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(1.8rem,4.5vw,3rem)', color: '#fff', lineHeight: 1.2, marginBottom: '16px', letterSpacing: '-0.5px', maxWidth: '700px' }}>
          {galerie.titre}
        </h1>

        {galerie.description && (
          <p style={{ ...fadeUp(330), color: 'rgba(255,255,255,0.72)', fontSize: '16px', maxWidth: '560px', lineHeight: 1.8, marginBottom: '20px' }}>
            {galerie.description}
          </p>
        )}

        {/* Mini stats */}
        <div style={{ ...fadeUp(420), display: 'flex', gap: '28px', flexWrap: 'wrap' }}>
          {photosCount > 0 && (
            <div>
              <p style={{ fontFamily: "'Sora',sans-serif", fontSize: '26px', fontWeight: 800, color: '#8DC31E', lineHeight: 1 }}>{photosCount}</p>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', marginTop: '4px', fontWeight: 500 }}>Photo(s)</p>
            </div>
          )}
          {videosCount > 0 && (
            <div>
              <p style={{ fontFamily: "'Sora',sans-serif", fontSize: '26px', fontWeight: 800, color: '#8DC31E', lineHeight: 1 }}>{videosCount}</p>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', marginTop: '4px', fontWeight: 500 }}>Vidéo(s)</p>
            </div>
          )}
          {galerie.annee && (
            <div>
              <p style={{ fontFamily: "'Sora',sans-serif", fontSize: '26px', fontWeight: 800, color: '#8DC31E', lineHeight: 1 }}>{galerie.annee}</p>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', marginTop: '4px', fontWeight: 500 }}>Année</p>
            </div>
          )}
        </div>
      </div>

      {/* Vague bas */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 30C480 60 240 10 0 20L0 60Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  )
}

/* ── Section photos ── */
function PhotosSection({ photos, onOpen }) {
  const [ref, inView] = useInView()

  return (
    <section className="section" style={{ backgroundColor: '#ffffff' }}>
      <div className="wrap" ref={ref}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#F2F9E5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image size={20} style={{ color: '#2D6A1F' }} />
          </div>
          <div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '1.4rem', color: '#1F2937' }}>Photos</h2>
            <p style={{ color: '#9CA3AF', fontSize: '13px', marginTop: '1px' }}>{photos.length} photo(s) dans cet album</p>
          </div>
        </div>

        {/* Grille photos */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: '12px' }}>
          {photos.map((photo, i) => (
            <PhotoThumb key={photo.id} photo={photo} index={i} inView={inView} onClick={() => onOpen(i)} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PhotoThumb({ photo, index, inView, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      className={inView ? `anim-fade-up d${Math.min(index + 1, 8)}` : ''}
      style={{
        aspectRatio: '1/1', overflow: 'hidden',
        borderRadius: '14px', backgroundColor: '#F2F9E5',
        position: 'relative', cursor: 'zoom-in', border: 'none', padding: 0,
        boxShadow: hovered ? '0 8px 28px rgba(45,106,31,0.18)' : '0 2px 8px rgba(0,0,0,0.06)',
        transform: hovered ? 'scale(1.03)' : 'scale(1)',
        transition: 'all 0.28s cubic-bezier(.22,.68,0,1.2)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={`${STORAGE}/${photo.url}`}
        alt={photo.legende || `Photo ${index + 1}`}
        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease', transform: hovered ? 'scale(1.1)' : 'scale(1)' }}
        loading="lazy"
      />

      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(15,42,7,0.45)',
        opacity: hovered ? 1 : 0, transition: 'opacity 0.28s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'rgba(141,195,30,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ZoomIn size={18} style={{ color: '#fff' }} />
        </div>
      </div>

      {/* Légende */}
      {photo.legende && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '8px 10px',
          background: 'linear-gradient(to top,rgba(0,0,0,0.65),transparent)',
          opacity: hovered ? 1 : 0, transition: 'opacity 0.28s ease',
        }}>
          <p style={{ color: '#fff', fontSize: '11px', fontWeight: 500, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
            {photo.legende}
          </p>
        </div>
      )}
    </button>
  )
}

/* ── Section vidéos ── */
function VideosSection({ videos }) {
  const [ref, inView] = useInView()

  const getYouTubeId = (url) => {
    const match = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
    return match?.[1] || null
  }

  return (
    <section className="section" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="wrap" ref={ref}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#FFF5F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Play size={20} style={{ color: '#D4191A' }} />
          </div>
          <div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '1.4rem', color: '#1F2937' }}>Vidéos</h2>
            <p style={{ color: '#9CA3AF', fontSize: '13px', marginTop: '1px' }}>{videos.length} vidéo(s) dans cet album</p>
          </div>
        </div>

        {/* Grille vidéos */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '20px' }}>
          {videos.map((video, i) => {
            const ytId = getYouTubeId(video.url_youtube || video.url)
            if (!ytId) return null
            return (
              <div
                key={video.id}
                className={`card ${inView ? `anim-fade-up d${i + 1}` : ''}`}
                style={{ overflow: 'hidden', padding: 0 }}
              >
                <div style={{ aspectRatio: '16/9', backgroundColor: '#000' }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${ytId}`}
                    title={video.legende || 'Vidéo ETS MAREL'}
                    style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                {video.legende && (
                  <div style={{ padding: '14px 16px' }}>
                    <p style={{ color: '#374151', fontSize: '13.5px', lineHeight: 1.6 }}>{video.legende}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ── Page principale ── */
export default function GalerieDetailPage() {
  const { slug } = useParams()
  const [galerie,        setGalerie]        = useState(null)
  const [loading,        setLoading]        = useState(true)
  const [lightboxIndex,  setLightboxIndex]  = useState(-1)

  useEffect(() => {
    publicService.getGalerie(slug)
      .then((r) => setGalerie(r.data?.galerie))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <Spinner />

  if (!galerie) return (
    <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
      <div style={{ width: '64px', height: '64px', borderRadius: '18px', backgroundColor: '#F2F9E5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Image size={28} style={{ color: '#8DC31E', opacity: 0.5 }} />
      </div>
      <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: '18px', color: '#1F2937' }}>Album introuvable</p>
      <Link to="/galerie" className="btn-green" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        <ArrowLeft size={16} /> Retour à la galerie
      </Link>
    </div>
  )

  const photos = (galerie.medias || []).filter(m => m.type === 'photo')
  const videos = (galerie.medias || []).filter(m => m.type === 'video')
  const slides = photos.map(m => ({ src: `${STORAGE}/${m.url}`, alt: m.legende || galerie.titre }))

  return (
    <>
      <Helmet>
        <title>{galerie.titre} — Galerie ETS MAREL</title>
        <meta name="description" content={galerie.description || `Album photos : ${galerie.titre}`} />
      </Helmet>

      <DetailHero galerie={galerie} photosCount={photos.length} videosCount={videos.length} />

      {/* Bouton retour */}
      <div className="wrap" style={{ paddingTop: '28px', paddingBottom: '0' }}>
        <Link
          to="/galerie"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            color: '#2D6A1F', fontSize: '13.5px', fontWeight: 600,
            textDecoration: 'none', padding: '8px 0',
          }}
        >
          <ArrowLeft size={15} />
          Retour à la galerie
        </Link>
      </div>

      {/* Photos */}
      {photos.length > 0 && (
        <PhotosSection photos={photos} onOpen={(i) => setLightboxIndex(i)} />
      )}

      {/* Vidéos */}
      {videos.length > 0 && (
        <VideosSection videos={videos} />
      )}

      {/* Vide */}
      {galerie.medias?.length === 0 && (
        <section className="section" style={{ backgroundColor: '#ffffff' }}>
          <div className="wrap" style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '18px', backgroundColor: '#F2F9E5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Image size={28} style={{ color: '#8DC31E', opacity: 0.5 }} />
            </div>
            <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, color: '#1F2937', fontSize: '16px', marginBottom: '6px' }}>Cet album est vide</p>
            <p style={{ color: '#9CA3AF', fontSize: '14px' }}>Les médias seront ajoutés prochainement.</p>
          </div>
        </section>
      )}

      {/* Navigation entre albums */}
      <section className="section-sm" style={{ backgroundColor: '#F9FAFB', borderTop: '1px solid #F3F4F6' }}>
        <div className="wrap" style={{ display: 'flex', justifyContent: 'center' }}>
          <Link to="/galerie" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <ArrowLeft size={15} />
            Voir tous les albums
          </Link>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
        on={{ view: ({ index }) => setLightboxIndex(index) }}
      />
    </>
  )
}