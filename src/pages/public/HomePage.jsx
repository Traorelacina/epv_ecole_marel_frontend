import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  ArrowRight, BookOpen, Users, Award, GraduationCap,
  Heart, Zap, ChevronRight, Star, Phone, MapPin, Clock, Mail,
} from 'lucide-react'
import { publicService } from '@services/publicService'
import { useInView } from '@hooks/useInView'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { FaFacebook } from 'react-icons/fa'

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

// Cercles menus
import imgCerclePresentation  from '../../assets/images/ImageCercle1MenuPresentation.jpeg'
import imgCercleFormation     from '../../assets/images/ImageCercle2MenuCycledeformation.jpeg'
import imgCercleInfoParents   from '../../assets/images/ImageCercle3MenuInfoParent.jpeg'
import imgCercleActivites     from '../../assets/images/ImageCercle4Activiteetevt.jpeg'
import imgCercleContacts      from '../../assets/images/ImageCercle5MenuNosContacts.jpeg'

const STORAGE = import.meta.env.VITE_STORAGE_URL || 'https://ideal-ilse-freelence-89b443a4.koyeb.app/'

/* ── KEYFRAMES ── */
const GLOBAL_STYLES = `
  @keyframes ticker         { 0%{transform:translateX(100%);} 100%{transform:translateX(-100%);} }
  @keyframes heroFadeUp     { from{opacity:0;transform:translateY(24px);} to{opacity:1;transform:translateY(0);} }
  @keyframes pulseGreen     { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:.5;transform:scale(1.35);} }
  @keyframes fadeIn         { from{opacity:0;} to{opacity:1;} }
  @keyframes slideIndicator { from{width:0;} to{width:100%;} }

  /* ── RESPONSIVE BASE ── */
  .hero-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0;
    align-items: flex-end;
  }
  .hero-content {
    padding: 48px 20px 40px;
  }
  .hero-title {
    font-family: 'Sora', sans-serif;
    font-weight: 800;
    font-size: clamp(2rem, 8vw, 4rem);
    color: #ffffff;
    line-height: 1.1;
    letter-spacing: -1px;
    margin-bottom: 8px;
  }
  .hero-subtitle {
    color: rgba(255,255,255,0.85);
    font-size: clamp(14px, 3.5vw, 17px);
    line-height: 1.8;
    margin-bottom: 32px;
    max-width: 520px;
  }
  .hero-stats {
    display: flex;
    gap: 24px;
    margin-top: 40px;
    flex-wrap: wrap;
  }
  .hero-btns {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  .contact-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  }
  .contact-bar-item {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    min-width: 160px;
  }
  .section-grid-2 {
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
    align-items: center;
  }
  .cycles-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
  }
  .articles-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
  }
  .localisation-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
    align-items: center;
  }
  .contact-info-grid {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  @media (min-width: 640px) {
    .articles-grid {
      grid-template-columns: 1fr 1fr;
    }
    .cycles-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  @media (min-width: 768px) {
    .hero-content {
      padding: 80px 40px 60px;
    }
    .contact-bar {
      flex-wrap: nowrap;
    }
  }
  @media (min-width: 1024px) {
    .section-grid-2 {
      grid-template-columns: 1fr 1.4fr;
      gap: 72px;
    }
    .articles-grid {
      grid-template-columns: repeat(3, 1fr);
    }
    .localisation-grid {
      grid-template-columns: 1fr 1fr;
      gap: 48px;
    }
  }
`

const SLIDES = [imgSlide1, imgSlide2, imgSlide3]



/* ── HERO SECTION — Slides grands et clairs ── */
function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [prevSlide, setPrevSlide] = useState(null)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevSlide(currentSlide)
      setCurrentSlide(prev => (prev + 1) % SLIDES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [currentSlide])

  const goTo = (idx) => {
    setPrevSlide(currentSlide)
    setCurrentSlide(idx)
  }

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
     
     

      <section style={{
        position: 'relative',
        minHeight: 'clamp(520px, 90vh, 900px)',
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
        backgroundColor: '#000',
      }}>
        {/* ── SLIDESHOW BACKGROUND — plein écran, images nettes ── */}
        {SLIDES.map((slide, idx) => (
          <div
            key={idx}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${slide})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
              transition: 'opacity 1.2s ease-in-out',
              opacity: idx === currentSlide ? 1 : 0,
              zIndex: 0,
            }}
          />
        ))}

        {/* ── OVERLAY MINIMAL — sombre en bas seulement pour lisibilité du texte ── */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.40) 40%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.05) 100%)',
        }} />

        {/* ── CONTENU HERO ── */}
        <div style={{ position: 'relative', zIndex: 10, width: '100%' }}>
          <div className="wrap">
            <div className="hero-content" style={{ maxWidth: '700px' }}>

              {/* Badge inscriptions */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '6px 16px', borderRadius: '50px',
                background: 'rgba(141,195,30,0.20)', border: '1px solid rgba(141,195,30,0.45)',
                marginBottom: '20px',
                opacity: loaded ? 1 : 0,
                animation: loaded ? 'heroFadeUp .6s ease 100ms both' : 'none',
              }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#8DC31E', animation: 'pulseGreen 2.5s ease-in-out infinite' }} />
                <span style={{ color: '#B5D95A', fontSize: '11.5px', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
                  Inscriptions ouvertes 2026 – 2027
                </span>
              </div>

              {/* Titre */}
              <h1 className="hero-title" style={{ opacity: loaded ? 1 : 0, animation: loaded ? 'heroFadeUp .7s ease 200ms both' : 'none' }}>
                L'excellence académique
              </h1>
              <h1 className="hero-title" style={{ color: '#8DC31E', marginBottom: '20px', opacity: loaded ? 1 : 0, animation: loaded ? 'heroFadeUp .7s ease 320ms both' : 'none' }}>
                depuis 2000
              </h1>

              {/* Sous-titre */}
              <p className="hero-subtitle" style={{ opacity: loaded ? 1 : 0, animation: loaded ? 'heroFadeUp .7s ease 460ms both' : 'none' }}>
                L'EPV MAREL forme les enfants de la Maternelle au CM2 avec passion et rigueur.{' '}
                <strong style={{ color: '#B5D95A' }}>100% de réussite au CEPE depuis 2012.</strong>
              </p>

              {/* Boutons */}
              <div className="hero-btns" style={{ opacity: loaded ? 1 : 0, animation: loaded ? 'heroFadeUp .7s ease 580ms both' : 'none' }}>
                <Link to="/contacts" className="btn-red" style={{ fontSize: '14px', padding: '13px 26px' }}>
                  Inscrire mon enfant <ArrowRight size={16} />
                </Link>
                <Link to="/presentation" className="btn-white" style={{ fontSize: '14px', padding: '13px 26px' }}>
                  Découvrir l'école
                </Link>
              </div>

              {/* Stats */}
              <div className="hero-stats" style={{ opacity: loaded ? 1 : 0, animation: loaded ? 'heroFadeUp .7s ease 720ms both' : 'none' }}>
                {[
                  { val: '25+',  label: "Ans d'expérience" },
                  { val: '100%', label: 'Réussite CEPE' },
                  { val: '500+', label: 'Élèves accompagnés' },
                ].map(s => (
                  <div key={s.label} style={{ borderLeft: '2px solid #8DC31E', paddingLeft: '14px' }}>
                    <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: 800, color: '#8DC31E', lineHeight: 1 }}>{s.val}</p>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', marginTop: '4px', fontWeight: 500 }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Indicateurs de slides */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '36px', marginBottom: '8px' }}>
                {SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goTo(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    style={{
                      width: idx === currentSlide ? '32px' : '10px',
                      height: '4px', borderRadius: '2px',
                      background: idx === currentSlide ? '#8DC31E' : 'rgba(255,255,255,0.4)',
                      border: 'none', cursor: 'pointer',
                      transition: 'all 0.35s ease', padding: 0,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Vague de bas */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 5 }}>
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 30C480 60 240 10 0 20L0 60Z" fill="#ffffff" />
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
        <div className="section-grid-2" ref={ref}>

          {/* Photo fondatrice */}
          <div className={inView ? 'anim-slide-l' : ''} style={{ position: 'relative' }}>
            <div style={{
              borderRadius: '20px', overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(45,106,31,0.18)',
              aspectRatio: '3/4', maxHeight: '480px',
            }}>
              <img
                src={imgCerclePresentation}
                alt="La Fondatrice — EPV MAREL"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => { e.target.src = logo }}
              />
            </div>
            <div style={{
              position: 'absolute', bottom: '-16px', right: '-12px',
              backgroundColor: '#8DC31E', borderRadius: '14px',
              padding: '14px 18px', boxShadow: '0 8px 32px rgba(141,195,30,0.4)',
              textAlign: 'center',
            }}>
              <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: '20px', color: '#fff', lineHeight: 1 }}>25+</p>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '10px', marginTop: '3px' }}>Années d'expérience</p>
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
              <p style={{ color: '#4B5563', fontSize: 'clamp(14px, 2.5vw, 16px)', lineHeight: 1.9, paddingLeft: '20px', fontStyle: 'italic', marginBottom: '20px' }}>
                « Depuis 2000, EPV MAREL a été fondée avec une conviction profonde : chaque enfant mérite
                une éducation d'excellence, bienveillante et complète. Notre engagement va au-delà des
                résultats scolaires — nous formons des êtres épanouis, confiants et prêts à affronter l'avenir. »
              </p>
              <p style={{ color: '#4B5563', fontSize: 'clamp(14px, 2.5vw, 16px)', lineHeight: 1.9, paddingLeft: '20px', marginBottom: '28px' }}>
                Avec 100% de réussite au CEPE depuis 2012 et des centaines d'élèves accompagnés,
                nous continuons chaque jour à honorer cette promesse faite aux familles qui nous font confiance.
              </p>
            </div>

            <div style={{ paddingLeft: '20px' }}>
              <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: '15px', color: '#1F2937' }}>La Fondatrice</p>
              <p style={{ color: '#8DC31E', fontSize: '13px', fontWeight: 600, marginTop: '4px' }}>EPV MAREL — Deux Plateaux, Abidjan</p>
            </div>

            <div style={{ marginTop: '32px' }}>
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
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 48px' }}>
          <span className="section-label">Nos cycles de formation</span>
          <h2 className={`section-title ${inView ? 'anim-fade-up' : ''}`}>Un parcours complet</h2>
          <h2 className={`section-title ${inView ? 'anim-fade-up d1' : ''}`} style={{ color: '#2D6A1F' }}>de la crèche au CM2</h2>
        </div>

        {/* Grille responsive 2 cols mobile, 4 cols desktop */}
        <div className="cycles-grid">
          {CYCLES.map((c, i) => (
            <div
              key={c.nom}
              className={inView ? `anim-fade-up d${i + 1}` : ''}
              style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4', cursor: 'pointer' }}
              onMouseEnter={e => {
                e.currentTarget.querySelector('.overlay').style.opacity = '1'
                e.currentTarget.querySelector('img').style.transform = 'scale(1.07)'
              }}
              onMouseLeave={e => {
                e.currentTarget.querySelector('.overlay').style.opacity = '0'
                e.currentTarget.querySelector('img').style.transform = 'scale(1)'
              }}
            >
              <img
                src={c.img}
                alt={c.nom}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', display: 'block' }}
                onError={e => { e.target.style.display = 'none' }}
              />
              {/* Bandeau titre toujours visible */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: `linear-gradient(to top, ${c.color}ee 0%, ${c.color}99 50%, transparent 100%)`,
                padding: 'clamp(24px, 5vw, 40px) clamp(12px, 3vw, 20px) clamp(12px, 3vw, 20px)',
              }}>
                <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 'clamp(13px, 2.5vw, 18px)', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{c.nom}</p>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 'clamp(10px, 2vw, 12px)', marginTop: '3px' }}>{c.age}</p>
              </div>
              {/* Overlay survol */}
              <div className="overlay" style={{
                position: 'absolute', inset: 0, opacity: 0, transition: 'opacity 0.3s ease',
                background: `linear-gradient(to top, ${c.color}f0 0%, ${c.color}cc 100%)`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px',
              }}>
                <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 'clamp(16px, 3vw, 20px)', color: '#fff', textAlign: 'center', marginBottom: '10px' }}>{c.nom}</p>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 'clamp(11px, 2vw, 13.5px)', textAlign: 'center', lineHeight: 1.7 }}>{c.desc}</p>
                <div style={{ marginTop: '16px', padding: '6px 16px', borderRadius: '50px', border: '2px solid rgba(255,255,255,0.6)', color: '#fff', fontSize: '11px', fontWeight: 700 }}>{c.age}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── ARTICLE CARD ── */
function ArticleCard({ article, delay, inView }) {
  const date = article.date_publication
    ? format(new Date(article.date_publication), 'd MMM yyyy', { locale: fr })
    : ''

  return (
    <Link to={`/actualites/${article.slug}`} className={`card ${inView ? `anim-fade-up d${delay}` : ''}`} style={{ display: 'block', height: '100%' }}>
      <div style={{ height: 'clamp(160px, 25vw, 200px)', overflow: 'hidden', backgroundColor: '#F2F9E5', position: 'relative' }}>
        {article.image
          ? <img src={`${STORAGE}/${article.image}`} alt={article.titre} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseEnter={e => e.target.style.transform = 'scale(1.06)'} onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><BookOpen size={40} style={{ color: '#8DC31E', opacity: 0.4 }} /></div>
        }
        {article.categorie && (
          <span style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: '#8DC31E', color: '#fff', padding: '3px 10px', borderRadius: '50px', fontSize: '10px', fontWeight: 700 }}>{article.categorie.nom}</span>
        )}
      </div>
      <div style={{ padding: '18px 18px 22px' }}>
        <p style={{ fontSize: '11px', color: '#9CA3AF', marginBottom: '7px', fontWeight: 500 }}>{date}</p>
        <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 'clamp(14px, 2.5vw, 16px)', color: '#1F2937', lineHeight: 1.4, marginBottom: '8px' }}>{article.titre}</h3>
        {article.extrait && <p style={{ color: '#9CA3AF', fontSize: '13px', lineHeight: 1.7, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{article.extrait}</p>}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '14px', color: '#2D6A1F', fontSize: '12px', fontWeight: 600 }}>Lire la suite <ArrowRight size={13} /></div>
      </div>
    </Link>
  )
}

/* ── ACTUALITES ── */
function ActualitesSection({ articles }) {
  const [ref, inView] = useInView()
  if (!articles?.length) return null
  return (
    <section className="section" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="wrap" ref={ref}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
          <div>
            <span className="section-label">Blog & Actualités</span>
            <h2 className={`section-title ${inView ? 'anim-fade-up' : ''}`}>Dernières nouvelles</h2>
            <span className="underline-green" />
          </div>
          <Link to="/actualites" className="btn-outline">Toutes les actualités <ArrowRight size={15} /></Link>
        </div>
        <div className="articles-grid">
          {articles.slice(0, 3).map((a, i) => <ArticleCard key={a.id} article={a} delay={i + 1} inView={inView} />)}
        </div>
      </div>
    </section>
  )
}

/* ── ACTIVITES ET EVENEMENTS ── */
function ActivitesSection({ articles }) {
  const [ref, inView] = useInView()
  const activites = articles?.filter(a =>
    a.categorie?.nom?.toLowerCase().includes('activit') ||
    a.categorie?.nom?.toLowerCase().includes('évènement') ||
    a.categorie?.nom?.toLowerCase().includes('evenement')
  ) || []
  const data = activites.length > 0 ? activites : articles?.slice(0, 3) || []
  if (!data?.length) return null

  return (
    <section className="section" style={{ backgroundColor: '#ffffff' }}>
      <div className="wrap" ref={ref}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
          <div>
            <span className="section-label">Vie scolaire</span>
            <h2 className={`section-title ${inView ? 'anim-fade-up' : ''}`}>Activités et Évènements</h2>
            <span className="underline-green" />
          </div>
          <Link to="/activites-evenements" className="btn-outline">Voir tout <ArrowRight size={15} /></Link>
        </div>
        <div className="articles-grid">
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
        <div className="localisation-grid">
          <div className={inView ? 'anim-slide-l' : ''}>
            <span className="section-label">Nous trouver</span>
            <h2 className="section-title" style={{ marginBottom: '28px' }}>Venez nous rendre visite</h2>
            <div className="contact-info-grid">
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
                    <p style={{ fontSize: '10px', fontWeight: 700, color: '#8DC31E', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>{item.label}</p>
                    <p style={{ color: '#374151', fontSize: 'clamp(13px, 2.5vw, 14.5px)', fontWeight: 500 }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/contacts" className="btn-green" style={{ marginTop: '28px', display: 'inline-flex' }}>
              Nous contacter <ArrowRight size={16} />
            </Link>
          </div>
          <div className={inView ? 'anim-slide-r d1' : ''}>
            <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 40px rgba(45,106,31,0.15)' }}>
              <iframe
                title="EPV MAREL Localisation"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972!2d-3.94!3d5.38!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMjInNDguMCJOIDPCsDU2JzI0LjAiVw!5e0!3m2!1sfr!2sci!4v1000000000"
                width="100%" height="280" style={{ border: 0, display: 'block' }}
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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