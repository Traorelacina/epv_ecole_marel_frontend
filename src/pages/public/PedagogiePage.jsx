// ── PedagogiePage ─────────────────────────────────────────────────────────────
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Monitor, Globe, Music, Drama, Scissors, Baby, Users, Calendar, CheckCircle, Clock, ChevronRight, Award, GraduationCap, Sparkles, Home, Feather } from 'lucide-react'
import { publicService } from '@services/publicService'
import { CTASection } from '@components/sections/AllSections'
import { useInView } from '@hooks/useInView'
import pedagogieImage from '../../assets/images/pedagogie_marel.jpeg'

/* ── Icône livre fallback ── */
function BookOpenIcon({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  )
}

// Tranches d'âge par niveau
const TRANCHE_AGES = [
  { niveau: 'Crèche', age: 'à partir de 6 mois', icon: Baby, color: '#8DC31E' },
  { niveau: 'Garderie', age: 'à partir de 18 mois', icon: Home, color: '#8DC31E' },
  { niveau: 'Petite section', age: 'à partir de 2 ans 6 mois révolu', icon: Users, color: '#2D6A1F' },
  { niveau: 'Moyenne section', age: 'à partir de 3 ans 6 mois révolu', icon: Users, color: '#2D6A1F' },
  { niveau: 'Grande section', age: 'à partir de 4 ans 6 mois révolu', icon: Users, color: '#2D6A1F' },
  { niveau: 'C.P.1', age: 'à partir de 5 ans 6 mois révolu', icon: GraduationCap, color: '#D4191A' },
]

// Cours obligatoires
const COURS_OBLIGATOIRES = [
  { nom: 'Informatique', detail: 'Du CP au CM2 — inclus dans la formation', color: '#D4191A', icon: Monitor },
  { nom: 'Anglais', detail: 'Du CP au CM2 — inclus dans la formation', color: '#D4191A', icon: Globe },
  { nom: 'Danse', detail: 'Activité culturelle', color: '#2D6A1F', icon: Music },
  { nom: 'Théâtre', detail: 'Activité culturelle', color: '#2D6A1F', icon: Drama },
  { nom: 'Couture', detail: 'Activité culturelle', color: '#8DC31E', icon: Scissors },
  { nom: 'Broderie', detail: 'Activité culturelle', color: '#8DC31E', icon: Feather },
  { nom: 'Puériculture', detail: 'Activité culturelle', color: '#8DC31E', icon: Baby },
]

// Prestations facultatives
const PRESTATIONS_FACULTATIVES = [
  { nom: 'Études surveillées', horaire: 'de 16h00 à 17h00', niveaux: 'de la Grande Section au CM2', icon: Clock, color: '#D4191A' }
]

/* ── Hero pédagogie avec image à droite ── */
function PedagogieHero() {
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
              <span style={{ color: '#8DC31E', fontSize: '13px', fontWeight: 600 }}>Pédagogie</span>
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
                Offre pédagogique
              </span>
            </div>

            <h1 style={{ ...fadeUp(220), fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(2.4rem,5vw,3.8rem)', color: '#fff', lineHeight: 1.1, marginBottom: '10px', letterSpacing: '-1px' }}>
              Un parcours
            </h1>
            <h1 style={{ ...fadeUp(340), fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(2.4rem,5vw,3.8rem)', color: '#8DC31E', lineHeight: 1.1, marginBottom: '10px', letterSpacing: '-1px' }}>
              complet & enrichi
            </h1>
            <h1 style={{ ...fadeUp(460), fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(2.4rem,5vw,3.8rem)', color: '#fff', lineHeight: 1.1, marginBottom: '28px', letterSpacing: '-1px' }}>
              pour chaque âge
            </h1>

            <p style={{ ...fadeUp(580), color: 'rgba(255,255,255,0.75)', fontSize: '17px', maxWidth: '500px', lineHeight: 1.8, marginBottom: '40px' }}>
              De la crèche au CM2 avec informatique et anglais inclus dès le CP.
              Un encadrement bienveillant pour chaque étape de la scolarité.
            </p>

            {/* CTA */}
            <div style={{ ...fadeUp(700), display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              <Link to="/contact" className="btn-red" style={{ fontSize: '15px', padding: '14px 28px' }}>
                Inscrire mon enfant <ArrowRight size={17} />
              </Link>
              <Link to="/ecole" className="btn-white" style={{ fontSize: '15px', padding: '14px 28px' }}>
                Découvrir l'école
              </Link>
            </div>

            {/* Mini stats */}
            <div style={{ ...fadeUp(820), display: 'flex', gap: '32px', marginTop: '52px', flexWrap: 'wrap' }}>
              {[
                { val: '9', label: 'Niveaux scolaires' },
                { val: '100%', label: 'Réussite CEPE' },
                { val: '7+', label: 'Activités culturelles' },
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

          {/* Image à droite avec design spécifique pédagogie */}
          <div
            className="hidden lg:flex"
            style={{
              justifyContent: 'center', alignItems: 'center', position: 'relative',
              opacity: loaded ? 1 : 0,
              animation: loaded ? 'scaleIn .9s cubic-bezier(.22,.68,0,1.2) 300ms both' : 'none',
            }}
          >
            {/* Anneau externe avec livres */}
            <div style={{
              position: 'absolute',
              width: '480px', height: '480px', borderRadius: '50%',
              border: '2px dotted rgba(141,195,30,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }} className="ring-spin-cw">
              {/* Éléments décoratifs autour */}
              <div style={{ position: 'absolute', top: '-15px', right: '30%', background: '#fff', borderRadius: '50%', padding: '8px' }}>
                <BookOpen size={14} style={{ color: '#8DC31E' }} />
              </div>
              <div style={{ position: 'absolute', bottom: '-10px', left: '20%', background: '#fff', borderRadius: '50%', padding: '8px' }}>
                <Award size={14} style={{ color: '#8DC31E' }} />
              </div>
            </div>

            {/* Anneau moyen rotatif */}
            <div style={{
              position: 'absolute',
              width: '400px', height: '400px', borderRadius: '50%',
              border: '1px solid rgba(141,195,30,0.25)',
            }} className="ring-spin-ccw" />

            {/* Cercle fond principal avec effet de livre ouvert */}
            <div style={{
              width: '380px', height: '380px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(141,195,30,0.15) 0%, rgba(141,195,30,0.05) 100%)',
              border: '2px solid rgba(141,195,30,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}>
              {/* Anneau intérieur avec effet de rotation */}
              <div style={{
                position: 'absolute',
                width: '300px', height: '300px', borderRadius: '50%',
                border: '2px solid transparent',
                borderTopColor: '#8DC31E',
                borderBottomColor: '#2D6A1F',
                opacity: 0.6,
              }} className="ring-spin-cw" />

              {/* Image principale avec effet de cadre livre */}
              <div style={{
                width: '260px', height: '260px', borderRadius: '30px',
                overflow: 'hidden', border: '4px solid #8DC31E',
                position: 'relative', zIndex: 2,
                boxShadow: '0 0 0 12px rgba(141,195,30,0.1), 0 20px 40px rgba(0,0,0,0.3)',
                transform: 'rotate(3deg)',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'rotate(0deg) scale(1.02)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'rotate(3deg)'}>
                <img src={pedagogieImage} alt="Pédagogie ETS MAREL" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Badge flottant "Programme enrichi" */}
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
                <Sparkles size={18} style={{ color: '#fff' }} />
                <div>
                  <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '13px', color: '#fff', lineHeight: 1 }}>Anglais & Info</p>
                  <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.8)', marginTop: '2px' }}>Dès le CP inclus</p>
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
                <GraduationCap size={16} style={{ color: '#8DC31E' }} />
                <div>
                  <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '12px', color: '#fff', lineHeight: 1 }}>100% réussite</p>
                  <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>Au CEPE depuis 2012</p>
                </div>
              </div>

              {/* Petite décoration livre en bas */}
              <div style={{
                position: 'absolute', bottom: '30px', right: '20px',
                background: 'rgba(255,255,255,0.95)',
                borderRadius: '12px', padding: '6px 12px',
                display: 'flex', alignItems: 'center', gap: '6px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}>
                <BookOpen size={12} style={{ color: '#2D6A1F' }} />
                <span style={{ fontSize: '10px', fontWeight: 600, color: '#2D6A1F' }}>Programme officiel</span>
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
  )
}

/* ── Section Tranches d'âge ── */
function TranchesAgeSection() {
  const [ref, inView] = useInView()

  return (
    <section className="section" style={{ backgroundColor: '#ffffff' }}>
      <div className="wrap" ref={ref}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 52px' }}>
          <span className="section-label">Tranches d'âge</span>
          <h2 className={`section-title ${inView ? 'anim-fade-up' : ''}`}>Des apprentissages</h2>
          <h2 className={`section-title ${inView ? 'anim-fade-up d1' : ''}`} style={{ color: '#2D6A1F' }}>adaptés à chaque âge</h2>
          <span className="underline-green" />
          <p className={inView ? 'anim-fade-up d2' : ''} style={{ color: '#6B7280', marginTop: '16px', fontSize: '15.5px' }}>
            Un parcours évolutif qui respecte le rythme de développement de chaque enfant.
          </p>
        </div>

        {/* Grille des tranches d'âge */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '20px' }}>
          {TRANCHE_AGES.map((t, i) => {
            const Icon = t.icon
            return (
              <div
                key={i}
                className={`card-flat ${inView ? `anim-fade-up d${i + 1}` : ''}`}
                style={{
                  padding: '24px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{
                  width: '70px', height: '70px', borderRadius: '20px',
                  backgroundColor: t.color + '18',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 18px',
                }}>
                  <Icon size={32} style={{ color: t.color }} />
                </div>
                <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '18px', color: '#1F2937', marginBottom: '8px' }}>
                  {t.niveau}
                </h3>
                <div style={{
                  display: 'inline-block',
                  padding: '5px 14px',
                  borderRadius: '50px',
                  backgroundColor: t.color + '12',
                  color: t.color,
                  fontSize: '13px',
                  fontWeight: 700,
                }}>
                  {t.age}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ── Section Cours obligatoires ── */
function CoursObligatoiresSection() {
  const [ref, inView] = useInView()

  return (
    <section className="section" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="wrap" ref={ref}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 52px' }}>
          <span className="section-label">Programme scolaire</span>
          <h2 className={`section-title ${inView ? 'anim-fade-up' : ''}`}>Cours obligatoires</h2>
          <h2 className={`section-title ${inView ? 'anim-fade-up d1' : ''}`} style={{ color: '#2D6A1F' }}>inclus dans la formation</h2>
          <span className="underline-green" />
          <p className={inView ? 'anim-fade-up d2' : ''} style={{ color: '#6B7280', marginTop: '16px', fontSize: '15.5px' }}>
            Une formation complète qui allie excellence académique et développement personnel.
          </p>
        </div>

        {/* Grille des cours obligatoires */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: '16px' }}>
          {COURS_OBLIGATOIRES.map((c, i) => {
            const Icon = c.icon
            return (
              <div
                key={i}
                className={`card-flat ${inView ? `anim-fade-up d${i + 1}` : ''}`}
                style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '18px 20px' }}
              >
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
                  backgroundColor: c.color + '18',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={20} style={{ color: c.color }} />
                </div>
                <div>
                  <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, color: '#1F2937', fontSize: '14.5px' }}>{c.nom}</p>
                  <p style={{ color: '#9CA3AF', fontSize: '12px', marginTop: '3px' }}>{c.detail}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Badge informatif */}
        <div className={inView ? 'anim-fade-up d5' : ''} style={{
          marginTop: '32px',
          padding: '20px 24px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #F2F9E5, #E8F5E0)',
          border: '1px solid rgba(45,106,31,0.2)',
          textAlign: 'center',
        }}>
          <CheckCircle size={24} style={{ color: '#2D6A1F', margin: '0 auto 12px' }} />
          <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, color: '#2D6A1F', fontSize: '14px', marginBottom: '6px' }}>
            Tous les cours obligatoires sont inclus dans les frais de scolarité
          </p>
          <p style={{ color: '#4B5563', fontSize: '13.5px' }}>
            Aucun supplément pour l'informatique, l'anglais ou les activités culturelles
          </p>
        </div>
      </div>
    </section>
  )
}

/* ── Section Prestations facultatives ── */
function PrestationsFacultativesSection() {
  const [ref, inView] = useInView()

  return (
    <section className="section" style={{ backgroundColor: '#ffffff' }}>
      <div className="wrap" ref={ref}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 52px' }}>
          <span className="section-label">Services complémentaires</span>
          <h2 className={`section-title ${inView ? 'anim-fade-up' : ''}`}>Prestations</h2>
          <h2 className={`section-title ${inView ? 'anim-fade-up d1' : ''}`} style={{ color: '#D4191A' }}>facultatives</h2>
          <span className="underline-red" />
          <p className={inView ? 'anim-fade-up d2' : ''} style={{ color: '#6B7280', marginTop: '16px', fontSize: '15.5px' }}>
            Des services optionnels pour un accompagnement personnalisé.
          </p>
        </div>

        {/* Cartes des prestations facultatives */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '24px' }}>
          {PRESTATIONS_FACULTATIVES.map((p, i) => {
            const Icon = p.icon
            return (
              <div
                key={i}
                className={`card ${inView ? `anim-fade-up d${i + 1}` : ''}`}
                style={{
                  padding: '32px',
                  textAlign: 'center',
                  borderTop: `4px solid ${p.color}`,
                }}
              >
                <div style={{
                  width: '60px', height: '60px', borderRadius: '16px',
                  backgroundColor: p.color + '18',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                }}>
                  <Icon size={28} style={{ color: p.color }} />
                </div>
                <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '18px', color: '#1F2937', marginBottom: '12px' }}>
                  {p.nom}
                </h3>
                <div style={{ marginBottom: '16px' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    borderRadius: '50px',
                    backgroundColor: p.color + '12',
                    color: p.color,
                    fontSize: '13px',
                    fontWeight: 700,
                    marginBottom: '12px',
                  }}>
                    {p.horaire}
                  </span>
                </div>
                <p style={{ color: '#6B7280', fontSize: '14px', lineHeight: 1.6 }}>
                  Disponibles <strong>{p.niveaux}</strong>
                </p>
                <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #F3F4F6' }}>
                  <p style={{ color: '#D4191A', fontSize: '13px', fontWeight: 600 }}>
                    Sur inscription préalable
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Note importante */}
        <div className={inView ? 'anim-fade-up d3' : ''} style={{
          marginTop: '32px',
          padding: '16px 20px',
          borderRadius: '12px',
          backgroundColor: '#FFF5F5',
          border: '1px solid rgba(212,25,26,0.15)',
          textAlign: 'center',
        }}>
          <p style={{ color: '#D4191A', fontSize: '13px' }}>
            * Les prestations facultatives sont facturées en supplément des frais de scolarité
          </p>
        </div>
      </div>
    </section>
  )
}

/* ── Section Niveaux (avec données API) ── */
function NiveauxSection({ niveaux, loading }) {
  const [ref, inView] = useInView()
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (niveaux.length && !selected) setSelected(niveaux[0])
  }, [niveaux])

  if (loading) return (
    <section className="section" style={{ backgroundColor: '#fff', textAlign: 'center' }}>
      <div className="wrap">
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', padding: '60px 0' }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#8DC31E', animation: `pulseGreen 1.4s ease-in-out ${i * 0.2}s infinite` }} />
          ))}
        </div>
      </div>
    </section>
  )

  if (!niveaux.length) return null

  return (
    <section className="section" style={{ backgroundColor: '#ffffff' }}>
      <div className="wrap" ref={ref}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto 52px' }}>
          <span className="section-label">Niveaux scolaires</span>
          <h2 className={`section-title ${inView ? 'anim-fade-up' : ''}`}>Chaque étape</h2>
          <h2 className={`section-title ${inView ? 'anim-fade-up d1' : ''}`} style={{ color: '#2D6A1F' }}>compte</h2>
          <span className="underline-green" />
        </div>

        {/* Layout liste + détail */}
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '28px', alignItems: 'start' }} className="grid-cols-1 lg:grid">

          {/* Liste */}
          <div className={inView ? 'anim-slide-l' : ''} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {niveaux.map((n, i) => {
              const isActive = selected?.id === n.id
              return (
                <button
                  key={n.id}
                  onClick={() => setSelected(n)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '14px 16px', borderRadius: '14px', border: 'none',
                    cursor: 'pointer', textAlign: 'left', transition: 'all 0.25s',
                    backgroundColor: isActive ? '#2D6A1F' : '#F2F9E5',
                    boxShadow: isActive ? '0 4px 20px rgba(45,106,31,0.25)' : 'none',
                    transform: isActive ? 'translateX(4px)' : 'none',
                  }}
                >
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                    backgroundColor: isActive ? 'rgba(255,255,255,0.18)' : (n.couleur || '#8DC31E') + '22',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <BookOpenIcon size={18} color={isActive ? '#fff' : (n.couleur || '#2D6A1F')} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: '14px', color: isActive ? '#fff' : '#1F2937' }}>{n.nom}</p>
                    {n.age_min && <p style={{ fontSize: '11.5px', color: isActive ? 'rgba(255,255,255,0.65)' : '#9CA3AF', marginTop: '2px' }}>Dès {n.age_min}</p>}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Détail */}
          {selected && (
            <div className={`card ${inView ? 'anim-slide-r d1' : ''}`} style={{ padding: '32px' }}>
              {/* En-tête */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid #F3F4F6' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '16px',
                  backgroundColor: (selected.couleur || '#8DC31E') + '18',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <BookOpenIcon size={24} color={selected.couleur || '#2D6A1F'} />
                </div>
                <div>
                  <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '1.4rem', color: '#1F2937' }}>{selected.nom}</h2>
                  {selected.age_min && (
                    <span style={{
                      display: 'inline-block', marginTop: '6px',
                      padding: '3px 12px', borderRadius: '50px',
                      backgroundColor: (selected.couleur || '#8DC31E') + '18',
                      color: selected.couleur || '#2D6A1F',
                      fontSize: '11.5px', fontWeight: 700,
                    }}>Dès {selected.age_min}</span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p style={{ color: '#4B5563', lineHeight: 1.85, marginBottom: '24px', fontSize: '15px' }}>{selected.description}</p>

              {/* Programmes */}
              {selected.programmes && (
                <div style={{
                  background: '#F2F9E5', borderRadius: '14px', padding: '18px 20px',
                  marginBottom: '24px', borderLeft: '4px solid #8DC31E',
                }}>
                  <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, color: '#2D6A1F', fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
                    Programmes
                  </p>
                  <p style={{ color: '#374151', fontSize: '14px', lineHeight: 1.75 }}>{selected.programmes}</p>
                </div>
              )}

              {/* Frais */}
              {selected.frais_scolarite?.length > 0 && (
                <div>
                  <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, color: '#1F2937', marginBottom: '12px', fontSize: '15px' }}>Frais de scolarité</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {selected.frais_scolarite.map(f => (
                      <div key={f.id} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '12px 16px', borderRadius: '12px',
                        backgroundColor: '#F9FAFB', border: '1px solid #F3F4F6',
                      }}>
                        <span style={{ fontSize: '14px', color: '#374151' }}>{f.libelle}</span>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, color: '#2D6A1F', fontSize: '14.5px' }}>
                            {parseInt(f.montant).toLocaleString('fr-FR')} {f.devise}
                          </span>
                          <span style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 400, marginLeft: '5px' }}>/ {f.periodicite}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
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
export function PedagogiePage() {
  const [niveaux, setNiveaux] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    publicService.getNiveaux()
      .then(r => setNiveaux(r.data?.niveaux || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Helmet>
        <title>Pédagogie — ETS MAREL | Abidjan</title>
        <meta name="description" content="Découvrez l'offre pédagogique d'ETS MAREL : tranches d'âge, cours obligatoires (informatique, anglais, activités culturelles), prestations facultatives." />
      </Helmet>

      <style>{ANIMATION_STYLES}</style>
      <PedagogieHero />
      <TranchesAgeSection />
      <CoursObligatoiresSection />
      <PrestationsFacultativesSection />
      <NiveauxSection niveaux={niveaux} loading={loading} />
      <CTASection />
    </>
  )
}

export default PedagogiePage