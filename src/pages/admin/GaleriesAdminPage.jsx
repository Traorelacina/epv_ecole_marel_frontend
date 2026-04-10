// ── GaleriesAdminPage ───────────────────────────────────────────────────────
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { adminService } from '@services/adminService'
import LoadingSpinner from '@components/common/LoadingSpinner'
import Modal from '@components/common/Modal'
import toast from 'react-hot-toast'
import { 
  Plus, Edit2, Trash2, Eye, EyeOff, Image, Calendar, 
  FolderOpen, ChevronRight, AlertCircle, CheckCircle, X
} from 'lucide-react'

const STORAGE = import.meta.env.VITE_STORAGE_URL || 'http://localhost:8000/storage'

const CATEGORY_LABELS = {
  sorties: 'Sorties',
  ceremonies: 'Cérémonies',
  activites: 'Activités',
  resultats: 'Résultats',
  autres: 'Autres'
}

const CATEGORY_COLORS = {
  sorties: '#8DC31E',
  ceremonies: '#D4191A',
  activites: '#2D6A1F',
  resultats: '#F59E0B',
  autres: '#6B7280'
}

export function GaleriesAdminPage() {
  const [galeries, setGaleries] = useState([])
  const [loading, setLoading] = useState(true)
  const [delModal, setDelModal] = useState(null)
  const [filter, setFilter] = useState('all')

  const load = () => {
    setLoading(true)
    adminService.getGaleries({ per_page: 20 })
      .then(r => setGaleries(r.data?.data || []))
      .catch(() => toast.error('Erreur de chargement'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const togglePublier = async (id) => {
    try {
      await adminService.togglePublierGalerie(id)
      toast.success('Statut mis à jour')
      load()
    } catch (_) {
      toast.error('Erreur lors de la mise à jour')
    }
  }

  const handleDelete = async () => {
    if (!delModal) return
    try {
      await adminService.deleteGalerie(delModal.id)
      toast.success('Galerie supprimée')
      setDelModal(null)
      load()
    } catch (_) { 
      toast.error('Erreur lors de la suppression') 
    }
  }

  const filteredGaleries = filter === 'all' 
    ? galeries 
    : galeries.filter(g => g.publiee === (filter === 'published'))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FolderOpen size={22} className="text-[#2D6A1F]" />
            <h1 className="font-display font-bold text-2xl text-gray-900">Galeries</h1>
          </div>
          <p className="text-sm text-gray-500">
            {galeries.length} galerie(s) au total
          </p>
        </div>
        <Link to="/admin/galeries/nouvelle" className="btn-primary gap-2">
          <Plus size={16} />
          Nouvelle galerie
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            filter === 'all' 
              ? 'bg-[#2D6A1F] text-white shadow-md' 
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          Toutes
        </button>
        <button
          onClick={() => setFilter('published')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            filter === 'published' 
              ? 'bg-[#2D6A1F] text-white shadow-md' 
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          Publiées
        </button>
        <button
          onClick={() => setFilter('draft')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            filter === 'draft' 
              ? 'bg-[#2D6A1F] text-white shadow-md' 
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          Brouillons
        </button>
      </div>

      {/* Galeries Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <LoadingSpinner size="lg" />
        </div>
      ) : filteredGaleries.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <FolderOpen size={32} className="text-gray-300" />
          </div>
          <p className="text-gray-400 font-medium">Aucune galerie trouvée</p>
          <Link to="/admin/galeries/nouvelle" className="btn-primary mt-6 inline-flex gap-2">
            <Plus size={16} />
            Créer une galerie
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredGaleries.map(g => (
            <div key={g.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
              {/* Image */}
              <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
                {g.image_couverture ? (
                  <img 
                    src={`${STORAGE}/${g.image_couverture}`} 
                    alt={g.titre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image size={48} className="text-gray-300" />
                  </div>
                )}
                {/* Status Badge */}
                <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 ${
                  g.publiee 
                    ? 'bg-green-500 text-white shadow-sm' 
                    : 'bg-gray-500 text-white shadow-sm'
                }`}>
                  {g.publiee ? <Eye size={10} /> : <EyeOff size={10} />}
                  {g.publiee ? 'Publiée' : 'Brouillon'}
                </div>
                {/* Category Badge */}
                <div 
                  className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md text-xs font-medium text-white shadow-sm"
                  style={{ backgroundColor: CATEGORY_COLORS[g.categorie] || '#6B7280' }}
                >
                  {CATEGORY_LABELS[g.categorie] || g.categorie}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-base line-clamp-1 mb-1">
                  {g.titre}
                </h3>
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={11} />
                    {g.annee || new Date().getFullYear()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Image size={11} />
                    {g.medias_count || 0} média(s)
                  </span>
                </div>
                
                {/* Actions */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                  <button 
                    onClick={() => togglePublier(g.id)}
                    className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${
                      g.publiee 
                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                        : 'bg-green-50 text-green-700 hover:bg-green-100'
                    }`}
                  >
                    {g.publiee ? 'Dépublier' : 'Publier'}
                  </button>
                  <Link 
                    to={`/admin/galeries/${g.id}/modifier`}
                    className="p-2 rounded-xl hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-all"
                    title="Modifier"
                  >
                    <Edit2 size={15} />
                  </Link>
                  <button 
                    onClick={() => setDelModal(g)}
                    className="p-2 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all"
                    title="Supprimer"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      <Modal open={!!delModal} onClose={() => setDelModal(null)} title="Supprimer la galerie" size="sm">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={22} className="text-red-500" />
          </div>
          <p className="text-gray-700 mb-2">
            Êtes-vous sûr de vouloir supprimer
          </p>
          <p className="font-semibold text-gray-900 mb-4">
            "{delModal?.titre}" ?
          </p>
          <p className="text-xs text-gray-400 mb-6">
            Cette action supprimera également tous les médias associés.
          </p>
          <div className="flex gap-3">
            <button 
              onClick={() => setDelModal(null)} 
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-all"
            >
              Annuler
            </button>
            <button 
              onClick={handleDelete} 
              className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-all"
            >
              Supprimer
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default GaleriesAdminPage