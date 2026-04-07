import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import SectionHeader from '@components/common/SectionHeader'

const DEFAULT_NIVEAUX = [
  { nom: 'Crèche',    slug: 'creche',          age_min: '6 mois',    couleur: '#E67E22', icone: '🍼', description: "Éveil sensoriel et motricité libre dans un cadre sécurisé et bienveillant." },
  { nom: 'Garderie',  slug: 'garderie',         age_min: '18 mois',   couleur: '#2ECC71', icone: '🧸', description: "Jeux éducatifs, socialisation et développement moteur." },
  { nom: 'Maternelle',slug: 'petite-section',   age_min: '2 ans 6 mois', couleur: '#9B59B6', icone: '✏️', description: "Éveil artistique, langage oral et premiers apprentissages." },
  { nom: 'Primaire',  slug: 'cp1',             age_min: '5 ans 6 mois', couleur: '#1B4F8A', icone: '📚', description: "Programme officiel enrichi : informatique et anglais inclus." },
]

export default function NiveauxSection({ niveaux = [] }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })
  const data = niveaux.length > 0
    ? niveaux.slice(0, 4).map((n, i) => ({ ...n, icone: ['🍼','🧸','✏️','📚'][i] || '📖' }))
    : DEFAULT_NIVEAUX

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="container-custom" ref={ref}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeader
            badge="Nos niveaux"
            title="Une école pour chaque âge"
            subtitle="De la crèche au CM2, un parcours d'excellence construit pour votre enfant."
          />
          <Link to="/pedagogie" className="btn-outline shrink-0 self-start md:self-auto">
            Voir tous les niveaux
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((niveau, i) => (
            <Link
              key={niveau.slug || i}
              to={`/pedagogie#${niveau.slug}`}
              className={`card p-6 group transition-all duration-500 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Icône */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4
                           group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: (niveau.couleur || '#1B4F8A') + '15' }}
              >
                {niveau.icone || '📖'}
              </div>

              {/* Age badge */}
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
                style={{
                  backgroundColor: (niveau.couleur || '#1B4F8A') + '15',
                  color: niveau.couleur || '#1B4F8A',
                }}
              >
                Dès {niveau.age_min}
              </span>

              <h3 className="font-display font-bold text-gray-900 text-xl mb-2 group-hover:text-primary transition-colors">
                {niveau.nom}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{niveau.description}</p>

              {/* Flèche */}
              <div
                className="mt-4 flex items-center gap-1.5 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1"
                style={{ color: niveau.couleur || '#1B4F8A' }}
              >
                En savoir plus
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}