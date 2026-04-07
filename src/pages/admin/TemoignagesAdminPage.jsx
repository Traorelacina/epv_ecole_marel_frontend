// Fichier index regroupant les pages admin simples
// Chaque export default correspond au fichier requis dans App.jsx

// ── TemoignagesAdminPage ─────────────────────────────────────────────────────
import { useEffect, useState } from 'react'
import { adminService } from '@services/adminService'
import LoadingSpinner from '@components/common/LoadingSpinner'
import toast from 'react-hot-toast'

export function TemoignagesAdminPage() {
  const [temoignages, setTemoignages] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtre, setFiltre] = useState('')

  const load = () => {
    setLoading(true)
    const params = filtre !== '' ? { valide: filtre } : {}
    adminService.getTemoignages(params)
      .then(r => setTemoignages(r.data?.data || []))
      .catch(() => {}).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [filtre])

  const valider = async (id) => { await adminService.validerTemoignage(id); toast.success('Témoignage validé'); load() }
  const rejeter = async (id) => { await adminService.rejeterTemoignage(id); toast.success('Témoignage rejeté'); load() }
  const del     = async (id) => { if (!confirm('Supprimer ?')) return; await adminService.deleteTemoignage(id); toast.success('Supprimé'); load() }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="font-display font-bold text-2xl text-gray-900">Témoignages</h1>
        <div className="flex gap-2 text-sm">
          {[{k:'',l:'Tous'},{k:'false',l:'En attente'},{k:'true',l:'Validés'}].map(f => (
            <button key={f.k} onClick={() => setFiltre(f.k)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${filtre===f.k?'bg-primary text-white':'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'}`}>{f.l}</button>
          ))}
        </div>
      </div>
      <div className="card overflow-hidden">
        {loading ? <div className="flex justify-center py-12"><LoadingSpinner /></div> :
          temoignages.length === 0 ? <p className="text-center text-gray-400 py-12">Aucun témoignage</p> :
          <div className="divide-y divide-gray-50">
            {temoignages.map(t => (
              <div key={t.id} className="p-5 flex gap-4">
                <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary font-bold text-sm shrink-0">
                  {t.nom_parent?.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className="font-medium text-sm text-gray-900">{t.nom_parent}</p>
                    {t.nom_enfant && <span className="text-xs text-gray-400">· Parent de {t.nom_enfant} ({t.classe_enfant})</span>}
                    <div className="flex ml-auto">
                      {Array.from({length:5}).map((_,i)=>(
                        <svg key={i} className={`w-3.5 h-3.5 ${i<(t.note||5)?'text-secondary':'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 italic">"{t.contenu}"</p>
                  <div className="flex gap-2 mt-3">
                    {!t.valide && <button onClick={() => valider(t.id)} className="px-3 py-1 rounded-lg text-xs font-medium bg-green-100 text-green-700 hover:bg-green-200 transition-colors">Valider</button>}
                    {t.valide  && <button onClick={() => rejeter(t.id)} className="px-3 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">Rejeter</button>}
                    <button onClick={() => del(t.id)} className="px-3 py-1 rounded-lg text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors">Supprimer</button>
                    <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-medium ${t.valide?'bg-green-100 text-green-700':'bg-orange-100 text-orange-700'}`}>
                      {t.valide ? 'Validé' : 'En attente'}
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

export default TemoignagesAdminPage