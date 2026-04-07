import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { adminService } from '@services/adminService'
import LoadingSpinner from '@components/common/LoadingSpinner'
import Modal from '@components/common/Modal'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import {
  FileText, Plus, Search, Filter, Eye, Edit2, Trash2,
  EyeOff, CheckCircle, Clock, Archive, Calendar, User,
  Tag, ChevronLeft, ChevronRight, AlertCircle
} from 'lucide-react'

const STATUT_STYLES = {
  publie:   { icon: CheckCircle, bg: 'bg-green-50', text: 'text-green-700', label: 'Publié' },
  brouillon: { icon: Clock, bg: 'bg-gray-50', text: 'text-gray-600', label: 'Brouillon' },
  archive:  { icon: Archive, bg: 'bg-orange-50', text: 'text-orange-700', label: 'Archivé' },
}

const ARTICLES_STYLES = `
  @keyframes articlesFadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes tableRowHover {
    0% { background-color: transparent; }
    100% { background-color: #F9FAFB; }
  }
  .articles-container {
    animation: articlesFadeIn 0.4s ease-out;
  }
  .table-row-hover:hover {
    animation: tableRowHover 0.2s ease forwards;
  }
`

export default function ArticlesAdminPage() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState(null)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [statut, setStatut] = useState('')
  const [deleteModal, setDeleteModal] = useState(null)

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
      toast.success(`Article ${next === 'publie' ? 'publié' : 'dépublié'} avec succès`)
      load()
    } catch (_) { toast.error('Erreur lors du changement de statut') }
  }

  const handleDelete = async () => {
    if (!deleteModal) return
    try {
      await adminService.deleteArticle(deleteModal.id)
      toast.success('Article supprimé définitivement')
      setDeleteModal(null)
      load()
    } catch (_) { toast.error('Erreur lors de la suppression') }
  }

  return (
    <>
      <style>{ARTICLES_STYLES}</style>
      
      <div className="articles-container space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FileText size={20} className="text-[#2D6A1F]" />
              <h1 className="font-display font-bold text-2xl text-gray-900">Articles & Blog</h1>
            </div>
            <p className="text-sm text-gray-500">
              {pagination?.total || 0} article{pagination?.total !== 1 ? 's' : ''} au total
            </p>
          </div>
          <Link to="/admin/articles/nouveau" className="btn-primary shrink-0 gap-2">
            <Plus size={16} />
            Nouvel article
          </Link>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col sm:flex-row gap-3 shadow-sm">
          <form onSubmit={handleSearch} className="flex gap-2 flex-1">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Rechercher un article..."
                className="input-field pl-9 py-2.5"
              />
            </div>
            <button type="submit" className="btn-primary px-5 py-2.5 text-sm">
              Rechercher
            </button>
          </form>
          <div className="relative">
            <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={statut}
              onChange={e => { setStatut(e.target.value); setPage(1) }}
              className="input-field pl-9 py-2.5 text-sm appearance-none pr-8 min-w-[140px]"
            >
              <option value="">Tous les statuts</option>
              <option value="publie">Publiés</option>
              <option value="brouillon">Brouillons</option>
              <option value="archive">Archivés</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner size="lg" />
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <FileText size={28} className="text-gray-300" />
              </div>
              <p className="text-gray-400 font-medium">Aucun article trouvé</p>
              <p className="text-sm text-gray-400 mt-1">Commencez par créer votre premier article</p>
              <Link to="/admin/articles/nouveau" className="btn-primary mt-6 inline-flex gap-2">
                <Plus size={16} />
                Créer un article
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                    {['Titre', 'Catégorie', 'Statut', 'Vues', 'Date', 'Actions'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {articles.map((article) => {
                    const statusConfig = STATUT_STYLES[article.statut] || STATUT_STYLES.brouillon
                    const StatusIcon = statusConfig.icon
                    
                    return (
                      <tr key={article.id} className="table-row-hover transition-colors">
                        <td className="px-4 py-3">
                          <p className="font-semibold text-gray-900 text-sm line-clamp-1 max-w-xs">
                            {article.titre}
                          </p>
                          {article.auteur && (
                            <div className="flex items-center gap-1 mt-1">
                              <User size={10} className="text-gray-400" />
                              <p className="text-xs text-gray-400">{article.auteur?.name}</p>
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {article.categorie ? (
                            <span
                              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-white"
                              style={{ backgroundColor: article.categorie.couleur || '#2D6A1F' }}
                            >
                              <Tag size={10} />
                              {article.categorie.nom}
                            </span>
                          ) : (
                            <span className="text-gray-300 text-xs">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                            <StatusIcon size={10} />
                            {statusConfig.label}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Eye size={12} />
                            {article.vues || 0}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <Calendar size={10} />
                            {article.date_publication
                              ? format(new Date(article.date_publication), 'd MMM yyyy', { locale: fr })
                              : 'Non publié'}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleToggleStatut(article)}
                              className="p-1.5 rounded-lg hover:bg-gray-100 transition-all text-gray-400 hover:text-[#8DC31E]"
                              title={article.statut === 'publie' ? 'Dépublier' : 'Publier'}
                            >
                              {article.statut === 'publie' ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                            <Link
                              to={`/admin/articles/${article.id}/modifier`}
                              className="p-1.5 rounded-lg hover:bg-gray-100 transition-all text-gray-400 hover:text-[#2D6A1F]"
                              title="Modifier"
                            >
                              <Edit2 size={15} />
                            </Link>
                            <button
                              onClick={() => setDeleteModal(article)}
                              className="p-1.5 rounded-lg hover:bg-red-50 transition-all text-gray-400 hover:text-red-500"
                              title="Supprimer"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination && pagination.last_page > 1 && (
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all
                ${page === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: Math.min(5, pagination.last_page) }, (_, i) => {
              let pNum
              if (pagination.last_page <= 5) pNum = i + 1
              else if (page <= 3) pNum = i + 1
              else if (page >= pagination.last_page - 2) pNum = pagination.last_page - 4 + i
              else pNum = page - 2 + i
              
              return (
                <button
                  key={pNum}
                  onClick={() => setPage(pNum)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-all
                    ${pNum === page
                      ? 'bg-gradient-to-r from-[#2D6A1F] to-[#1a4010] text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
                >
                  {pNum}
                </button>
              )
            })}
            <button
              onClick={() => setPage(p => Math.min(pagination.last_page, p + 1))}
              disabled={page === pagination.last_page}
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all
                ${page === pagination.last_page ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Modal suppression */}
        <Modal open={!!deleteModal} onClose={() => setDeleteModal(null)} title="Supprimer l'article" size="sm">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={22} className="text-red-500" />
            </div>
            <p className="text-gray-700 mb-2">
              Êtes-vous sûr de vouloir supprimer
            </p>
            <p className="font-semibold text-gray-900 mb-4">
              "{deleteModal?.titre}" ?
            </p>
            <p className="text-xs text-gray-400 mb-6">
              Cette action est irréversible.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModal(null)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-all"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2.5 px-4 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-all"
              >
                Supprimer
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  )
}