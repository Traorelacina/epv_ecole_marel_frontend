// ── UsersAdminPage ───────────────────────────────────────────────────────────
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { adminService } from '@services/adminService'
import LoadingSpinner from '@components/common/LoadingSpinner'
import Modal from '@components/common/Modal'
import toast from 'react-hot-toast'

const ROLE_STYLES = { super_admin:'bg-purple-100 text-purple-700', admin:'bg-blue-100 text-blue-700', secretaire:'bg-gray-100 text-gray-600' }
const ROLE_LABELS = { super_admin:'Super Admin', admin:'Administrateur', secretaire:'Secrétaire' }

export function UsersAdminPage() {
  const { user: me } = useSelector(s => s.auth)
  const [users,   setUsers]   = useState([])
  const [loading, setLoading] = useState(true)
  const [modal,   setModal]   = useState(null)
  const [saving,  setSaving]  = useState(false)
  const [errors,  setErrors]  = useState({})
  const [form,    setForm]    = useState({ name:'', email:'', password:'', password_confirmation:'', role:'secretaire', is_active:true })

  const load = () => { setLoading(true); adminService.getUsers().then(r=>setUsers(r.data?.users||[])).catch(()=>{}).finally(()=>setLoading(false)) }
  useEffect(() => { load() }, [])

  const openAdd  = () => { setForm({ name:'', email:'', password:'', password_confirmation:'', role:'secretaire', is_active:true }); setErrors({}); setModal({ mode:'add' }) }
  const openEdit = (u) => { setForm({ name:u.name, email:u.email, password:'', password_confirmation:'', role:u.role, is_active:u.is_active }); setErrors({}); setModal({ mode:'edit', data:u }) }

  const save = async () => {
    setSaving(true); setErrors({})
    try {
      if (modal.mode==='add') await adminService.createUser(form)
      else await adminService.updateUser(modal.data.id, { name:form.name, email:form.email, role:form.role, is_active:form.is_active, ...(form.password?{password:form.password,password_confirmation:form.password_confirmation}:{}) })
      toast.success('Enregistré !'); setModal(null); load()
    } catch (err) { if(err.response?.data?.errors) setErrors(err.response.data.errors); else toast.error('Erreur') }
    setSaving(false)
  }

  const del = async (id) => {
    if (!confirm('Supprimer cet utilisateur ?')) return
    try { await adminService.deleteUser(id); toast.success('Utilisateur supprimé'); load() } catch (_) { toast.error('Impossible') }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between"><h1 className="font-display font-bold text-2xl text-gray-900">Utilisateurs</h1><button onClick={openAdd} className="btn-primary">+ Ajouter</button></div>
      <div className="card overflow-hidden">
        {loading ? <div className="flex justify-center py-12"><LoadingSpinner /></div> : (
          <table className="w-full">
            <thead><tr className="bg-gray-50 border-b border-gray-100">{['Nom','Email','Rôle','Statut','Actions'].map(h=><th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-50">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-primary font-bold text-sm">{u.name?.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{u.name}</p>
                        {u.id === me?.id && <p className="text-xs text-secondary">Vous</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{u.email}</td>
                  <td className="px-4 py-3"><span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${ROLE_STYLES[u.role]}`}>{ROLE_LABELS[u.role]}</span></td>
                  <td className="px-4 py-3"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${u.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>{u.is_active ? 'Actif' : 'Inactif'}</span></td>
                  <td className="px-4 py-3">
                    {u.id !== me?.id && (
                      <div className="flex gap-1">
                        <button onClick={() => openEdit(u)} className="p-1.5 rounded-lg hover:bg-primary/10 text-gray-400 hover:text-primary transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg></button>
                        <button onClick={() => del(u.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Modal open={!!modal} onClose={()=>setModal(null)} title={modal?.mode==='add'?'Nouvel utilisateur':'Modifier'}>
        <div className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label><input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} className="input-field" />{errors.name&&<p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>}</div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Email *</label><input type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} className="input-field" />{errors.email&&<p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}</div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Rôle *</label><select value={form.role} onChange={e=>setForm(f=>({...f,role:e.target.value}))} className="input-field"><option value="super_admin">Super Admin</option><option value="admin">Administrateur</option><option value="secretaire">Secrétaire</option></select></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">{modal?.mode==='add'?'Mot de passe *':'Nouveau MDP'}</label><input type="password" value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))} className="input-field" />{errors.password&&<p className="text-red-500 text-xs mt-1">{errors.password[0]}</p>}</div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Confirmation</label><input type="password" value={form.password_confirmation} onChange={e=>setForm(f=>({...f,password_confirmation:e.target.value}))} className="input-field" /></div>
          </div>
          <div className="flex items-center gap-2"><input type="checkbox" id="is_active" checked={form.is_active} onChange={e=>setForm(f=>({...f,is_active:e.target.checked}))} className="w-4 h-4 text-primary rounded" /><label htmlFor="is_active" className="text-sm text-gray-700">Compte actif</label></div>
          <div className="flex gap-3 pt-2">
            <button onClick={()=>setModal(null)} className="btn-ghost flex-1 justify-center border border-gray-200">Annuler</button>
            <button onClick={save} disabled={saving} className="btn-primary flex-1 justify-center">{saving?<LoadingSpinner size="sm" color="white"/>:'Enregistrer'}</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default UsersAdminPage