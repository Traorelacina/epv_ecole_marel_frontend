// ArticleDetailPage.jsx
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { publicService } from '@services/publicService'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { 
  ArrowRight, Calendar, Eye, Clock, User, 
  BookOpen, Newspaper, Sparkles, ChevronRight,
  Home, Tag, Calendar as CalendarIcon
} from 'lucide-react'

const STORAGE = import.meta.env.VITE_STORAGE_URL || 'https://ideal-ilse-freelence-89b443a4.koyeb.app/'

export default function ArticleDetailPage() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [similaires, setSimilaires] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const res = await publicService.getArticle(slug)
      setArticle(res.data?.article)
      setSimilaires(res.data?.similaires || [])
    } catch (err) {
      console.error('Error loading article:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-gray-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Chargement de l'article...</p>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <BookOpen size={64} className="text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold text-gray-600 mb-2">Article introuvable</h1>
        <p className="text-gray-400 mb-6">L'article que vous recherchez n'existe pas ou a été supprimé.</p>
        <Link to="/actualites" className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition">
          Retour aux actualités
        </Link>
      </div>
    )
  }

  const date = article.date_publication
    ? format(new Date(article.date_publication), 'EEEE d MMMM yyyy', { locale: fr })
    : ''

  return (
    <>
      <Helmet>
        <title>{article.meta_titre || article.titre} — EPV MAREL</title>
        <meta name="description" content={article.meta_description || article.extrait || ''} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-700 pt-28 pb-16 overflow-hidden">
        {/* Pattern décoratif */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-sm mb-6">
              <Link to="/" className="text-white/60 hover:text-white transition flex items-center gap-1">
                <Home size={14} /> Accueil
              </Link>
              <ChevronRight size={14} className="text-white/40" />
              <Link to="/actualites" className="text-white/60 hover:text-white transition">Actualités</Link>
              <ChevronRight size={14} className="text-white/40" />
              <span className="text-green-300">{article.titre?.substring(0, 40)}...</span>
            </div>

            {/* Catégorie */}
            {article.categorie && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm mb-5">
                <Tag size={14} className="text-green-300" />
                <span className="text-white text-sm font-medium">{article.categorie.nom}</span>
              </div>
            )}

            {/* Titre */}
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-4">
              {article.titre}
            </h1>

            {/* Métadonnées */}
            <div className="flex flex-wrap items-center justify-center gap-5 text-white/70 text-sm">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-green-300" />
                <span className="capitalize">{date}</span>
              </div>
              {article.vues > 0 && (
                <div className="flex items-center gap-2">
                  <Eye size={16} className="text-green-300" />
                  <span>{article.vues} vues</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-green-300" />
                <span>{Math.ceil((article.contenu?.length || 0) / 1000)} min de lecture</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vague décorative */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L1440 80L1440 30C1200 80 960 0 720 40C480 80 240 20 0 30L0 80Z" fill="#F9FAFB" />
          </svg>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Article principal - 2 colonnes */}
              <div className="lg:col-span-2">
                {/* Image de couverture */}
                {article.image && (
                  <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
                    <img 
                      src={`${STORAGE}/${article.image}`} 
                      alt={article.image_alt || article.titre}
                      className="w-full object-cover"
                    />
                  </div>
                )}

                {/* Extrait */}
                {article.extrait && (
                  <div className="bg-white rounded-2xl p-6 mb-8 border-l-4 border-green-500 shadow-sm">
                    <p className="text-gray-600 text-lg italic leading-relaxed">
                      {article.extrait}
                    </p>
                  </div>
                )}

                {/* Contenu HTML */}
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <div 
                    className="prose prose-lg max-w-none
                      prose-headings:text-gray-800 prose-headings:font-bold
                      prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                      prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                      prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4
                      prose-strong:text-gray-800 prose-strong:font-semibold
                      prose-ul:text-gray-600 prose-li:mb-2
                      prose-img:rounded-xl prose-img:shadow-md"
                    dangerouslySetInnerHTML={{ __html: article.contenu }} 
                  />
                </div>
              </div>

              {/* Sidebar - 1 colonne */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  
                  {/* À propos de l'auteur */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <User size={32} className="text-white" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-1">EPV MAREL</h3>
                    <p className="text-sm text-gray-500 mb-3">École Privée de la Vie</p>
                    <p className="text-xs text-gray-400">
                      Articles publiés par l'équipe pédagogique
                    </p>
                  </div>

                  {/* Articles similaires */}
                  {similaires.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                        <Newspaper size={18} className="text-green-600" />
                        <h3 className="font-bold text-gray-800">Articles similaires</h3>
                      </div>
                      <div className="space-y-3">
                        {similaires.map((a) => (
                          <Link 
                            key={a.id} 
                            to={`/actualites/${a.slug}`}
                            className="flex gap-3 p-3 rounded-xl hover:bg-gray-50 transition group"
                          >
                            <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                              {a.image ? (
                                <img 
                                  src={`${STORAGE}/${a.image}`} 
                                  alt={a.titre}
                                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <BookOpen size={20} className="text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-800 text-sm line-clamp-2 group-hover:text-green-600 transition">
                                {a.titre}
                              </h4>
                              <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                                <CalendarIcon size={10} />
                                {format(new Date(a.date_publication), 'd MMM yyyy', { locale: fr })}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA Contact */}
                  <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-2xl p-6 text-center text-white shadow-lg">
                    <Sparkles size={32} className="text-green-300 mx-auto mb-3" />
                    <h3 className="font-bold text-lg mb-2">Rejoignez EPV MAREL</h3>
                    <p className="text-white/80 text-sm mb-4">
                      Inscrivez votre enfant dans une école d'excellence
                    </p>
                    <Link 
                      to="/contact" 
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-green-700 rounded-xl font-semibold text-sm hover:bg-gray-100 transition"
                    >
                      Nous contacter <ArrowRight size={16} />
                    </Link>
                  </div>

                  {/* Stats rapides */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-green-600">100+</p>
                        <p className="text-xs text-gray-500">Articles</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">2025</p>
                        <p className="text-xs text-gray-500">Année scolaire</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">24/7</p>
                        <p className="text-xs text-gray-500">Accès en ligne</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">100%</p>
                        <p className="text-xs text-gray-500">Réussite</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}