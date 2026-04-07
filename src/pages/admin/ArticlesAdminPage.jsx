import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { adminService } from '@services/adminService'
import LoadingSpinner from '@components/common/LoadingSpinner'
import Modal from '@components/common/Modal'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const STATUT_STYLES = {
  publie:   'bg-green-100 text-green-700',
  brouillon:'bg-gray-100 text-gray-600',
  archive:  'bg-orange-100 text-orange-700',
}

export default function ArticlesAdminPage() {
  const [articles,  setArticles]  = useState([])
  const [loading,   setLoading]   = useState(true)
  const [pagination,setPagination]= useState(null)
  const [page,      setPage]      = useState(1)
  const [search,    setSearch]    = useState('')
  const [statut,    setStatut]    = useState('')
  const [deleteModal,setDeleteModal]= useState(null)

  const load = async () => {
    setLoading(true)
    try {
      const res = await adminService.getArticles({ page, search, statut, per_page: 15 })
      setArticles(res.data?.data || [])
      setPagination(res.data)
    } catch (_) {}
    setLoading(false)
  }

  useEffect(() => { load() }, [page, statut])

  const handleSearch = (e) => { e.preventDefault(); setPage(1); load() }

  const handleToggleStatut = async (article) => {
    const next = article.statut === 'publie' ? 'brouillon' : 'publie'
    try {
      await adminService.toggleStatutArticle(article.id, { statut: next })
      toast.success(`Article ${next === 'publie' ? 'publié' : 'dépublié'}`)
      load()
    } catch (_) { toast.error('Erreur lors du changement de statut') }
  }

  const handleDelete = async () => {
    if (!deleteModal) return
    try {
      await adminService.deleteArticle(deleteModal.id)
      toast.success('Article supprimé')
      setDeleteModal(null)
      load()
    } catch (_) { toast.error('Erreur lors de la suppression') }
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-gray-900">Articles & Blog</h1>
          <p className="text-sm text-gray-500 mt-0.5">{pagination?.total || 0} article(s) au total</p>
        </div>
        <Link to="/admin/articles/nouveau" className="btn-primary shrink-0">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nouvel article
        </Link>
      </div>

      {/* Filtres */}
      <div className="card p-4 flex flex-col sm:flex-row gap-3">
        <form onSubmit={handleSearch} className="flex gap-2 flex-1">
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher…" className="input-field flex-1 py-2.5" />
          <button type="submit" className="btn-primary px-4 py-2.5 text-sm">Rechercher</button>
        </form>
        <select value={statut} onChange={e => { setStatut(e.target.value); setPage(1) }}
          className="input-field w-auto py-2.5 text-sm">
          <option value="">Tous les statuts</option>
          <option value="publie">Publiés</option>
          <option value="brouillon">Brouillons</option>
          <option value="archive">Archivés</option>
        </select>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16"><LoadingSpinner size="lg" /></div>
        ) : articles.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">📰</p>
            <p className="text-gray-400">Aucun article trouvé</p>
            <Link to="/admin/articles/nouveau" className="btn-primary mt-4 inline-flex">Créer un article</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['Titre', 'Catégorie', 'Statut', 'Vues', 'Date', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {articles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900 text-sm line-clamp-1 max-w-xs">{article.titre}</p>
                      {article.auteur && <p className="text-xs text-gray-400 mt-0.5">{article.auteur?.name}</p>}
                    </td>
                    <td className="px-4 py-3">
                      {article.categorie ? (
                        <span className="px-2 py-0.5 rounded-lg text-xs font-medium text-white"
                          style={{ backgroundColor: article.categorie.couleur }}>
                          {article.categorie.nom}
                        </span>
                      ) : <span className="text-gray-300 text-xs">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize ${STATUT_STYLES[article.statut]}`}>
                        {article.statut}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{article.vues}</td>
                    <td className="px-4 py-3 text-xs text-gray-400">
                      {article.date_publication
                        ? format(new Date(article.date_publication), 'd MMM yyyy', { locale: fr })
                        : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleToggleStatut(article)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-green-600"
                          title={article.statut === 'publie' ? 'Dépublier' : 'Publier'}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d={article.statut === 'publie'
                                ? 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
                                : 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'} />
                          </svg>
                        </button>
                        <Link to={`/admin/articles/${article.id}/modifier`}
                          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-primary">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                        <button onClick={() => setDeleteModal(article)}
                          className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-gray-400 hover:text-red-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.last_page > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => setPage(p)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                p === page ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
              }`}>{p}</button>
          ))}
        </div>
      )}

      {/* Modal suppression */}
      <Modal open={!!deleteModal} onClose={() => setDeleteModal(null)} title="Supprimer l'article" size="sm">
        <p className="text-gray-600 mb-6">
          Êtes-vous sûr de vouloir supprimer <strong>"{deleteModal?.titre}"</strong> ?
          Cette action est irréversible.
        </p>
        <div className="flex gap-3">
          <button onClick={() => setDeleteModal(null)} className="btn-ghost flex-1 justify-center border border-gray-200">
            Annuler
          </button>
          <button onClick={handleDelete} className="flex-1 py-2.5 px-4 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors">
            Supprimer
          </button>
        </div>
      </Modal>
    </div>
  )
}