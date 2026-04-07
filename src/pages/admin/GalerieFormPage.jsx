// ── GalerieFormPage ──────────────────────────────────────────────────────────
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { adminService } from '@services/adminService'
import LoadingSpinner from '@components/common/LoadingSpinner'
import toast from 'react-hot-toast'

const STORAGE = import.meta.env.VITE_STORAGE_URL || 'http://localhost:8000/storage'

export function GalerieFormPage() {
  const { id }     = useParams()
  const navigate   = useNavigate()
  const isEdit     = !!id
  const [loading,  setLoading]  = useState(false)
  const [fetching, setFetching] = useState(isEdit)
  const [errors,   setErrors]   = useState({})
  const [preview,  setPreview]  = useState(null)
  const [medias,   setMedias]   = useState([])
  const [uploading,setUploading]= useState(false)
  const [form,     setForm]     = useState({
    titre: '', description: '', categorie: 'autres', annee: new Date().getFullYear(), publiee: false, image_couverture: null,
  })

  useEffect(() => {
    if (!isEdit) return
    adminService.getGalerie(id)
      .then(r => {
        const g = r.data?.galerie
        setForm({ titre: g.titre, description: g.description || '', categorie: g.categorie, annee: g.annee || '', publiee: g.publiee, image_couverture: null })
        if (g.image_couverture) setPreview(`${STORAGE}/${g.image_couverture}`)
        setMedias(g.medias || [])
      }).catch(() => toast.error('Galerie introuvable'))
       .finally(() => setFetching(false))
  }, [id])

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData()
    Object.entries(form).forEach(([k, v]) => { if (v !== null && v !== '') fd.append(k, v) })
    try {
      if (isEdit) await adminService.updateGalerie(id, fd)
      else await adminService.createGalerie(fd)
      toast.success(isEdit ? 'Galerie mise à jour !' : 'Galerie créée !')
      navigate('/admin/galeries')
    } catch (err) {
      if (err.response?.data?.errors) setErrors(err.response.data.errors)
      else toast.error('Erreur lors de la sauvegarde')
    }
    setLoading(false)
  }

  const handleUploadPhoto = async (e) => {
    const files = Array.from(e.target.files)
    if (!files.length || !id) return
    setUploading(true)
    for (const file of files) {
      try {
        const fd = new FormData()
        fd.append('file', file)
        const res = await adminService.uploadPhoto(id, fd)
        setMedias(prev => [...prev, res.data?.media])
      } catch (_) {}
    }
    setUploading(false)
    toast.success(`${files.length} photo(s) ajoutée(s)`)
  }

  const handleDeleteMedia = async (mediaId) => {
    try {
      await adminService.deleteMedia(mediaId)
      setMedias(prev => prev.filter(m => m.id !== mediaId))
      toast.success('Média supprimé')
    } catch (_) {}
  }

  if (fetching) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="font-display font-bold text-2xl text-gray-900">
          {isEdit ? 'Modifier la galerie' : 'Nouvelle galerie'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="card p-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Titre *</label>
            <input value={form.titre} onChange={set('titre')} className="input-field" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Catégorie *</label>
            <select value={form.categorie} onChange={set('categorie')} className="input-field">
              {['sorties','ceremonies','activites','resultats','autres'].map(c => (
                <option key={c} value={c} className="capitalize">{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Année</label>
            <input type="number" value={form.annee} onChange={set('annee')} className="input-field" min={2000} max={2100} />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
            <textarea value={form.description} onChange={set('description')} rows={3} className="input-field resize-none" />
          </div>
          <div className="sm:col-span-2 flex items-center gap-3">
            <input type="checkbox" id="publiee" checked={form.publiee} onChange={set('publiee')}
              className="w-4 h-4 text-primary rounded" />
            <label htmlFor="publiee" className="text-sm text-gray-700">Publier la galerie</label>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Image de couverture</label>
            {preview && <img src={preview} className="w-40 h-24 object-cover rounded-xl mb-3" alt="couverture" />}
            <input type="file" accept="image/*" onChange={e => { const f = e.target.files[0]; if(f){setForm(p=>({...p,image_couverture:f})); setPreview(URL.createObjectURL(f))} }}
              className="input-field" />
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={() => navigate('/admin/galeries')} className="btn-ghost border border-gray-200">Annuler</button>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? <LoadingSpinner size="sm" color="white" /> : (isEdit ? 'Mettre à jour' : 'Créer la galerie')}
          </button>
        </div>
      </form>

      {/* Upload photos (seulement en mode édition) */}
      {isEdit && (
        <div className="card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold text-gray-900">Photos ({medias.length})</h3>
            <label className="btn-secondary text-sm py-2 px-4 cursor-pointer">
              {uploading ? <LoadingSpinner size="sm" color="white" /> : '+ Ajouter des photos'}
              <input type="file" accept="image/*" multiple onChange={handleUploadPhoto} className="hidden" />
            </label>
          </div>
          {medias.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {medias.map(m => (
                <div key={m.id} className="relative group aspect-square">
                  <img src={`${STORAGE}/${m.url}`} alt={m.legende || ''}
                    className="w-full h-full object-cover rounded-xl" />
                  <button onClick={() => handleDeleteMedia(m.id)}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs">
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center py-8">Aucune photo dans cette galerie</p>
          )}
        </div>
      )}
    </div>
  )
}

export default GalerieFormPage