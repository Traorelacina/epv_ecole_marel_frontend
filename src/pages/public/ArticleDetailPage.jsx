import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { publicService } from '@services/publicService'
import Breadcrumb from '@components/common/Breadcrumb'
import LoadingSpinner from '@components/common/LoadingSpinner'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const STORAGE = import.meta.env.VITE_STORAGE_URL || 'http://localhost:8000/storage'

function CommentForm({ slug, onSuccess }) {
  const [form,    setForm]    = useState({ nom: '', email: '', contenu: '' })
  const [loading, setLoading] = useState(false)
  const [errors,  setErrors]  = useState({})

  const handle = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})
    try {
      await publicService.postComment(slug, form)
      toast.success('Commentaire soumis ! Il sera visible après modération.')
      setForm({ nom: '', email: '', contenu: '' })
      onSuccess?.()
    } catch (err) {
      if (err.response?.data?.errors) setErrors(err.response.data.errors)
      else toast.error('Impossible d\'envoyer le commentaire.')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handle} className="card p-6 space-y-4">
      <h3 className="font-display font-semibold text-lg text-gray-900">Laisser un commentaire</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <input value={form.nom} onChange={e => setForm(f => ({ ...f, nom: e.target.value }))}
            placeholder="Votre nom *" className="input-field" required />
          {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom[0]}</p>}
        </div>
        <div>
          <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            placeholder="Votre email *" className="input-field" required />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
        </div>
      </div>
      <div>
        <textarea value={form.contenu} onChange={e => setForm(f => ({ ...f, contenu: e.target.value }))}
          placeholder="Votre commentaire *" rows={4} className="input-field resize-none" required />
        {errors.contenu && <p className="text-red-500 text-xs mt-1">{errors.contenu[0]}</p>}
      </div>
      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? <LoadingSpinner size="sm" color="white" /> : 'Publier le commentaire'}
      </button>
    </form>
  )
}

export default function ArticleDetailPage() {
  const { slug } = useParams()
  const [article,   setArticle]   = useState(null)
  const [similaires,setSimilaires]= useState([])
  const [loading,   setLoading]   = useState(true)

  const load = async () => {
    try {
      const res = await publicService.getArticle(slug)
      setArticle(res.data?.article)
      setSimilaires(res.data?.similaires || [])
    } catch (_) {}
    setLoading(false)
  }

  useEffect(() => { load() }, [slug])

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-20"><LoadingSpinner size="lg" /></div>
  if (!article) return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-20">
      <p className="text-2xl font-display text-gray-400">Article introuvable</p>
      <Link to="/actualites" className="btn-primary mt-6">Retour aux actualités</Link>
    </div>
  )

  const date = article.date_publication
    ? format(new Date(article.date_publication), 'EEEE d MMMM yyyy', { locale: fr })
    : ''

  return (
    <>
      <Helmet>
        <title>{article.meta_titre || article.titre} — EPV MAREL</title>
        <meta name="description" content={article.meta_description || article.extrait || ''} />
      </Helmet>

      {/* Hero article */}
      <section className="relative bg-gradient-to-br from-primary to-primary-dark pt-28 pb-12">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="container-custom relative z-10 max-w-4xl">
          <Breadcrumb items={[{ to: '/actualites', label: 'Actualités' }, { label: article.titre }]} />
          <div className="mt-6">
            {article.categorie && (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white mb-4"
                style={{ backgroundColor: article.categorie.couleur || '#E67E22' }}>
                {article.categorie.nom}
              </span>
            )}
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
              {article.titre}
            </h1>
            <div className="flex items-center gap-4 text-white/60 text-sm">
              <span className="capitalize">{date}</span>
              {article.vues > 0 && <span>· {article.vues} vues</span>}
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom max-w-4xl py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Contenu principal */}
          <div className="lg:col-span-2">
            {article.image && (
              <img src={`${STORAGE}/${article.image}`} alt={article.image_alt || article.titre}
                className="w-full rounded-2xl mb-8 shadow-card" />
            )}
            {article.extrait && (
              <p className="text-lg text-gray-600 font-medium leading-relaxed border-l-4 border-secondary pl-4 mb-8 italic">
                {article.extrait}
              </p>
            )}
            <div className="prose-article" dangerouslySetInnerHTML={{ __html: article.contenu }} />

            {/* Partage réseaux */}
            <div className="mt-10 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-3">Partager cet article :</p>
              <div className="flex gap-3">
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1877F2]/10 text-[#1877F2] text-sm font-medium hover:bg-[#1877F2]/20 transition-colors">
                  Facebook
                </a>
                <a href={`https://wa.me/?text=${encodeURIComponent(article.titre + ' - ' + window.location.href)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366]/10 text-[#25D366] text-sm font-medium hover:bg-[#25D366]/20 transition-colors">
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Commentaires */}
            <div className="mt-12">
              <h2 className="font-display font-bold text-2xl text-gray-900 mb-6">
                Commentaires ({article.commentaires?.length || 0})
              </h2>
              {article.commentaires?.length > 0 && (
                <div className="space-y-4 mb-8">
                  {article.commentaires.map((c) => (
                    <div key={c.id} className="bg-gray-50 rounded-2xl p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-bold text-sm">{c.nom?.charAt(0)?.toUpperCase()}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{c.nom}</p>
                          <p className="text-xs text-gray-400">
                            {format(new Date(c.created_at), 'd MMM yyyy', { locale: fr })}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{c.contenu}</p>
                    </div>
                  ))}
                </div>
              )}
              <CommentForm slug={slug} onSuccess={load} />
            </div>
          </div>

          {/* Sidebar articles similaires */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {similaires.length > 0 && (
                <div>
                  <h3 className="font-display font-bold text-lg text-gray-900 mb-4">Articles similaires</h3>
                  <div className="space-y-4">
                    {similaires.map((a) => (
                      <Link key={a.id} to={`/actualites/${a.slug}`}
                        className="flex gap-3 group p-3 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-primary/10 shrink-0">
                          {a.image ? (
                            <img src={`${STORAGE}/${a.image}`} alt={a.titre}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-primary/30 text-2xl">📰</div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                            {a.titre}
                          </p>
                          {a.date_publication && (
                            <p className="text-xs text-gray-400 mt-1">
                              {format(new Date(a.date_publication), 'd MMM yyyy', { locale: fr })}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA contact */}
              <div className="mt-8 p-5 rounded-2xl bg-primary text-white">
                <p className="font-display font-semibold text-base mb-2">Intéressé par l'EPV MAREL ?</p>
                <p className="text-white/70 text-sm mb-4">Contactez-nous pour toute demande d'inscription.</p>
                <Link to="/contact" className="block text-center px-4 py-2.5 rounded-xl bg-white text-primary
                  text-sm font-semibold hover:bg-gray-100 transition-colors">
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}