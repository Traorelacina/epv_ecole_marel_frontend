import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  ArrowRight, BookOpen, Users, Award, GraduationCap,
  Heart, Zap, ChevronRight, Star, Phone, MapPin, Clock,
} from 'lucide-react'
import { publicService } from '@services/publicService'
import { useInView } from '@hooks/useInView'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

/* ── Images locales ── */
import logo          from '../../assets/images/logo_marel.jpeg'

// Cycles de formation
import imgCreche     from '../../assets/images/CycledeformationCRECHE.jpeg'
import imgGarderie   from '../../assets/images/CycledeformationGARDERIE.jpeg'
import imgMaternelle from '../../assets/images/CycledeformationMATERNELLE.jpeg'
import imgPrimaire   from '../../assets/images/CycledeformationPRIMAIRE.jpeg'

// Slides hero
import imgSlide1 from '../../assets/images/Slide1.jpeg'
import imgSlide2 from '../../assets/images/Slide2.jpeg'
import imgSlide3 from '../../assets/images/Slide3.jpeg'

// Cercles menus (utilisés dans les pages correspondantes, importés ici pour référence)
import imgCerclePresentation  from '../../assets/images/ImageCercle1MenuPresentation.jpeg'
import imgCercleFormation     from '../../assets/images/ImageCercle2MenuCycledeformation.jpeg'
import imgCercleInfoParents   from '../../assets/images/ImageCercle3MenuInfoParent.jpeg'
import imgCercleActivites     from '../../assets/images/ImageCercle4Activiteetevt.jpeg'
import imgCercleContacts      from '../../assets/images/ImageCercle5MenuNosContacts.jpeg'

const STORAGE = import.meta.env.VITE_STORAGE_URL || 'https://ideal-ilse-freelence-89b443a4.koyeb.app/'

/* ── KEYFRAMES ── */
const HERO_STYLES = `
  @keyframes spinSlow       { to { transform: rotate(360deg); } }
  @keyframes spinSlowRev    { to { transform: rotate(-360deg); } }
  @keyframes pulseGreen     { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:.5;transform:scale(1.35);} }
  @keyframes floatY         { 0%,100%{transform:translateY(0px);} 50%{transform:translateY(-10px);} }
  @keyframes floatYB        { 0%,100%{transform:translateY(0px);} 50%{transform:translateY(-14px);} }
  @keyframes glowRing       { 0%,100%{box-shadow:0 0 0 8px rgba(141,195,30,.12),0 20px 60px rgba(0,0,0,.4);} 50%{box-shadow:0 0 0 18px rgba(141,195,30,.22),0 20px 60px rgba(0,0,0,.4);} }
  @keyframes heroFadeUp     { from{opacity:0;transform:translateY(28px);} to{opacity:1;transform:translateY(0);} }
  @keyframes heroBadge      { from{opacity:0;transform:translateY(-14px) scale(.9);} to{opacity:1;transform:translateY(0) scale(1);} }
  @keyframes heroLine       { from{width:0;} to{width:100%;} }
  @keyframes scaleIn        { from{opacity:0;transform:scale(.85);} to{opacity:1;transform:scale(1);} }
  @keyframes fadeBlur       { from{opacity:0;filter:blur(6px);} to{opacity:1;filter:blur(0);} }
  @keyframes ticker         { 0%{transform:translateX(100%);} 100%{transform:translateX(-100%);} }
  @keyframes slideFade      { 0%{opacity:0;} 10%{opacity:1;} 85%{opacity:1;} 100%{opacity:0;} }
  .ring-spin-cw  { animation: spinSlow    20s linear infinite; transform-origin:center; }
  .ring-spin-ccw { animation: spinSlowRev 14s linear infinite; transform-origin:center; }
  .badge-float-a { animation: floatY  3.8s ease-in-out infinite; }
  .badge-float-b { animation: floatYB 4.6s ease-in-out infinite 0.8s; }
  .logo-glow     { animation: glowRing 3.5s ease-in-out infinite; }
`

const SLIDES = [imgSlide1, imgSlide2, imgSlide3]

/* ── FLASH INFO BAR ── */
function FlashInfoBar() {
  return (
    <div style={{
      backgroundColor: '#D4191A', overflow: 'hidden',
      borderBottom: '2px solid rgba(255,255,255,0.2)',
      position: 'relative',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', height: '36px' }}>
        {/* Label fixe */}
        <div style={{
          backgroundColor: '#a01010', padding: '0 16px', height: '100%',
          display: 'flex', alignItems: 'center', gap: '6px',
          flexShrink: 0, zIndex: 2,
        }}>
          <Zap size={12} style={{ color: '#FFD700' }} />
          <span style={{ color: '#FFD700', fontWeight: 800, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            Flash Info
          </span>
        </div>
        {/* Ticker */}
        <div style={{ overflow: 'hidden', flex: 1 }}>
          <p style={{
            color: '#ffffff', fontSize: '13px', fontWeight: 500, whiteSpace: 'nowrap',
            animation: 'ticker 30s linear infinite',
            display: 'inline-block', paddingLeft: '100%',
          }}>
            🎉 Les inscriptions et réinscriptions pour l'année académique 2026-2027 sont ouvertes ! Contactez-nous au +225 22 50 35 81 ou venez nous rendre visite aux Deux Plateaux, Cocody — Abidjan.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ── HERO SECTION avec slideshow ── */
function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % SLIDES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const txt = (delay, extra = {}) => ({
    opacity: loaded ? 1 : 0,
    animation: loaded ? `heroFadeUp .7s cubic-bezier(.22,.68,0,1.2) ${delay}ms both` : 'none',
    ...extra,
  })

  return (
    <>
      <style>{HERO_STYLES}</style>
      <FlashInfoBar />
      <section style={{
        position: 'relative', minHeight: '93vh',
        display: 'flex', alignItems: 'center', overflow: 'hidden',
      }}>
        {/* Slideshow background */}
        {SLIDES.map((slide, idx) => (
          <div
            key={idx}
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(${slide})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'opacity 1s ease-in-out',
              opacity: idx === currentSlide ? 1 : 0,
              zIndex: 0,
            }}
          />
        ))}
        {/* Overlay gradient */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(155deg,rgba(15,42,7,0.88) 0%,rgba(26,64,16,0.80) 30%,rgba(45,106,31,0.70) 65%,rgba(90,156,34,0.60) 85%,rgba(141,195,30,0.50) 100%)',
        }} />

        {/* Slide indicators */}
        <div style={{ position: 'absolute', bottom: '90px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 10 }}>
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              style={{
                width: idx === currentSlide ? '24px' : '8px',
                height: '8px', borderRadius: '4px',
                background: idx === currentSlide ? '#8DC31E' : 'rgba(255,255,255,0.5)',
                border: 'none', cursor: 'pointer',
                transition: 'all 0.3s ease', padding: 0,
              }}
            />
          ))}
        </div>

        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '500px', height: '500px', borderRadius: '50%', border: '1px solid rgba(141,195,30,0.15)', animation: 'spinSlow 32s linear infinite', zIndex: 2 }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(141,195,30,0.1) 0%, transparent 70%)', zIndex: 2 }} />

        <div className="wrap" style={{ position: 'relative', zIndex: 10, paddingTop: '48px', paddingBottom: '60px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }} className="grid-cols-1 lg:grid-cols-2">

            {/* Texte */}
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 18px', borderRadius: '50px',
                background: 'rgba(141,195,30,0.18)', border: '1px solid rgba(141,195,30,0.35)', marginBottom: '28px',
                ...txt(100),
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#8DC31E', animation: 'pulseGreen 2.5s ease-in-out infinite' }} />
                <span style={{ color: '#B5D95A', fontSize: '12.5px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Inscriptions ouvertes 2026 – 2027
                </span>
              </div>
              <h1 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(2.4rem,5vw,3.8rem)', color: '#ffffff', lineHeight: 1.1, marginBottom: '10px', letterSpacing: '-1px', ...txt(200) }}>L'excellence</h1>
              <h1 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(2.4rem,5vw,3.8rem)', color: '#8DC31E', lineHeight: 1.1, marginBottom: '10px', letterSpacing: '-1px', ...txt(340) }}>académique</h1>
              <h1 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(2.4rem,5vw,3.8rem)', color: '#ffffff', lineHeight: 1.1, marginBottom: '28px', letterSpacing: '-1px', ...txt(460) }}>depuis 2000</h1>

              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '17px', lineHeight: 1.8, maxWidth: '480px', marginBottom: '40px', ...txt(620, { animation: loaded ? 'fadeBlur .8s ease 620ms both' : 'none' }) }}>
                L'EPV MAREL forme les enfants de la Maternelle au CM2 avec passion et rigueur.{' '}
                <strong style={{ color: '#B5D95A' }}>100% de réussite au CEPE depuis 2012.</strong>
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', ...txt(780) }}>
                <Link to="/contacts" className="btn-red" style={{ fontSize: '15px', padding: '14px 28px' }}>
                  Inscrire mon enfant <ArrowRight size={17} />
                </Link>
                <Link to="/presentation" className="btn-white" style={{ fontSize: '15px', padding: '14px 28px' }}>
                  Découvrir l'école
                </Link>
              </div>

              {/* Stats — 3 seulement */}
              <div style={{ display: 'flex', gap: '32px', marginTop: '52px', flexWrap: 'wrap', ...txt(960) }}>
                {[
                  { val: '25+',  label: "Ans d'expérience" },
                  { val: '100%', label: 'Réussite CEPE' },
                  { val: '500+', label: 'Élèves accompagnés' },
                ].map((s, i) => (
                  <div key={s.label} style={{ opacity: loaded ? 1 : 0, animation: loaded ? `heroFadeUp .6s ease ${960 + i * 120}ms both` : 'none' }}>
                    <p style={{ fontFamily: "'Sora',sans-serif", fontSize: '28px', fontWeight: 800, color: '#8DC31E', lineHeight: 1 }}>{s.val}</p>
                    <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', marginTop: '4px', fontWeight: 500 }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Visuel avec logo */}
            <div className="hidden lg:flex" style={{ justifyContent: 'center', alignItems: 'center', position: 'relative', opacity: loaded ? 1 : 0, animation: loaded ? 'scaleIn .9s cubic-bezier(.22,.68,0,1.2) 300ms both' : 'none' }}>
              <div style={{ position: 'absolute', width: '460px', height: '460px', borderRadius: '50%', border: '1.5px dashed rgba(141,195,30,0.35)' }} className="ring-spin-cw" />
              <div style={{ position: 'absolute', width: '390px', height: '390px', borderRadius: '50%', border: '1px dotted rgba(141,195,30,0.25)' }} className="ring-spin-ccw" />
              <div style={{ width: '420px', height: '420px', borderRadius: '50%', background: 'rgba(141,195,30,0.10)', border: '1.5px solid rgba(141,195,30,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', width: '320px', height: '320px', borderRadius: '50%', border: '2px solid transparent', borderTopColor: '#8DC31E', borderRightColor: 'rgba(141,195,30,0.4)' }} className="ring-spin-cw" />
                <div className="logo-glow" style={{ width: '280px', height: '280px', borderRadius: '50%', overflow: 'hidden', border: '4px solid #8DC31E', position: 'relative', zIndex: 2 }}>
                  <img src={logo} alt="EPV MAREL" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="badge-float-a" style={{ position: 'absolute', top: '30px', right: '-10px', background: '#ffffff', borderRadius: '16px', padding: '12px 18px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 3 }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#F2F9E5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Award size={18} style={{ color: '#2D6A1F' }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '18px', color: '#2D6A1F', lineHeight: 1 }}>100%</p>
                    <p style={{ fontSize: '10px', color: '#9CA3AF', marginTop: '2px' }}>Taux réussite</p>
                  </div>
                </div>
                <div className="badge-float-b" style={{ position: 'absolute', bottom: '40px', left: '-20px', background: '#8DC31E', borderRadius: '16px', padding: '12px 18px', boxShadow: '0 8px 32px rgba(141,195,30,0.4)', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 3 }}>
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

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 5 }}>
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L1440 80L1440 30C1200 80 960 0 720 40C480 80 240 20 0 30L0 80Z" fill="#ffffff" />
          </svg>
        </div>
      </section>
    </>
  )
}

/* ── MOT DE LA FONDATRICE ── */
function MotFondatriceSection() {
  const [ref, inView] = useInView()

  return (
    <section className="section" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '72px', alignItems: 'center' }}
          className="grid-cols-1 lg:grid-cols-2" ref={ref}>

          {/* Photo fondatrice — cercle Menu Présentation */}
          <div className={inView ? 'anim-slide-l' : ''} style={{ position: 'relative' }}>
            <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(45,106,31,0.18)', aspectRatio: '3/4' }}>
              <img
                src={imgCerclePresentation}
                alt="La Fondatrice — EPV MAREL"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => { e.target.src = logo }}
              />
            </div>
            <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', backgroundColor: '#8DC31E', borderRadius: '16px', padding: '16px 20px', boxShadow: '0 8px 32px rgba(141,195,30,0.4)', textAlign: 'center' }}>
              <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '22px', color: '#fff', lineHeight: 1 }}>25+</p>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '11px', marginTop: '4px' }}>Années d'expérience</p>
            </div>
          </div>

          {/* Texte */}
          <div className={inView ? 'anim-slide-r d1' : ''}>
            <span className="section-label">Mot de la Fondatrice</span>
            <h2 className="section-title" style={{ marginBottom: '6px' }}>Un engagement pour</h2>
            <h2 className="section-title" style={{ color: '#2D6A1F', marginBottom: '24px' }}>l'avenir de vos enfants</h2>
            <span className="underline-green" />

            <div style={{ marginTop: '28px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: '-12px', width: '3px', height: '100%', backgroundColor: '#8DC31E', borderRadius: '2px' }} />
              <p style={{ color: '#4B5563', fontSize: '16px', lineHeight: 1.9, paddingLeft: '20px', fontStyle: 'italic', marginBottom: '20px' }}>
                « Depuis 2000, EPV MAREL a été fondée avec une conviction profonde : chaque enfant mérite
                une éducation d'excellence, bienveillante et complète. Notre engagement va au-delà des
                résultats scolaires — nous formons des êtres épanouis, confiants et prêts à affronter l'avenir. »
              </p>
              <p style={{ color: '#4B5563', fontSize: '16px', lineHeight: 1.9, paddingLeft: '20px', marginBottom: '28px' }}>
                Avec 100% de réussite au CEPE depuis 2012 et des centaines d'élèves accompagnés,
                nous continuons chaque jour à honorer cette promesse faite aux familles qui nous font confiance.
              </p>
            </div>

            <div style={{ paddingLeft: '20px' }}>
              <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '16px', color: '#1F2937' }}>La Fondatrice</p>
              <p style={{ color: '#8DC31E', fontSize: '13px', fontWeight: 600, marginTop: '4px' }}>EPV MAREL — Deux Plateaux, Abidjan</p>
            </div>

            <div style={{ marginTop: '36px' }}>
              <Link to="/presentation" className="btn-green">En savoir plus <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── CYCLES DE FORMATION ── */
const CYCLES = [
  { nom: 'Crèche',     age: '6 mois – 18 mois',  desc: 'Éveil sensoriel et motricité libre dans un cadre sécurisé.',      img: imgCreche,     color: '#D4191A' },
  { nom: 'Garderie',   age: '18 mois – 2 ans',   desc: 'Jeux éducatifs, socialisation et développement moteur.',          img: imgGarderie,   color: '#8DC31E' },
  { nom: 'Maternelle', age: '2 ans – 5 ans',     desc: 'Éveil artistique, langage oral et premiers apprentissages.',      img: imgMaternelle, color: '#2D6A1F' },
  { nom: 'Primaire',   age: '6 ans – 12 ans',    desc: 'Programme officiel enrichi : informatique et anglais inclus.',    img: imgPrimaire,   color: '#f59e0b' },
]

function CyclesFormationSection() {
  const [ref, inView] = useInView()

  return (
    <section className="section" style={{ backgroundColor: '#ffffff' }}>
      <div className="wrap" ref={ref}>
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 56px' }}>
          <span className="section-label">Nos cycles de formation</span>
          <h2 className={`section-title ${inView ? 'anim-fade-up' : ''}`}>Un parcours complet</h2>
          <h2 className={`section-title ${inView ? 'anim-fade-up d1' : ''}`} style={{ color: '#2D6A1F' }}>de la crèche au CM2</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0' }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {CYCLES.map((c, i) => (
            <div
              key={c.nom}
              className={inView ? `anim-fade-up d${i + 1}` : ''}
              style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4', cursor: 'pointer' }}
              onMouseEnter={e => {
                e.currentTarget.querySelector('.overlay').style.opacity = '1'
                e.currentTarget.querySelector('img').style.transform = 'scale(1.08)'
              }}
              onMouseLeave={e => {
                e.currentTarget.querySelector('.overlay').style.opacity = '0'
                e.currentTarget.querySelector('img').style.transform = 'scale(1)'
              }}
            >
              {/* Image réelle du cycle */}
              <img
                src={c.img}
                alt={c.nom}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', display: 'block' }}
                onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
              />
              {/* Fallback */}
              <div style={{ display: 'none', width: '100%', height: '100%', backgroundColor: c.color + '22', alignItems: 'center', justifyContent: 'center', position: 'absolute', inset: 0 }}>
                <BookOpen size={48} style={{ color: c.color, opacity: 0.4 }} />
              </div>
              {/* Bandeau titre en bas (toujours visible) */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: `linear-gradient(to top, ${c.color}ee 0%, ${c.color}99 50%, transparent 100%)`, padding: '40px 20px 20px' }}>
                <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '18px', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{c.nom}</p>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '12px', marginTop: '4px' }}>{c.age}</p>
              </div>
              {/* Overlay au survol */}
              <div className="overlay" style={{
                position: 'absolute', inset: 0, opacity: 0, transition: 'opacity 0.3s ease',
                background: `linear-gradient(to top, ${c.color}f0 0%, ${c.color}cc 100%)`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px',
              }}>
                <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '20px', color: '#fff', textAlign: 'center', marginBottom: '12px' }}>{c.nom}</p>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13.5px', textAlign: 'center', lineHeight: 1.7 }}>{c.desc}</p>
                <div style={{ marginTop: '20px', padding: '8px 20px', borderRadius: '50px', border: '2px solid rgba(255,255,255,0.6)', color: '#fff', fontSize: '12px', fontWeight: 700 }}>{c.age}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── ACTUALITES ── */
function ArticleCard({ article, delay, inView }) {
  const date = article.date_publication
    ? format(new Date(article.date_publication), 'd MMM yyyy', { locale: fr })
    : ''

  return (
    <Link to={`/actualites/${article.slug}`} className={`card ${inView ? `anim-fade-up d${delay}` : ''}`} style={{ display: 'block', height: '100%' }}>
      <div style={{ height: '200px', overflow: 'hidden', backgroundColor: '#F2F9E5', position: 'relative' }}>
        {article.image
          ? <img src={`${STORAGE}/${article.image}`} alt={article.titre} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseEnter={e => e.target.style.transform = 'scale(1.06)'} onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><BookOpen size={40} style={{ color: '#8DC31E', opacity: 0.4 }} /></div>
        }
        {article.categorie && (
          <span style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: '#8DC31E', color: '#fff', padding: '4px 12px', borderRadius: '50px', fontSize: '11px', fontWeight: 700 }}>{article.categorie.nom}</span>
        )}
      </div>
      <div style={{ padding: '22px 22px 26px' }}>
        <p style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '8px', fontWeight: 500 }}>{date}</p>
        <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: '16px', color: '#1F2937', lineHeight: 1.4, marginBottom: '10px' }}>{article.titre}</h3>
        {article.extrait && <p style={{ color: '#9CA3AF', fontSize: '13.5px', lineHeight: 1.7, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{article.extrait}</p>}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '18px', color: '#2D6A1F', fontSize: '13px', fontWeight: 600 }}>Lire la suite <ArrowRight size={14} /></div>
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }} className="grid grid-cols-1 md:grid-cols-3">
          {articles.slice(0, 3).map((a, i) => <ArticleCard key={a.id} article={a} delay={i + 1} inView={inView} />)}
        </div>
      </div>
    </section>
  )
}

/* ── ACTIVITES ET EVENEMENTS ── */
function ActivitesSection({ articles }) {
  const [ref, inView] = useInView()
  const activites = articles?.filter(a => a.categorie?.nom?.toLowerCase().includes('activit') || a.categorie?.nom?.toLowerCase().includes('évènement') || a.categorie?.nom?.toLowerCase().includes('evenement')) || []
  const data = activites.length > 0 ? activites : articles?.slice(0, 3) || []
  if (!data?.length) return null

  return (
    <section className="section" style={{ backgroundColor: '#ffffff' }}>
      <div className="wrap" ref={ref}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', marginBottom: '52px' }}>
          <div>
            <span className="section-label">Vie scolaire</span>
            <h2 className={`section-title ${inView ? 'anim-fade-up' : ''}`}>Activités et Évènements</h2>
            <span className="underline-green" />
          </div>
          <Link to="/activites-evenements" className="btn-outline">Voir tout <ArrowRight size={15} /></Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }} className="grid grid-cols-1 md:grid-cols-3">
          {data.slice(0, 3).map((a, i) => <ArticleCard key={a.id} article={a} delay={i + 1} inView={inView} />)}
        </div>
      </div>
    </section>
  )
}

/* ── LOCALISATION ── */
function LocalisationSection() {
  const [ref, inView] = useInView()
  return (
    <section className="section-sm" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="wrap" ref={ref}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }} className="grid-cols-1 lg:grid-cols-2">
          <div className={inView ? 'anim-slide-l' : ''}>
            <span className="section-label">Nous trouver</span>
            <h2 className="section-title" style={{ marginBottom: '24px' }}>Venez nous rendre visite</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {[
                { icon: MapPin, label: 'Adresse',   value: 'Deux Plateaux 8ème Tranche, Cocody — Abidjan' },
                { icon: Phone,  label: 'Téléphone', value: '+225 22 50 35 81 / +225 05 61 56 10' },
                { icon: Clock,  label: 'Horaires',  value: 'Lundi au Vendredi : 7h30 – 16h30' },
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
            <Link to="/contacts" className="btn-green" style={{ marginTop: '32px', display: 'inline-flex' }}>
              Nous contacter <ArrowRight size={16} />
            </Link>
          </div>
          <div className={inView ? 'anim-slide-r d1' : ''}>
            <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 8px 40px rgba(45,106,31,0.15)' }}>
              <iframe
                title="EPV MAREL Localisation"
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

/* ── PAGE ── */
export default function HomePage() {
  const [data, setData] = useState({ articles: [], niveaux: [] })

  useEffect(() => {
    Promise.all([
      publicService.getHomepageData().catch(() => ({ data: {} })),
      publicService.getNiveaux().catch(() => ({ data: { niveaux: [] } })),
    ]).then(([homeRes, niveauxRes]) => {
      setData({
        articles: homeRes.data?.articles || [],
        niveaux:  niveauxRes.data?.niveaux || [],
      })
    })
  }, [])

  return (
    <>
      <Helmet>
        <title>EPV MAREL — École Maternelle et Primaire | Abidjan Deux Plateaux</title>
        <meta name="description" content="École EPV MAREL : crèche, garderie, maternelle et primaire aux Deux Plateaux Abidjan. 100% de réussite au CEPE depuis 2012. Inscriptions ouvertes 2026-2027." />
      </Helmet>
      <HeroSection />
      <MotFondatriceSection />
      <CyclesFormationSection />
      <ActualitesSection articles={data.articles} />
      <ActivitesSection articles={data.articles} />
      <LocalisationSection />
    </>
  )
}