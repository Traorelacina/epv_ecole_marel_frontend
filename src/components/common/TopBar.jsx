import { Link } from 'react-router-dom'
import { Phone, Mail } from 'lucide-react'
import { FaFacebook } from 'react-icons/fa'
import logo from '../../assets/images/logo_marel.png'

const STYLES = `
  .topbar-root {
    background: #fff;
    border-bottom: 1px solid #e5e7eb;
  }
  .topbar-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 32px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
  }

  /* ── Logo */
  .topbar-brand {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    text-decoration: none;
  }
  .topbar-logo {
    width: 100px; height: 100px;
    object-fit: contain;
    display: block;
    filter: drop-shadow(0 2px 6px rgba(0,0,0,.12));
  }

  /* ── Contacts */
  .topbar-contacts {
    display: flex;
    align-items: center;
    gap: 36px;
  }
  .topbar-item {
    display: flex;
    align-items: center;
    gap: 14px;
    text-decoration: none;
    transition: opacity .2s;
    white-space: nowrap;
  }
  .topbar-item:hover { opacity: .72; }

  .topbar-icon {
    width: 46px; height: 46px;
    border-radius: 50%;
    border: 2px solid #8DC31E;
    color: #8DC31E;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .topbar-phones {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .topbar-phones .topbar-val + .topbar-val::before {
    content: '|';
    margin-right: 8px;
    color: #ccc;
  }

  .topbar-val {
    font-size: 15px;
    font-weight: 600;
    color: #333;
    line-height: 1;
    margin: 0;
    display: inline;
  }

  .topbar-sep {
    width: 1px;
    height: 36px;
    background: #e5e7eb;
    flex-shrink: 0;
  }

  /* Tablette */
  @media (max-width: 1100px) {
    .topbar-inner { padding: 0 20px; gap: 20px; }
    .topbar-contacts { gap: 20px; }
    .topbar-val { font-size: 14px; }
    .topbar-icon { width: 40px; height: 40px; }
    .topbar-logo { width: 86px; height: 86px; }
  }

  @media (max-width: 860px) {
    .topbar-inner { gap: 14px; padding: 0 16px; height: 80px; }
    .topbar-val { font-size: 13px; }
    .topbar-icon { width: 36px; height: 36px; }
    .topbar-logo { width: 70px; height: 70px; }
    .topbar-contacts { gap: 14px; }
  }

  /* Mobile : masquer téléphone et email, garder logo + FB */
  @media (max-width: 600px) {
    .topbar-hide-mobile { display: none; }
    .topbar-sep { display: none; }
  }
`

export default function TopBar() {
  return (
    <>
      <style>{STYLES}</style>
      <div className="topbar-root">
        <div className="topbar-inner">

          {/* Logo à gauche */}
          <Link to="/" className="topbar-brand">
            <img src={logo} alt="EPV MAREL" className="topbar-logo" />
          </Link>

          {/* Contacts à droite */}
          <div className="topbar-contacts">

            <a href="tel:+22522503581" className="topbar-item topbar-hide-mobile">
              <div className="topbar-icon"><Phone size={20} /></div>
              <div className="topbar-phones">
                <span className="topbar-val">+225 22 50 35 81</span>
                <span className="topbar-val">+225 05 61 56 10</span>
              </div>
            </a>

            <div className="topbar-sep topbar-hide-mobile" />

            <a href="mailto:contact@etsmarel.ci" className="topbar-item topbar-hide-mobile">
              <div className="topbar-icon"><Mail size={20} /></div>
              <span className="topbar-val">contact@etsmarel.ci</span>
            </a>

            <div className="topbar-sep topbar-hide-mobile" />

            <a
              href="https://www.facebook.com/gsmarel"
              target="_blank"
              rel="noopener noreferrer"
              className="topbar-item"
            >
              <div className="topbar-icon"><FaFacebook size={20} /></div>
              <span className="topbar-val">Visitez notre page Facebook</span>
            </a>

          </div>
        </div>
      </div>
    </>
  )
}