import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { adminService } from '@services/adminService'
import LoadingSpinner from '@components/common/LoadingSpinner'
import toast from 'react-hot-toast'
import {
  ArrowLeft, Save, Image as ImageIcon, Globe, Calendar as CalendarIcon,
  Tag, Eye, EyeOff, Archive, AlertCircle, FileText, Layout,
  Search, CheckCircle, Clock, ChevronDown
} from 'lucide-react'

const STORAGE = import.meta.env.VITE_STORAGE_URL || 'http://localhost:8000/storage'

const FORM_STYLES = `
  @keyframes formFadeIn {
    from { opacity: 0; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .form-container {
    animation: formFadeIn 0.4s ease-out;
  }
  .image-dropzone:hover {
    border-color: #8DC31E;
    background-color: rgba(141, 195, 30, 0.05);
  }
`

export default function ArticleFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEdit)
  const [categories, setCategories] = useState([])
  const [errors, setErrors] = useState({})
  const [preview, setPreview] = useState(null)
  const [form, setForm] = useState({
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
      toast.success(isEdit ? 'Article mis à jour avec succès !' : 'Article créé avec succès !')
      navigate('/admin/articles')
    } catch (err) {
      if (err.response?.data?.errors) setErrors(err.response.data.errors)
      else toast.error('Erreur lors de la sauvegarde')
    }
    setLoading(false)
  }

  if (fetching) return (
    <div className="flex flex-col items-center justify-center py-32">
      <LoadingSpinner size="lg" />
      <p className="text-sm text-gray-400 mt-4">Chargement de l'article...</p>
    </div>
  )

  const statusOptions = [
    { value: 'brouillon', icon: Clock, label: 'Brouillon', color: 'text-gray-600', bg: 'bg-gray-50' },
    { value: 'publie', icon: Eye, label: 'Publié', color: 'text-green-700', bg: 'bg-green-50' },
    { value: 'archive', icon: Archive, label: 'Archivé', color: 'text-orange-700', bg: 'bg-orange-50' },
  ]

  return (
    <>
      <style>{FORM_STYLES}</style>
      
      <form onSubmit={handleSubmit} className="form-container space-y-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 bg-gray-50 py-4 z-10">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/admin/articles')}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-white transition-all"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <FileText size={20} className="text-[#2D6A1F]" />
                <h1 className="font-display font-bold text-xl text-gray-900">
                  {isEdit ? 'Modifier l\'article' : 'Nouvel article'}
                </h1>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                {isEdit ? 'Modifiez le contenu de votre article' : 'Créez un nouvel article pour le blog'}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate('/admin/articles')}
              className="btn-ghost border border-gray-200"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary gap-2"
            >
              {loading ? (
                <LoadingSpinner size="sm" color="white" />
              ) : (
                <>
                  <Save size={16} />
                  {isEdit ? 'Mettre à jour' : 'Créer l\'article'}
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-5">
            {/* Titre */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Titre de l'article <span className="text-red-500">*</span>
                </label>
                <input
                  value={form.titre}
                  onChange={set('titre')}
                  placeholder="Un titre accrocheur pour votre article"
                  className="input-field text-base font-medium"
                  required
                />
                {errors.titre && <p className="text-red-500 text-xs mt-1">{errors.titre[0]}</p>}
                <p className="text-xs text-gray-400 mt-1">60 caractères recommandés pour le SEO</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Extrait / Résumé
                </label>
                <textarea
                  value={form.extrait}
                  onChange={set('extrait')}
                  rows={3}
                  placeholder="Un court résumé de l'article qui apparaîtra dans la liste des articles..."
                  className="input-field resize-none"
                />
                <p className="text-xs text-gray-400 mt-1">160 caractères maximum recommandés</p>
              </div>
            </div>

            {/* Contenu */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Contenu de l'article <span className="text-red-500">*</span>
              </label>
              <textarea
                value={form.contenu}
                onChange={set('contenu')}
                rows={18}
                placeholder="Rédigez le contenu complet de votre article ici..."
                className="input-field resize-y font-mono text-sm"
                required
              />
              {errors.contenu && <p className="text-red-500 text-xs mt-1">{errors.contenu[0]}</p>}
              <p className="text-xs text-gray-400 mt-2">
                Format HTML accepté pour la mise en forme (titres, listes, liens...)
              </p>
            </div>

            {/* SEO */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <Globe size={16} className="text-[#2D6A1F]" />
                <h3 className="font-semibold text-gray-800">Optimisation SEO</h3>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Méta titre</label>
                <input
                  value={form.meta_titre}
                  onChange={set('meta_titre')}
                  placeholder="Titre pour les moteurs de recherche (60 caractères max)"
                  className="input-field"
                  maxLength={60}
                />
                <p className="text-xs text-gray-400 mt-1">
                  {form.meta_titre?.length || 0}/60 caractères
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Méta description</label>
                <textarea
                  value={form.meta_description}
                  onChange={set('meta_description')}
                  rows={2}
                  placeholder="Description pour les résultats de recherche (160 caractères max)"
                  className="input-field resize-none"
                  maxLength={160}
                />
                <p className="text-xs text-gray-400 mt-1">
                  {form.meta_description?.length || 0}/160 caractères
                </p>
              </div>
            </div>
          </div>

          {/* Colonne droite */}
          <div className="space-y-5">
            {/* Statut & Publication */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <Layout size={16} className="text-[#2D6A1F]" />
                <h3 className="font-semibold text-gray-800">Publication</h3>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Statut</label>
                <div className="relative">
                  <select value={form.statut} onChange={set('statut')} className="input-field appearance-none">
                    {statusOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                {statusOptions.find(opt => opt.value === form.statut) && (
                  <div className="flex items-center gap-2 mt-2">
                    {(() => {
                      const opt = statusOptions.find(o => o.value === form.statut)
                      const Icon = opt.icon
                      return (
                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs ${opt.bg} ${opt.color}`}>
                          <Icon size={10} />
                          {opt.label}
                        </span>
                      )
                    })()}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Date de publication</label>
                <div className="relative">
                  <CalendarIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="datetime-local"
                    value={form.date_publication}
                    onChange={set('date_publication')}
                    className="input-field pl-9"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">Laissez vide pour utiliser la date actuelle</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Catégorie</label>
                <div className="relative">
                  <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select value={form.categorie_id} onChange={set('categorie_id')} className="input-field pl-9 appearance-none">
                    <option value="">Sans catégorie</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.nom}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Image à la une */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <ImageIcon size={16} className="text-[#2D6A1F]" />
                <h3 className="font-semibold text-gray-800">Image à la une</h3>
              </div>
              {preview && (
                <div className="relative rounded-xl overflow-hidden border border-gray-200">
                  <img src={preview} alt="Preview" className="w-full aspect-video object-cover" />
                  <button
                    type="button"
                    onClick={() => { setPreview(null); setForm(f => ({ ...f, image: null })) }}
                    className="absolute top-2 right-2 p-1 rounded-lg bg-black/50 text-white hover:bg-black/70 transition-all"
                  >
                    <AlertCircle size={12} />
                  </button>
                </div>
              )}
              <label className="image-dropzone flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer transition-all">
                <ImageIcon size={22} className="text-gray-400 mb-1.5" />
                <span className="text-sm text-gray-500 font-medium">
                  {preview ? 'Changer l\'image' : 'Choisir une image'}
                </span>
                <span className="text-xs text-gray-400 mt-1">JPG, PNG, GIF - Max 5MB</span>
                <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
              </label>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Texte alternatif (ALT)</label>
                <input
                  value={form.image_alt}
                  onChange={set('image_alt')}
                  placeholder="Description de l'image pour l'accessibilité"
                  className="input-field"
                />
                <p className="text-xs text-gray-400 mt-1">Important pour le référencement et l'accessibilité</p>
              </div>
            </div>

            {/* Aperçu rapide */}
            {form.titre && (
              <div className="bg-gradient-to-r from-[#F2F9E5] to-white rounded-xl p-4 border border-[#8DC31E]/20">
                <p className="text-[10px] font-semibold text-[#8DC31E] uppercase tracking-wider mb-2">Aperçu</p>
                <p className="text-sm font-semibold text-gray-800 line-clamp-2">{form.titre}</p>
                {form.extrait && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{form.extrait}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  )
}