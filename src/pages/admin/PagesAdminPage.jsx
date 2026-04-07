import { useEffect, useState } from 'react'
import { adminService } from '@services/adminService'
import LoadingSpinner from '@components/common/LoadingSpinner'
import toast from 'react-hot-toast'

const PAGES_INFO = {
  accueil:             { label: 'Page d\'accueil',       icon: '🏠', desc: 'Hero, présentation rapide' },
  ecole:               { label: 'Page L\'École',          icon: '🏫', desc: 'Histoire, valeurs, équipe' },
  pedagogie:           { label: 'Page Pédagogie',         icon: '📚', desc: 'Offre pédagogique, programmes' },
  'infos-pratiques':   { label: 'Informations pratiques', icon: '📋', desc: 'Horaires, calendrier, inscriptions' },
}

export default function PagesAdminPage() {
  const [pages,   setPages]   = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null) // slug de la page en cours d'édition
  const [saving,  setSaving]  = useState(false)
  const [form,    setForm]    = useState({ titre: '', meta_titre: '', meta_description: '', contenu: '' })

  const load = () => {
    setLoading(true)
    adminService.getPages()
      .then(r => setPages(r.data?.pages || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const openEdit = async (slug) => {
    try {
      const res = await adminService.getPage(slug)
      const p   = res.data?.page
      setForm({
        titre:            p.titre || '',
        meta_titre:       p.meta_titre || '',
        meta_description: p.meta_description || '',
        contenu:          typeof p.contenu === 'string' ? p.contenu : JSON.stringify(p.contenu, null, 2),
      })
      setEditing(slug)
    } catch (_) { toast.error('Impossible de charger la page') }
  }

  const handleSave = async () => {
    if (!editing) return
    setSaving(true)
    try {
      await adminService.updatePage(editing, form)
      toast.success('Page mise à jour !')
      setEditing(null)
      load()
    } catch (_) { toast.error('Erreur lors de la sauvegarde') }
    setSaving(false)
  }

  if (editing) {
    const info = PAGES_INFO[editing] || {}
    return (
      <div className="space-y-5 max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <button onClick={() => setEditing(null)} className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors mb-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour aux pages
            </button>
            <h1 className="font-display font-bold text-2xl text-gray-900">{info.label || editing}</h1>
            <p className="text-sm text-gray-500">{info.desc}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setEditing(null)} className="btn-ghost border border-gray-200">Annuler</button>
            <button onClick={handleSave} disabled={saving} className="btn-primary">
              {saving ? <LoadingSpinner size="sm" color="white" /> : 'Enregistrer'}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Contenu principal */}
          <div className="lg:col-span-2 card p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Titre de la page</label>
              <input
                value={form.titre}
                onChange={e => setForm(f => ({ ...f, titre: e.target.value }))}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Contenu
                <span className="text-gray-400 font-normal ml-2">(JSON ou texte riche)</span>
              </label>
              <textarea
                value={form.contenu}
                onChange={e => setForm(f => ({ ...f, contenu: e.target.value }))}
                rows={20}
                className="input-field resize-y font-mono text-sm"
                placeholder="Contenu JSON ou texte HTML de la page..."
              />
              <p className="text-xs text-gray-400 mt-1">
                Le contenu peut être du JSON structuré ou du texte HTML selon la page.
              </p>
            </div>
          </div>

          {/* SEO */}
          <div className="card p-5 space-y-4 h-fit">
            <h3 className="font-semibold text-gray-800">SEO</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Méta titre</label>
              <input
                value={form.meta_titre}
                onChange={e => setForm(f => ({ ...f, meta_titre: e.target.value }))}
                placeholder="Titre SEO (60 car. max)"
                className="input-field"
                maxLength={60}
              />
              <p className="text-xs text-gray-400 mt-1">{form.meta_titre.length}/60 caractères</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Méta description</label>
              <textarea
                value={form.meta_description}
                onChange={e => setForm(f => ({ ...f, meta_description: e.target.value }))}
                placeholder="Description SEO (160 car. max)"
                className="input-field resize-none"
                rows={4}
                maxLength={160}
              />
              <p className="text-xs text-gray-400 mt-1">{form.meta_description.length}/160 caractères</p>
            </div>

            {/* Aperçu SEO */}
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs font-medium text-gray-500 mb-2">Aperçu Google</p>
              <p className="text-blue-600 text-sm font-medium truncate">
                {form.meta_titre || form.titre || 'Titre de la page'}
              </p>
              <p className="text-green-700 text-xs">epvmarel.ci/{editing}</p>
              <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                {form.meta_description || 'Description de la page...'}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display font-bold text-2xl text-gray-900">Pages statiques</h1>
        <p className="text-sm text-gray-500 mt-1">Gérez le contenu et le SEO des pages principales du site.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><LoadingSpinner size="lg" /></div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {Object.entries(PAGES_INFO).map(([slug, info]) => {
            const page = pages.find(p => p.slug === slug)
            return (
              <div key={slug} className="card p-6 hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl shrink-0">
                    {info.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold text-gray-900">{info.label}</h3>
                    <p className="text-sm text-gray-400 mt-0.5">{info.desc}</p>
                    {page?.updated_at && (
                      <p className="text-xs text-gray-300 mt-1">
                        Modifié le {new Date(page.updated_at).toLocaleDateString('fr-FR')}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div className="flex gap-2">
                    {page?.meta_titre && (
                      <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                        SEO ✓
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => openEdit(slug)}
                    className="btn-primary text-sm py-2 px-4"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Modifier
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Info */}
      <div className="card p-5 bg-blue-50 border border-blue-100">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-blue-800">À propos des pages statiques</p>
            <p className="text-sm text-blue-600 mt-1">
              Ces pages affichent le contenu principal du site. Modifiez les méta-titres et descriptions
              pour améliorer le référencement naturel (SEO) dans les moteurs de recherche.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}