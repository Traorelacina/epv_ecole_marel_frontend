import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ChevronRight, ArrowRight, Sparkles, MessageCircle, Users } from 'lucide-react'
import { publicService } from '@services/publicService'
import { useInView } from '@hooks/useInView'
import toast from 'react-hot-toast'
import contactImage from '../../assets/images/contact_marel.jpeg'

const INFOS = [
  { icon: MapPin,  label: 'Adresse',       lines: ['Deux Plateaux 8eme Tranche', 'Cocody — Abidjan, Cote d\'Ivoire'] },
  { icon: Phone,   label: 'Telephone',     lines: ['+225 22 50 35 81', '+225 05 61 56 10'] },
  { icon: Mail,    label: 'Email',         lines: ['contact@etsmarel.ci'] },
  { icon: Clock,   label: 'Horaires',      lines: ['Lun – Ven : 7h30 – 16h30', 'Samedi : 8h00 – 12h00'] },
]

const SUJETS = [
  'Demande d\'inscription',
  'Renseignements pedagogiques',
  'Frais de scolarite',
  'Partenariat',
  'Autre',
]

/* ── Hero avec image à droite ── */
function ContactHero() {
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
              <span style={{ color: '#8DC31E', fontSize: '13px', fontWeight: 600 }}>Contact</span>
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
                Nous contacter
              </span>
            </div>

            <h1 style={{ ...fadeUp(220), fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(2.4rem,5vw,3.8rem)', color: '#fff', lineHeight: 1.1, marginBottom: '10px', letterSpacing: '-1px' }}>
              Parlons de
            </h1>
            <h1 style={{ ...fadeUp(340), fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(2.4rem,5vw,3.8rem)', color: '#8DC31E', lineHeight: 1.1, marginBottom: '10px', letterSpacing: '-1px' }}>
              l'avenir de vos enfants
            </h1>
            <h1 style={{ ...fadeUp(460), fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(2.4rem,5vw,3.8rem)', color: '#fff', lineHeight: 1.1, marginBottom: '28px', letterSpacing: '-1px' }}>
              ensemble
            </h1>

            <p style={{ ...fadeUp(580), color: 'rgba(255,255,255,0.75)', fontSize: '17px', maxWidth: '500px', lineHeight: 1.8, marginBottom: '40px' }}>
              Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner dans les démarches d'inscription.
            </p>

            {/* CTA */}
            <div style={{ ...fadeUp(700), display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              <a href="tel:+22522503581" className="btn-red" style={{ fontSize: '15px', padding: '14px 28px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={17} /> Appelez-nous
              </a>
              <Link to="/inscription" className="btn-white" style={{ fontSize: '15px', padding: '14px 28px' }}>
                Procédure d'inscription
              </Link>
            </div>

            {/* Mini stats */}
            <div style={{ ...fadeUp(820), display: 'flex', gap: '32px', marginTop: '52px', flexWrap: 'wrap' }}>
              {[
                { val: '24h', label: 'Délai de réponse' },
                { val: '100%', label: 'Satisfaction' },
                { val: '7j/7', label: 'Support' },
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

          {/* Image à droite avec design spécifique Contact */}
          <div
            className="hidden lg:flex"
            style={{
              justifyContent: 'center', alignItems: 'center', position: 'relative',
              opacity: loaded ? 1 : 0,
              animation: loaded ? 'scaleIn .9s cubic-bezier(.22,.68,0,1.2) 300ms both' : 'none',
            }}
          >
            {/* Anneau externe avec éléments de communication */}
            <div style={{
              position: 'absolute',
              width: '480px', height: '480px', borderRadius: '50%',
              border: '2px dotted rgba(141,195,30,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }} className="ring-spin-cw">
              {/* Éléments décoratifs autour */}
              <div style={{ position: 'absolute', top: '-15px', right: '25%', background: '#fff', borderRadius: '50%', padding: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <Phone size={14} style={{ color: '#D4191A' }} />
              </div>
              <div style={{ position: 'absolute', bottom: '-10px', left: '20%', background: '#fff', borderRadius: '50%', padding: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <Mail size={14} style={{ color: '#2D6A1F' }} />
              </div>
              <div style={{ position: 'absolute', top: '25%', left: '-15px', background: '#fff', borderRadius: '50%', padding: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <MessageCircle size={14} style={{ color: '#8DC31E' }} />
              </div>
              <div style={{ position: 'absolute', bottom: '25%', right: '-15px', background: '#fff', borderRadius: '50%', padding: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <Users size={14} style={{ color: '#f59e0b' }} />
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

              {/* Image principale avec effet message */}
              <div style={{
                width: '260px', height: '260px', borderRadius: '20px',
                overflow: 'hidden', border: '4px solid #fff',
                position: 'relative', zIndex: 2,
                boxShadow: '0 0 0 8px rgba(141,195,30,0.1), 0 20px 40px rgba(0,0,0,0.3)',
                transform: 'scale(0.95)',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(0.95)'}>
                <img src={contactImage} alt="Contact ETS MAREL" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '60px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
                }} />
              </div>

              {/* Badge flottant "Réponse rapide" */}
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
                <Send size={18} style={{ color: '#fff' }} />
                <div>
                  <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '13px', color: '#fff', lineHeight: 1 }}>Réponse rapide</p>
                  <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.8)', marginTop: '2px' }}>Sous 24h ouvrables</p>
                </div>
              </div>

              {/* Badge flottant "Disponible" */}
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
                <Clock size={16} style={{ color: '#8DC31E' }} />
                <div>
                  <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '12px', color: '#fff', lineHeight: 1 }}>7j/7</p>
                  <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>Service disponible</p>
                </div>
              </div>

              {/* Petite décoration "Contactez-nous" */}
              <div style={{
                position: 'absolute', bottom: '30px', right: '20px',
                background: 'rgba(255,255,255,0.95)',
                borderRadius: '12px', padding: '6px 12px',
                display: 'flex', alignItems: 'center', gap: '6px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}>
                <MessageCircle size={12} style={{ color: '#2D6A1F' }} />
                <span style={{ fontSize: '10px', fontWeight: 600, color: '#2D6A1F' }}>Contactez-nous</span>
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

export default function ContactPage() {
  const [form,    setForm]    = useState({ nom: '', email: '', telephone: '', sujet: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent,    setSent]    = useState(false)
  const [errors,  setErrors]  = useState({})
  const [ref, inView] = useInView()

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true); setErrors({})
    try {
      await publicService.sendContact(form)
      setSent(true)
      toast.success('Message envoyé avec succès !')
    } catch (err) {
      if (err.response?.data?.errors) setErrors(err.response.data.errors)
      else toast.error('Erreur lors de l\'envoi.')
    }
    setLoading(false)
  }

  return (
    <>
      <Helmet>
        <title>Contact — ETS MAREL | Abidjan</title>
        <meta name="description" content="Contactez ETS MAREL pour une inscription ou toute information. Deux Plateaux Cocody, Abidjan. Réponse sous 24h." />
      </Helmet>

      <style>{ANIMATION_STYLES}</style>
      <ContactHero />

      <section className="section" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="wrap" ref={ref}>
          {/* Grille avec colonnes égales */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}
            className="grid-cols-1 lg:grid-cols-2">

            {/* Bloc infos */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {INFOS.map((info, i) => (
                <div
                  key={info.label}
                  className={inView ? `anim-fade-up d${i + 1}` : ''}
                  style={{ backgroundColor: '#fff', borderRadius: '20px', padding: '22px', border: '1px solid #F3F4F6', display: 'flex', gap: '16px', alignItems: 'flex-start' }}
                >
                  <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: '#F2F9E5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <info.icon size={20} style={{ color: '#2D6A1F' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: '#8DC31E', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>{info.label}</p>
                    {info.lines.map(l => <p key={l} style={{ color: '#374151', fontSize: '14px', fontWeight: 500, lineHeight: 1.6 }}>{l}</p>)}
                  </div>
                </div>
              ))}

              {/* Carte Google Maps */}
              <div className={inView ? 'anim-fade-up d5' : ''} style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(45,106,31,0.10)' }}>
                <iframe
                  title="ETS MAREL"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972!2d-3.94!3d5.38!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNQ!5e0!3m2!1sfr!2sci!4v1"
                  width="100%" height="200" style={{ border: 0, display: 'block' }}
                  allowFullScreen loading="lazy"
                />
              </div>
            </div>

            {/* Formulaire */}
            <div className={inView ? 'anim-slide-r d1' : ''}>
              {sent ? (
                <div style={{ backgroundColor: '#fff', borderRadius: '24px', padding: '50px 30px', textAlign: 'center', border: '1px solid #E5E7EB', boxShadow: '0 8px 40px rgba(45,106,31,0.08)' }}>
                  <div style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: '#F2F9E5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <CheckCircle size={34} style={{ color: '#2D6A1F' }} />
                  </div>
                  <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '22px', color: '#1F2937', marginBottom: '10px' }}>Message envoyé !</h3>
                  <p style={{ color: '#6B7280', fontSize: '14px', lineHeight: 1.7, marginBottom: '28px' }}>
                    Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais, généralement sous 24h ouvrables.
                  </p>
                  <button onClick={() => setSent(false)} className="btn-outline" style={{ margin: '0 auto' }}>
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{ backgroundColor: '#fff', borderRadius: '24px', padding: '32px', border: '1px solid #E5E7EB', boxShadow: '0 8px 40px rgba(45,106,31,0.08)' }}
                >
                  <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '20px', color: '#1F2937', marginBottom: '6px' }}>
                    Envoyer un message
                  </h3>
                  <p style={{ color: '#9CA3AF', fontSize: '13px', marginBottom: '24px' }}>
                    Remplissez le formulaire et nous vous répondrons rapidement.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="grid grid-cols-1 sm:grid-cols-2">
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Nom complet *</label>
                      <input value={form.nom} onChange={set('nom')} placeholder="Jean Kouassi" className="input" style={{ fontSize: '13px', padding: '10px 12px' }} required />
                      {errors.nom && <p style={{ color: '#D4191A', fontSize: '11px', marginTop: '4px' }}>{errors.nom[0]}</p>}
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Email *</label>
                      <input type="email" value={form.email} onChange={set('email')} placeholder="jean@email.com" className="input" style={{ fontSize: '13px', padding: '10px 12px' }} required />
                      {errors.email && <p style={{ color: '#D4191A', fontSize: '11px', marginTop: '4px' }}>{errors.email[0]}</p>}
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Téléphone</label>
                      <input value={form.telephone} onChange={set('telephone')} placeholder="+225 07 00 00 00" className="input" style={{ fontSize: '13px', padding: '10px 12px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Sujet *</label>
                      <select value={form.sujet} onChange={set('sujet')} className="input" required style={{ cursor: 'pointer', fontSize: '13px', padding: '10px 12px' }}>
                        <option value="">Choisir un sujet</option>
                        {SUJETS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {errors.sujet && <p style={{ color: '#D4191A', fontSize: '11px', marginTop: '4px' }}>{errors.sujet[0]}</p>}
                    </div>
                  </div>

                  <div style={{ marginTop: '14px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Message *</label>
                    <textarea
                      value={form.message} onChange={set('message')}
                      placeholder="Votre message..."
                      rows={4} className="input" required
                      style={{ resize: 'none', lineHeight: 1.6, fontSize: '13px', padding: '10px 12px' }}
                    />
                    {errors.message && <p style={{ color: '#D4191A', fontSize: '11px', marginTop: '4px' }}>{errors.message[0]}</p>}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', flexWrap: 'wrap', gap: '12px' }}>
                    <p style={{ color: '#9CA3AF', fontSize: '11px' }}>* Champs obligatoires</p>
                    <button type="submit" disabled={loading} className="btn-green" style={{ gap: '8px', padding: '10px 20px', fontSize: '13px' }}>
                      {loading ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spinSlow 0.7s linear infinite' }} />
                          Envoi...
                        </span>
                      ) : (
                        <><Send size={14} /> Envoyer</>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}