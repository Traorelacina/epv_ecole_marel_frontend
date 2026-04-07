import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toggleSidebar } from '@store/slices/uiSlice'
import { logoutAsync } from '@store/slices/authSlice'
import toast from 'react-hot-toast'
import { Menu, ExternalLink, LogOut, User, Bell, Settings, ChevronDown, Zap } from 'lucide-react'
import { useState } from 'react'

const HEADER_STYLES = `
  @keyframes headerGlow {
    0%, 100% { box-shadow: 0 1px 3px rgba(141,195,30,0.05); }
    50% { box-shadow: 0 1px 6px rgba(141,195,30,0.12); }
  }
  @keyframes pulseGreen {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.2); }
  }
`

export default function AdminHeader() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((s) => s.auth)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleLogout = async () => {
    await dispatch(logoutAsync())
    toast.success('Déconnexion réussie')
    navigate('/admin/login')
  }

  return (
    <>
      <style>{HEADER_STYLES}</style>
      
      <header className="h-16 bg-white border-b border-gray-100 flex items-center px-4 gap-4 shrink-0 sticky top-0 z-20 animate-[headerGlow_3s_ease-in-out_infinite]">
        {/* Toggle sidebar */}
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="p-2 rounded-lg text-gray-500 hover:bg-gradient-to-r hover:from-[#F2F9E5] hover:to-[#E8F5E0] hover:text-[#2D6A1F] transition-all duration-200"
          aria-label="Menu"
        >
          <Menu size={20} />
        </button>

        {/* Badge statut (inspiré du hero) */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#F2F9E5] to-[#E8F5E0] border border-[#8DC31E]/20">
          <div className="w-1.5 h-1.5 rounded-full bg-[#8DC31E] pulse-green" />
          <span className="text-xs font-medium text-[#2D6A1F]">Back-office actif</span>
          <Zap size={12} className="text-[#8DC31E]" />
        </div>

        {/* Titre page dynamique (sera géré par le routeur) */}
        <div className="flex-1" />

        {/* Lien vers le site public */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-[#2D6A1F] hover:bg-[#F2F9E5] rounded-lg transition-all duration-200 group"
        >
          <ExternalLink size={14} className="group-hover:scale-105 transition-transform" />
          Voir le site
        </a>

        {/* Séparateur */}
        <div className="w-px h-6 bg-gradient-to-b from-transparent via-gray-300 to-transparent" />

        {/* Notifications (optionnel) */}
        <button className="relative p-2 rounded-lg text-gray-500 hover:bg-[#F2F9E5] hover:text-[#2D6A1F] transition-all duration-200">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D4191A] pulse-green" />
        </button>

        {/* Menu utilisateur */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-[#F2F9E5] transition-all duration-200 group"
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8DC31E] to-[#2D6A1F] flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">{user?.name?.charAt(0)?.toUpperCase()}</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white pulse-green" />
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-800 leading-tight">{user?.name}</p>
              <p className="text-xs text-[#8DC31E] capitalize">{user?.role?.replace('_', ' ')}</p>
            </div>
            <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''} hidden sm:block`} />
          </button>

          {/* Dropdown menu */}
          {showUserMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)} />
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20 animate-[sidebarFadeIn_0.2s_ease-out]">
                <div className="p-3 border-b border-gray-100 bg-gradient-to-r from-[#F2F9E5] to-white">
                  <p className="text-xs text-gray-500">Connecté en tant que</p>
                  <p className="text-sm font-semibold text-gray-800">{user?.email}</p>
                </div>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-[#F2F9E5] hover:text-[#2D6A1F] transition-colors">
                  <User size={15} />
                  Mon profil
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-[#F2F9E5] hover:text-[#2D6A1F] transition-colors">
                  <Settings size={15} />
                  Paramètres
                </button>
                <div className="border-t border-gray-100">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={15} />
                    Déconnexion
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </header>

      <style>{`
        .pulse-green {
          animation: pulseGreen 2s ease-in-out infinite;
        }
        @keyframes sidebarFadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}