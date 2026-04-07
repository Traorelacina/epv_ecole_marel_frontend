import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toggleSidebar } from '@store/slices/uiSlice'
import { logoutAsync } from '@store/slices/authSlice'
import toast from 'react-hot-toast'

export default function AdminHeader() {
  const dispatch  = useDispatch()
  const navigate  = useNavigate()
  const { user }  = useSelector((s) => s.auth)

  const handleLogout = async () => {
    await dispatch(logoutAsync())
    toast.success('Déconnexion réussie')
    navigate('/admin/login')
  }

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center px-4 gap-4 shrink-0">
      {/* Toggle sidebar */}
      <button
        onClick={() => dispatch(toggleSidebar())}
        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
        aria-label="Menu"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Titre page */}
      <div className="flex-1" />

      {/* Lien vers le site public */}
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
        Voir le site
      </a>

      <div className="w-px h-6 bg-gray-200" />

      {/* Menu utilisateur */}
      <div className="flex items-center gap-2">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-gray-800 leading-tight">{user?.name}</p>
          <p className="text-xs text-gray-400 capitalize">{user?.role?.replace('_', ' ')}</p>
        </div>
        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
          <span className="text-primary font-bold text-sm">{user?.name?.charAt(0)?.toUpperCase()}</span>
        </div>
        <button
          onClick={handleLogout}
          className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
          title="Déconnexion"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </header>
  )
}