import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { adminService } from '@services/adminService'
import LoadingSpinner from '@components/common/LoadingSpinner'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import {
  Mail, FileText, PenTool, MessageSquare, Star, Image,
  Plus, GalleryHorizontal, MailOpen, Star as StarIcon,
  ArrowRight, Eye, Calendar, Users, Award, CheckCircle,
  Clock, Zap, LayoutDashboard, Inbox, Edit3, TrendingUp
} from 'lucide-react'

const DASHBOARD_STYLES = `
  @keyframes dashboardFadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes dashboardPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(141,195,30,0.2); }
    50% { box-shadow: 0 0 0 4px rgba(141,195,30,0.1); }
  }
  @keyframes statGlow {
    0%, 100% { border-color: rgba(141,195,30,0.1); }
    50% { border-color: rgba(141,195,30,0.3); }
  }
  .stat-card {
    animation: statGlow 3s ease-in-out infinite;
  }
  .welcome-card {
    background: linear-gradient(135deg, #0f2a07 0%, #1a4010 40%, #2D6A1F 100%);
  }
`

function StatCard({ titre, valeur, icon: Icon, color, to }) {
  const colorClasses = {
    blue:   'from-blue-50 to-blue-100 text-blue-600 border-blue-200',
    green:  'from-green-50 to-green-100 text-green-600 border-green-200',
    orange: 'from-orange-50 to-orange-100 text-orange-600 border-orange-200',
    red:    'from-red-50 to-red-100 text-red-600 border-red-200',
    purple: 'from-purple-50 to-purple-100 text-purple-600 border-purple-200',
  }
  
  const card = (
    <div className={`stat-card bg-white rounded-xl p-5 flex items-center gap-4 transition-all duration-300 border hover:shadow-lg hover:-translate-y-0.5 ${to ? 'cursor-pointer' : ''}`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${colorClasses[color] || colorClasses.blue}`}>
        <Icon size={22} strokeWidth={1.8} />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900 font-display">{valeur ?? <LoadingSpinner size="sm" />}</p>
        <p className="text-sm text-gray-500 mt-0.5 font-medium">{titre}</p>
      </div>
    </div>
  )
  return to ? <Link to={to}>{card}</Link> : card
}

function QuickAccessCard({ to, icon: Icon, label, description }) {
  return (
    <Link
      to={to}
      className="group bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-4"
    >
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F2F9E5] to-[#E8F5E0] flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
        <Icon size={18} className="text-[#2D6A1F]" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-800 group-hover:text-[#2D6A1F] transition-colors">{label}</p>
        {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
      </div>
      <ArrowRight size={14} className="text-gray-300 group-hover:text-[#8DC31E] group-hover:translate-x-0.5 transition-all" />
    </Link>
  )
}

function RecentArticleItem({ article }) {
  const statusConfig = {
    publie: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50', label: 'Publié' },
    brouillon: { icon: Edit3, color: 'text-gray-400', bg: 'bg-gray-50', label: 'Brouillon' },
    en_attente: { icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50', label: 'En attente' }
  }
  const config = statusConfig[article.statut] || statusConfig.brouillon
  const IconComponent = config.icon

  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
      <div className={`w-2 h-2 rounded-full ${config.color.replace('text', 'bg')}`} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 truncate group-hover:text-[#2D6A1F] transition-colors">
          {article.titre}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium ${config.bg} ${config.color}`}>
            <IconComponent size={8} />
            {config.label}
          </span>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Eye size={10} />
            {article.vues} vues
          </span>
        </div>
      </div>
      <Link
        to={`/admin/articles/${article.id}/modifier`}
        className="text-xs font-medium text-[#8DC31E] opacity-0 group-hover:opacity-100 transition-opacity hover:underline"
      >
        Éditer
      </Link>
    </div>
  )
}

function RecentMessageItem({ message }) {
  return (
    <Link
      to="/admin/contacts"
      className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
    >
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center shrink-0">
        <span className="text-orange-600 font-bold text-sm">{message.nom?.charAt(0)?.toUpperCase()}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 group-hover:text-[#2D6A1F] transition-colors">{message.nom}</p>
        <p className="text-xs text-gray-500 truncate">{message.sujet}</p>
        <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
          <Calendar size={10} />
          {format(new Date(message.created_at), 'd MMM, HH:mm', { locale: fr })}
        </p>
      </div>
      <div className="w-2 h-2 rounded-full bg-orange-400 shrink-0 mt-1.5 animate-pulse" />
    </Link>
  )
}

export default function DashboardPage() {
  const { user } = useSelector((s) => s.auth)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminService.getDashboard()
      .then((r) => setData(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const stats = data?.stats || {}

  return (
    <>
      <style>{DASHBOARD_STYLES}</style>
      
      <div className="space-y-6 animate-[dashboardFadeIn_0.5s_ease-out]">
        {/* Welcome Card - style hero section */}
        <div className="welcome-card rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-[#8DC31E]/10 -ml-20 -mb-20" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#8DC31E]/20 flex items-center justify-center">
                <Zap size={16} className="text-[#8DC31E]" />
              </div>
              <span className="text-xs font-semibold text-[#8DC31E] uppercase tracking-wider">Tableau de bord</span>
            </div>
            <h1 className="font-display font-bold text-2xl md:text-3xl mb-2">
              Bonjour, {user?.name?.split(' ')[0]}
            </h1>
            <p className="text-white/60 text-sm flex items-center gap-2">
              <Calendar size={12} />
              {format(new Date(), "EEEE d MMMM yyyy", { locale: fr })}
              <span className="w-1 h-1 rounded-full bg-white/30 mx-1" />
              <Clock size={12} />
              Vue d'ensemble de votre école
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard 
            titre="Messages non lus" 
            valeur={stats.messages_non_lus} 
            icon={Inbox} 
            color="orange" 
            to="/admin/contacts" 
          />
          <StatCard 
            titre="Articles publiés" 
            valeur={stats.articles_publies} 
            icon={FileText} 
            color="blue" 
            to="/admin/articles" 
          />
          <StatCard 
            titre="Brouillons" 
            valeur={stats.articles_brouillons} 
            icon={PenTool} 
            color="purple" 
            to="/admin/articles" 
          />
          <StatCard 
            titre="Commentaires" 
            valeur={stats.commentaires_attente} 
            icon={MessageSquare} 
            color="red" 
            to="/admin/commentaires" 
          />
          <StatCard 
            titre="Témoignages" 
            valeur={stats.temoignages_attente} 
            icon={Star} 
            color="orange" 
            to="/admin/temoignages" 
          />
          <StatCard 
            titre="Galeries publiées" 
            valeur={stats.galeries_publiees} 
            icon={Image} 
            color="green" 
            to="/admin/galeries" 
          />
        </div>

        {/* Quick Access */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <LayoutDashboard size={18} className="text-[#2D6A1F]" />
              <h2 className="font-display font-semibold text-gray-900">Accès rapides</h2>
            </div>
            <span className="text-[10px] font-medium text-[#8DC31E] uppercase tracking-wider">Actions fréquentes</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <QuickAccessCard 
              to="/admin/articles/nouveau" 
              icon={Plus} 
              label="Nouvel article" 
              description="Rédiger un article de blog"
            />
            <QuickAccessCard 
              to="/admin/galeries/nouvelle" 
              icon={GalleryHorizontal} 
              label="Nouvelle galerie" 
              description="Ajouter des photos"
            />
            <QuickAccessCard 
              to="/admin/contacts" 
              icon={MailOpen} 
              label="Voir les messages" 
              description="Consulter la boîte de réception"
            />
            <QuickAccessCard 
              to="/admin/temoignages" 
              icon={StarIcon} 
              label="Valider témoignages" 
              description="Modérer les avis parents"
            />
          </div>
        </div>

        {/* Recent Articles + Recent Messages */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Articles */}
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-[#2D6A1F]" />
                <h3 className="font-display font-semibold text-gray-900">Articles récents</h3>
              </div>
              <Link to="/admin/articles" className="text-xs font-medium text-[#8DC31E] hover:underline flex items-center gap-1">
                Voir tout
                <ArrowRight size={10} />
              </Link>
            </div>
            {loading ? (
              <div className="py-8"><LoadingSpinner /></div>
            ) : (
              <div className="space-y-2">
                {(data?.articles_recents || []).map((article) => (
                  <RecentArticleItem key={article.id} article={article} />
                ))}
                {!data?.articles_recents?.length && (
                  <div className="text-center py-8">
                    <FileText size={32} className="text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Aucun article pour le moment</p>
                    <Link to="/admin/articles/nouveau" className="text-xs text-[#8DC31E] hover:underline mt-2 inline-block">
                      Créer mon premier article
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Recent Messages */}
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-[#2D6A1F]" />
                <h3 className="font-display font-semibold text-gray-900">Messages non lus</h3>
              </div>
              <Link to="/admin/contacts" className="text-xs font-medium text-[#8DC31E] hover:underline flex items-center gap-1">
                Voir tout
                <ArrowRight size={10} />
              </Link>
            </div>
            {loading ? (
              <div className="py-8"><LoadingSpinner /></div>
            ) : (
              <div className="space-y-1">
                {(data?.messages_recents || []).map((message) => (
                  <RecentMessageItem key={message.id} message={message} />
                ))}
                {!data?.messages_recents?.length && (
                  <div className="text-center py-8">
                    <Mail size={32} className="text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Aucun message non lu</p>
                    <p className="text-xs text-gray-300 mt-1">Tous les messages sont traités</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-gradient-to-br from-[#F2F9E5] to-white rounded-xl p-3 text-center border border-[#8DC31E]/10">
            <TrendingUp size={16} className="text-[#8DC31E] mx-auto mb-1" />
            <p className="text-lg font-bold text-gray-800">100%</p>
            <p className="text-[10px] text-gray-500">Réussite CEPE</p>
          </div>
          <div className="bg-gradient-to-br from-[#F2F9E5] to-white rounded-xl p-3 text-center border border-[#8DC31E]/10">
            <Users size={16} className="text-[#8DC31E] mx-auto mb-1" />
            <p className="text-lg font-bold text-gray-800">500+</p>
            <p className="text-[10px] text-gray-500">Élèves formés</p>
          </div>
          <div className="bg-gradient-to-br from-[#F2F9E5] to-white rounded-xl p-3 text-center border border-[#8DC31E]/10">
            <Award size={16} className="text-[#8DC31E] mx-auto mb-1" />
            <p className="text-lg font-bold text-gray-800">25+</p>
            <p className="text-[10px] text-gray-500">Ans d'excellence</p>
          </div>
          <div className="bg-gradient-to-br from-[#F2F9E5] to-white rounded-xl p-3 text-center border border-[#8DC31E]/10">
            <CheckCircle size={16} className="text-[#8DC31E] mx-auto mb-1" />
            <p className="text-lg font-bold text-gray-800">6</p>
            <p className="text-[10px] text-gray-500">Niveaux scolaires</p>
          </div>
        </div>
      </div>
    </>
  )
}