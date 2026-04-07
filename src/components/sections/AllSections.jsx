// ── NiveauxSection ───────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

function ArrowRight({ size = 16 }) {
  return (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  )
}
function BookIcon() {
  return (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  )
}
function StarFill() {
  return (
    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

function useInView(threshold = 0.15) {
  const [inView, setInView] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, inView]
}

const DEFAULT_NIVEAUX = [
  { nom: 'Petite Section', age_min: '2 ans 6 mois', couleur: '#7CB518', description: 'Éveil artistique, chants, premiers apprentissages du vivre ensemble.' },
  { nom: 'Moyenne Section', age_min: '3 ans 6 mois', couleur: '#9ED63A', description: 'Langage oral, pré-lecture et activités artistiques variées.' },
  { nom: 'Grande Section',  age_min: '4 ans 6 mois', couleur: '#5A8A0F', description: 'Pré-écriture, numération et préparation à l\'entrée au CP.' },
  { nom: 'CP — CM2',        age_min: '5 ans 6 mois', couleur: '#D32F2F', description: 'Programme officiel + Informatique + Anglais obligatoires.' },
]

export function NiveauxSection({ niveaux = [] }) {
  const [ref, inView] = useInView()
  const data = niveaux.length > 0 ? niveaux.slice(0, 4) : DEFAULT_NIVEAUX

  return (
    <section className="section" style={{ backgroundColor: '#F9FBEF' }}>
      <div className="wrap" ref={ref}>
        {/* Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1.5rem', marginBottom: '3rem' }}>
          <div>
            <div className="badge-green" style={{ marginBottom: '0.75rem' }}>Niveaux scolaires</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.8rem,3vw,2.5rem)', fontWeight: 700, color: '#1A2310' }}>
              Un cycle complet<br />
              <span style={{ color: '#7CB518' }}>de la maternelle au CM2</span>
            </h2>
            <div className="divider" />
          </div>
          <Link to="/pedagogie" className="btn-outline" style={{ alignSelf: 'flex-start' }}>
            Tous les niveaux <ArrowRight />
          </Link>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1.5rem' }}>
          {data.map((n, i) => (
            <Link
              key={i}
              to="/pedagogie"
              className="card"
              style={{
                display: 'block', textDecoration: 'none', padding: '1.75rem',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`,
                borderLeft: `4px solid ${n.couleur || '#7CB518'}`,
              }}
            >
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px', marginBottom: '1.1rem',
                backgroundColor: (n.couleur || '#7CB518') + '18',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: n.couleur || '#7CB518',
              }}>
                <BookIcon />
              </div>
              {n.age_min && (
                <span style={{
                  display: 'inline-block', padding: '0.2rem 0.7rem', borderRadius: '999px',
                  backgroundColor: (n.couleur || '#7CB518') + '15',
                  color: n.couleur || '#7CB518',
                  fontSize: '0.72rem', fontWeight: 700, marginBottom: '0.75rem',
                }}>
                  Dès {n.age_min}
                </span>
              )}
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.15rem', fontWeight: 700, color: '#1A2310', marginBottom: '0.6rem' }}>
                {n.nom}
              </h3>
              <p style={{ color: '#4A5A2A', fontSize: '0.875rem', lineHeight: 1.7 }}>{n.description}</p>
              <div style={{ marginTop: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: n.couleur || '#7CB518', fontSize: '0.82rem', fontWeight: 600 }}>
                En savoir plus <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── ChiffresSection ───────────────────────────────────────────────────────────
function Counter({ target, suffix, inView }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    const num = parseInt(target)
    const step = Math.ceil(num / 60)
    let c = 0
    const t = setInterval(() => { c += step; if (c >= num) { setCount(num); clearInterval(t) } else setCount(c) }, 25)
    return () => clearInterval(t)
  }, [inView])
  return <>{count}{suffix}</>
}

const STATS = [
  { val: '2000', suffix: '',  label: 'Fondée en',          sub: '25 ans d\'excellence' },
  { val: '100',  suffix: '%', label: 'Réussite aux examens', sub: 'Depuis la fondation' },
  { val: '11',   suffix: '',  label: 'Niveaux scolaires',   sub: 'Maternelle au CM2' },
  { val: '200',  suffix: '+', label: 'Élèves formés',       sub: 'Chaque année' },
]

export function ChiffresSection({ chiffres = [] }) {
  const [ref, inView] = useInView(0.2)
  const data = chiffres.length > 0 ? chiffres : STATS

  return (
    <section className="section" style={{ backgroundColor: '#1A2310', position: 'relative', overflow: 'hidden' }}>
      {/* Décor */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,181,24,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(211,47,47,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="wrap" ref={ref}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="badge-red" style={{ marginBottom: '1rem' }}>En chiffres</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.8rem,3vw,2.5rem)', fontWeight: 700, color: '#FFFFFF' }}>
            ETS MAREL en quelques <span style={{ color: '#9ED63A' }}>chiffres clés</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '2rem' }}>
          {data.map((s, i) => (
            <div key={i} style={{
              textAlign: 'center', padding: '2rem 1.5rem',
              borderRadius: '1.25rem',
              background: 'rgba(124,181,24,0.06)',
              border: '1px solid rgba(124,181,24,0.15)',
              opacity: inView ? 1 : 0,
              transform: inView ? 'scale(1)' : 'scale(0.9)',
              transition: `all 0.5s ease ${i * 0.12}s`,
            }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '16px', margin: '0 auto 1rem',
                background: i % 2 === 0 ? 'rgba(124,181,24,0.15)' : 'rgba(211,47,47,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: i % 2 === 0 ? '#9ED63A' : '#FF6B6B',
              }}>
                <StarFill />
              </div>
              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '2.4rem', fontWeight: 700, color: i % 2 === 0 ? '#9ED63A' : '#FF6B6B', lineHeight: 1 }}>
                <Counter target={s.val || s.valeur} suffix={s.suffix || s.suffixe || ''} inView={inView} />
              </p>
              <p style={{ color: '#FFFFFF', fontSize: '0.9rem', fontWeight: 600, margin: '0.4rem 0 0.2rem' }}>{s.label}</p>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem' }}>{s.sub || s.description || ''}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── ActualitesSection ─────────────────────────────────────────────────────────
import { Link as RouterLink } from 'react-router-dom'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const STORAGE = import.meta.env.VITE_STORAGE_URL || 'http://localhost:8000/storage'

function CalIcon() {
  return (
    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  )
}

export function ActualitesSection({ articles = [] }) {
  const [ref, inView] = useInView()
  if (!articles.length) return null
  const [featured, ...rest] = articles.slice(0, 4)

  return (
    <section className="section" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="wrap" ref={ref}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1.5rem', marginBottom: '3rem' }}>
          <div>
            <div className="badge-green" style={{ marginBottom: '0.75rem' }}>Actualités</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.8rem,3vw,2.5rem)', fontWeight: 700, color: '#1A2310' }}>
              Dernières nouvelles<br />
              <span style={{ color: '#7CB518' }}>de l'école</span>
            </h2>
            <div className="divider" />
          </div>
          <RouterLink to="/actualites" className="btn-outline" style={{ alignSelf: 'flex-start' }}>
            Toutes les actualités <ArrowRight />
          </RouterLink>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5rem' }}>
          {articles.slice(0, 3).map((a, i) => (
            <RouterLink key={a.id || i} to={`/actualites/${a.slug}`}
              className="card"
              style={{
                display: 'block', textDecoration: 'none',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(28px)',
                transition: `all 0.6s ease ${i * 0.12}s`,
              }}
            >
              {/* Image */}
              <div style={{ aspectRatio: '16/9', backgroundColor: '#EEF7D0', overflow: 'hidden', position: 'relative' }}>
                {a.image ? (
                  <img src={`${STORAGE}/${a.image}`} alt={a.titre}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                ) : (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="40" height="40" fill="none" stroke="#7CB518" strokeWidth="1.2" strokeOpacity="0.4" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
                    </svg>
                  </div>
                )}
                {a.categorie && (
                  <span style={{
                    position: 'absolute', top: '0.75rem', left: '0.75rem',
                    padding: '0.2rem 0.65rem', borderRadius: '999px',
                    backgroundColor: a.categorie.couleur || '#7CB518',
                    color: '#fff', fontSize: '0.7rem', fontWeight: 700,
                  }}>
                    {a.categorie.nom}
                  </span>
                )}
              </div>
              {/* Corps */}
              <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#8A9A6A', fontSize: '0.78rem', marginBottom: '0.6rem' }}>
                  <CalIcon />
                  {a.date_publication ? format(new Date(a.date_publication), 'd MMM yyyy', { locale: fr }) : ''}
                </div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.05rem', fontWeight: 700, color: '#1A2310', lineHeight: 1.35, marginBottom: '0.6rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {a.titre}
                </h3>
                {a.extrait && (
                  <p style={{ color: '#4A5A2A', fontSize: '0.85rem', lineHeight: 1.65, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {a.extrait}
                  </p>
                )}
                <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#D32F2F', fontSize: '0.82rem', fontWeight: 600 }}>
                  Lire l'article <ArrowRight size={13} />
                </div>
              </div>
            </RouterLink>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── TemoignagesSection ────────────────────────────────────────────────────────
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

function QuoteIcon() {
  return (
    <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24" style={{ opacity: 0.25 }}>
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  )
}

const DEFAULT_TEMOIGNAGES = [
  { nom_parent: 'Marie Kouamé',   nom_enfant: 'Lucas', classe_enfant: 'CM1', note: 5, contenu: "L'ETS MAREL a transformé mon fils. Il est épanoui, curieux et ses résultats sont excellents. Je recommande cette école à tous les parents." },
  { nom_parent: 'Jean-Baptiste A.', nom_enfant: 'Amina', classe_enfant: 'CE2', note: 5, contenu: "Le suivi personnalisé de chaque enfant est remarquable. Les enseignants sont dévoués et l'environnement est très stimulant." },
  { nom_parent: 'Fatou Diabaté',  nom_enfant: 'Koffi', classe_enfant: 'CP2', note: 5, contenu: "Mon enfant adore aller à l'école. Le cours d'anglais et d'informatique sont un vrai plus pour son avenir." },
  { nom_parent: 'Serge Nignan',   nom_enfant: 'Emma', classe_enfant: 'Grande Section', note: 5, contenu: "Excellente école avec une équipe pédagogique exceptionnelle. La transition vers le primaire s'est faite en toute sérénité." },
]

export function TemoignagesSection({ temoignages = [] }) {
  const data = temoignages.length > 0 ? temoignages : DEFAULT_TEMOIGNAGES

  return (
    <section className="section" style={{ backgroundColor: '#F9FBEF' }}>
      <div className="wrap">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="badge-green" style={{ marginBottom: '0.75rem' }}>Témoignages</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.8rem,3vw,2.5rem)', fontWeight: 700, color: '#1A2310' }}>
            Ce que disent <span style={{ color: '#7CB518' }}>nos familles</span>
          </h2>
          <div className="divider" style={{ margin: '0.75rem auto 0' }} />
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          spaceBetween={24}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          style={{ paddingBottom: '3rem' }}
        >
          {data.map((t, i) => (
            <SwiperSlide key={i}>
              <div style={{
                background: '#FFFFFF', borderRadius: '1.25rem', padding: '1.75rem',
                border: '1px solid #E2E8D0', height: '100%', display: 'flex', flexDirection: 'column',
                boxShadow: '0 2px 12px rgba(124,181,24,0.08)',
              }}>
                <div style={{ color: '#7CB518', marginBottom: '0.75rem' }}><QuoteIcon /></div>
                <p style={{ color: '#3D4A2A', fontSize: '0.9rem', lineHeight: 1.75, fontStyle: 'italic', flex: 1, marginBottom: '1.25rem' }}>
                  "{t.contenu}"
                </p>
                <div style={{ borderTop: '1px solid #E2E8D0', paddingTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontWeight: 700, color: '#1A2310', fontSize: '0.875rem' }}>{t.nom_parent}</p>
                    {t.nom_enfant && (
                      <p style={{ color: '#8A9A6A', fontSize: '0.78rem', marginTop: '1px' }}>
                        Parent de {t.nom_enfant}{t.classe_enfant && ` — ${t.classe_enfant}`}
                      </p>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <svg key={j} width="13" height="13" fill={j < (t.note || 5) ? '#D32F2F' : '#E2E8D0'} viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

// ── CTASection ────────────────────────────────────────────────────────────────
export function CTASection() {
  return (
    <section className="section" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="wrap">
        <div style={{
          borderRadius: '1.5rem', overflow: 'hidden', position: 'relative',
          background: 'linear-gradient(135deg, #1A2A0A 0%, #5A8A0F 50%, #7CB518 100%)',
          padding: 'clamp(2.5rem,5vw,4rem)',
        }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(211,47,47,0.2) 0%,transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '250px', height: '250px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(158,214,58,0.15) 0%,transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <span style={{
              display: 'inline-block', padding: '0.35rem 1rem', borderRadius: '999px',
              background: 'rgba(255,255,255,0.15)', color: '#FFFFFF',
              fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em',
              textTransform: 'uppercase', marginBottom: '1.25rem',
            }}>
              Inscriptions ouvertes
            </span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 700, color: '#FFFFFF', marginBottom: '1rem', lineHeight: 1.2 }}>
              Offrez le meilleur à votre enfant
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', marginBottom: '2rem', lineHeight: 1.7 }}>
              Rejoignez la famille ETS MAREL. Contactez-nous pour inscrire votre enfant dans notre établissement d'excellence.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <RouterLink to="/contact" className="btn-red" style={{ fontSize: '0.95rem', padding: '0.85rem 2rem' }}>
                Demander une inscription <ArrowRight />
              </RouterLink>
              <a href="tel:+2252250358 1" className="btn-white" style={{ fontSize: '0.95rem', padding: '0.85rem 2rem' }}>
                Nous appeler
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NiveauxSection
