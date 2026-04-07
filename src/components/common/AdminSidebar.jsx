import { NavLink, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggleSidebar } from '@store/slices/uiSlice'
import { 
  LayoutDashboard, FileText, MessageSquare, Image, BookOpen, 
  Users, Clock, Calendar, BarChart, Star, Mail, Layout, 
  Shield, ChevronLeft, ChevronRight, LogOut, User, Settings,
  Award, GraduationCap, Heart, Zap, CheckCircle
} from 'lucide-react'

const NAV_ITEMS = [
  { to: '/admin',              icon: LayoutDashboard, label: 'Tableau de bord', exact: true },
  { divider: 'Contenu' },
  { to: '/admin/articles',     icon: FileText,        label: 'Articles & Blog' },
  { to: '/admin/commentaires', icon: MessageSquare,   label: 'Commentaires' },
  { to: '/admin/galeries',     icon: Image,           label: 'Galeries' },
  { divider: 'École' },
  { to: '/admin/niveaux',      icon: BookOpen,        label: 'Niveaux scolaires' },
  { to: '/admin/equipe',       icon: Users,           label: 'Équipe pédagogique' },
  { to: '/admin/horaires',     icon: Clock,           label: 'Horaires' },
  { to: '/admin/calendrier',   icon: Calendar,        label: 'Calendrier' },
  { divider: 'Accueil' },
  { to: '/admin/chiffres-cles',icon: BarChart,        label: 'Chiffres clés' },
  { to: '/admin/temoignages',  icon: Star,            label: 'Témoignages' },
  { divider: 'Communication' },
  { to: '/admin/contacts',     icon: Mail,            label: 'Messages reçus' },
  { to: '/admin/pages',        icon: Layout,          label: 'Pages statiques' },
  { divider: 'Administration' },
  { to: '/admin/utilisateurs', icon: Shield,          label: 'Utilisateurs', roles: ['super_admin'] },
]

const SIDEBAR_STYLES = `
  @keyframes sidebarGlow {
    0%, 100% { box-shadow: 0 0 0 2px rgba(141,195,30,0.15); }
    50% { box-shadow: 0 0 0 4px rgba(141,195,30,0.3); }
  }
  @keyframes sidebarFadeIn {
    from { opacity: 0; transform: translateX(-10px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes pulseGreen {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.15); }
  }
  @keyframes floatY {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-4px); }
  }
  .nav-item-active {
    background: linear-gradient(135deg, rgba(141,195,30,0.18) 0%, rgba(45,106,31,0.12) 100%);
    border-left: 3px solid #8DC31E;
  }
  .nav-item-active svg {
    color: #8DC31E !important;
  }
  .pulse-dot {
    animation: pulseGreen 2s ease-in-out infinite;
  }
  .float-icon {
    animation: floatY 3s ease-in-out infinite;
  }
`

export default function AdminSidebar({ open }) {
  const { user } = useSelector((s) => s.auth)
  const dispatch = useDispatch()

  return (
    <>
      <style>{SIDEBAR_STYLES}</style>
      
      <aside className={`
        flex-shrink-0 flex flex-col transition-all duration-300 z-30
        fixed lg:relative inset-y-0 left-0
        bg-gradient-to-b from-[#0f2a07] via-[#1a4010] to-[#2D6A1F]
        ${open ? 'w-64 translate-x-0' : 'w-64 -translate-x-full lg:w-[72px] lg:translate-x-0'}
      `}>
        {/* Logo avec effet glow */}
        <div className="h-16 flex items-center px-4 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3 overflow-hidden group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8DC31E] to-[#2D6A1F] flex items-center justify-center shrink-0 shadow-lg transition-all duration-300 group-hover:shadow-[#8DC31E]/30 group-hover:shadow-xl">
              <span className="text-white font-display font-bold text-sm">M</span>
            </div>
            {open && (
              <div className="overflow-hidden">
                <p className="text-white font-display font-bold text-sm leading-tight whitespace-nowrap">EPV MAREL</p>
                <p className="text-[#8DC31E]/60 text-[10px] whitespace-nowrap">Back-office</p>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          {NAV_ITEMS.map((item, i) => {
            if (item.divider) {
              if (!open) return (
                <div key={i} className="my-3 flex justify-center">
                  <div className="w-8 h-px bg-white/10"></div>
                </div>
              )
              return (
                <p key={i} className="px-2 pt-4 pb-1 text-[10px] font-semibold uppercase tracking-wider text-[#8DC31E]/40">
                  {item.divider}
                </p>
              )
            }
            if (item.roles && !item.roles.includes(user?.role)) return null
            
            const IconComponent = item.icon
            
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative
                  ${isActive 
                    ? 'nav-item-active text-white' 
                    : 'text-white/50 hover:bg-white/5 hover:text-white'}`
                }
                title={!open ? item.label : undefined}
              >
                {({ isActive }) => (
                  <>
                    <span className={`shrink-0 transition-all duration-200 ${isActive ? 'text-[#8DC31E]' : 'text-white/40 group-hover:text-white/70'}`}>
                      <IconComponent size={18} />
                    </span>
                    {open && (
                      <>
                        <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
                        {isActive && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#8DC31E] pulse-dot" />
                        )}
                      </>
                    )}
                    {!open && isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-[#8DC31E]" />
                    )}
                  </>
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* User info - version améliorée */}
        {user && (
          <div className={`${open ? 'p-3 m-2 rounded-xl bg-white/5 border border-white/10' : 'p-2'}`}>
            <div className={`flex items-center gap-3 ${!open && 'justify-center'}`}>
              <div className="relative">
                <div className={`w-8 h-8 rounded-xl bg-gradient-to-br from-[#8DC31E] to-[#2D6A1F] flex items-center justify-center shrink-0 shadow-lg ${!open && 'w-9 h-9'}`}>
                  <span className="text-white font-bold text-sm">{user.name?.charAt(0)?.toUpperCase()}</span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-[#2D6A1F] pulse-dot" />
              </div>
              {open && (
                <div className="overflow-hidden flex-1">
                  <p className="text-white text-sm font-medium truncate">{user.name}</p>
                  <p className="text-[#8DC31E]/60 text-xs truncate capitalize">{user.role?.replace('_', ' ')}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bouton toggle pour mobile */}
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="lg:hidden absolute -right-10 top-4 w-8 h-8 rounded-full bg-[#2D6A1F] border border-[#8DC31E]/30 flex items-center justify-center shadow-lg"
        >
          {open ? <ChevronLeft size={16} className="text-white" /> : <ChevronRight size={16} className="text-white" />}
        </button>
      </aside>
    </>
  )
}