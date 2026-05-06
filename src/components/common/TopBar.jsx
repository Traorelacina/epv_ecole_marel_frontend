import { Link } from 'react-router-dom'
import { Phone, Mail } from 'lucide-react'
import { FaFacebook } from 'react-icons/fa'
import logo from '../../assets/images/logo_marel.jpeg'

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
    padding: 10px 32px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    position: relative;
  }

  /* ── Logo — sort du flux, dépasse en bas sur la navbar verte */
  .topbar-brand {
    display: flex;
    align-items: center;
    gap: 16px;
    text-decoration: none;
    flex-shrink: 0;
    position: relative;
    z-index: 10;
  }
  .topbar-logo-wrap {
    width: 100px; height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .topbar-logo {
    width: 100px; height: 100px;
    object-fit: contain;
    display: block;
    filter: drop-shadow(0 2px 8px rgba(0,0,0,.10));
  }
  .topbar-brand-name {
    font-family: 'Sora', sans-serif;
    font-size: 26px;
    font-weight: 800;
    color: #1a1a1a;
    letter-spacing: -.3px;
    line-height: 1;
    display: block;
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
  }
  .topbar-item:hover { opacity: .75; }
  .topbar-icon {
    width: 46px; height: 46px;
    border-radius: 50%;
    border: 2px solid #8DC31E;
    color: #8DC31E;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .topbar-lbl {
    font-size: 12px;
    font-weight: 700;
    color: #1a1a1a;
    line-height: 1;
    margin: 0 0 5px;
    display: block;
  }
  .topbar-val {
    font-size: 13px;
    font-weight: 500;
    color: #555;
    line-height: 1.55;
    margin: 0;
    display: block;
  }

  /* Tablette */
  @media (max-width: 1024px) {
    .topbar-inner { padding: 10px 20px; gap: 16px; }
    .topbar-contacts { gap: 20px; }
    .topbar-logo, .topbar-logo-wrap { width: 82px; height: 82px; }
    .topbar-brand-name { font-size: 22px; }
  }

  /* Mobile */
  @media (max-width: 860px) {
    .topbar-root { position: relative; top: auto; }
    .topbar-inner { flex-direction: column; align-items: flex-start; padding: 12px 16px; height: auto; }
    .topbar-contacts { flex-wrap: wrap; gap: 14px; }
    .topbar-logo, .topbar-logo-wrap { width: 64px; height: 64px; }
    .topbar-brand-name { font-size: 20px; }
  }

  @media (max-width: 480px) {
    .topbar-contacts { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .topbar-icon { width: 38px; height: 38px; }
    .topbar-lbl { font-size: 11px; }
    .topbar-val { font-size: 12px; }
  }

  @media (max-width: 360px) {
    .topbar-contacts { grid-template-columns: 1fr; }
  }
`

export default function TopBar() {
  return (
    <>
      <style>{STYLES}</style>
      <div className="topbar-root">
        <div className="topbar-inner">

          <Link to="/" className="topbar-brand">
            <div className="topbar-logo-wrap">
              <img src={logo} alt="EPV MAREL" className="topbar-logo" />
            </div>
            <span className="topbar-brand-name">EPV MAREL</span>
          </Link>

          <div className="topbar-contacts">

            <a href="tel:+22522503581" className="topbar-item">
              <div className="topbar-icon"><Phone size={19} /></div>
              <div>
                <span className="topbar-lbl">Nos contacts</span>
                <span className="topbar-val">+225 22 50 35 81</span>
                <span className="topbar-val">+225 05 61 56 10</span>
              </div>
            </a>

            <a href="mailto:contact@etsmarel.ci" className="topbar-item">
              <div className="topbar-icon"><Mail size={19} /></div>
              <div>
                <span className="topbar-lbl">Notre Email</span>
                <span className="topbar-val">contact@etsmarel.ci</span>
              </div>
            </a>

            <a
              href="https://www.facebook.com/gsmarel"
              target="_blank"
              rel="noopener noreferrer"
              className="topbar-item"
            >
              <div className="topbar-icon"><FaFacebook size={19} /></div>
              <div>
                <span className="topbar-lbl">Notre page Facebook</span>
                <span className="topbar-val">facebook.com/gsmarel</span>
              </div>
            </a>

          </div>
        </div>
      </div>
    </>
  )
}