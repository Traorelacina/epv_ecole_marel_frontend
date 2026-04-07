// ── ChiffresAdminPage ────────────────────────────────────────────────────────
import { useEffect, useState } from 'react'
import { adminService } from '@services/adminService'
import LoadingSpinner from '@components/common/LoadingSpinner'
import Modal from '@components/common/Modal'
import toast from 'react-hot-toast'

export function ChiffresAdminPage() {
  const [chiffres, setChiffres] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [modal,    setModal]    = useState(null)
  const [saving,   setSaving]   = useState(false)
  const [form,     setForm]     = useState({ label:'', valeur:'', suffixe:'', description:'', couleur:'#1B4F8A', actif:true })

  const load = () => { setLoading(true); adminService.getChiffres().then(r=>setChiffres(r.data?.chiffres||[])).catch(()=>{}).finally(()=>setLoading(false)) }
  useEffect(() => { load() }, [])

  const openAdd  = () => { setForm({ label:'', valeur:'', suffixe:'', description:'', couleur:'#1B4F8A', actif:true }); setModal({ mode:'add' }) }
  const openEdit = (c) => { setForm({ label:c.label, valeur:c.valeur, suffixe:c.suffixe||'', description:c.description||'', couleur:c.couleur||'#1B4F8A', actif:c.actif }); setModal({ mode:'edit', data:c }) }

  const save = async () => {
    setSaving(true)
    try {
      if (modal.mode==='add') await adminService.createChiffre(form)
      else await adminService.updateChiffre(modal.data.id, form)
      toast.success('Enregistré !'); setModal(null); load()
    } catch (_) { toast.error('Erreur') }
    setSaving(false)
  }

  const del = async (id) => { if(!confirm('Supprimer ?'))return; await adminService.deleteChiffre(id); toast.success('Supprimé'); load() }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between"><h1 className="font-display font-bold text-2xl text-gray-900">Chiffres clés</h1><button onClick={openAdd} className="btn-primary">+ Ajouter</button></div>
      {loading ? <div className="flex justify-center py-12"><LoadingSpinner /></div> : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {chiffres.map(c => (
            <div key={c.id} className="card p-5 text-center">
              <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: c.couleur+'20' }}>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.couleur }} />
              </div>
              <p className="font-display font-bold text-2xl" style={{ color: c.couleur }}>{c.valeur}{c.suffixe}</p>
              <p className="font-medium text-gray-900 text-sm mt-1">{c.label}</p>
              {c.description && <p className="text-xs text-gray-400 mt-0.5">{c.description}</p>}
              <div className="flex gap-1.5 mt-3 justify-center">
                <button onClick={() => openEdit(c)} className="btn-ghost text-xs px-3 py-1.5 border border-gray-200">Modifier</button>
                <button onClick={() => del(c.id)} className="px-3 py-1.5 rounded-lg text-xs text-red-500 hover:bg-red-50 transition-colors">Suppr.</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal open={!!modal} onClose={() => setModal(null)} title={modal?.mode==='add'?'Ajouter un chiffre':'Modifier'}>
        <div className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Label *</label><input value={form.label} onChange={e=>setForm(f=>({...f,label:e.target.value}))} placeholder="ex: Année de fondation" className="input-field" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Valeur *</label><input value={form.valeur} onChange={e=>setForm(f=>({...f,valeur:e.target.value}))} placeholder="ex: 100" className="input-field" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Suffixe</label><input value={form.suffixe} onChange={e=>setForm(f=>({...f,suffixe:e.target.value}))} placeholder="ex: %" className="input-field" /></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><input value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} className="input-field" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Couleur</label><input type="color" value={form.couleur} onChange={e=>setForm(f=>({...f,couleur:e.target.value}))} className="w-full h-10 rounded-xl border border-gray-200 cursor-pointer" /></div>
          <div className="flex gap-3 pt-2">
            <button onClick={()=>setModal(null)} className="btn-ghost flex-1 justify-center border border-gray-200">Annuler</button>
            <button onClick={save} disabled={saving} className="btn-primary flex-1 justify-center">{saving?<LoadingSpinner size="sm" color="white"/>:'Enregistrer'}</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ChiffresAdminPage