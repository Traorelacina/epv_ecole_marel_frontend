// ── GalerieFormPage ──────────────────────────────────────────────────────────
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { adminService } from '@services/adminService'
import LoadingSpinner from '@components/common/LoadingSpinner'
import toast from 'react-hot-toast'
import {
  ArrowLeft, Save, Image as ImageIcon, FolderOpen,
  Upload, Trash2, X,
} from 'lucide-react'

const STORAGE = import.meta.env.VITE_STORAGE_URL || 'http://localhost:8000/storage'

/**
 * Construit l'URL d'affichage d'un média de façon robuste.
 *
 * Priorité :
 *  1. url_complete  → exposé par l'accesseur Laravel (Storage::disk('public')->url())
 *  2. url           → chemin relatif stocké en base (galeries/photos/xxx.jpg)
 *  3. fallback ''   → image cassée, le onError prendra le relais
 */
const getMediaUrl = (media) => {
  if (!media) return ''

  // 1. Accesseur Laravel — URL publique complète déjà construite côté serveur
  if (media.url_complete) return media.url_complete

  // 2. Chemin relatif — on construit l'URL manuellement
  const raw = media.url || ''
  if (!raw) return ''
  if (raw.startsWith('http://') || raw.startsWith('https://')) return raw
  return `${STORAGE}/${raw.replace(/^\/+/, '')}`
}

const CATEGORY_OPTIONS = [
  { value: 'sorties',    label: 'Sorties',    color: '#8DC31E' },
  { value: 'ceremonies', label: 'Cérémonies', color: '#D4191A' },
  { value: 'activites',  label: 'Activités',  color: '#2D6A1F' },
  { value: 'resultats',  label: 'Résultats',  color: '#F59E0B' },
  { value: 'autres',     label: 'Autres',     color: '#6B7280' },
]

export function GalerieFormPage() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const isEdit   = !!id

  const [loading,   setLoading]   = useState(false)
  const [fetching,  setFetching]  = useState(isEdit)
  const [errors,    setErrors]    = useState({})
  const [preview,   setPreview]   = useState(null)
  const [medias,    setMedias]    = useState([])
  const [uploading, setUploading] = useState(false)

  const [form, setForm] = useState({
    titre:            '',
    description:      '',
    categorie:        'sorties',
    annee:            new Date().getFullYear(),
    publiee:          false,
    image_couverture: null,
  })

  // ── Chargement ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isEdit) { setFetching(false); return }

    const fetchGalerie = async () => {
      try {
        const response = await adminService.getGalerie(id)
        const g = response.data?.galerie
        if (g) {
          setForm({
            titre:            g.titre       || '',
            description:      g.description || '',
            categorie:        g.categorie   || 'sorties',
            annee:            g.annee       || new Date().getFullYear(),
            publiee:          !!g.publiee,
            image_couverture: null,
          })

          // Image de couverture
          if (g.image_couverture) {
            const coverUrl = g.image_couverture.startsWith('http')
              ? g.image_couverture
              : `${STORAGE}/${g.image_couverture.replace(/^\/+/, '')}`
            setPreview(coverUrl)
          }

          setMedias(g.medias || [])
        }
      } catch (err) {
        console.error('Erreur chargement galerie:', err)
        toast.error('Galerie introuvable')
      } finally {
        setFetching(false)
      }
    }

    fetchGalerie()
  }, [id, isEdit])

  // ── Handlers formulaire ──────────────────────────────────────────────────
  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setForm(prev => ({ ...prev, image_couverture: file }))
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleRemovePreview = () => {
    setPreview(null)
    setForm(prev => ({ ...prev, image_couverture: null }))
  }

  // ── Soumission ───────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e?.preventDefault()

    if (!form.titre?.trim()) {
      toast.error('Le titre est requis')
      return
    }

    setLoading(true)
    setErrors({})

    const formData = new FormData()
    formData.append('titre',       form.titre)
    formData.append('description', form.description || '')
    formData.append('categorie',   form.categorie   || 'sorties')
    formData.append('annee',       form.annee       || new Date().getFullYear())
    formData.append('publiee',     form.publiee ? '1' : '0')

    if (form.image_couverture instanceof File) {
      formData.append('image_couverture', form.image_couverture)
    }

    try {
      let response
      if (isEdit) {
        formData.append('_method', 'PUT')
        response = await adminService.updateGalerie(id, formData)
      } else {
        response = await adminService.createGalerie(formData)
      }

      toast.success(isEdit ? 'Galerie mise à jour !' : 'Galerie créée !')

      if (!isEdit && response.data?.galerie?.id) {
        navigate(`/admin/galeries/${response.data.galerie.id}/modifier`)
      } else {
        navigate('/admin/galeries')
      }
    } catch (err) {
      console.error('Erreur soumission:', err.response?.data)
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors)
        const first = Object.values(err.response.data.errors)[0]?.[0]
        toast.error(first || 'Erreur de validation')
      } else {
        toast.error(err.response?.data?.message || 'Erreur lors de la sauvegarde')
      }
    } finally {
      setLoading(false)
    }
  }

  // ── Upload photos ────────────────────────────────────────────────────────
  const handleUploadPhoto = async (e) => {
    const files = Array.from(e.target.files)
    e.target.value = '' // reset input pour permettre re-sélection

    if (!files.length) return
    if (!id) { toast.error("Enregistrez la galerie d'abord"); return }

    setUploading(true)
    let successCount = 0

    for (const file of files) {
      try {
        const formData = new FormData()
        formData.append('file', file)

        const response = await adminService.uploadPhoto(id, formData)
        const media    = response.data?.media

        if (media) {
          // Le modèle Laravel expose url_complete via $appends
          // On ajoute directement en tête de liste
          setMedias(prev => [media, ...prev])
          successCount++
        }
      } catch (err) {
        console.error('Upload error:', err.response?.data || err)
        toast.error(`Échec upload : ${file.name}`)
      }
    }

    setUploading(false)
    if (successCount > 0) {
      toast.success(`${successCount} photo(s) ajoutée(s)`)
    }
  }

  // ── Suppression média ────────────────────────────────────────────────────
  const handleDeleteMedia = async (mediaId) => {
    if (!window.confirm('Supprimer cette photo ?')) return
    try {
      await adminService.deleteMedia(mediaId)
      setMedias(prev => prev.filter(m => m.id !== mediaId))
      toast.success('Photo supprimée')
    } catch (err) {
      console.error('Delete error:', err)
      toast.error('Erreur lors de la suppression')
    }
  }

  // ── Loader ───────────────────────────────────────────────────────────────
  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <LoadingSpinner size="lg" />
        <p className="text-sm text-gray-400 mt-4">Chargement...</p>
      </div>
    )
  }

  // ── Rendu ────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white py-4 rounded-2xl sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/galeries')}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-2">
            <FolderOpen size={20} className="text-[#2D6A1F]" />
            <h1 className="font-display font-bold text-xl text-gray-900">
              {isEdit ? 'Modifier la galerie' : 'Nouvelle galerie'}
            </h1>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/galeries')}
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#2D6A1F] to-[#1a4010] text-white font-medium hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-60"
          >
            {loading ? <LoadingSpinner size="sm" color="white" /> : <Save size={16} />}
            {loading ? 'Enregistrement...' : (isEdit ? 'Mettre à jour' : 'Créer')}
          </button>
        </div>
      </div>

      {/* Formulaire */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="grid sm:grid-cols-2 gap-5">

          {/* Titre */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-bold text-gray-800 mb-2">
              Titre <span className="text-red-500">*</span>
            </label>
            <input
              value={form.titre}
              onChange={handleChange('titre')}
              placeholder="Titre de la galerie"
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.titre ? 'border-red-500' : 'border-gray-200'
              } focus:border-[#8DC31E] focus:ring-2 focus:ring-[#8DC31E]/20 outline-none transition-all`}
            />
            {errors.titre && <p className="text-red-500 text-sm mt-1">{errors.titre[0]}</p>}
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">Catégorie</label>
            <select
              value={form.categorie}
              onChange={handleChange('categorie')}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#8DC31E] focus:ring-2 focus:ring-[#8DC31E]/20 outline-none"
            >
              {CATEGORY_OPTIONS.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* Année */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">Année</label>
            <input
              type="number"
              value={form.annee}
              onChange={handleChange('annee')}
              min={2000}
              max={2100}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#8DC31E] focus:ring-2 focus:ring-[#8DC31E]/20 outline-none"
            />
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-bold text-gray-800 mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={handleChange('description')}
              rows={3}
              placeholder="Description de la galerie..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#8DC31E] focus:ring-2 focus:ring-[#8DC31E]/20 outline-none resize-none"
            />
          </div>

          {/* Publier */}
          <div className="sm:col-span-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.publiee}
                onChange={handleChange('publiee')}
                className="w-5 h-5 text-[#2D6A1F] rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">Publier la galerie</span>
            </label>
          </div>

          {/* Image de couverture */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-bold text-gray-800 mb-2">Image de couverture</label>
            <div className="flex gap-4 flex-wrap items-center">
              {preview && (
                <div className="relative w-32 h-24 rounded-xl overflow-hidden border-2 border-[#8DC31E]">
                  <img
                    src={preview}
                    className="w-full h-full object-cover"
                    alt="couverture"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                  <button
                    type="button"
                    onClick={handleRemovePreview}
                    className="absolute top-1 right-1 p-0.5 rounded-full bg-black/50 text-white hover:bg-black/70"
                  >
                    <X size={12} />
                  </button>
                </div>
              )}
              <label className="flex flex-col items-center justify-center w-32 h-24 border-2 border-dashed border-[#8DC31E] rounded-xl cursor-pointer hover:bg-[#F2F9E5] transition-all">
                <ImageIcon size={20} className="text-[#2D6A1F]" />
                <span className="text-xs mt-1 text-gray-500">{preview ? 'Changer' : 'Choisir'}</span>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
          </div>

        </div>
      </div>

      {/* Section photos — édition uniquement */}
      {isEdit && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-5 flex-wrap gap-3">
            <div>
              <h3 className="font-bold text-gray-800">Photos</h3>
              <p className="text-sm text-gray-400">{medias.length} photo(s)</p>
            </div>
            <label className={`px-4 py-2 rounded-xl bg-[#2D6A1F] text-white text-sm font-medium flex items-center gap-2 transition-all ${uploading ? 'opacity-60 pointer-events-none' : 'cursor-pointer hover:bg-[#1a4010]'}`}>
              {uploading ? <LoadingSpinner size="sm" color="white" /> : <Upload size={16} />}
              {uploading ? 'Upload en cours...' : 'Ajouter des photos'}
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleUploadPhoto}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>

          {medias.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
              {medias.map(m => (
                <div key={m.id} className="relative group aspect-square bg-gray-100 rounded-xl overflow-hidden">
                  <img
                    src={getMediaUrl(m)}
                    alt={m.legende || ''}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextElementSibling?.classList.remove('hidden')
                    }}
                  />
                  {/* Placeholder image cassée */}
                  <div className="hidden absolute inset-0 flex items-center justify-center bg-gray-200">
                    <ImageIcon size={24} className="text-gray-400" />
                  </div>
                  {/* Overlay suppression */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleDeleteMedia(m.id)}
                      className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <ImageIcon size={48} className="text-gray-300 mx-auto mb-3" />
              <p className="text-gray-400">Aucune photo pour l'instant</p>
              <p className="text-gray-300 text-sm mt-1">Cliquez sur "Ajouter des photos" pour commencer</p>
            </div>
          )}
        </div>
      )}

      {/* Info — création uniquement */}
      {!isEdit && (
        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
          <p className="text-sm text-blue-600">
            ℹ️ Après création, vous pourrez ajouter des photos à la galerie.
          </p>
        </div>
      )}

    </div>
  )
}

export default GalerieFormPage