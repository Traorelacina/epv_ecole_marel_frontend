// ─── ContactsAdminPage ───────────────────────────────────────────────────────
import { useEffect, useState } from 'react'
import { adminService } from '@services/adminService'
import LoadingSpinner from '@components/common/LoadingSpinner'
import Modal from '@components/common/Modal'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

export function ContactsAdminPage() {
  const [contacts,  setContacts]  = useState([])
  const [loading,   setLoading]   = useState(true)
  const [selected,  setSelected]  = useState(null)
  const [reponse,   setReponse]   = useState('')
  const [sending,   setSending]   = useState(false)
  const [filtre,    setFiltre]    = useState('non_lus') // 'non_lus' | 'tous' | 'archives'
  const [counts,    setCounts]    = useState({})

  const load = async () => {
    setLoading(true)
    try {
      const params = filtre === 'archives' ? { archive: true } : filtre === 'non_lus' ? { lu: false } : {}
      const res = await adminService.getContacts(params)
      setContacts(res.data?.contacts?.data || [])
      setCounts(res.data?.counts || {})
    } catch (_) {}
    setLoading(false)
  }

  useEffect(() => { load() }, [filtre])

  const handleSelect = async (contact) => {
    setSelected(contact)
    setReponse('')
    if (!contact.lu) {
      try {
        await adminService.toggleLuContact(contact.id)
        load()
      } catch (_) {}
    }
  }

  const handleRepondre = async () => {
    if (!reponse.trim() || !selected) return
    setSending(true)
    try {
      await adminService.repondreContact(selected.id, { reponse })
      toast.success('Réponse envoyée !')
      setSelected(null)
      load()
    } catch (_) { toast.error('Erreur lors de l\'envoi') }
    setSending(false)
  }

  const handleArchive = async (id) => {
    try {
      await adminService.archiveContact(id)
      toast.success('Message archivé')
      setSelected(null)
      load()
    } catch (_) {}
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce message ?')) return
    try {
      await adminService.deleteContact(id)
      toast.success('Message supprimé')
      setSelected(null)
      load()
    } catch (_) {}
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-display font-bold text-2xl text-gray-900">Messages reçus</h1>
        <div className="flex gap-2 text-sm">
          {[
            { key: 'non_lus', label: `Non lus (${counts.non_lus || 0})` },
            { key: 'tous',    label: `Tous (${counts.total || 0})` },
            { key: 'archives',label: `Archivés (${counts.archives || 0})` },
          ].map(f => (
            <button key={f.key} onClick={() => setFiltre(f.key)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                filtre === f.key ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
              }`}>{f.label}</button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-5 h-[calc(100vh-220px)]">
        {/* Liste contacts */}
        <div className="lg:col-span-2 card overflow-y-auto">
          {loading ? <div className="flex justify-center py-10"><LoadingSpinner /></div> :
            contacts.length === 0 ? <p className="text-center text-gray-400 py-10">Aucun message</p> :
            contacts.map(c => (
              <button key={c.id} onClick={() => handleSelect(c)}
                className={`w-full text-left p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                  selected?.id === c.id ? 'bg-primary/5 border-l-2 border-l-primary' : ''
                }`}>
                <div className="flex items-center gap-2 mb-1">
                  {!c.lu && <span className="w-2 h-2 rounded-full bg-orange-400 shrink-0" />}
                  <p className="font-medium text-sm text-gray-900 truncate">{c.nom}</p>
                  <p className="text-xs text-gray-400 ml-auto shrink-0">
                    {format(new Date(c.created_at), 'd MMM', { locale: fr })}
                  </p>
                </div>
                <p className="text-xs text-gray-500 truncate">{c.sujet}</p>
              </button>
            ))
          }
        </div>

        {/* Détail message */}
        <div className="lg:col-span-3 card p-6 overflow-y-auto">
          {!selected ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <span className="text-5xl mb-3">📬</span>
              <p>Sélectionnez un message</p>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display font-bold text-lg text-gray-900">{selected.sujet}</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    De <strong>{selected.nom}</strong> ({selected.email})
                    {selected.telephone && ` · ${selected.telephone}`}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {format(new Date(selected.created_at), 'd MMMM yyyy à HH:mm', { locale: fr })}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => handleArchive(selected.id)}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors" title="Archiver">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                  </button>
                  <button onClick={() => handleDelete(selected.id)}
                    className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors" title="Supprimer">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {selected.message}
              </div>

              {selected.reponse && (
                <div className="bg-primary/5 rounded-xl p-5 border-l-4 border-primary">
                  <p className="text-xs font-semibold text-primary mb-2">Réponse envoyée :</p>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{selected.reponse}</p>
                </div>
              )}

              {!selected.reponse && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Répondre</label>
                  <textarea value={reponse} onChange={e => setReponse(e.target.value)} rows={5}
                    placeholder="Votre réponse…" className="input-field resize-none" />
                  <button onClick={handleRepondre} disabled={sending || !reponse.trim()}
                    className="btn-primary mt-3">
                    {sending ? <LoadingSpinner size="sm" color="white" /> : 'Envoyer la réponse'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContactsAdminPage