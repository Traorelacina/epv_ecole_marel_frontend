import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { adminService } from '@services/adminService'
import LoadingSpinner from '@components/common/LoadingSpinner'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

function StatCard({ titre, valeur, icon, color, to }) {
  const colors = {
    blue:   'bg-blue-50 text-blue-600 border-blue-100',
    green:  'bg-green-50 text-green-600 border-green-100',
    orange: 'bg-orange-50 text-orange-600 border-orange-100',
    red:    'bg-red-50 text-red-600 border-red-100',
    purple: 'bg-purple-50 text-purple-600 border-purple-100',
  }
  const card = (
    <div className={`card p-5 flex items-center gap-4 hover:-translate-y-0.5 transition-all ${to ? 'cursor-pointer' : ''}`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl border ${colors[color] || colors.blue}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{valeur ?? <LoadingSpinner size="sm" />}</p>
        <p className="text-sm text-gray-500 mt-0.5">{titre}</p>
      </div>
    </div>
  )
  return to ? <Link to={to}>{card}</Link> : card
}

export default function DashboardPage() {
  const { user }   = useSelector((s) => s.auth)
  const [data,     setData]    = useState(null)
  const [loading,  setLoading] = useState(true)

  useEffect(() => {
    adminService.getDashboard()
      .then((r) => setData(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const stats = data?.stats || {}

  return (
    <div className="space-y-6">
      {/* Bienvenue */}
      <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-6 text-white">
        <h1 className="font-display font-bold text-2xl mb-1">
          Bonjour, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-white/70 text-sm">
          {format(new Date(), "EEEE d MMMM yyyy", { locale: fr })} — Tableau de bord EPV MAREL
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard titre="Messages non lus"    valeur={stats.messages_non_lus}     icon="📬" color="orange" to="/admin/contacts" />
        <StatCard titre="Articles publiés"    valeur={stats.articles_publies}     icon="📰" color="blue"   to="/admin/articles" />
        <StatCard titre="Brouillons"          valeur={stats.articles_brouillons}  icon="📝" color="purple" to="/admin/articles" />
        <StatCard titre="Commentaires"        valeur={stats.commentaires_attente} icon="💬" color="red"    to="/admin/commentaires" />
        <StatCard titre="Témoignages"         valeur={stats.temoignages_attente}  icon="⭐" color="orange" to="/admin/temoignages" />
        <StatCard titre="Galeries publiées"   valeur={stats.galeries_publiees}    icon="🖼️" color="green"  to="/admin/galeries" />
      </div>

      {/* Accès rapides */}
      <div>
        <h2 className="font-display font-semibold text-gray-900 mb-4">Accès rapides</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { to: '/admin/articles/nouveau',   icon: '✍️', label: 'Nouvel article' },
            { to: '/admin/galeries/nouvelle',  icon: '📸', label: 'Nouvelle galerie' },
            { to: '/admin/contacts',           icon: '📩', label: 'Voir les messages' },
            { to: '/admin/temoignages',        icon: '🌟', label: 'Valider témoignages' },
          ].map((a) => (
            <Link key={a.to} to={a.to}
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm
                         hover:border-primary/30 hover:shadow-card transition-all duration-200 group">
              <span className="text-xl">{a.icon}</span>
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">{a.label}</span>
              <svg className="w-4 h-4 text-gray-300 ml-auto group-hover:text-primary transition-colors"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>

      {/* Articles récents + Messages récents */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Articles récents */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-gray-900">Articles récents</h3>
            <Link to="/admin/articles" className="text-sm text-primary hover:underline">Voir tout</Link>
          </div>
          {loading ? <LoadingSpinner /> : (
            <div className="space-y-3">
              {(data?.articles_recents || []).map((a) => (
                <div key={a.id} className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${
                    a.statut === 'publie' ? 'bg-green-400' : a.statut === 'brouillon' ? 'bg-gray-300' : 'bg-orange-400'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{a.titre}</p>
                    <p className="text-xs text-gray-400 capitalize">{a.statut} · {a.vues} vues</p>
                  </div>
                  <Link to={`/admin/articles/${a.id}/modifier`}
                    className="text-xs text-primary hover:underline shrink-0">Éditer</Link>
                </div>
              ))}
              {!data?.articles_recents?.length && (
                <p className="text-sm text-gray-400 text-center py-4">Aucun article</p>
              )}
            </div>
          )}
        </div>

        {/* Messages récents */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-gray-900">Messages non lus</h3>
            <Link to="/admin/contacts" className="text-sm text-primary hover:underline">Voir tout</Link>
          </div>
          {loading ? <LoadingSpinner /> : (
            <div className="space-y-3">
              {(data?.messages_recents || []).map((m) => (
                <Link key={m.id} to="/admin/contacts"
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
                    <span className="text-orange-600 font-bold text-sm">{m.nom?.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">{m.nom}</p>
                    <p className="text-xs text-gray-500 truncate">{m.sujet}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {format(new Date(m.created_at), 'd MMM, HH:mm', { locale: fr })}
                    </p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-orange-400 shrink-0 mt-1.5" />
                </Link>
              ))}
              {!data?.messages_recents?.length && (
                <p className="text-sm text-gray-400 text-center py-4">Aucun message non lu 🎉</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}