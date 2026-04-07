import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ArrowRight, Play, BookOpen, Users, Award, Clock, ChevronRight, Star, MapPin, Phone, CheckCircle, GraduationCap, Heart, Zap } from 'lucide-react'
import { publicService } from '@services/publicService'
import { useInView } from '@hooks/useInView'
import { useCounter } from '@hooks/useCounter'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import logo from '../../assets/images/image_marel.jpeg'

const STORAGE = import.meta.env.VITE_STORAGE_URL || 'http://localhost:8000/storage'

/* ────────────────────────────────────────────────────────
   KEYFRAMES GLOBAUX (injectés une seule fois)
   ──────────────────────────────────────────────────────── */
const HERO_STYLES = `
  @keyframes spinSlow       { to { transform: rotate(360deg); } }
  @keyframes spinSlowRev    { to { transform: rotate(-360deg); } }
  @keyframes pulseGreen     { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.5; transform:scale(1.35); } }
  @keyframes floatY         { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-10px); } }
  @keyframes floatYB        { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-14px); } }
  @keyframes glowRing       { 0%,100% { box-shadow:0 0 0 8px rgba(141,195,30,.12),0 20px 60px rgba(0,0,0,.4); } 50% { box-shadow:0 0 0 18px rgba(141,195,30,.22),0 20px 60px rgba(0,0,0,.4); } }

  /* Entrées texte hero */
  @keyframes heroFadeUp   { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
  @keyframes heroSlideR   { from { opacity:0; transform:translateX(40px); } to { opacity:1; transform:translateX(0); } }
  @keyframes heroBadge    { from { opacity:0; transform:translateY(-14px) scale(.9); } to { opacity:1; transform:translateY(0) scale(1); } }
  @keyframes heroLine     { from { width:0; } to { width:100%; } }
  @keyframes heroWords    { from { opacity:0; transform:translateY(16px) skewY(2deg); } to { opacity:1; transform:translateY(0) skewY(0); } }
  @keyframes scaleIn      { from { opacity:0; transform:scale(.85); } to { opacity:1; transform:scale(1); } }
  @keyframes fadeBlur     { from { opacity:0; filter:blur(6px); } to { opacity:1; filter:blur(0); } }

  /* Anneaux tournants */
  .ring-spin-cw  { animation: spinSlow    20s linear infinite; transform-origin:center; }
  .ring-spin-ccw { animation: spinSlowRev 14s linear infinite; transform-origin:center; }

  /* Badge flottant */
  .badge-float-a { animation: floatY  3.8s ease-in-out infinite; }
  .badge-float-b { animation: floatYB 4.6s ease-in-out infinite 0.8s; }

  /* Logo glow */
  .logo-glow { animation: glowRing 3.5s ease-in-out infinite; }
`

/* ────────────────────────────────────────────────────────
   HERO SECTION
   ──────────────────────────────────────────────────────── */
function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

  /* helper : anime un élément texte avec délai */
  const txt = (delay, extra = {}) => ({
    opacity: loaded ? 1 : 0,
    animation: loaded ? `heroFadeUp .7s cubic-bezier(.22,.68,0,1.2) ${delay}ms both` : 'none',
    ...extra,
  })

  return (
    <>
      {/* Injection des keyframes */}
      <style>{HERO_STYLES}</style>

      <section style={{
        position: 'relative', minHeight: '100vh',
        background: 'linear-gradient(155deg,#0f2a07 0%,#1a4010 30%,#2D6A1F 65%,#5a9c22 85%,#8DC31E 100%)',
        display: 'flex', alignItems: 'center', overflow: 'hidden',
      }}>
        {/* Pattern dots */}
        <div className="bg-dots" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />

        {/* Cercle décoratif fond haut-droite (grand) */}
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '500px', height: '500px', borderRadius: '50%',
          border: '1px solid rgba(141,195,30,0.15)',
          animation: 'spinSlow 32s linear infinite',
        }} />
        {/* Cercle décoratif bas-gauche */}
        <div style={{
          position: 'absolute', bottom: '-60px', left: '10%',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(141,195,30,0.1) 0%, transparent 70%)',
        }} />

        <div className="wrap" style={{ position: 'relative', zIndex: 10, paddingTop: '60px', paddingBottom: '60px' }}>
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}
            className="grid-cols-1 lg:grid-cols-2"
          >
            {/* ── COLONNE TEXTE ── */}
            <div>

              {/* Badge animé */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '8px 18px', borderRadius: '50px',
                background: 'rgba(141,195,30,0.18)',
                border: '1px solid rgba(141,195,30,0.35)',
                marginBottom: '28px',
                opacity: loaded ? 1 : 0,
                animation: loaded ? 'heroBadge .6s cubic-bezier(.22,.68,0,1.2) 100ms both' : 'none',
              }}>
                <span style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  backgroundColor: '#8DC31E',
                  animation: 'pulseGreen 2.5s ease-in-out infinite',
                }} />
                <span style={{ color: '#B5D95A', fontSize: '12.5px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Inscriptions ouvertes 2025 – 2026
                </span>
              </div>

              {/* H1 — ligne 1 */}
              <h1 style={{
                fontFamily: "'Sora',sans-serif", fontWeight: 800,
                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                color: '#ffffff', lineHeight: 1.1,
                marginBottom: '10px', letterSpacing: '-1px',
                ...txt(200),
              }}>
                L'excellence
              </h1>

              {/* H1 — ligne 2 (couleur accent) */}
              <h1 style={{
                fontFamily: "'Sora',sans-serif", fontWeight: 800,
                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                color: '#8DC31E', lineHeight: 1.1,
                marginBottom: '10px', letterSpacing: '-1px',
                ...txt(340),
              }}>
                académique
              </h1>

              {/* H1 — ligne 3 */}
              <h1 style={{
                fontFamily: "'Sora',sans-serif", fontWeight: 800,
                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                color: '#ffffff', lineHeight: 1.1,
                marginBottom: '28px', letterSpacing: '-1px',
                ...txt(460),
              }}>
                depuis 2000
              </h1>

              {/* Paragraphe — fadeBlur */}
              <p style={{
                color: 'rgba(255,255,255,0.75)', fontSize: '17px',
                lineHeight: 1.8, maxWidth: '480px', marginBottom: '40px',
                opacity: loaded ? 1 : 0,
                animation: loaded ? 'fadeBlur .8s ease 620ms both' : 'none',
              }}>
                ETS MAREL forme les enfants de la crèche au CM2 avec passion et rigueur,
                à Deux Plateaux Abidjan.{' '}
                <strong style={{ color: '#B5D95A' }}>100% de réussite au CEPE depuis 2012.</strong>
              </p>

              {/* CTA */}
              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: '14px',
                opacity: loaded ? 1 : 0,
                animation: loaded ? 'heroFadeUp .6s ease 780ms both' : 'none',
              }}>
                <Link to="/contact" className="btn-red" style={{ fontSize: '15px', padding: '14px 28px' }}>
                  Inscrire mon enfant <ArrowRight size={17} />
                </Link>
                <Link to="/ecole" className="btn-white" style={{ fontSize: '15px', padding: '14px 28px' }}>
                  Découvrir l'école
                </Link>
              </div>

              {/* Mini stats */}
              <div style={{
                display: 'flex', gap: '32px', marginTop: '52px', flexWrap: 'wrap',
                opacity: loaded ? 1 : 0,
                animation: loaded ? 'heroFadeUp .7s ease 960ms both' : 'none',
              }}>
                {[
                  { val: '25+',  label: "Ans d'expérience" },
                  { val: '100%', label: 'Réussite CEPE' },
                  { val: '6',    label: 'Niveaux scolaires' },
                ].map((s, i) => (
                  <div key={s.label} style={{
                    opacity: loaded ? 1 : 0,
                    animation: loaded ? `heroFadeUp .6s ease ${960 + i * 120}ms both` : 'none',
                  }}>
                    <p style={{ fontFamily: "'Sora',sans-serif", fontSize: '28px', fontWeight: 800, color: '#8DC31E', lineHeight: 1 }}>{s.val}</p>
                    <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', marginTop: '4px', fontWeight: 500 }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── COLONNE VISUEL (logo + anneaux rotatifs) ── */}
            <div
              className="hidden lg:flex"
              style={{
                justifyContent: 'center', alignItems: 'center', position: 'relative',
                opacity: loaded ? 1 : 0,
                animation: loaded ? 'scaleIn .9s cubic-bezier(.22,.68,0,1.2) 300ms both' : 'none',
              }}
            >
              {/* ── Anneau externe rotatif CW — tirets ── */}
              <div style={{
                position: 'absolute',
                width: '460px', height: '460px', borderRadius: '50%',
                border: '1.5px dashed rgba(141,195,30,0.35)',
              }} className="ring-spin-cw" />

              {/* ── Anneau moyen rotatif CCW — pointillés ── */}
              <div style={{
                position: 'absolute',
                width: '390px', height: '390px', borderRadius: '50%',
                border: '1px dotted rgba(141,195,30,0.25)',
              }} className="ring-spin-ccw" />

              {/* ── Cercle fond principal (statique) ── */}
              <div style={{
                width: '420px', height: '420px', borderRadius: '50%',
                background: 'rgba(141,195,30,0.10)',
                border: '1.5px solid rgba(141,195,30,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}>

                {/* ── Anneau intérieur rotatif CW — solide ── */}
                <div style={{
                  position: 'absolute',
                  width: '320px', height: '320px', borderRadius: '50%',
                  border: '2px solid transparent',
                  borderTopColor: '#8DC31E',
                  borderRightColor: 'rgba(141,195,30,0.4)',
                }} className="ring-spin-cw" />

                {/* ── Logo principal ── */}
                <div className="logo-glow" style={{
                  width: '280px', height: '280px', borderRadius: '50%',
                  overflow: 'hidden', border: '4px solid #8DC31E',
                  position: 'relative', zIndex: 2,
                }}>
                  <img src={logo} alt="ETS MAREL" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                {/* ── Badge flottant 1 ── */}
                <div
                  className="badge-float-a"
                  style={{
                    position: 'absolute', top: '30px', right: '-10px',
                    background: '#ffffff', borderRadius: '16px',
                    padding: '12px 18px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                    display: 'flex', alignItems: 'center', gap: '10px',
                    zIndex: 3,
                  }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#F2F9E5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Award size={18} style={{ color: '#2D6A1F' }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '18px', color: '#2D6A1F', lineHeight: 1 }}>100%</p>
                    <p style={{ fontSize: '10px', color: '#9CA3AF', marginTop: '2px' }}>Taux réussite</p>
                  </div>
                </div>

                {/* ── Badge flottant 2 ── */}
                <div
                  className="badge-float-b"
                  style={{
                    position: 'absolute', bottom: '40px', left: '-20px',
                    background: '#8DC31E', borderRadius: '16px',
                    padding: '12px 18px', boxShadow: '0 8px 32px rgba(141,195,30,0.4)',
                    display: 'flex', alignItems: 'center', gap: '10px',
                    zIndex: 3,
                  }}
                >
                  <GraduationCap size={18} style={{ color: '#ffffff' }} />
                  <div>
                    <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '14px', color: '#fff', lineHeight: 1 }}>Depuis 2000</p>
                    <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vague bas */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L1440 80L1440 30C1200 80 960 0 720 40C480 80 240 20 0 30L0 80Z" fill="#ffffff" />
          </svg>
        </div>
      </section>
    </>
  )
}

/* ────────────────────────────────────────────────────────
   STATS SECTION
   ──────────────────────────────────────────────────────── */
function StatItem({ end, suffix, label, icon: Icon, delay }) {
  const [ref, inView] = useInView(0.3)
  const [count, run]  = useCounter(end)
  const ran = useRef(false)

  useEffect(() => {
    if (inView && !ran.current) { ran.current = true; run() }
  }, [inView])

  return (
    <div
      ref={ref}
      className={inView ? `anim-fade-up d${delay}` : ''}
      style={{
        textAlign: 'center', padding: '32px 20px',
        borderRight: '1px solid rgba(141,195,30,0.15)',
      }}
    >
      <div style={{
        width: '52px', height: '52px', borderRadius: '14px',
        backgroundColor: '#F2F9E5', display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 16px',
      }}>
        <Icon size={22} style={{ color: '#2D6A1F' }} />
      </div>
      <p style={{ fontFamily: "'Sora',sans-serif", fontSize: '40px', fontWeight: 800, color: '#2D6A1F', lineHeight: 1 }}>
        {count}{suffix}
      </p>
      <p style={{ color: '#6B7280', fontSize: '13.5px', marginTop: '8px', fontWeight: 500 }}>{label}</p>
    </div>
  )
}

function StatsSection() {
  const stats = [
    { end: 25,  suffix: '+', label: "Années d'expérience", icon: Award,         delay: 1 },
    { end: 100, suffix: '%', label: 'Réussite au CEPE',    icon: GraduationCap, delay: 2 },
    { end: 6,   suffix: '',  label: 'Niveaux scolaires',   icon: BookOpen,      delay: 3 },
    { end: 500, suffix: '+', label: 'Élèves accompagnés',  icon: Users,         delay: 4 },
  ]

  return (
    <section style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #F3F4F6' }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }} className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map(s => <StatItem key={s.label} {...s} />)}
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────────────
   PRESENTATION SECTION
   ──────────────────────────────────────────────────────── */
function PresentationSection() {
  const [ref, inView] = useInView()

  return (
    <section className="section" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px', alignItems: 'center' }}
          className="grid-cols-1 lg:grid-cols-2" ref={ref}>

          {/* Visuel gauche */}
          <div className={inView ? 'anim-slide-l' : ''} style={{ position: 'relative' }}>
            <div style={{
              borderRadius: '24px', overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(45,106,31,0.18)',
              aspectRatio: '4/3', background: 'linear-gradient(135deg,#2D6A1F,#8DC31E)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <img src={logo} alt="ETS MAREL" style={{ width: '55%', height: '55%', objectFit: 'contain' }} />
            </div>
            <div style={{
              position: 'absolute', bottom: '-24px', right: '-24px',
              backgroundColor: '#ffffff', borderRadius: '20px', padding: '20px 24px',
              boxShadow: '0 12px 40px rgba(45,106,31,0.16)',
              display: 'flex', alignItems: 'center', gap: '16px',
            }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: '#D4191A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Heart size={22} style={{ color: '#fff' }} />
              </div>
              <div>
                <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: '15px', color: '#1F2937' }}>Bienveillance</p>
                <p style={{ color: '#9CA3AF', fontSize: '12px', marginTop: '2px' }}>Au cœur de notre pédagogie</p>
              </div>
            </div>
            <div style={{
              position: 'absolute', top: '-16px', left: '24px',
              backgroundColor: '#8DC31E', borderRadius: '12px', padding: '10px 18px',
              boxShadow: '0 4px 20px rgba(141,195,30,0.4)',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <CheckCircle size={16} style={{ color: '#fff' }} />
              <span style={{ color: '#fff', fontWeight: 700, fontSize: '13px' }}>Fondée en 2000</span>
            </div>
          </div>

          {/* Texte droite */}
          <div className={inView ? 'anim-slide-r d1' : ''}>
            <span className="section-label">Notre école</span>
            <h2 className="section-title" style={{ marginBottom: '6px' }}>Une éducation de</h2>
            <h2 className="section-title" style={{ color: '#2D6A1F', marginBottom: '24px' }}>qualité à Abidjan</h2>
            <span className="underline-green" />
            <p style={{ color: '#6B7280', fontSize: '16px', lineHeight: 1.85, marginTop: '28px', marginBottom: '28px' }}>
              Située aux Deux Plateaux 8ème Tranche à Cocody, ETS MAREL accueille les enfants
              des 6 mois jusqu'au CM2. Notre approche pédagogique alliant rigueur et bienveillance
              garantit l'épanouissement de chaque élève.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '40px' }}>
              {[
                'Informatique et Anglais inclus du CP au CM2',
                'Activités culturelles : Danse, Théâtre, Couture',
                'Études surveillées de 16h à 17h',
                'Encadrement personnalisé et suivi régulier',
              ].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#F2F9E5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                    <CheckCircle size={13} style={{ color: '#2D6A1F' }} />
                  </div>
                  <span style={{ color: '#374151', fontSize: '15px', lineHeight: 1.6 }}>{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/ecole" className="btn-green">En savoir plus <ArrowRight size={16} /></Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────────────
   NIVEAUX SECTION
   ──────────────────────────────────────────────────────── */
const NIVEAUX_DATA = [
  { nom: 'Crèche',      age: '6 mois – 18 mois', desc: 'Éveil sensoriel et motricité libre dans un cadre sécurisé.',      color: '#D4191A', icon: Heart },
  { nom: 'Garderie',    age: '18 mois – 2 ans',  desc: 'Jeux éducatifs, socialisation et développement moteur.',          color: '#8DC31E', icon: Users },
  { nom: 'Maternelle',  age: '2 ans – 5 ans',    desc: 'Éveil artistique, langage oral et premiers apprentissages.',      color: '#2D6A1F', icon: Star },
  { nom: 'Primaire',    age: '6 ans – 12 ans',   desc: 'Programme officiel enrichi : informatique et anglais inclus.',    color: '#f59e0b', icon: BookOpen },
  { nom: 'CP au CM2',   age: '6 ans – 12 ans',   desc: '100% de réussite au CEPE et entrée en 6ème depuis 2012.',        color: '#2D6A1F', icon: Award },
]

function NiveauxSection({ niveaux }) {
  const [ref, inView] = useInView()
  const data = niveaux?.length > 0 ? niveaux.slice(0, 5) : NIVEAUX_DATA

  return (
    <section className="section" style={{ backgroundColor: '#ffffff' }}>
      <div className="wrap" ref={ref}>
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 64px' }}>
          <span className="section-label">Nos niveaux</span>
          <h2 className={`section-title ${inView ? 'anim-fade-up' : ''}`}>Un parcours complet</h2>
          <h2 className={`section-title ${inView ? 'anim-fade-up d1' : ''}`} style={{ color: '#2D6A1F' }}>de la crèche au CM2</h2>
          <p className={inView ? 'anim-fade-up d2' : ''} style={{ color: '#6B7280', marginTop: '16px', fontSize: '16px' }}>
            Chaque enfant bénéficie d'un suivi personnalisé adapté à son âge et à ses besoins.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {data.map((n, i) => {
            const Icon = n.icon || BookOpen
            return (
              <div
                key={n.nom || n.slug}
                className={`card-flat ${inView ? `anim-fade-up d${i + 1}` : ''}`}
                style={{ padding: '28px 24px', cursor: 'default' }}
              >
                <div style={{
                  width: '48px', height: '48px', borderRadius: '14px',
                  backgroundColor: (n.color || '#8DC31E') + '18',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '18px',
                }}>
                  <Icon size={22} style={{ color: n.color || '#2D6A1F' }} />
                </div>
                <span style={{
                  display: 'inline-block', padding: '3px 10px', borderRadius: '50px',
                  backgroundColor: (n.color || '#8DC31E') + '15',
                  color: n.color || '#2D6A1F',
                  fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.04em',
                  textTransform: 'uppercase', marginBottom: '12px',
                }}>
                  {n.age_min ? `Dès ${n.age_min}` : n.age}
                </span>
                <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: '17px', color: '#1F2937', marginBottom: '10px' }}>
                  {n.nom}
                </h3>
                <p style={{ color: '#6B7280', fontSize: '13.5px', lineHeight: 1.7 }}>
                  {n.description || n.desc}
                </p>
              </div>
            )
          })}
        </div>
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link to="/pedagogie" className="btn-outline">Voir tous les niveaux <ChevronRight size={16} /></Link>
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────────────
   ACTUALITES SECTION
   ──────────────────────────────────────────────────────── */
function ArticleCard({ article, delay, inView }) {
  const date = article.date_publication
    ? format(new Date(article.date_publication), 'd MMM yyyy', { locale: fr })
    : ''

  return (
    <Link
      to={`/actualites/${article.slug}`}
      className={`card ${inView ? `anim-fade-up d${delay}` : ''}`}
      style={{ display: 'block', height: '100%' }}
    >
      <div style={{ height: '200px', overflow: 'hidden', backgroundColor: '#F2F9E5', position: 'relative' }}>
        {article.image ? (
          <img
            src={`${STORAGE}/${article.image}`}
            alt={article.titre}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
            onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookOpen size={40} style={{ color: '#8DC31E', opacity: 0.4 }} />
          </div>
        )}
        {article.categorie && (
          <span style={{
            position: 'absolute', top: '14px', left: '14px',
            backgroundColor: '#8DC31E', color: '#fff',
            padding: '4px 12px', borderRadius: '50px', fontSize: '11px', fontWeight: 700,
          }}>{article.categorie.nom}</span>
        )}
      </div>
      <div style={{ padding: '22px 22px 26px' }}>
        <p style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '8px', fontWeight: 500 }}>{date}</p>
        <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: '16px', color: '#1F2937', lineHeight: 1.4, marginBottom: '10px' }}>
          {article.titre}
        </h3>
        {article.extrait && (
          <p style={{ color: '#9CA3AF', fontSize: '13.5px', lineHeight: 1.7,
            overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {article.extrait}
          </p>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '18px', color: '#2D6A1F', fontSize: '13px', fontWeight: 600 }}>
          Lire la suite <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  )
}

function ActualitesSection({ articles }) {
  const [ref, inView] = useInView()
  if (!articles?.length) return null

  return (
    <section className="section" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="wrap" ref={ref}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', marginBottom: '52px' }}>
          <div>
            <span className="section-label">Blog & Actualités</span>
            <h2 className={`section-title ${inView ? 'anim-fade-up' : ''}`}>Dernières nouvelles</h2>
            <span className="underline-green" />
          </div>
          <Link to="/actualites" className="btn-outline">Toutes les actualités <ArrowRight size={15} /></Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="grid grid-cols-1 md:grid-cols-3">
          {articles.slice(0, 3).map((a, i) => (
            <ArticleCard key={a.id} article={a} delay={i + 1} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────────────
   TEMOIGNAGES SECTION
   ──────────────────────────────────────────────────────── */
const DEFAULT_TEMO = [
  { nom_parent: 'Marie Kouassi',     classe_enfant: 'CM1', note: 5, contenu: "L'ETS MAREL a transformé mon fils. Il est épanoui et ses résultats sont excellents. Une école que je recommande vivement à tous les parents d'Abidjan." },
  { nom_parent: 'Jean-Baptiste Atta', classe_enfant: 'CE2', note: 5, contenu: "Le suivi personnalisé de chaque enfant est remarquable. Les enseignants sont dédiés et l'environnement est très stimulant pour les petits." },
  { nom_parent: 'Fatou Diallo',       classe_enfant: 'CP2', note: 5, contenu: "Mon enfant adore aller à l'école depuis qu'il est à MAREL. Le cours d'anglais et d'informatique sont un vrai plus pour son avenir." },
]

function TemoignagesSection({ temoignages }) {
  const [ref, inView] = useInView()
  const data = temoignages?.length > 0 ? temoignages : DEFAULT_TEMO

  return (
    <section className="section" style={{
      background: 'linear-gradient(155deg, #0f2a07 0%, #1a4010 40%, #2D6A1F 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div className="bg-dots" style={{ position: 'absolute', inset: 0, opacity: 0.2 }} />
      <div className="wrap" ref={ref} style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto 56px' }}>
          <span style={{ color: '#8DC31E', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
            Témoignages
          </span>
          <h2 className={inView ? 'anim-fade-up' : ''} style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 800, color: '#ffffff' }}>
            Ce que disent nos familles
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '22px' }} className="grid grid-cols-1 md:grid-cols-3">
          {data.slice(0, 3).map((t, i) => (
            <div
              key={i}
              className={inView ? `anim-fade-up d${i + 1}` : ''}
              style={{
                background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)',
                border: '1px solid rgba(141,195,30,0.25)', borderRadius: '20px',
                padding: '30px', display: 'flex', flexDirection: 'column',
              }}
            >
              <div style={{ display: 'flex', gap: '4px', marginBottom: '18px' }}>
                {Array.from({ length: t.note || 5 }).map((_, j) => (
                  <Star key={j} size={15} style={{ color: '#8DC31E', fill: '#8DC31E' }} />
                ))}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '14.5px', lineHeight: 1.8, flex: 1, fontStyle: 'italic' }}>
                "{t.contenu}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#8DC31E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, color: '#fff', fontSize: '15px' }}>
                    {t.nom_parent?.charAt(0)}
                  </span>
                </div>
                <div>
                  <p style={{ color: '#ffffff', fontWeight: 700, fontSize: '14px' }}>{t.nom_parent}</p>
                  {t.classe_enfant && <p style={{ color: '#8DC31E', fontSize: '12px', marginTop: '2px' }}>Parent — {t.classe_enfant}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────────────
   CTA SECTION
   ──────────────────────────────────────────────────────── */
function CTASection() {
  const [ref, inView] = useInView()

  return (
    <section className="section-sm" style={{ backgroundColor: '#ffffff' }}>
      <div className="wrap" ref={ref}>
        <div
          className={inView ? 'anim-scale-in' : ''}
          style={{
            borderRadius: '28px', overflow: 'hidden', position: 'relative',
            background: 'linear-gradient(135deg, #D4191A 0%, #a01010 100%)',
            padding: 'clamp(40px, 6vw, 72px)',
          }}
        >
          <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
          <div style={{ position: 'absolute', bottom: '-40px', left: '10%', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '32px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <Zap size={20} style={{ color: '#F59E0B' }} />
                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Inscriptions ouvertes
                </span>
              </div>
              <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(1.6rem,4vw,2.4rem)', color: '#ffffff', lineHeight: 1.2, marginBottom: '12px' }}>
                Offrez le meilleur à<br />votre enfant
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '15px', maxWidth: '440px' }}>
                Rejoignez la famille ETS MAREL. Contactez-nous pour inscrire votre enfant et lui offrir un avenir brillant.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <Link to="/contact" className="btn-white" style={{ fontSize: '15px', padding: '15px 32px' }}>
                Inscrire mon enfant <ArrowRight size={16} />
              </Link>
              <a href="tel:+22522503581" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'rgba(255,255,255,0.85)', fontSize: '14px', fontWeight: 600, padding: '10px' }}>
                <Phone size={15} />
                +225 22 50 35 81
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────────────
   LOCALISATION SECTION
   ──────────────────────────────────────────────────────── */
function LocalisationSection() {
  const [ref, inView] = useInView()

  return (
    <section className="section-sm" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="wrap" ref={ref}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}
          className="grid-cols-1 lg:grid-cols-2">
          <div className={inView ? 'anim-slide-l' : ''}>
            <span className="section-label">Nous trouver</span>
            <h2 className="section-title" style={{ marginBottom: '24px' }}>Venez nous rendre visite</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {[
                { icon: MapPin, label: 'Adresse',    value: 'Deux Plateaux 8ème Tranche, Cocody — Abidjan' },
                { icon: Phone,  label: 'Téléphone',  value: '+225 22 50 35 81 / +225 05 61 56 10' },
                { icon: Clock,  label: 'Horaires',   value: 'Lundi au Vendredi : 7h30 – 16h30' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '11px', backgroundColor: '#F2F9E5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <item.icon size={18} style={{ color: '#2D6A1F' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: '#8DC31E', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>{item.label}</p>
                    <p style={{ color: '#374151', fontSize: '14.5px', fontWeight: 500 }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/contact" className="btn-green" style={{ marginTop: '32px', display: 'inline-flex' }}>
              Nous contacter <ArrowRight size={16} />
            </Link>
          </div>
          <div className={inView ? 'anim-slide-r d1' : ''}>
            <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 8px 40px rgba(45,106,31,0.15)' }}>
              <iframe
                title="ETS MAREL Localisation"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972!2d-3.94!3d5.38!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMjInNDguMCJOIDPCsDU2JzI0LjAiVw!5e0!3m2!1sfr!2sci!4v1000000000"
                width="100%" height="320" style={{ border: 0, display: 'block' }}
                allowFullScreen loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────────────
   PAGE PRINCIPALE
   ──────────────────────────────────────────────────────── */
export default function HomePage() {
  const [data, setData] = useState({ articles: [], chiffres: [], temoignages: [], niveaux: [] })

  useEffect(() => {
    Promise.all([
      publicService.getHomepageData().catch(() => ({ data: {} })),
      publicService.getNiveaux().catch(() => ({ data: { niveaux: [] } })),
    ]).then(([homeRes, niveauxRes]) => {
      setData({
        articles:    homeRes.data?.articles    || [],
        temoignages: homeRes.data?.temoignages || [],
        niveaux:     niveauxRes.data?.niveaux  || [],
      })
    })
  }, [])

  return (
    <>
      <Helmet>
        <title>ETS MAREL — École Maternelle et Primaire | Abidjan Deux Plateaux</title>
        <meta name="description" content="École ETS MAREL : crèche, garderie, maternelle et primaire aux Deux Plateaux Abidjan. 100% de réussite au CEPE depuis 2012. Inscriptions ouvertes." />
      </Helmet>

      <HeroSection />
      <StatsSection />
      <PresentationSection />
      <NiveauxSection niveaux={data.niveaux} />
      <ActualitesSection articles={data.articles} />
      <TemoignagesSection temoignages={data.temoignages} />
      <CTASection />
      <LocalisationSection />
    </>
  )
}