import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { adminService } from '@services/adminService'
import LoadingSpinner from '@components/common/LoadingSpinner'
import toast from 'react-hot-toast'
import {
  ArrowLeft, Save, Image as ImageIcon, Globe, Calendar as CalendarIcon,
  Tag, Eye, EyeOff, Archive, AlertCircle, FileText, Layout,
  CheckCircle, Clock, ChevronDown, Maximize2, Minimize2
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
  .input-large {
    font-size: 16px;
    padding: 14px 16px;
    border-radius: 12px;
  }
  .textarea-large {
    font-size: 15px;
    padding: 16px;
    border-radius: 12px;
    line-height: 1.7;
  }
  .btn-large {
    padding: 12px 28px;
    font-size: 15px;
    font-weight: 600;
    border-radius: 12px;
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
  const [expandedSection, setExpandedSection] = useState(null)
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

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <>
      <style>{FORM_STYLES}</style>
      
      <form onSubmit={handleSubmit} className="form-container space-y-6 max-w-6xl mx-auto">
        {/* Header amélioré */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 bg-white/95 backdrop-blur-sm py-5 px-4 rounded-2xl shadow-sm z-10 border border-gray-100">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate('/admin/articles')}
              className="p-2.5 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <FileText size={22} className="text-[#2D6A1F]" />
                <h1 className="font-display font-bold text-2xl text-gray-900">
                  {isEdit ? 'Modifier l\'article' : 'Nouvel article'}
                </h1>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {isEdit ? 'Modifiez le contenu de votre article' : 'Créez un nouvel article pour le blog'}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate('/admin/articles')}
              className="btn-ghost border border-gray-200 btn-large px-6"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary btn-large gap-2 px-8"
              style={{
                background: 'linear-gradient(135deg, #2D6A1F, #1a4010)',
                boxShadow: '0 4px 14px rgba(45,106,31,0.3)'
              }}
            >
              {loading ? (
                <LoadingSpinner size="sm" color="white" />
              ) : (
                <>
                  <Save size={18} />
                  {isEdit ? 'Mettre à jour' : 'Créer l\'article'}
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-5">
            {/* Titre - agrandi */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div>
                <label className="block text-base font-bold text-gray-800 mb-2">
                  Titre de l'article <span className="text-red-500">*</span>
                </label>
                <input
                  value={form.titre}
                  onChange={set('titre')}
                  placeholder="Un titre accrocheur pour votre article"
                  className="input-field input-large w-full"
                  style={{ fontSize: '18px', fontWeight: 500 }}
                  required
                />
                {errors.titre && <p className="text-red-500 text-sm mt-2">{errors.titre[0]}</p>}
                <p className="text-xs text-gray-400 mt-2">60 caractères recommandés pour le SEO</p>
              </div>
              <div className="mt-5">
                <label className="block text-base font-bold text-gray-800 mb-2">
                  Extrait / Résumé
                </label>
                <textarea
                  value={form.extrait}
                  onChange={set('extrait')}
                  rows={4}
                  placeholder="Un court résumé de l'article qui apparaîtra dans la liste des articles..."
                  className="input-field textarea-large w-full resize-none"
                />
                <p className="text-xs text-gray-400 mt-2">160 caractères maximum recommandés</p>
              </div>
            </div>

            {/* Contenu - très agrandi */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <label className="text-base font-bold text-gray-800">
                  Contenu de l'article <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => toggleSection('contenu')}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-[#2D6A1F] transition-colors"
                >
                  {expandedSection === 'contenu' ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
              </div>
              <textarea
                value={form.contenu}
                onChange={set('contenu')}
                rows={expandedSection === 'contenu' ? 28 : 20}
                placeholder="Rédigez le contenu complet de votre article ici..."
                className="input-field textarea-large w-full resize-y font-mono"
                style={{ fontSize: '14px', lineHeight: '1.8' }}
                required
              />
              {errors.contenu && <p className="text-red-500 text-sm mt-2">{errors.contenu[0]}</p>}
              <p className="text-xs text-gray-400 mt-3">
                Format HTML accepté pour la mise en forme (titres, listes, liens...)
              </p>
            </div>

            {/* SEO */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100 mb-4">
                <Globe size={18} className="text-[#2D6A1F]" />
                <h3 className="font-bold text-gray-800 text-base">Optimisation SEO</h3>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Méta titre</label>
                <input
                  value={form.meta_titre}
                  onChange={set('meta_titre')}
                  placeholder="Titre pour les moteurs de recherche (60 caractères max)"
                  className="input-field input-large w-full"
                />
                <p className="text-xs text-gray-400 mt-2">
                  {form.meta_titre?.length || 0}/60 caractères
                </p>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Méta description</label>
                <textarea
                  value={form.meta_description}
                  onChange={set('meta_description')}
                  rows={3}
                  placeholder="Description pour les résultats de recherche (160 caractères max)"
                  className="input-field textarea-large w-full resize-none"
                />
                <p className="text-xs text-gray-400 mt-2">
                  {form.meta_description?.length || 0}/160 caractères
                </p>
              </div>
            </div>
          </div>

          {/* Colonne droite */}
          <div className="space-y-5">
            {/* Statut & Publication */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100 mb-4">
                <Layout size={18} className="text-[#2D6A1F]" />
                <h3 className="font-bold text-gray-800 text-base">Publication</h3>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Statut</label>
                <div className="relative">
                  <select value={form.statut} onChange={set('statut')} className="input-field input-large w-full appearance-none">
                    {statusOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                {statusOptions.find(opt => opt.value === form.statut) && (
                  <div className="flex items-center gap-2 mt-3">
                    {(() => {
                      const opt = statusOptions.find(o => o.value === form.statut)
                      const Icon = opt.icon
                      return (
                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm ${opt.bg} ${opt.color}`}>
                          <Icon size={12} />
                          {opt.label}
                        </span>
                      )
                    })()}
                  </div>
                )}
              </div>
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date de publication</label>
                <div className="relative">
                  <CalendarIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="datetime-local"
                    value={form.date_publication}
                    onChange={set('date_publication')}
                    className="input-field input-large w-full pl-10"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">Laissez vide pour utiliser la date actuelle</p>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Catégorie</label>
                <div className="relative">
                  <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select value={form.categorie_id} onChange={set('categorie_id')} className="input-field input-large w-full pl-10 appearance-none">
                    <option value="">Sans catégorie</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.nom}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Image à la une */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100 mb-4">
                <ImageIcon size={18} className="text-[#2D6A1F]" />
                <h3 className="font-bold text-gray-800 text-base">Image à la une</h3>
              </div>
              {preview && (
                <div className="relative rounded-xl overflow-hidden border border-gray-200 mb-4">
                  <img src={preview} alt="Preview" className="w-full aspect-video object-cover" />
                  <button
                    type="button"
                    onClick={() => { setPreview(null); setForm(f => ({ ...f, image: null })) }}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white hover:bg-black/80 transition-all"
                  >
                    <AlertCircle size={14} />
                  </button>
                </div>
              )}
              <label className="image-dropzone flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer transition-all">
                <ImageIcon size={28} className="text-gray-400 mb-2" />
                <span className="text-base text-gray-600 font-medium">
                  {preview ? 'Changer l\'image' : 'Choisir une image'}
                </span>
                <span className="text-xs text-gray-400 mt-1">JPG, PNG, GIF - Max 5MB</span>
                <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
              </label>
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Texte alternatif (ALT)</label>
                <input
                  value={form.image_alt}
                  onChange={set('image_alt')}
                  placeholder="Description de l'image pour l'accessibilité"
                  className="input-field input-large w-full"
                />
                <p className="text-xs text-gray-400 mt-2">Important pour le référencement et l'accessibilité</p>
              </div>
            </div>

            {/* Aperçu rapide */}
            {form.titre && (
              <div className="bg-gradient-to-r from-[#F2F9E5] to-white rounded-2xl p-5 border border-[#8DC31E]/20">
                <p className="text-xs font-bold text-[#8DC31E] uppercase tracking-wider mb-3">Aperçu</p>
                <p className="text-base font-bold text-gray-800 line-clamp-2">{form.titre}</p>
                {form.extrait && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3 leading-relaxed">{form.extrait}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  )
}