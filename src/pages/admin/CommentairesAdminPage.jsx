// ── CommentairesAdminPage ────────────────────────────────────────────────────
import { useEffect, useState } from 'react'
import { adminService } from '@services/adminService'
import LoadingSpinner from '@components/common/LoadingSpinner'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

export function CommentairesAdminPage() {
  const [comments, setComments] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [filtre,   setFiltre]   = useState('') // '' | 'true' | 'false'

  const load = () => {
    setLoading(true)
    const params = filtre !== '' ? { approuve: filtre } : {}
    adminService.getCommentaires(params)
      .then(r => setComments(r.data?.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [filtre])

  const approve = async (id) => {
    await adminService.approveComment(id)
    toast.success('Commentaire approuvé')
    load()
  }
  const reject = async (id) => {
    await adminService.rejectComment(id)
    toast.success('Commentaire rejeté')
    load()
  }
  const del = async (id) => {
    if (!confirm('Supprimer ce commentaire ?')) return
    await adminService.deleteComment(id)
    toast.success('Commentaire supprimé')
    load()
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="font-display font-bold text-2xl text-gray-900">Commentaires</h1>
        <div className="flex gap-2 text-sm">
          {[{ k:'', l:'Tous' },{ k:'false', l:'En attente' },{ k:'true', l:'Approuvés' }].map(f => (
            <button key={f.k} onClick={() => setFiltre(f.k)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                filtre === f.k ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
              }`}>{f.l}</button>
          ))}
        </div>
      </div>

      <div className="card overflow-hidden">
        {loading ? <div className="flex justify-center py-12"><LoadingSpinner /></div> :
          comments.length === 0 ? <p className="text-center text-gray-400 py-12">Aucun commentaire</p> :
          <div className="divide-y divide-gray-50">
            {comments.map(c => (
              <div key={c.id} className="p-5 flex gap-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold text-sm">{c.nom?.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className="font-medium text-sm text-gray-900">{c.nom}</p>
                    <span className="text-xs text-gray-400">{c.email}</span>
                    <span className="text-xs text-gray-400 ml-auto">
                      {format(new Date(c.created_at), 'd MMM yyyy', { locale: fr })}
                    </span>
                  </div>
                  {c.article && (
                    <p className="text-xs text-primary mb-1">Sur : {c.article.titre}</p>
                  )}
                  <p className="text-sm text-gray-600 leading-relaxed">{c.contenu}</p>
                  <div className="flex gap-2 mt-3">
                    {!c.approuve && (
                      <button onClick={() => approve(c.id)}
                        className="px-3 py-1 rounded-lg text-xs font-medium bg-green-100 text-green-700 hover:bg-green-200 transition-colors">
                        Approuver
                      </button>
                    )}
                    {c.approuve && (
                      <button onClick={() => reject(c.id)}
                        className="px-3 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                        Rejeter
                      </button>
                    )}
                    <button onClick={() => del(c.id)}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                      Supprimer
                    </button>
                    <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-medium ${
                      c.approuve ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {c.approuve ? 'Approuvé' : 'En attente'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  )
}

export default CommentairesAdminPage