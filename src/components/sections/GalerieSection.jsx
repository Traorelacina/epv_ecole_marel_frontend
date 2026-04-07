import { Link } from 'react-router-dom'
import SectionHeader from '@components/common/SectionHeader'
import { storageUrl } from '@utils/helpers'

export default function GalerieSection({ galeries = [] }) {
  if (galeries.length === 0) return null

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeader
            badge="Galerie"
            title="La vie à l'EPV MAREL"
            subtitle="Sorties, cérémonies, activités… des moments précieux capturés pour vous."
          />
          <Link to="/galerie" className="btn-outline shrink-0 self-start md:self-auto">
            Voir toute la galerie
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {galeries.slice(0, 4).map((g, i) => (
            <Link
              key={g.id}
              to={`/galerie/${g.slug}`}
              className={`relative overflow-hidden rounded-2xl group bg-primary/10
                ${i === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'}`}
            >
              {g.image_couverture ? (
                <img
                  src={storageUrl(g.image_couverture)}
                  alt={g.titre}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-20">🖼️</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent
                            opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0
                            transition-transform duration-300">
                <p className="text-white font-medium text-sm line-clamp-1">{g.titre}</p>
                <p className="text-white/60 text-xs capitalize mt-0.5">{g.categorie}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}