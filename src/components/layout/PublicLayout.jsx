import { Outlet, useLocation } from 'react-router-dom'
import TopBar from '@components/common/TopBar'
import Navbar from '@components/common/Navbar'
import FlashInfo from '@components/common/FlashInfo'
import Footer from '@components/common/Footer'
import ScrollToTop from '@components/common/ScrollToTop'
import PageTransition from '@components/common/PageTransition'

export default function PublicLayout() {
  const location = useLocation()
  return (
    <div className="min-h-screen flex flex-col">
      <FlashInfo />
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <PageTransition key={location.pathname}>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}