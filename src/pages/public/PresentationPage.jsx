// ── PresentationPage (ex-EcolePage) ─────────────────────────────────────────
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import {
  CheckCircle, Award, Heart, Users, ArrowRight, BookOpen,
  GraduationCap, ChevronRight,
} from 'lucide-react'
import { publicService } from '@services/publicService'
import { useInView } from '@hooks/useInView'
import ecoleImage from '../../assets/images/ImageCercle1MenuPresentation.jpeg'

const STORAGE = import.meta.env.VITE_STORAGE_URL || 'https://ideal-ilse-freelence-89b443a4.koyeb.app/'

const VALEURS = [
  { icon: Award,    label: 'Excellence',    desc: '100% de réussite au CEPE depuis 2012. Un engagement constant envers la qualité.', color: '#8DC31E' },
  { icon: Heart,    label: 'Bienveillance', desc: 'Un environnement chaleureux où chaque enfant se sent en sécurité et valorisé.',    color: '#D4191A' },
  { icon: BookOpen, label: 'Innovation',    desc: 'Informatique, anglais et activités culturelles inclus pour préparer l\'avenir.',   color: '#2D6A1F' },
  { icon: Users,    label: 'Communauté',    desc: 'Un dialogue constant parents-enseignants pour assurer le succès de chaque élève.', color: '#f59e0b' },
]

const STYLES = `
  *, *::before, *::after { box-sizing: border-box; }
  @keyframes spinSlow    { to { transform: rotate(360deg); } }
  @keyframes spinSlowRev { to { transform: rotate(-360deg); } }
  @keyframes pulseGreen  { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:.5;transform:scale(1.35);} }
  @keyframes floatY      { 0%,100%{transform:translateY(0px);} 50%{transform:translateY(-10px);} }
  @keyframes floatYB     { 0%,100%{transform:translateY(0px);} 50%{transform:translateY(-14px);} }
  @keyframes glowRing    { 0%,100%{box-shadow:0 0 0 8px rgba(141,195,30,.12),0 20px 60px rgba(0,0,0,.4);} 50%{box-shadow:0 0 0 18px rgba(141,195,30,.22),0 20px 60px rgba(0,0,0,.4);} }
  @keyframes heroFadeUp  { from{opacity:0;transform:translateY(28px);} to{opacity:1;transform:translateY(0);} }
  @keyframes scaleIn     { from{opacity:0;transform:scale(.85);} to{opacity:1;transform:scale(1);} }

  .ring-spin-cw  { animation: spinSlow    20s linear infinite; transform-origin:center; }
  .ring-spin-ccw { animation: spinSlowRev 14s linear infinite; transform-origin:center; }
  .badge-float-a { animation: floatY  3.8s ease-in-out infinite; }
  .badge-float-b { animation: floatYB 4.6s ease-in-out infinite 0.8s; }
  .logo-glow     { animation: glowRing 3.5s ease-in-out infinite; }

  .pres-hero-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
  }
  .pres-two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
  }
  .pres-hero-img {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .pres-cta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
  }
  .pres-stats-row {
    display: flex;
    gap: 32px;
    margin-top: 52px;
    flex-wrap: wrap;
  }
  .pres-valeurs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 24px;
  }
  .pres-equipe-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 24px;
  }
  .pres-cta-btns {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
  }

  @media (max-width: 1024px) {
    .pres-hero-grid { gap: 36px; }
    .pres-two-col { gap: 36px; }
  }

  @media (max-width: 768px) {
    .pres-hero-grid  { grid-template-columns: 1fr !important; gap: 20px; }
    .pres-two-col    { grid-template-columns: 1fr !important; gap: 28px; }
    .pres-hero-img   { display: none !important; }
    .pres-cta-row    { flex-direction: column; }
    .pres-cta-row a  { width: 100%; justify-content: center; text-align: center; }
    .pres-stats-row  { gap: 18px; margin-top: 36px; }
    .pres-cta-btns   { flex-direction: column; align-items: center; }
    .pres-cta-btns a { width: 100%; max-width: 320px; justify-content: center; }
  }

  @media (max-width: 480px) {
    .wrap { padding-left: 16px !important; padding-right: 16px !important; }
  }
`

function PresentationHero() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t) }, [])
  const fadeUp = d => ({ opacity: loaded ? 1 : 0, animation: loaded ? `heroFadeUp .7s cubic-bezier(.22,.68,0,1.2) ${d}ms both` : 'none' })

  return (
    <section style={{
      position: 'relative', minHeight: '70vh',
      background: 'linear-gradient(155deg,#0f2a07 0%,#1a4010 30%,#2D6A1F 65%,#5a9c22 85%,#8DC31E 100%)',
      display: 'flex', alignItems: 'center', overflow: 'hidden',
    }}>
      <div className="bg-dots" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
      <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '500px', height: '500px', borderRadius: '50%', border: '1px solid rgba(141,195,30,0.15)' }} className="ring-spin-cw" />
      <div style={{ position: 'absolute', bottom: '-60px', left: '10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(141,195,30,0.1) 0%, transparent 70%)' }} />

      <div className="wrap" style={{ position: 'relative', zIndex: 10, paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="pres-hero-grid">
          {/* Texte */}
          <div>
            <div style={{ ...fadeUp(100), display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <Link to="/" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px', textDecoration: 'none', fontWeight: 500 }}>Accueil</Link>
              <ChevronRight size={13} style={{ color: 'rgba(255,255,255,0.3)' }} />
              <span style={{ color: '#8DC31E', fontSize: '13px', fontWeight: 600 }}>Présentation</span>
            </div>
            <div style={{ ...fadeUp(150), display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 18px', borderRadius: '50px', background: 'rgba(141,195,30,0.18)', border: '1px solid rgba(141,195,30,0.35)', marginBottom: '28px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#8DC31E', animation: 'pulseGreen 2.5s ease-in-out infinite' }} />
              <span style={{ color: '#B5D95A', fontSize: '12.5px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Notre école</span>
            </div>
            <h1 style={{ ...fadeUp(200), fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.8rem)', color: '#ffffff', lineHeight: 1.1, marginBottom: '10px', letterSpacing: '-1px' }}>EPV MAREL,</h1>
            <h1 style={{ ...fadeUp(340), fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.8rem)', color: '#8DC31E', lineHeight: 1.1, marginBottom: '10px', letterSpacing: '-1px' }}>une institution</h1>
            <h1 style={{ ...fadeUp(460), fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.8rem)', color: '#ffffff', lineHeight: 1.1, marginBottom: '28px', letterSpacing: '-1px' }}>d'excellence</h1>
            <p style={{ ...fadeUp(580), color: 'rgba(255,255,255,0.75)', fontSize: '17px', lineHeight: 1.8, maxWidth: '480px', marginBottom: '40px' }}>
              Fondée en 2000, EPV MAREL forme les enfants de la crèche au CM2 avec passion et rigueur, aux Deux Plateaux de Cocody Abidjan.
            </p>
            <div className="pres-cta-row" style={fadeUp(700)}>
              <Link to="/contacts" className="btn-red" style={{ fontSize: '15px', padding: '14px 28px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Inscrire mon enfant <ArrowRight size={17} />
              </Link>
              <Link to="/cycles-formation" className="btn-white" style={{ fontSize: '15px', padding: '14px 28px' }}>Nos cycles de formation</Link>
            </div>
            <div className="pres-stats-row" style={fadeUp(820)}>
              {[{ val: '25+', label: "Années d'expérience" }, { val: '100%', label: 'Réussite CEPE' }, { val: '500+', label: 'Élèves formés' }].map((s, i) => (
                <div key={s.label} style={{ opacity: loaded ? 1 : 0, animation: loaded ? `heroFadeUp .6s ease ${820 + i * 120}ms both` : 'none' }}>
                  <p style={{ fontFamily: "'Sora',sans-serif", fontSize: '28px', fontWeight: 800, color: '#8DC31E', lineHeight: 1 }}>{s.val}</p>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', marginTop: '4px', fontWeight: 500 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cercle image — masqué mobile */}
          <div className="pres-hero-img" style={{ opacity: loaded ? 1 : 0, animation: loaded ? 'scaleIn .9s cubic-bezier(.22,.68,0,1.2) 300ms both' : 'none' }}>
            <div style={{ position: 'absolute', width: '460px', height: '460px', borderRadius: '50%', border: '1.5px dashed rgba(141,195,30,0.35)' }} className="ring-spin-cw" />
            <div style={{ position: 'absolute', width: '390px', height: '390px', borderRadius: '50%', border: '1px dotted rgba(141,195,30,0.25)' }} className="ring-spin-ccw" />
            <div style={{ width: '420px', height: '420px', borderRadius: '50%', background: 'rgba(141,195,30,0.10)', border: '1.5px solid rgba(141,195,30,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', width: '320px', height: '320px', borderRadius: '50%', border: '2px solid transparent', borderTopColor: '#8DC31E', borderRightColor: 'rgba(141,195,30,0.4)' }} className="ring-spin-cw" />
              <div className="logo-glow" style={{ width: '280px', height: '280px', borderRadius: '50%', overflow: 'hidden', border: '4px solid #8DC31E', position: 'relative', zIndex: 2 }}>
                <img src={ecoleImage} alt="EPV MAREL" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="badge-float-a" style={{ position: 'absolute', top: '30px', right: '-10px', background: '#ffffff', borderRadius: '16px', padding: '12px 18px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 3 }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#F2F9E5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Award size={18} style={{ color: '#2D6A1F' }} /></div>
                <div><p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '18px', color: '#2D6A1F', lineHeight: 1 }}>100%</p><p style={{ fontSize: '10px', color: '#9CA3AF', marginTop: '2px' }}>Taux réussite</p></div>
              </div>
              <div className="badge-float-b" style={{ position: 'absolute', bottom: '40px', left: '-20px', background: '#D4191A', borderRadius: '16px', padding: '12px 18px', boxShadow: '0 8px 32px rgba(212,25,26,0.3)', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 3 }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><GraduationCap size={18} style={{ color: '#fff' }} /></div>
                <div><p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '13px', color: '#fff', lineHeight: 1 }}>Crèche → CM2</p><p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.8)', marginTop: '2px' }}>Tous niveaux</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function PresentationPage() {
  const [equipe, setEquipe] = useState([])
  const [ref1, iv1] = useInView()
  const [ref2, iv2] = useInView()
  const [ref3, iv3] = useInView()

  useEffect(() => {
    publicService.getEquipe?.().then(r => setEquipe(r.data?.equipe || [])).catch(() => {})
  }, [])

  return (
    <>
      <Helmet>
        <title>Présentation — EPV MAREL | Abidjan</title>
        <meta name="description" content="Découvrez EPV MAREL, école maternelle et primaire à Abidjan, Deux Plateaux. Fondée en 2000, 100% de réussite au CEPE depuis 2012." />
      </Helmet>

      <style>{STYLES}</style>
      <PresentationHero />

      {/* Histoire */}
      <section className="section" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="wrap" ref={ref1}>
          <div className="pres-two-col">
            <div className={iv1 ? 'anim-fade-up' : ''} style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '100%', maxWidth: '440px', aspectRatio: '4/3', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 24px 60px rgba(45,106,31,0.2)', border: '4px solid #8DC31E' }}>
                <img src={ecoleImage} alt="EPV MAREL école" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
            <div className={iv1 ? 'anim-slide-r d1' : ''}>
              <span className="section-label">Notre histoire</span>
              <h2 className="section-title" style={{ marginBottom: '6px' }}>25 ans au service</h2>
              <h2 className="section-title" style={{ color: '#2D6A1F', marginBottom: '28px' }}>de vos enfants</h2>
              <span className="underline-green" />
              <p style={{ color: '#6B7280', fontSize: '16px', lineHeight: 1.85, marginTop: '28px', marginBottom: '22px' }}>
                L'EPV MAREL a été fondée en 2000 avec une mission claire : offrir aux enfants d'Abidjan un cadre éducatif d'excellence alliant rigueur académique et épanouissement personnel.
              </p>
              <p style={{ color: '#6B7280', fontSize: '16px', lineHeight: 1.85, marginBottom: '32px' }}>
                Située aux Deux Plateaux 8ème Tranche, notre établissement accueille les enfants dès 6 mois jusqu'au CM2. Depuis 2012, nous affichons un <strong style={{ color: '#2D6A1F' }}>taux de réussite de 100%</strong> au CEPE et à l'entrée en 6ème.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Encadrement personnalisé de qualité', 'Infrastructure moderne et sécurisée', 'Corps enseignant qualifié et passionné', 'Activités parascolaires enrichissantes'].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#F2F9E5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CheckCircle size={13} style={{ color: '#2D6A1F' }} />
                    </div>
                    <span style={{ color: '#374151', fontSize: '15px' }}>{item}</span>
                  </li>
                ))}
              </ul>
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
            <p className={iv2 ? 'anim-fade-up d1' : ''} style={{ color: '#6B7280', fontSize: '16px', marginTop: '16px' }}>Quatre piliers fondamentaux qui guident notre action au quotidien.</p>
          </div>
          <div className="pres-valeurs-grid">
            {VALEURS.map((v, i) => (
              <div key={v.label} className={`card-flat ${iv2 ? `anim-fade-up d${i + 1}` : ''}`} style={{ padding: '32px 24px', textAlign: 'center' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: v.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <v.icon size={24} style={{ color: v.color }} />
                </div>
                <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: '18px', color: '#1F2937', marginBottom: '10px' }}>{v.label}</h3>
                <p style={{ color: '#6B7280', fontSize: '14px', lineHeight: 1.75 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Équipe */}
      {equipe.length > 0 && (
        <section className="section" style={{ backgroundColor: '#F9FAFB' }}>
          <div className="wrap" ref={ref3}>
            <div style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto 52px' }}>
              <span className="section-label">Notre équipe</span>
              <h2 className={`section-title ${iv3 ? 'anim-fade-up' : ''}`}>Des enseignants passionnés</h2>
            </div>
            <div className="pres-equipe-grid">
              {equipe.map((m, i) => (
                <div key={m.id} className={`card-flat ${iv3 ? `anim-fade-up d${(i % 4) + 1}` : ''}`} style={{ padding: '24px 20px', textAlign: 'center' }}>
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

      {/* CTA */}
      <section className="section-sm" style={{ backgroundColor: '#ffffff' }}>
        <div className="wrap">
          <div style={{ borderRadius: '28px', background: 'linear-gradient(135deg,#2D6A1F 0%,#1a4010 100%)', padding: 'clamp(32px,6vw,60px) clamp(20px,4vw,60px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(1.5rem,4vw,2.5rem)', color: '#ffffff', marginBottom: '16px' }}>Prêt à rejoindre la famille MAREL ?</h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '16px', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
                Contactez-nous pour inscrire votre enfant ou obtenir plus d'informations sur notre établissement.
              </p>
              <div className="pres-cta-btns">
                <Link to="/contacts" className="btn-white" style={{ fontSize: '15px', padding: '14px 32px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  Demander une inscription <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PresentationPage