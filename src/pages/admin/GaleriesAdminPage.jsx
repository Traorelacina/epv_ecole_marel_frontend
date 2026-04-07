// ── GaleriesAdminPage ───────────────────────────────────────────────────────
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { adminService } from '@services/adminService'
import LoadingSpinner from '@components/common/LoadingSpinner'
import Modal from '@components/common/Modal'
import toast from 'react-hot-toast'

const STORAGE = import.meta.env.VITE_STORAGE_URL || 'http://localhost:8000/storage'

export function GaleriesAdminPage() {
  const [galeries, setGaleries] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [delModal, setDelModal] = useState(null)

  const load = () => {
    setLoading(true)
    adminService.getGaleries({ per_page: 20 })
      .then(r => setGaleries(r.data?.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const togglePublier = async (id) => {
    await adminService.togglePublierGalerie(id)
    toast.success('Statut mis à jour')
    load()
  }

  const handleDelete = async () => {
    if (!delModal) return
    try {
      await adminService.deleteGalerie(delModal.id)
      toast.success('Galerie supprimée')
      setDelModal(null)
      load()
    } catch (_) { toast.error('Erreur') }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-display font-bold text-2xl text-gray-900">Galeries</h1>
        <Link to="/admin/galeries/nouvelle" className="btn-primary">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nouvelle galerie
        </Link>
      </div>

      {loading ? <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div> : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {galeries.map(g => (
            <div key={g.id} className="card overflow-hidden group">
              <div className="aspect-video bg-gray-100 relative overflow-hidden">
                {g.image_couverture ? (
                  <img src={`${STORAGE}/${g.image_couverture}`} alt={g.titre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-3xl text-gray-300">🖼️</div>
                )}
                <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                  g.publiee ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'
                }`}>
                  {g.publiee ? 'Publiée' : 'Brouillon'}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 text-sm truncate">{g.titre}</h3>
                <p className="text-xs text-gray-400 mt-0.5 capitalize">{g.categorie} · {g.medias_count || 0} média(s)</p>
                <div className="flex items-center gap-1.5 mt-3">
                  <button onClick={() => togglePublier(g.id)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      g.publiee ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}>
                    {g.publiee ? 'Dépublier' : 'Publier'}
                  </button>
                  <Link to={`/admin/galeries/${g.id}/modifier`}
                    className="p-1.5 rounded-lg hover:bg-primary/10 text-gray-400 hover:text-primary transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </Link>
                  <button onClick={() => setDelModal(g)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={!!delModal} onClose={() => setDelModal(null)} title="Supprimer la galerie" size="sm">
        <p className="text-gray-600 mb-6">Supprimer <strong>"{delModal?.titre}"</strong> et tous ses médias ?</p>
        <div className="flex gap-3">
          <button onClick={() => setDelModal(null)} className="btn-ghost flex-1 justify-center border border-gray-200">Annuler</button>
          <button onClick={handleDelete} className="flex-1 py-2.5 px-4 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors">Supprimer</button>
        </div>
      </Modal>
    </div>
  )
}

export default GaleriesAdminPage