import { useEffect, useState, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { CheckCircle, Award, Heart, Users, ArrowRight, Star, BookOpen, MapPin, Phone, Clock, GraduationCap, Trophy, Target, Sparkles, Calendar } from 'lucide-react'
import { publicService } from '@services/publicService'
import { useInView } from '@hooks/useInView'
import { useCounter } from '@hooks/useCounter'
import ecoleImage from '../../assets/images/ecole_marel.jpeg'

const STORAGE = import.meta.env.VITE_STORAGE_URL || 'http://localhost:8000/storage'

const VALEURS = [
  { icon: Award,   label: 'Excellence',    desc: '100% de réussite au CEPE depuis 2012. Un engagement constant envers la qualité.',    color: '#8DC31E' },
  { icon: Heart,   label: 'Bienveillance', desc: 'Un environnement chaleureux où chaque enfant se sent en sécurité et valorisé.',       color: '#D4191A' },
  { icon: BookOpen,label: 'Innovation',    desc: 'Informatique, anglais et activités culturelles inclus pour préparer l\'avenir.',      color: '#2D6A1F' },
  { icon: Users,   label: 'Communauté',    desc: 'Un dialogue constant parents-enseignants pour assurer le succès de chaque élève.',    color: '#f59e0b' },
]

const CHIFFRES_CLES = [
  { valeur: '25+', label: "Années d'excellence", icon: Trophy },
  { valeur: '100%', label: 'Réussite CEPE', icon: Target },
  { valeur: '500+', label: 'Élèves formés', icon: GraduationCap },
  { valeur: '6', label: 'Niveaux scolaires', icon: BookOpen },
]

function ValeurCard({ item, inView, idx }) {
  return (
    <div
      className={`card-flat ${inView ? `anim-fade-up d${idx}` : ''}`}
      style={{ padding: '32px 24px', textAlign: 'center', transition: 'all 0.3s ease', height: '100%' }}
    >
      <div style={{
        width: '56px', height: '56px', borderRadius: '16px',
        backgroundColor: item.color + '18',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 20px',
      }}>
        <item.icon size={24} style={{ color: item.color }} />
      </div>
      <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: '18px', color: '#1F2937', marginBottom: '10px' }}>
        {item.label}
      </h3>
      <p style={{ color: '#6B7280', fontSize: '14px', lineHeight: 1.75 }}>{item.desc}</p>
    </div>
  )
}

function ChiffreCard({ item, idx }) {
  const [count, setCount] = useState(0)
  const ran = useRef(false)
  const [ref, inView] = useInView(0.3)

  useEffect(() => {
    if (inView && !ran.current) {
      ran.current = true
      const val = parseInt(item.valeur)
      if (isNaN(val)) {
        setCount(item.valeur)
        return
      }
      let start = 0
      const duration = 1500
      const step = val / (duration / 16)
      const timer = setInterval(() => {
        start += step
        if (start >= val) {
          setCount(val)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)
      return () => clearInterval(timer)
    }
  }, [inView, item.valeur])

  return (
    <div
      ref={ref}
      className={inView ? `anim-scale-in d${idx}` : ''}
      style={{ textAlign: 'center', padding: '24px', backgroundColor: '#ffffff', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', transition: 'all 0.3s ease' }}
    >
      <div style={{
        width: '60px', height: '60px', borderRadius: '50%',
        backgroundColor: '#F2F9E5', display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 16px',
      }}>
        <item.icon size={26} style={{ color: '#2D6A1F' }} />
      </div>
      <p style={{ fontFamily: "'Sora',sans-serif", fontSize: '36px', fontWeight: 800, color: '#2D6A1F', lineHeight: 1 }}>
        {count}{item.valeur.includes('+') ? '+' : item.valeur.includes('%') ? '%' : ''}
      </p>
      <p style={{ color: '#6B7280', fontSize: '13px', marginTop: '8px', fontWeight: 500 }}>{item.label}</p>
    </div>
  )
}

export default function EcolePage() {
  const [equipe, setEquipe] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [ref1, iv1] = useInView()
  const [ref2, iv2] = useInView()
  const [ref3, iv3] = useInView()
  const [ref4, iv4] = useInView()

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    publicService.getEquipe().then(r => setEquipe(r.data?.equipe || [])).catch(() => {})
  }, [])

  return (
    <>
      <Helmet>
        <title>L'École — EPV MAREL | Une institution d'excellence à Abidjan</title>
        <meta name="description" content="Découvrez l'histoire, les valeurs et l'équipe pédagogique de l'EPV MAREL à Abidjan Deux Plateaux. Une école d'excellence depuis 2000." />
      </Helmet>

      {/* Hero Section avec texte à gauche et image à droite */}
      <section style={{
        position: 'relative', minHeight: '100vh',
        background: 'linear-gradient(155deg, #0f2a07 0%, #1a4010 30%, #2D6A1F 65%, #5a9c22 85%, #8DC31E 100%)',
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
                  Notre école
                </span>
              </div>

              {/* Titre principal */}
              <h1 style={{
                fontFamily: "'Sora',sans-serif", fontWeight: 800,
                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                color: '#ffffff', lineHeight: 1.1,
                marginBottom: '10px', letterSpacing: '-1px',
                opacity: loaded ? 1 : 0,
                animation: loaded ? 'heroFadeUp .7s cubic-bezier(.22,.68,0,1.2) 200ms both' : 'none',
              }}>
                EPV MAREL,
              </h1>
              <h1 style={{
                fontFamily: "'Sora',sans-serif", fontWeight: 800,
                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                color: '#8DC31E', lineHeight: 1.1,
                marginBottom: '10px', letterSpacing: '-1px',
                opacity: loaded ? 1 : 0,
                animation: loaded ? 'heroFadeUp .7s cubic-bezier(.22,.68,0,1.2) 340ms both' : 'none',
              }}>
                une institution
              </h1>
              <h1 style={{
                fontFamily: "'Sora',sans-serif", fontWeight: 800,
                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                color: '#ffffff', lineHeight: 1.1,
                marginBottom: '28px', letterSpacing: '-1px',
                opacity: loaded ? 1 : 0,
                animation: loaded ? 'heroFadeUp .7s cubic-bezier(.22,.68,0,1.2) 460ms both' : 'none',
              }}>
                d'excellence
              </h1>

              {/* Description */}
              <p style={{
                color: 'rgba(255,255,255,0.75)', fontSize: '17px',
                lineHeight: 1.8, maxWidth: '480px', marginBottom: '40px',
                opacity: loaded ? 1 : 0,
                animation: loaded ? 'fadeBlur .8s ease 620ms both' : 'none',
              }}>
                Fondée en 2000, EPV MAREL forme les enfants de la crèche au CM2 avec passion et rigueur,
                aux Deux Plateaux de Cocody Abidjan.
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
                <Link to="/pedagogie" className="btn-white" style={{ fontSize: '15px', padding: '14px 28px' }}>
                  Découvrir la pédagogie
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

            {/* Image à droite avec animation */}
            <div
              className="hidden lg:flex"
              style={{
                justifyContent: 'center', alignItems: 'center', position: 'relative',
                opacity: loaded ? 1 : 0,
                animation: loaded ? 'scaleIn .9s cubic-bezier(.22,.68,0,1.2) 300ms both' : 'none',
              }}
            >
              {/* Anneau externe rotatif */}
              <div style={{
                position: 'absolute',
                width: '460px', height: '460px', borderRadius: '50%',
                border: '1.5px dashed rgba(141,195,30,0.35)',
              }} className="ring-spin-cw" />

              {/* Anneau moyen rotatif */}
              <div style={{
                position: 'absolute',
                width: '390px', height: '390px', borderRadius: '50%',
                border: '1px dotted rgba(141,195,30,0.25)',
              }} className="ring-spin-ccw" />

              {/* Cercle fond principal */}
              <div style={{
                width: '420px', height: '420px', borderRadius: '50%',
                background: 'rgba(141,195,30,0.10)',
                border: '1.5px solid rgba(141,195,30,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}>
                {/* Anneau intérieur rotatif */}
                <div style={{
                  position: 'absolute',
                  width: '320px', height: '320px', borderRadius: '50%',
                  border: '2px solid transparent',
                  borderTopColor: '#8DC31E',
                  borderRightColor: 'rgba(141,195,30,0.4)',
                }} className="ring-spin-cw" />

                {/* Image principale */}
                <div className="logo-glow" style={{
                  width: '280px', height: '280px', borderRadius: '50%',
                  overflow: 'hidden', border: '4px solid #8DC31E',
                  position: 'relative', zIndex: 2,
                }}>
                  <img src={ecoleImage} alt="ETS MAREL" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                {/* Badge flottant 1 */}
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

                {/* Badge flottant 2 */}
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

      {/* Chiffres clés */}
      <section style={{ backgroundColor: '#ffffff', marginTop: '-40px', position: 'relative', zIndex: 3 }}>
        <div className="wrap">
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px',
            background: '#ffffff', borderRadius: '24px', padding: '30px',
            boxShadow: '0 20px 40px rgba(45,106,31,0.1)',
          }} className="grid grid-cols-2 md:grid-cols-4">
            {CHIFFRES_CLES.map((c, i) => <ChiffreCard key={c.label} item={c} idx={i + 1} />)}
          </div>
        </div>
      </section>

      {/* Histoire avec image à gauche et texte à droite */}
      <section className="section" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px', alignItems: 'center' }}
            className="grid-cols-1 lg:grid-cols-2" ref={ref1}>

            <div className={iv1 ? 'anim-slide-l' : ''}>
              <div style={{
                borderRadius: '28px', overflow: 'hidden',
                boxShadow: '0 25px 50px rgba(45,106,31,0.2)',
                aspectRatio: '4/3', position: 'relative',
              }}>
                <img 
                  src={ecoleImage} 
                  alt="ETS MAREL - Vue de l'école" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '100px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
                }} />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginTop: '24px' }}>
                {[
                  { v: '2000', l: 'Fondation' }, 
                  { v: '100%', l: 'Réussite CEPE' }, 
                  { v: '6 mois', l: "Dès l'âge de" }
                ].map((s, i) => (
                  <div key={s.l} style={{ textAlign: 'center', padding: '16px 10px', borderRadius: '16px', backgroundColor: '#fff', border: '1px solid #E5E7EB', transition: 'all 0.3s ease' }}>
                    <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '20px', color: '#2D6A1F' }}>{s.v}</p>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '4px', fontWeight: 500 }}>{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={iv1 ? 'anim-slide-r d1' : ''}>
              <span className="section-label">Notre histoire</span>
              <h2 className="section-title" style={{ marginBottom: '6px' }}>25 ans au service</h2>
              <h2 className="section-title" style={{ color: '#2D6A1F', marginBottom: '28px' }}>de vos enfants</h2>
              <span className="underline-green" />

              <p style={{ color: '#6B7280', fontSize: '16px', lineHeight: 1.85, marginTop: '28px', marginBottom: '22px' }}>
                L'EPV MAREL a été fondée en 2000 avec une mission claire : offrir aux enfants
                d'Abidjan un cadre éducatif d'excellence alliant rigueur académique et épanouissement personnel.
              </p>
              <p style={{ color: '#6B7280', fontSize: '16px', lineHeight: 1.85, marginBottom: '32px' }}>
                Située aux Deux Plateaux 8ème Tranche, notre établissement accueille les enfants
                dès 6 mois jusqu'au CM2. Depuis 2012, nous affichons un
                <strong style={{ color: '#2D6A1F' }}> taux de réussite de 100%</strong> au CEPE
                et à l'entrée en 6ème.
              </p>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px' }}>
                {['Encadrement personnalisé de qualité', 'Infrastructure moderne et sécurisée', 'Corps enseignant qualifié et passionné', 'Activités parascolaires enrichissantes'].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#F2F9E5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CheckCircle size={13} style={{ color: '#2D6A1F' }} />
                    </div>
                    <span style={{ color: '#374151', fontSize: '15px' }}>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/pedagogie" className="btn-green">
                Notre offre pédagogique <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="section" style={{ backgroundColor: '#ffffff' }}>
        <div className="wrap" ref={ref2}>
          <div style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto 56px' }}>
            <span className="section-label">Nos valeurs</span>
            <h2 className={`section-title ${iv2 ? 'anim-fade-up' : ''}`}>Ce qui nous distingue</h2>
            <p className={iv2 ? 'anim-fade-up d1' : ''} style={{ color: '#6B7280', fontSize: '16px', marginTop: '16px' }}>
              Quatre piliers fondamentaux qui guident notre action au quotidien.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '24px' }}>
            {VALEURS.map((v, i) => <ValeurCard key={v.label} item={v} inView={iv2} idx={i + 1} />)}
          </div>
        </div>
      </section>

      {/* Équipe pédagogique */}
      {equipe.length > 0 && (
        <section className="section" style={{ backgroundColor: '#F9FAFB' }}>
          <div className="wrap" ref={ref3}>
            <div style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto 52px' }}>
              <span className="section-label">Notre équipe</span>
              <h2 className={`section-title ${iv3 ? 'anim-fade-up' : ''}`}>Des enseignants passionnés</h2>
              <p className={iv3 ? 'anim-fade-up d1' : ''} style={{ color: '#6B7280', fontSize: '16px', marginTop: '16px' }}>
                Une équipe dévouée à la réussite et à l'épanouissement de chaque enfant.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '24px' }}>
              {equipe.map((m, i) => (
                <div key={m.id} className={`card-flat ${iv3 ? `anim-fade-up d${(i % 4) + 1}` : ''}`} style={{ padding: '24px 20px', textAlign: 'center', transition: 'all 0.3s ease' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#F2F9E5', margin: '0 auto 14px', border: '3px solid #8DC31E' }}>
                    {m.photo
                      ? <img src={`${STORAGE}/${m.photo}`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '28px', color: '#2D6A1F' }}>{m.prenom?.charAt(0)}{m.nom?.charAt(0)}</div>
                    }
                  </div>
                  <h4 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: '16px', color: '#1F2937' }}>{m.prenom} {m.nom}</h4>
                  <p style={{ color: '#8DC31E', fontSize: '12.5px', fontWeight: 600, marginTop: '4px' }}>{m.role}</p>
                  {m.classe && <p style={{ color: '#9CA3AF', fontSize: '12px', marginTop: '2px' }}>{m.classe}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section CTA */}
      <section className="section-sm" style={{ backgroundColor: '#ffffff' }}>
        <div className="wrap">
          <div style={{
            borderRadius: '28px',
            background: 'linear-gradient(135deg, #2D6A1F 0%, #1a4010 100%)',
            padding: 'clamp(40px, 6vw, 60px)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(141,195,30,0.1)' }} />
            <div style={{ position: 'absolute', bottom: '-30px', left: '-30px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(141,195,30,0.08)' }} />
            
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#ffffff', marginBottom: '16px' }}>
                Prêt à rejoindre la famille MAREL ?
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '16px', marginBottom: '32px', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
                Contactez-nous pour inscrire votre enfant ou obtenir plus d'informations sur notre établissement.
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn-white" style={{ fontSize: '15px', padding: '14px 32px' }}>
                  Demander une inscription <ArrowRight size={16} />
                </Link>
                <a href="tel:+22522503581" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255,255,255,0.15)',
                  color: '#fff',
                  padding: '14px 28px',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}>
                  <Phone size={16} />
                  +225 22 50 35 81
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Injection des styles d'animation */}
      <style>{`
        @keyframes spinSlow { to { transform: rotate(360deg); } }
        @keyframes spinSlowRev { to { transform: rotate(-360deg); } }
        @keyframes pulseGreen { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.5; transform:scale(1.35); } }
        @keyframes floatY { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-10px); } }
        @keyframes floatYB { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-14px); } }
        @keyframes glowRing { 0%,100% { box-shadow:0 0 0 8px rgba(141,195,30,.12),0 20px 60px rgba(0,0,0,.4); } 50% { box-shadow:0 0 0 18px rgba(141,195,30,.22),0 20px 60px rgba(0,0,0,.4); } }
        @keyframes heroFadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes heroBadge { from { opacity:0; transform:translateY(-14px) scale(.9); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes fadeBlur { from { opacity:0; filter:blur(6px); } to { opacity:1; filter:blur(0); } }
        @keyframes scaleIn { from { opacity:0; transform:scale(.85); } to { opacity:1; transform:scale(1); } }
        
        .ring-spin-cw { animation: spinSlow 20s linear infinite; transform-origin:center; }
        .ring-spin-ccw { animation: spinSlowRev 14s linear infinite; transform-origin:center; }
        .badge-float-a { animation: floatY 3.8s ease-in-out infinite; }
        .badge-float-b { animation: floatYB 4.6s ease-in-out infinite 0.8s; }
        .logo-glow { animation: glowRing 3.5s ease-in-out infinite; }
      `}</style>
    </>
  )
}