import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import SectionHeader from '@components/common/SectionHeader'

function ArticleCard({ article, index }) {
  const date = article.date_publication
    ? format(new Date(article.date_publication), 'd MMM yyyy', { locale: fr })
    : ''

  return (
    <Link
      to={`/actualites/${article.slug}`}
      className="card group flex flex-col h-full hover:-translate-y-1"
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      {/* Image */}
      <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/20 overflow-hidden relative">
        {article.image ? (
          <img
            src={`${import.meta.env.VITE_STORAGE_URL || 'http://localhost:8000/storage'}/${article.image}`}
            alt={article.image_alt || article.titre}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-12 h-12 text-primary/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
        )}
        {/* Catégorie badge */}
        {article.categorie && (
          <span
            className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-medium text-white backdrop-blur-sm"
            style={{ backgroundColor: article.categorie.couleur || '#1B4F8A' }}
          >
            {article.categorie.nom}
          </span>
        )}
      </div>

      {/* Contenu */}
      <div className="flex flex-col flex-1 p-5">
        <p className="text-xs text-gray-400 mb-2">{date}</p>
        <h3 className="font-display font-semibold text-gray-900 text-lg leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {article.titre}
        </h3>
        {article.extrait && (
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 flex-1">{article.extrait}</p>
        )}
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
          Lire la suite
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  )
}

export default function ActualitesSection({ articles = [] }) {
  if (articles.length === 0) return null

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeader
            badge="Blog & Actualités"
            title="Les dernières nouvelles"
            subtitle="Restez informés de la vie scolaire, des événements et des résultats."
          />
          <Link to="/actualites" className="btn-outline shrink-0 self-start md:self-auto">
            Toutes les actualités
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {articles.slice(0, 3).map((a, i) => (
            <ArticleCard key={a.id} article={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}