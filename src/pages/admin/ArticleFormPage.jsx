import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { adminService } from '@services/adminService'
import LoadingSpinner from '@components/common/LoadingSpinner'
import toast from 'react-hot-toast'

const STORAGE = import.meta.env.VITE_STORAGE_URL || 'http://localhost:8000/storage'

export default function ArticleFormPage() {
  const { id }     = useParams()
  const navigate   = useNavigate()
  const isEdit     = !!id
  const [loading,  setLoading]  = useState(false)
  const [fetching, setFetching] = useState(isEdit)
  const [categories,setCategories]=useState([])
  const [errors,   setErrors]   = useState({})
  const [preview,  setPreview]  = useState(null)
  const [form,     setForm]     = useState({
    titre: '', extrait: '', contenu: '', statut: 'brouillon',
    categorie_id: '', meta_titre: '', meta_description: '',
    date_publication: '', image: null, image_alt: '',
  })

  useEffect(() => {
    adminService.getCategories().then(r => setCategories(r.data?.categories || [])).catch(() => {})
    if (isEdit) {
      adminService.getArticle(id).then(r => {
        const a = r.data?.article
        setForm({
          titre: a.titre || '', extrait: a.extrait || '', contenu: a.contenu || '',
          statut: a.statut || 'brouillon', categorie_id: a.categorie_id || '',
          meta_titre: a.meta_titre || '', meta_description: a.meta_description || '',
          date_publication: a.date_publication ? a.date_publication.slice(0, 16) : '',
          image: null, image_alt: a.image_alt || '',
        })
        if (a.image) setPreview(`${STORAGE}/${a.image}`)
      }).catch(() => toast.error('Article introuvable'))
        .finally(() => setFetching(false))
    }
  }, [id])

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      setForm(f => ({ ...f, image: file }))
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})
    const fd = new FormData()
    Object.entries(form).forEach(([k, v]) => { if (v !== null && v !== '') fd.append(k, v) })
    try {
      if (isEdit) await adminService.updateArticle(id, fd)
      else await adminService.createArticle(fd)
      toast.success(isEdit ? 'Article mis à jour !' : 'Article créé !')
      navigate('/admin/articles')
    } catch (err) {
      if (err.response?.data?.errors) setErrors(err.response.data.errors)
      else toast.error('Erreur lors de la sauvegarde')
    }
    setLoading(false)
  }

  if (fetching) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-gray-900">
            {isEdit ? 'Modifier l\'article' : 'Nouvel article'}
          </h1>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => navigate('/admin/articles')}
            className="btn-ghost border border-gray-200">Annuler</button>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? <LoadingSpinner size="sm" color="white" /> : (isEdit ? 'Mettre à jour' : 'Créer l\'article')}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-5">
          {/* Titre */}
          <div className="card p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Titre *</label>
              <input value={form.titre} onChange={set('titre')} placeholder="Titre de l'article"
                className="input-field text-lg font-medium" required />
              {errors.titre && <p className="text-red-500 text-xs mt-1">{errors.titre[0]}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Extrait</label>
              <textarea value={form.extrait} onChange={set('extrait')} rows={3}
                placeholder="Résumé court de l'article (affiché dans les listes)…"
                className="input-field resize-none" />
            </div>
          </div>

          {/* Contenu */}
          <div className="card p-5">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Contenu *</label>
            <textarea value={form.contenu} onChange={set('contenu')} rows={16}
              placeholder="Rédigez le contenu de l'article ici…"
              className="input-field resize-y font-mono text-sm" required />
            {errors.contenu && <p className="text-red-500 text-xs mt-1">{errors.contenu[0]}</p>}
            <p className="text-xs text-gray-400 mt-2">HTML accepté pour la mise en forme.</p>
          </div>

          {/* SEO */}
          <div className="card p-5 space-y-4">
            <h3 className="font-semibold text-gray-800 text-sm">SEO</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Méta titre</label>
              <input value={form.meta_titre} onChange={set('meta_titre')}
                placeholder="Titre SEO (60 caractères max)" className="input-field" maxLength={60} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Méta description</label>
              <textarea value={form.meta_description} onChange={set('meta_description')} rows={2}
                placeholder="Description SEO (160 caractères max)" className="input-field resize-none" maxLength={160} />
            </div>
          </div>
        </div>

        {/* Colonne droite */}
        <div className="space-y-5">
          {/* Statut & Publication */}
          <div className="card p-5 space-y-4">
            <h3 className="font-semibold text-gray-800 text-sm">Publication</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Statut</label>
              <select value={form.statut} onChange={set('statut')} className="input-field">
                <option value="brouillon">Brouillon</option>
                <option value="publie">Publié</option>
                <option value="archive">Archivé</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Date de publication</label>
              <input type="datetime-local" value={form.date_publication} onChange={set('date_publication')}
                className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Catégorie</label>
              <select value={form.categorie_id} onChange={set('categorie_id')} className="input-field">
                <option value="">Sans catégorie</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
              </select>
            </div>
          </div>

          {/* Image */}
          <div className="card p-5 space-y-4">
            <h3 className="font-semibold text-gray-800 text-sm">Image à la une</h3>
            {preview && (
              <img src={preview} alt="Preview" className="w-full aspect-video object-cover rounded-xl" />
            )}
            <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed
                             border-gray-200 rounded-xl cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all">
              <svg className="w-6 h-6 text-gray-400 mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-gray-500">{preview ? 'Changer l\'image' : 'Choisir une image'}</span>
              <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
            </label>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Texte alternatif</label>
              <input value={form.image_alt} onChange={set('image_alt')}
                placeholder="Description de l'image" className="input-field" />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}