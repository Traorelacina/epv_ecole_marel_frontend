// ── CalendrierAdminPage ──────────────────────────────────────────────────────
import { useEffect, useState } from 'react'
import { adminService } from '@services/adminService'
import LoadingSpinner from '@components/common/LoadingSpinner'
import Modal from '@components/common/Modal'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const TYPE_COLORS = { vacances:'#E67E22', rentree:'#2ECC71', examen:'#E74C3C', evenement:'#1B4F8A', fermeture:'#9B59B6', autre:'#95A5A6' }

export function CalendrierAdminPage() {
  const [events,  setEvents]  = useState([])
  const [loading, setLoading] = useState(true)
  const [modal,   setModal]   = useState(null)
  const [saving,  setSaving]  = useState(false)
  const [form,    setForm]    = useState({ titre:'', date_debut:'', date_fin:'', type:'evenement', concerne:'Tous', couleur:'#1B4F8A', actif:true, description:'' })

  const load = () => { setLoading(true); adminService.getCalendrier().then(r=>setEvents(r.data?.calendrier||[])).catch(()=>{}).finally(()=>setLoading(false)) }
  useEffect(() => { load() }, [])

  const openAdd  = () => { setForm({ titre:'', date_debut:'', date_fin:'', type:'evenement', concerne:'Tous', couleur:'#1B4F8A', actif:true, description:'' }); setModal({ mode:'add' }) }
  const openEdit = (e) => { setForm({ titre:e.titre, date_debut:e.date_debut, date_fin:e.date_fin||'', type:e.type, concerne:e.concerne||'Tous', couleur:e.couleur||'#1B4F8A', actif:e.actif, description:e.description||'' }); setModal({ mode:'edit', data:e }) }

  const save = async () => {
    setSaving(true)
    try {
      if (modal.mode==='add') await adminService.createEvenement(form)
      else await adminService.updateEvenement(modal.data.id, form)
      toast.success('Enregistré !'); setModal(null); load()
    } catch (_) { toast.error('Erreur') }
    setSaving(false)
  }

  const del = async (id) => { if(!confirm('Supprimer ?'))return; await adminService.deleteEvenement(id); toast.success('Supprimé'); load() }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between"><h1 className="font-display font-bold text-2xl text-gray-900">Calendrier scolaire</h1><button onClick={openAdd} className="btn-primary">+ Ajouter</button></div>
      <div className="card overflow-hidden">
        {loading ? <div className="flex justify-center py-12"><LoadingSpinner /></div> :
          events.length === 0 ? <p className="text-center text-gray-400 py-12">Aucun événement</p> :
          <div className="divide-y divide-gray-50">
            {events.map(ev => (
              <div key={ev.id} className="flex items-center gap-4 p-4 hover:bg-gray-50">
                <div className="w-2 h-10 rounded-full shrink-0" style={{ backgroundColor: TYPE_COLORS[ev.type] || '#95A5A6' }} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm">{ev.titre}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {format(new Date(ev.date_debut), 'd MMM yyyy', { locale: fr })}
                    {ev.date_fin && ` → ${format(new Date(ev.date_fin), 'd MMM yyyy', { locale: fr })}`}
                    {ev.concerne && ` · ${ev.concerne}`}
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium text-white capitalize" style={{ backgroundColor: TYPE_COLORS[ev.type] || '#95A5A6' }}>{ev.type}</span>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(ev)} className="p-1.5 rounded-lg hover:bg-primary/10 text-gray-400 hover:text-primary transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                  </button>
                  <button onClick={() => del(ev.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
      <Modal open={!!modal} onClose={() => setModal(null)} title={modal?.mode==='add'?'Ajouter un événement':'Modifier'}>
        <div className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Titre *</label><input value={form.titre} onChange={e=>setForm(f=>({...f,titre:e.target.value}))} className="input-field" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Date début *</label><input type="date" value={form.date_debut} onChange={e=>setForm(f=>({...f,date_debut:e.target.value}))} className="input-field" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Date fin</label><input type="date" value={form.date_fin} onChange={e=>setForm(f=>({...f,date_fin:e.target.value}))} className="input-field" /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
              <select value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))} className="input-field">
                {['vacances','rentree','examen','evenement','fermeture','autre'].map(t=><option key={t} value={t} className="capitalize">{t}</option>)}
              </select>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Concerne</label><input value={form.concerne} onChange={e=>setForm(f=>({...f,concerne:e.target.value}))} placeholder="Tous, Primaire…" className="input-field" /></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} rows={2} className="input-field resize-none" /></div>
          <div className="flex gap-3 pt-2">
            <button onClick={()=>setModal(null)} className="btn-ghost flex-1 justify-center border border-gray-200">Annuler</button>
            <button onClick={save} disabled={saving} className="btn-primary flex-1 justify-center">{saving?<LoadingSpinner size="sm" color="white"/>:'Enregistrer'}</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default CalendrierAdminPage