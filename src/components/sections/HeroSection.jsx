import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

function ArrowRight() {
  return (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  )
}
function ChevronDown() {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}
function StarIcon() {
  return (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

const SLIDES = [
  {
    title: "L'Excellence\nScolaire à Abidjan",
    sub: 'Maternelle & Primaire de qualité',
    text: "De la petite section au CM2, nous offrons un enseignement rigoureux, innovant et adapté à chaque enfant à Deux Plateaux.",
    cta: { label: 'Découvrir l\'école', to: '/ecole' },
    ctaSec: { label: 'Nous contacter', to: '/contact' },
  },
  {
    title: "100% de Réussite\nAux Examens",
    sub: 'Depuis notre fondation en 2000',
    text: "Informatique et Anglais inclus dès le CP. Une pédagogie moderne qui prépare vos enfants aux défis de demain.",
    cta: { label: 'Notre pédagogie', to: '/pedagogie' },
    ctaSec: { label: 'Voir les niveaux', to: '/pedagogie' },
  },
  {
    title: "Une École\nde Confiance",
    sub: 'Plus de 25 ans d\'expérience',
    text: "Un cadre sécurisé, une équipe dévouée et des valeurs solides pour l'épanouissement total de votre enfant.",
    cta: { label: 'Prendre contact', to: '/contact' },
    ctaSec: { label: 'Voir la galerie', to: '/galerie' },
  },
]

const STATS = [
  { val: '2000', label: 'Fondée en', suffix: '' },
  { val: '100', label: 'Réussite examens', suffix: '%' },
  { val: '25', label: "Ans d'expérience", suffix: '+' },
  { val: '11', label: 'Niveaux scolaires', suffix: '' },
]

// Compteur animé simple
function Counter({ target, suffix, inView }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const num   = parseInt(target)
    const step  = Math.ceil(num / 50)
    let current = 0
    const timer = setInterval(() => {
      current += step
      if (current >= num) { setCount(num); clearInterval(timer) }
      else setCount(current)
    }, 30)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span>{count}{suffix}</span>
}

export default function HeroSection() {
  const [current, setCurrent]   = useState(0)
  const [visible, setVisible]   = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef(null)
  const total    = SLIDES.length

  // Autoplay
  useEffect(() => {
    setVisible(true)
    const t = setInterval(() => {
      setVisible(false)
      setTimeout(() => { setCurrent(c => (c + 1) % total); setVisible(true) }, 400)
    }, 5500)
    return () => clearInterval(t)
  }, [])

  // IntersectionObserver pour stats
  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStatsVisible(true); obs.disconnect() }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const slide = SLIDES[current]

  return (
    <section style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>

      {/* ── Fond animé ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg,#1A2A0A 0%,#2D4A0F 30%,#5A8A0F 65%,#7CB518 100%)',
      }} />

      {/* Grille de points */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      {/* Cercles décoratifs */}
      <div style={{
        position: 'absolute', top: '-120px', right: '-120px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(211,47,47,0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-80px', left: '-80px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(158,214,58,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* ── Contenu ── */}
      <div className="wrap" style={{
        position: 'relative', zIndex: 2,
        paddingTop: '7rem', paddingBottom: '5rem',
        display: 'grid', gridTemplateColumns: '1fr auto',
        gap: '2rem', alignItems: 'center',
        minHeight: '100vh',
      }}>

        {/* Texte slide */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.55s cubic-bezier(0.22,1,0.36,1)',
          maxWidth: '680px',
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.4rem 1rem',
            background: 'rgba(211,47,47,0.2)',
            border: '1px solid rgba(211,47,47,0.35)',
            borderRadius: '999px',
            marginBottom: '1.5rem',
          }}>
            <span style={{ color: '#FF6B6B' }}><StarIcon /></span>
            <span style={{ color: '#FFCDD2', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {slide.sub}
            </span>
          </div>

          {/* Titre */}
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.15,
            marginBottom: '1.25rem',
            whiteSpace: 'pre-line',
          }}>
            {slide.title.split('\n').map((line, i) => (
              <span key={i}>
                {i === 1 ? (
                  <span style={{ color: '#9ED63A' }}>{line}</span>
                ) : line}
                {i < slide.title.split('\n').length - 1 && <br />}
              </span>
            ))}
          </h1>

          {/* Texte */}
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', lineHeight: 1.75, maxWidth: '540px', marginBottom: '2.5rem' }}>
            {slide.text}
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <Link to={slide.cta.to} className="btn-red" style={{ fontSize: '0.95rem', padding: '0.85rem 2rem' }}>
              {slide.cta.label}
              <ArrowRight />
            </Link>
            <Link to={slide.ctaSec.to} className="btn-white" style={{ fontSize: '0.95rem', padding: '0.85rem 2rem' }}>
              {slide.ctaSec.label}
            </Link>
          </div>
        </div>

        {/* Indicateurs slide (vertical) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }} className="hidden lg:flex">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setVisible(false); setTimeout(() => { setCurrent(i); setVisible(true) }, 300) }}
              style={{
                width: i === current ? '6px' : '5px',
                height: i === current ? '40px' : '12px',
                borderRadius: '3px',
                backgroundColor: i === current ? '#D32F2F' : 'rgba(255,255,255,0.35)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.35s ease',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Bande stats ── */}
      <div
        ref={statsRef}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(124,181,24,0.2)',
        }}
      >
        <div className="wrap" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          padding: '1.25rem 1.5rem',
          gap: '1rem',
        }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '0.5rem 0' }}>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                fontWeight: 700,
                color: '#9ED63A',
                lineHeight: 1,
                marginBottom: '0.25rem',
              }}>
                <Counter target={s.val} suffix={s.suffix} inView={statsVisible} />
              </p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', fontWeight: 500 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div style={{
        position: 'absolute', bottom: '120px', left: '50%', transform: 'translateX(-50%)',
        zIndex: 3,
        animation: 'float 2.5s ease-in-out infinite',
        color: 'rgba(255,255,255,0.4)',
      }}>
        <ChevronDown />
      </div>
    </section>
  )
}