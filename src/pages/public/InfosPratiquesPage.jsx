// ── InfosPratiquesPage ────────────────────────────────────────────────────────
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { publicService } from '@services/publicService'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { ChevronRight, Clock, Calendar, FileText, MapPin, CheckCircle, AlertCircle, BookOpen, GraduationCap, Bell, School, Sparkles, ArrowRight } from 'lucide-react'
import { useInView } from '@hooks/useInView'
import infosImage from '../../assets/images/infos_marel.jpeg'

const TYPE_COLORS = {
  vacances:   '#8DC31E',
  rentree:    '#2D6A1F',
  examen:     '#D4191A',
  evenement:  '#2563EB',
  fermeture:  '#9B59B6',
  autre:      '#6B7280',
}
const TYPE_LABELS = {
  vacances:   'Vacances',
  rentree:    'Rentrée',
  examen:     'Examen',
  evenement:  'Événement',
  fermeture:  'Fermeture',
  autre:      'Autre',
}

/* ── Hero avec image à droite ── */
function InfosHero() {
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
              <span style={{ color: '#8DC31E', fontSize: '13px', fontWeight: 600 }}>Infos pratiques</span>
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
                Informations pratiques
              </span>
            </div>

            <h1 style={{ ...fadeUp(220), fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(2.4rem,5vw,3.8rem)', color: '#fff', lineHeight: 1.1, marginBottom: '10px', letterSpacing: '-1px' }}>
              Tout savoir
            </h1>
            <h1 style={{ ...fadeUp(340), fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(2.4rem,5vw,3.8rem)', color: '#8DC31E', lineHeight: 1.1, marginBottom: '10px', letterSpacing: '-1px' }}>
              pour bien organiser
            </h1>
            <h1 style={{ ...fadeUp(460), fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(2.4rem,5vw,3.8rem)', color: '#fff', lineHeight: 1.1, marginBottom: '28px', letterSpacing: '-1px' }}>
              la scolarité
            </h1>

            <p style={{ ...fadeUp(580), color: 'rgba(255,255,255,0.75)', fontSize: '17px', maxWidth: '500px', lineHeight: 1.8, marginBottom: '40px' }}>
              Horaires, calendrier scolaire et procédure d'inscription — toutes les informations
              pour la scolarité de votre enfant.
            </p>

            {/* CTA */}
            <div style={{ ...fadeUp(700), display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              <Link to="/contact" className="btn-red" style={{ fontSize: '15px', padding: '14px 28px' }}>
                Contacter l'école <ArrowRight size={17} />
              </Link>
              <Link to="/inscription" className="btn-white" style={{ fontSize: '15px', padding: '14px 28px' }}>
                Procédure d'inscription
              </Link>
            </div>

            {/* Mini stats */}
            <div style={{ ...fadeUp(820), display: 'flex', gap: '32px', marginTop: '52px', flexWrap: 'wrap' }}>
              {[
                { val: '7h30', label: 'Ouverture' },
                { val: '16h30', label: 'Fermeture' },
                { val: '5j', label: 'Lun — Ven' },
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

          {/* Image à droite avec design spécifique Infos pratiques */}
          <div
            className="hidden lg:flex"
            style={{
              justifyContent: 'center', alignItems: 'center', position: 'relative',
              opacity: loaded ? 1 : 0,
              animation: loaded ? 'scaleIn .9s cubic-bezier(.22,.68,0,1.2) 300ms both' : 'none',
            }}
          >
            {/* Anneau externe avec horloges */}
            <div style={{
              position: 'absolute',
              width: '480px', height: '480px', borderRadius: '50%',
              border: '2px dotted rgba(141,195,30,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }} className="ring-spin-cw">
              {/* Éléments décoratifs autour */}
              <div style={{ position: 'absolute', top: '-15px', right: '25%', background: '#fff', borderRadius: '50%', padding: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <Clock size={14} style={{ color: '#D4191A' }} />
              </div>
              <div style={{ position: 'absolute', bottom: '-10px', left: '15%', background: '#fff', borderRadius: '50%', padding: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <Calendar size={14} style={{ color: '#2D6A1F' }} />
              </div>
              <div style={{ position: 'absolute', top: '20%', left: '-15px', background: '#fff', borderRadius: '50%', padding: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <Bell size={14} style={{ color: '#8DC31E' }} />
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

              {/* Image principale avec effet calendrier */}
              <div style={{
                width: '260px', height: '260px', borderRadius: '20px',
                overflow: 'hidden', border: '4px solid #fff',
                position: 'relative', zIndex: 2,
                boxShadow: '0 0 0 8px rgba(141,195,30,0.1), 0 20px 40px rgba(0,0,0,0.3)',
                transform: 'perspective(1000px) rotateY(-5deg)',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'perspective(1000px) rotateY(-5deg)'}>
                <img src={infosImage} alt="Infos pratiques ETS MAREL" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Badge flottant "Horaires" */}
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
                <Clock size={18} style={{ color: '#fff' }} />
                <div>
                  <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '13px', color: '#fff', lineHeight: 1 }}>7h30 - 16h30</p>
                  <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.8)', marginTop: '2px' }}>Lundi au Vendredi</p>
                </div>
              </div>

              {/* Badge flottant "Études surveillées" */}
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
                <School size={16} style={{ color: '#8DC31E' }} />
                <div>
                  <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '12px', color: '#fff', lineHeight: 1 }}>Études surveillées</p>
                  <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>16h00 - 17h00</p>
                </div>
              </div>

              {/* Petite décoration calendrier en bas */}
              <div style={{
                position: 'absolute', bottom: '30px', right: '20px',
                background: 'rgba(255,255,255,0.95)',
                borderRadius: '12px', padding: '6px 12px',
                display: 'flex', alignItems: 'center', gap: '6px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}>
                <Calendar size={12} style={{ color: '#2D6A1F' }} />
                <span style={{ fontSize: '10px', fontWeight: 600, color: '#2D6A1F' }}>Calendrier 2025-2026</span>
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

/* ── Tabs nav ── */
const TABS = [
  { key: 'horaires',    label: 'Horaires scolaires', icon: Clock },
  { key: 'calendrier',  label: 'Calendrier',          icon: Calendar },
  { key: 'inscription', label: 'Inscription',          icon: FileText },
]

function TabNav({ active, onChange }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '40px' }}>
      {TABS.map(t => {
        const Icon = t.icon
        const isActive = active === t.key
        return (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '11px 20px', borderRadius: '50px', border: 'none',
              cursor: 'pointer', fontFamily: "'Sora',sans-serif",
              fontSize: '13.5px', fontWeight: 600, transition: 'all 0.22s',
              backgroundColor: isActive ? '#2D6A1F' : '#ffffff',
              color: isActive ? '#ffffff' : '#374151',
              boxShadow: isActive
                ? '0 4px 16px rgba(45,106,31,0.28)'
                : '0 2px 8px rgba(0,0,0,0.07)',
              transform: isActive ? 'translateY(-1px)' : 'none',
            }}
          >
            <Icon size={15} />
            {t.label}
          </button>
        )
      })}
    </div>
  )
}

/* ── Horaires ── */
function HorairesTab({ horaires }) {
  const [ref, inView] = useInView()
  const rows = horaires.length > 0 ? horaires : [
    { niveau: 'Maternelle', periode: 'Matin',      heure_debut: '07:45', heure_fin: '12:00', jours: 'Lun — Ven' },
    { niveau: 'Maternelle', periode: 'Après-midi', heure_debut: '14:00', heure_fin: '16:00', jours: 'Lun — Ven' },
    { niveau: 'Primaire',   periode: 'Matin',      heure_debut: '07:30', heure_fin: '12:00', jours: 'Lun — Ven' },
    { niveau: 'Primaire',   periode: 'Après-midi', heure_debut: '14:00', heure_fin: '16:00', jours: 'Lun — Ven' },
    { niveau: 'Direction',  periode: 'Journée',    heure_debut: '08:00', heure_fin: '16:30', jours: 'Lun — Ven' },
  ]

  return (
    <div ref={ref}>
      {/* Tableau */}
      <div className={inView ? 'anim-fade-up' : ''} style={{
        borderRadius: '20px', overflow: 'hidden',
        border: '1px solid #F3F4F6',
        boxShadow: '0 4px 24px rgba(45,106,31,0.08)',
      }}>
        {/* Header tableau */}
        <div style={{
          background: 'linear-gradient(135deg,#2D6A1F,#5a9c22)',
          padding: '14px 24px',
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px',
        }}>
          {['Niveau', 'Période', 'Horaire', 'Jours'].map(h => (
            <p key={h} style={{ color: 'rgba(255,255,255,0.85)', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</p>
          ))}
        </div>

        {/* Lignes */}
        {rows.map((h, i) => (
          <div
            key={i}
            style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr',
              gap: '16px', padding: '16px 24px',
              backgroundColor: i % 2 === 0 ? '#ffffff' : '#F9FAFB',
              borderTop: '1px solid #F3F4F6',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F2F9E5'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = i % 2 === 0 ? '#ffffff' : '#F9FAFB'}
          >
            <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, color: '#1F2937', fontSize: '14px' }}>{h.niveau}</p>
            <p style={{ color: '#4B5563', fontSize: '14px' }}>{h.periode}</p>
            <p style={{ fontFamily: 'monospace', color: '#2D6A1F', fontWeight: 700, fontSize: '14.5px', letterSpacing: '0.02em' }}>
              {(h.heure_debut || '').slice(0, 5)} — {(h.heure_fin || '').slice(0, 5)}
            </p>
            <p style={{ color: '#9CA3AF', fontSize: '13px' }}>{h.jours || 'Lun — Ven'}</p>
          </div>
        ))}
      </div>

      {/* Note études surveillées */}
      <div className={inView ? 'anim-fade-up d2' : ''} style={{
        marginTop: '20px', padding: '16px 20px', borderRadius: '14px',
        background: 'linear-gradient(135deg,#FFF5F5,#FFECEC)',
        border: '1px solid rgba(212,25,26,0.18)',
        display: 'flex', gap: '12px', alignItems: 'center',
      }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'rgba(212,25,26,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Clock size={18} style={{ color: '#D4191A' }} />
        </div>
        <p style={{ color: '#7F1D1D', fontSize: '14px', lineHeight: 1.65 }}>
          <strong style={{ color: '#D4191A' }}>Études surveillées</strong> — de 16h00 à 17h00, de la Grande Section au CM2.
        </p>
      </div>
    </div>
  )
}

/* ── Calendrier ── */
function CalendrierTab({ calendrier }) {
  const [ref, inView] = useInView()

  if (!calendrier.length) return (
    <div style={{ textAlign: 'center', padding: '60px 0' }}>
      <Calendar size={48} style={{ color: '#D1FAE5', margin: '0 auto 16px' }} />
      <p style={{ color: '#9CA3AF', fontSize: '15px' }}>Calendrier en cours de mise à jour.</p>
    </div>
  )

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {calendrier.map((ev, i) => {
        const col = TYPE_COLORS[ev.type] || '#6B7280'
        return (
          <div
            key={ev.id}
            className={inView ? `anim-fade-up d${Math.min(i + 1, 5)}` : ''}
            style={{
              display: 'flex', alignItems: 'flex-start', gap: '16px',
              background: '#ffffff', borderRadius: '16px', padding: '18px 20px',
              border: '1px solid #F3F4F6',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              transition: 'box-shadow 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(45,106,31,0.1)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; e.currentTarget.style.transform = 'none' }}
          >
            {/* Barre couleur */}
            <div style={{ width: '4px', alignSelf: 'stretch', borderRadius: '2px', flexShrink: 0, backgroundColor: col }} />

            {/* Contenu */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{
                  padding: '3px 10px', borderRadius: '50px',
                  backgroundColor: col + '18', color: col,
                  fontSize: '11px', fontWeight: 700,
                }}>
                  {TYPE_LABELS[ev.type] || ev.type}
                </span>
                {ev.concerne && <span style={{ color: '#9CA3AF', fontSize: '12px' }}>{ev.concerne}</span>}
              </div>
              <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, color: '#1F2937', fontSize: '14.5px' }}>{ev.titre}</p>
              {ev.description && <p style={{ color: '#6B7280', fontSize: '13px', marginTop: '4px', lineHeight: 1.6 }}>{ev.description}</p>}
            </div>

            {/* Date */}
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, color: '#2D6A1F', fontSize: '14px' }}>
                {format(new Date(ev.date_debut), 'd MMM', { locale: fr })}
              </p>
              {ev.date_fin && ev.date_fin !== ev.date_debut && (
                <p style={{ color: '#9CA3AF', fontSize: '12px', marginTop: '2px' }}>
                  au {format(new Date(ev.date_fin), 'd MMM yyyy', { locale: fr })}
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ── Inscription ── */
function InscriptionTab() {
  const [ref, inView] = useInView()

  const blocs = [
    {
      titre: "Comment s'inscrire ?",
      icon: CheckCircle,
      color: '#2D6A1F',
      steps: [
        "Remplissez le formulaire de contact sur notre site",
        "Nous vous contactons pour un entretien",
        "Constitution du dossier d'inscription",
        "Règlement des frais d'inscription",
        "Bienvenue dans la famille MAREL !",
      ],
    },
    {
      titre: "Documents requis",
      icon: FileText,
      color: '#8DC31E',
      steps: [
        "Acte de naissance de l'enfant",
        "Carnet de vaccination à jour",
        "2 photos d'identité récentes",
        "Dernier bulletin scolaire (si applicable)",
        "Pièce d'identité des parents",
      ],
    },
  ]

  return (
    <div ref={ref}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '24px', marginBottom: '28px' }}>
        {blocs.map((bloc, bi) => {
          const Icon = bloc.icon
          return (
            <div
              key={bi}
              className={`card ${inView ? `anim-fade-up d${bi + 1}` : ''}`}
              style={{ padding: '28px' }}
            >
              {/* En-tête bloc */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '22px', paddingBottom: '16px', borderBottom: '1px solid #F3F4F6' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: bloc.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={20} style={{ color: bloc.color }} />
                </div>
                <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: '15.5px', color: '#1F2937' }}>{bloc.titre}</h3>
              </div>

              {/* Étapes */}
              <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {bloc.steps.map((s, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '14px', color: '#374151', lineHeight: 1.6 }}>
                    <span style={{
                      width: '26px', height: '26px', borderRadius: '8px', flexShrink: 0,
                      background: bloc.color + '18', color: bloc.color,
                      fontSize: '12px', fontWeight: 700,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {j + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          )
        })}
      </div>

      {/* CTA contact */}
      <div className={inView ? 'anim-fade-up d3' : ''} style={{
        padding: '24px 28px', borderRadius: '18px',
        background: 'linear-gradient(135deg,#F2F9E5,#E8F5D0)',
        border: '1px solid rgba(141,195,30,0.3)',
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#2D6A1F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MapPin size={20} style={{ color: '#fff' }} />
          </div>
          <div>
            <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, color: '#1F2937', fontSize: '15px' }}>Venez nous rencontrer</p>
            <p style={{ color: '#6B7280', fontSize: '13px', marginTop: '2px' }}>Deux Plateaux 8ème Tranche, Cocody — Abidjan</p>
          </div>
        </div>
        <Link to="/contact" className="btn-green" style={{ fontSize: '14px', padding: '12px 24px' }}>
          Nous contacter
        </Link>
      </div>
    </div>
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
export function InfosPratiquesPage() {
  const [horaires,   setHoraires]   = useState([])
  const [calendrier, setCalendrier] = useState([])
  const [tab,        setTab]        = useState('horaires')

  useEffect(() => {
    publicService.getHoraires().then(r => setHoraires(r.data?.horaires || [])).catch(() => {})
    publicService.getCalendrier().then(r => setCalendrier(r.data?.calendrier || [])).catch(() => {})
  }, [])

  return (
    <>
      <Helmet>
        <title>Informations Pratiques — ETS MAREL | Abidjan</title>
        <meta name="description" content="Horaires, calendrier scolaire et procédure d'inscription à l'école ETS MAREL, Deux Plateaux Abidjan." />
      </Helmet>

      <style>{ANIMATION_STYLES}</style>
      <InfosHero />

      <section className="section" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="wrap">
          <TabNav active={tab} onChange={setTab} />

          {tab === 'horaires'    && <HorairesTab    horaires={horaires}    />}
          {tab === 'calendrier'  && <CalendrierTab  calendrier={calendrier} />}
          {tab === 'inscription' && <InscriptionTab />}
        </div>
      </section>
    </>
  )
}

export default InfosPratiquesPage