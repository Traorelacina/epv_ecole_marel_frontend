// ── HorairesAdminPage ────────────────────────────────────────────────────────
import { useEffect, useState } from 'react'
import { adminService } from '@services/adminService'
import LoadingSpinner from '@components/common/LoadingSpinner'
import Modal from '@components/common/Modal'
import toast from 'react-hot-toast'

export function HorairesAdminPage() {
  const [horaires, setHoraires] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [modal,    setModal]    = useState(null)
  const [saving,   setSaving]   = useState(false)
  const [form,     setForm]     = useState({ niveau:'', periode:'', heure_debut:'', heure_fin:'', jours:'Lundi au Vendredi', notes:'' })

  const load = () => { setLoading(true); adminService.getHoraires().then(r=>setHoraires(r.data?.horaires||[])).catch(()=>{}).finally(()=>setLoading(false)) }
  useEffect(() => { load() }, [])

  const openAdd  = () => { setForm({ niveau:'', periode:'', heure_debut:'', heure_fin:'', jours:'Lundi au Vendredi', notes:'' }); setModal({ mode:'add' }) }
  const openEdit = (h) => { setForm({ niveau:h.niveau, periode:h.periode, heure_debut:h.heure_debut?.slice(0,5)||'', heure_fin:h.heure_fin?.slice(0,5)||'', jours:h.jours||'Lundi au Vendredi', notes:h.notes||'' }); setModal({ mode:'edit', data:h }) }

  const save = async () => {
    setSaving(true)
    try {
      if (modal.mode==='add') await adminService.createHoraire(form)
      else await adminService.updateHoraire(modal.data.id, form)
      toast.success('Enregistré !'); setModal(null); load()
    } catch (_) { toast.error('Erreur') }
    setSaving(false)
  }

  const del = async (id) => { if(!confirm('Supprimer ?'))return; await adminService.deleteHoraire(id); toast.success('Supprimé'); load() }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between"><h1 className="font-display font-bold text-2xl text-gray-900">Horaires scolaires</h1><button onClick={openAdd} className="btn-primary">+ Ajouter</button></div>
      <div className="card overflow-hidden">
        {loading ? <div className="flex justify-center py-12"><LoadingSpinner /></div> :
          horaires.length === 0 ? <p className="text-center text-gray-400 py-12">Aucun horaire</p> : (
          <table className="w-full">
            <thead><tr className="bg-gray-50 border-b border-gray-100">{['Niveau','Période','Horaire','Jours','Actions'].map(h=><th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-50">
              {horaires.map(h => (
                <tr key={h.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900 text-sm">{h.niveau}</td>
                  <td className="px-4 py-3 text-gray-600 text-sm">{h.periode}</td>
                  <td className="px-4 py-3"><span className="font-mono text-primary text-sm">{h.heure_debut?.slice(0,5)} — {h.heure_fin?.slice(0,5)}</span></td>
                  <td className="px-4 py-3 text-gray-500 text-sm">{h.jours}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={()=>openEdit(h)} className="p-1.5 rounded-lg hover:bg-primary/10 text-gray-400 hover:text-primary transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg></button>
                      <button onClick={()=>del(h.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Modal open={!!modal} onClose={()=>setModal(null)} title={modal?.mode==='add'?'Ajouter un horaire':'Modifier'}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Niveau *</label><input value={form.niveau} onChange={e=>setForm(f=>({...f,niveau:e.target.value}))} placeholder="ex: Maternelle" className="input-field" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Période *</label><input value={form.periode} onChange={e=>setForm(f=>({...f,periode:e.target.value}))} placeholder="ex: Matin" className="input-field" /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Heure début *</label><input type="time" value={form.heure_debut} onChange={e=>setForm(f=>({...f,heure_debut:e.target.value}))} className="input-field" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Heure fin *</label><input type="time" value={form.heure_fin} onChange={e=>setForm(f=>({...f,heure_fin:e.target.value}))} className="input-field" /></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Jours</label><input value={form.jours} onChange={e=>setForm(f=>({...f,jours:e.target.value}))} className="input-field" /></div>
          <div className="flex gap-3 pt-2">
            <button onClick={()=>setModal(null)} className="btn-ghost flex-1 justify-center border border-gray-200">Annuler</button>
            <button onClick={save} disabled={saving} className="btn-primary flex-1 justify-center">{saving?<LoadingSpinner size="sm" color="white"/>:'Enregistrer'}</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default HorairesAdminPage