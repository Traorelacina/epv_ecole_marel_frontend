import { Link } from 'react-router-dom'
import { Phone, Mail } from 'lucide-react'
import { FaFacebook } from 'react-icons/fa'

const STYLES = `
  .topbar-root {
    background: #fff;
    border-bottom: 1px solid #e5e7eb;
    position: fixed;
    top: 38px; left: 0; right: 0;
    z-index: 1100;
  }
  .topbar-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 32px;
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 40px;
  }

  /* ── Contact items */
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

  /* numéros sur une seule ligne */
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

  /* Séparateur vertical */
  .topbar-sep {
    width: 1px;
    height: 36px;
    background: #e5e7eb;
    flex-shrink: 0;
  }

  /* Tablette */
  @media (max-width: 1100px) {
    .topbar-inner { padding: 0 20px; gap: 24px; }
    .topbar-val { font-size: 14px; }
    .topbar-icon { width: 40px; height: 40px; }
  }

  @media (max-width: 860px) {
    .topbar-inner { gap: 16px; padding: 0 16px; height: 60px; }
    .topbar-val { font-size: 13px; }
    .topbar-icon { width: 36px; height: 36px; }
  }

  /* Mobile : masquer téléphone et email, garder seulement FB */
  @media (max-width: 600px) {
    .topbar-hide-mobile { display: none; }
    .topbar-sep { display: none; }
    .topbar-inner { justify-content: center; }
  }
`

export default function TopBar() {
  return (
    <>
      <style>{STYLES}</style>
      <div className="topbar-root">
        <div className="topbar-inner">

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
    </>
  )
}