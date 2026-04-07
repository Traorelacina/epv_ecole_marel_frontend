import { BrowserRouter, Routes, Route, ScrollRestoration } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import PublicLayout from '@components/layout/PublicLayout'
import AdminLayout  from '@components/layout/AdminLayout'
import ProtectedRoute from '@components/common/ProtectedRoute'

// Pages publiques
import HomePage        from '@pages/public/HomePage'
import EcolePage       from '@pages/public/EcolePage'
import PedagogiePage   from '@pages/public/PedagogiePage'
import InfosPratiquesPage from '@pages/public/InfosPratiquesPage'
import ActualitesPage  from '@pages/public/ActualitesPage'
import ArticleDetailPage from '@pages/public/ArticleDetailPage'
import GaleriePage     from '@pages/public/GaleriePage'
import GalerieDetailPage from '@pages/public/GalerieDetailPage'
import ContactPage     from '@pages/public/ContactPage'
import NotFoundPage    from '@pages/public/NotFoundPage'

// Pages admin
import LoginPage       from '@pages/admin/LoginPage'
import DashboardPage   from '@pages/admin/DashboardPage'
import ArticlesAdminPage from '@pages/admin/ArticlesAdminPage'
import ArticleFormPage from '@pages/admin/ArticleFormPage'
import GaleriesAdminPage from '@pages/admin/GaleriesAdminPage'
import GalerieFormPage from '@pages/admin/GalerieFormPage'
import ContactsAdminPage from '@pages/admin/ContactsAdminPage'
import NiveauxAdminPage from '@pages/admin/NiveauxAdminPage'
import TemoignagesAdminPage from '@pages/admin/TemoignagesAdminPage'
import EquipeAdminPage from '@pages/admin/EquipeAdminPage'
import ChiffresAdminPage from '@pages/admin/ChiffresAdminPage'
import CalendrierAdminPage from '@pages/admin/CalendrierAdminPage'
import HorairesAdminPage from '@pages/admin/HorairesAdminPage'
import CommentairesAdminPage from '@pages/admin/CommentairesAdminPage'
import UsersAdminPage  from '@pages/admin/UsersAdminPage'
import PagesAdminPage  from '@pages/admin/PagesAdminPage'

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { fontFamily: 'DM Sans, sans-serif', fontSize: '14px' },
          success: { iconTheme: { primary: '#2ECC71', secondary: '#fff' } },
          error:   { iconTheme: { primary: '#E74C3C', secondary: '#fff' } },
        }}
      />
      <Routes>
        {/* ─── Routes publiques ─── */}
        <Route element={<PublicLayout />}>
          <Route path="/"                    element={<HomePage />} />
          <Route path="/ecole"               element={<EcolePage />} />
          <Route path="/pedagogie"           element={<PedagogiePage />} />
          <Route path="/informations-pratiques" element={<InfosPratiquesPage />} />
          <Route path="/actualites"          element={<ActualitesPage />} />
          <Route path="/actualites/:slug"    element={<ArticleDetailPage />} />
          <Route path="/galerie"             element={<GaleriePage />} />
          <Route path="/galerie/:slug"       element={<GalerieDetailPage />} />
          <Route path="/contact"             element={<ContactPage />} />
          <Route path="*"                    element={<NotFoundPage />} />
        </Route>

        {/* ─── Login admin (sans layout) ─── */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* ─── Routes admin protégées ─── */}
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index                       element={<DashboardPage />} />
          <Route path="articles"             element={<ArticlesAdminPage />} />
          <Route path="articles/nouveau"     element={<ArticleFormPage />} />
          <Route path="articles/:id/modifier" element={<ArticleFormPage />} />
          <Route path="galeries"             element={<GaleriesAdminPage />} />
          <Route path="galeries/nouvelle"    element={<GalerieFormPage />} />
          <Route path="galeries/:id/modifier" element={<GalerieFormPage />} />
          <Route path="contacts"             element={<ContactsAdminPage />} />
          <Route path="niveaux"              element={<NiveauxAdminPage />} />
          <Route path="temoignages"          element={<TemoignagesAdminPage />} />
          <Route path="equipe"               element={<EquipeAdminPage />} />
          <Route path="chiffres-cles"        element={<ChiffresAdminPage />} />
          <Route path="calendrier"           element={<CalendrierAdminPage />} />
          <Route path="horaires"             element={<HorairesAdminPage />} />
          <Route path="commentaires"         element={<CommentairesAdminPage />} />
          <Route path="utilisateurs"         element={<UsersAdminPage />} />
          <Route path="pages"                element={<PagesAdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
