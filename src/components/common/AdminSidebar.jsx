import { NavLink, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggleSidebar } from '@store/slices/uiSlice'

const NAV_ITEMS = [
  { to: '/admin',              icon: 'grid',        label: 'Tableau de bord', exact: true },
  { divider: 'Contenu' },
  { to: '/admin/articles',     icon: 'file-text',   label: 'Articles & Blog' },
  { to: '/admin/commentaires', icon: 'message-sq',  label: 'Commentaires' },
  { to: '/admin/galeries',     icon: 'image',       label: 'Galeries' },
  { divider: 'École' },
  { to: '/admin/niveaux',      icon: 'book-open',   label: 'Niveaux scolaires' },
  { to: '/admin/equipe',       icon: 'users',       label: 'Équipe pédagogique' },
  { to: '/admin/horaires',     icon: 'clock',       label: 'Horaires' },
  { to: '/admin/calendrier',   icon: 'calendar',    label: 'Calendrier' },
  { divider: 'Accueil' },
  { to: '/admin/chiffres-cles',icon: 'bar-chart',   label: 'Chiffres clés' },
  { to: '/admin/temoignages',  icon: 'star',        label: 'Témoignages' },
  { divider: 'Communication' },
  { to: '/admin/contacts',     icon: 'mail',        label: 'Messages reçus' },
  { to: '/admin/pages',        icon: 'layout',      label: 'Pages statiques' },
  { divider: 'Administration' },
  { to: '/admin/utilisateurs', icon: 'shield',      label: 'Utilisateurs', roles: ['super_admin'] },
]

const ICONS = {
  'grid':      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />,
  'file-text': <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></>,
  'message-sq':<><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></>,
  'image':     <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></>,
  'book-open': <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></>,
  'users':     <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></>,
  'clock':     <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></>,
  'calendar':  <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></>,
  'bar-chart': <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></>,
  'star':      <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></>,
  'mail':      <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></>,
  'layout':    <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zm12 0a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></>,
  'shield':    <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></>,
}

function Icon({ name }) {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {ICONS[name]}
    </svg>
  )
}

export default function AdminSidebar({ open }) {
  const { user } = useSelector((s) => s.auth)

  return (
    <aside className={`
      flex-shrink-0 flex flex-col bg-primary transition-all duration-300 z-30
      fixed lg:relative inset-y-0 left-0
      ${open ? 'w-64 translate-x-0' : 'w-64 -translate-x-full lg:w-16 lg:translate-x-0'}
    `}>
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-white/10">
        <Link to="/" className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
            <span className="text-white font-display font-bold text-sm">M</span>
          </div>
          {open && (
            <div className="overflow-hidden">
              <p className="text-white font-display font-bold text-sm leading-tight whitespace-nowrap">EPV MAREL</p>
              <p className="text-white/50 text-[10px] whitespace-nowrap">Back-office</p>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {NAV_ITEMS.map((item, i) => {
          if (item.divider) {
            if (!open) return null
            return (
              <p key={i} className="px-3 pt-5 pb-1 text-[10px] font-medium uppercase tracking-widest text-white/35">
                {item.divider}
              </p>
            )
          }
          if (item.roles && !item.roles.includes(user?.role)) return null
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                ${isActive
                  ? 'bg-white/15 text-white'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'}`
              }
              title={!open ? item.label : undefined}
            >
              {({ isActive }) => (
                <>
                  <span className={`shrink-0 ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                    <Icon name={item.icon} />
                  </span>
                  {open && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
                  {open && isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-secondary" />}
                </>
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* User info */}
      {open && user && (
        <div className="p-3 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-lg bg-secondary/30 flex items-center justify-center shrink-0">
              <span className="text-secondary font-bold text-sm">{user.name?.charAt(0)?.toUpperCase()}</span>
            </div>
            <div className="overflow-hidden">
              <p className="text-white text-sm font-medium truncate">{user.name}</p>
              <p className="text-white/40 text-xs truncate capitalize">{user.role?.replace('_', ' ')}</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}