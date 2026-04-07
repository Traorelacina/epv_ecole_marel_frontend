// ── EquipeAdminPage ──────────────────────────────────────────────────────────
import { useEffect, useState } from 'react'
import { adminService } from '@services/adminService'
import LoadingSpinner from '@components/common/LoadingSpinner'
import Modal from '@components/common/Modal'
import toast from 'react-hot-toast'

const STORAGE = import.meta.env.VITE_STORAGE_URL || 'http://localhost:8000/storage'

export function EquipeAdminPage() {
  const [equipe, setEquipe] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [saving, setSaving] = useState(false)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [form, setForm] = useState({ nom:'', prenom:'', role:'', classe:'', email:'', affiche:true, photo:null })

  const load = () => { setLoading(true); adminService.getEquipe().then(r => setEquipe(r.data?.equipe || [])).catch(()=>{}).finally(()=>setLoading(false)) }
  useEffect(() => { load() }, [])

  const openAdd = () => { setForm({ nom:'', prenom:'', role:'', classe:'', email:'', affiche:true, photo:null }); setPhotoPreview(null); setModal({ mode:'add' }) }
  const openEdit = (m) => { setForm({ nom:m.nom, prenom:m.prenom, role:m.role, classe:m.classe||'', email:m.email||'', affiche:m.affiche, photo:null }); setPhotoPreview(m.photo ? `${STORAGE}/${m.photo}` : null); setModal({ mode:'edit', data:m }) }

  const save = async () => {
    setSaving(true)
    const fd = new FormData()
    Object.entries(form).forEach(([k,v]) => { if (v !== null && v !== '') fd.append(k, v) })
    try {
      if (modal.mode === 'add') await adminService.createMembre(fd)
      else await adminService.updateMembre(modal.data.id, fd)
      toast.success('Enregistré !'); setModal(null); load()
    } catch (_) { toast.error('Erreur') }
    setSaving(false)
  }

  const del = async (id) => { if(!confirm('Supprimer ?'))return; await adminService.deleteMembre(id); toast.success('Supprimé'); load() }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between"><h1 className="font-display font-bold text-2xl text-gray-900">Équipe pédagogique</h1><button onClick={openAdd} className="btn-primary">+ Ajouter</button></div>
      {loading ? <div className="flex justify-center py-12"><LoadingSpinner /></div> : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {equipe.map(m => (
            <div key={m.id} className="card p-4 text-center">
              <div className="w-16 h-16 rounded-2xl mx-auto mb-3 overflow-hidden bg-primary/10">
                {m.photo ? <img src={`${STORAGE}/${m.photo}`} alt="" className="w-full h-full object-cover" /> :
                  <div className="w-full h-full flex items-center justify-center text-xl font-bold text-primary">{m.prenom?.charAt(0)}{m.nom?.charAt(0)}</div>}
              </div>
              <p className="font-semibold text-gray-900 text-sm">{m.prenom} {m.nom}</p>
              <p className="text-xs text-primary mt-0.5">{m.role}</p>
              {m.classe && <p className="text-xs text-gray-400 mt-0.5">{m.classe}</p>}
              <div className="flex gap-1.5 mt-3 justify-center">
                <button onClick={() => openEdit(m)} className="btn-ghost text-xs px-3 py-1.5 border border-gray-200">Modifier</button>
                <button onClick={() => del(m.id)} className="px-3 py-1.5 rounded-lg text-xs text-red-500 hover:bg-red-50 transition-colors">Suppr.</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal open={!!modal} onClose={() => setModal(null)} title={modal?.mode==='add'?'Ajouter un membre':'Modifier'}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label><input value={form.prenom} onChange={e=>setForm(f=>({...f,prenom:e.target.value}))} className="input-field" required /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label><input value={form.nom} onChange={e=>setForm(f=>({...f,nom:e.target.value}))} className="input-field" required /></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Rôle *</label><input value={form.role} onChange={e=>setForm(f=>({...f,role:e.target.value}))} placeholder="ex: Enseignante CP1" className="input-field" required /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Classe</label><input value={form.classe} onChange={e=>setForm(f=>({...f,classe:e.target.value}))} className="input-field" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} className="input-field" /></div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
            {photoPreview && <img src={photoPreview} className="w-16 h-16 rounded-xl object-cover mb-2" alt="" />}
            <input type="file" accept="image/*" onChange={e=>{const f=e.target.files[0];if(f){setForm(p=>({...p,photo:f}));setPhotoPreview(URL.createObjectURL(f))}}} className="input-field" />
          </div>
          <div className="flex items-center gap-2"><input type="checkbox" id="aff" checked={form.affiche} onChange={e=>setForm(f=>({...f,affiche:e.target.checked}))} className="w-4 h-4 text-primary rounded" /><label htmlFor="aff" className="text-sm text-gray-700">Afficher sur le site</label></div>
          <div className="flex gap-3 pt-2">
            <button onClick={()=>setModal(null)} className="btn-ghost flex-1 justify-center border border-gray-200">Annuler</button>
            <button onClick={save} disabled={saving} className="btn-primary flex-1 justify-center">{saving?<LoadingSpinner size="sm" color="white"/>:'Enregistrer'}</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default EquipeAdminPage