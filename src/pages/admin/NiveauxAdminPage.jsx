// ── NiveauxAdminPage ─────────────────────────────────────────────────────────
import { useEffect, useState } from 'react'
import { adminService } from '@services/adminService'
import Modal from '@components/common/Modal'
import LoadingSpinner from '@components/common/LoadingSpinner'
import toast from 'react-hot-toast'

export function NiveauxAdminPage() {
  const [niveaux,  setNiveaux]  = useState([])
  const [loading,  setLoading]  = useState(true)
  const [modal,    setModal]    = useState(null) // null | { mode:'add'|'edit', data? }
  const [saving,   setSaving]   = useState(false)
  const [form,     setForm]     = useState({ nom:'', age_min:'', description:'', couleur:'#1B4F8A', actif:true })
  const [errors,   setErrors]   = useState({})

  const load = () => {
    setLoading(true)
    adminService.getNiveaux().then(r => setNiveaux(r.data?.niveaux || [])).catch(() => {}).finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const openAdd  = () => { setForm({ nom:'', age_min:'', description:'', couleur:'#1B4F8A', actif:true }); setErrors({}); setModal({ mode:'add' }) }
  const openEdit = (n) => { setForm({ nom:n.nom, age_min:n.age_min||'', description:n.description||'', couleur:n.couleur||'#1B4F8A', actif:n.actif }); setErrors({}); setModal({ mode:'edit', data:n }) }

  const save = async () => {
    setSaving(true); setErrors({})
    try {
      if (modal.mode === 'add') await adminService.createNiveau(form)
      else await adminService.updateNiveau(modal.data.id, form)
      toast.success(modal.mode === 'add' ? 'Niveau créé !' : 'Niveau mis à jour !')
      setModal(null); load()
    } catch (err) { if (err.response?.data?.errors) setErrors(err.response.data.errors); else toast.error('Erreur') }
    setSaving(false)
  }

  const del = async (id) => {
    if (!confirm('Supprimer ce niveau ?')) return
    await adminService.deleteNiveau(id); toast.success('Niveau supprimé'); load()
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-display font-bold text-2xl text-gray-900">Niveaux scolaires</h1>
        <button onClick={openAdd} className="btn-primary">+ Ajouter</button>
      </div>
      <div className="card overflow-hidden">
        {loading ? <div className="flex justify-center py-12"><LoadingSpinner /></div> : (
          <div className="divide-y divide-gray-50">
            {niveaux.map(n => (
              <div key={n.id} className="flex items-center gap-4 p-4 hover:bg-gray-50">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: n.couleur }} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">{n.nom}</p>
                  {n.age_min && <p className="text-xs text-gray-400">Dès {n.age_min}</p>}
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${n.actif ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {n.actif ? 'Actif' : 'Inactif'}
                </span>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(n)} className="p-1.5 rounded-lg hover:bg-primary/10 text-gray-400 hover:text-primary transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </button>
                  <button onClick={() => del(n.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal?.mode === 'add' ? 'Ajouter un niveau' : 'Modifier le niveau'}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
            <input value={form.nom} onChange={e => setForm(f => ({...f, nom:e.target.value}))} className="input-field" />
            {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom[0]}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Âge minimum</label>
            <input value={form.age_min} onChange={e => setForm(f => ({...f, age_min:e.target.value}))} placeholder="ex: 6 mois, 5 ans" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea value={form.description} onChange={e => setForm(f => ({...f, description:e.target.value}))} rows={3} className="input-field resize-none" />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Couleur</label>
              <input type="color" value={form.couleur} onChange={e => setForm(f => ({...f, couleur:e.target.value}))} className="w-full h-10 rounded-xl border border-gray-200 cursor-pointer" />
            </div>
            <div className="flex items-end gap-2 pb-0.5">
              <input type="checkbox" id="actif" checked={form.actif} onChange={e => setForm(f => ({...f, actif:e.target.checked}))} className="w-4 h-4 text-primary rounded" />
              <label htmlFor="actif" className="text-sm text-gray-700">Actif</label>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setModal(null)} className="btn-ghost flex-1 justify-center border border-gray-200">Annuler</button>
            <button onClick={save} disabled={saving} className="btn-primary flex-1 justify-center">
              {saving ? <LoadingSpinner size="sm" color="white" /> : 'Enregistrer'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default NiveauxAdminPage