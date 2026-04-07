import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import SectionHeader from '@components/common/SectionHeader'

const DEFAULT_CHIFFRES = [
  { valeur: '2000', suffixe: '', label: 'Année de fondation',      description: '25 ans d\'excellence',    couleur: '#1B4F8A' },
  { valeur: '100',  suffixe: '%', label: 'Réussite au CEPE',       description: 'Depuis 2012 sans faille', couleur: '#2ECC71' },
  { valeur: '6',    suffixe: ' mois', label: 'Dès l\'âge de',      description: 'Accueil crèche',          couleur: '#E67E22' },
  { valeur: '11',   suffixe: '',  label: 'Niveaux scolaires',       description: 'Crèche au CM2',           couleur: '#9B59B6' },
]

function StatCard({ item, index, inView }) {
  const num = parseInt(item.valeur.replace(/\D/g, ''), 10) || 0
  return (
    <div
      className="card p-8 text-center group hover:-translate-y-2 transition-all duration-300"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Cercle coloré */}
      <div
        className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center opacity-15 group-hover:opacity-25 transition-opacity"
        style={{ backgroundColor: item.couleur }}
      />
      <div className="relative -mt-14 mb-5">
        <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center"
          style={{ backgroundColor: item.couleur + '15' }}>
          <span className="font-display font-bold text-2xl" style={{ color: item.couleur }}>
            {inView ? (
              <CountUp end={num} duration={2.5} delay={index * 0.15} separator="" />
            ) : '0'}
            <span className="text-lg">{item.suffixe}</span>
          </span>
        </div>
      </div>

      <h3 className="font-display font-bold text-gray-900 text-lg leading-tight mb-1">
        {item.label}
      </h3>
      <p className="text-sm text-gray-400">{item.description}</p>
    </div>
  )
}

export default function ChiffresSection({ chiffres = [] }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const data = chiffres.length > 0 ? chiffres : DEFAULT_CHIFFRES

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeader
          badge="Nos chiffres"
          title="EPV MAREL en quelques chiffres"
          subtitle="Une école de confiance qui fait ses preuves depuis 25 ans."
          center
        />
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((item, i) => (
            <StatCard key={i} item={item} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}