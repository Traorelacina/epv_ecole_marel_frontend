import { Link } from 'react-router-dom'
import { Phone, Mail } from 'lucide-react'
import logo from '../../assets/images/logo_marel.jpeg'
import { FaFacebook } from 'react-icons/fa'

const STYLES = `
  .topbar-root {
    background: #2D6A1F;
    border-bottom: 3px solid #8DC31E;
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 1100;
  }
  .topbar-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 10px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }
  .topbar-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    flex-shrink: 0;
  }
  .topbar-logo {
    width: 58px; height: 58px;
    object-fit: contain;
    border-radius: 10px;
    border: 3px solid #8DC31E;
    background: #fff;
    padding: 2px;
    display: block;
  }
  .topbar-brand-name {
    font-family: 'Sora', sans-serif;
    font-weight: 800;
    font-size: 17px;
    color: #fff;
    letter-spacing: -0.3px;
    line-height: 1.2;
    display: block;
  }
  .topbar-brand-sub {
    font-size: 11px;
    color: rgba(255,255,255,0.62);
    font-weight: 500;
    display: block;
    margin-top: 3px;
  }
  .topbar-contacts {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
  }
  .topbar-sep {
    width: 1px; height: 44px;
    background: rgba(255,255,255,0.18);
    flex-shrink: 0;
  }
  .topbar-item {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    transition: opacity .2s;
    cursor: pointer;
  }
  .topbar-item:hover { opacity: .75; }
  .topbar-icon {
    width: 38px; height: 38px;
    border-radius: 50%;
    background: rgba(141,195,30,.22);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .topbar-lbl {
    color: rgba(255,255,255,.58);
    font-size: 9px; font-weight: 700;
    text-transform: uppercase; letter-spacing: .09em;
    line-height: 1; margin: 0;
  }
  .topbar-val {
    color: #fff; font-size: 13px; font-weight: 700;
    margin: 3px 0 0; line-height: 1;
  }
  .topbar-val2 {
    color: rgba(255,255,255,.75); font-size: 11.5px; font-weight: 500;
    margin: 2px 0 0; line-height: 1;
  }
  .topbar-fb {
    color: #8DC31E; font-size: 13px; font-weight: 700;
    margin: 3px 0 0; line-height: 1; text-decoration: underline;
  }

  /* Tablette */
  @media (max-width: 960px) {
    .topbar-inner { padding: 10px 20px; gap: 12px; }
    .topbar-sep { display: none; }
    .topbar-contacts { gap: 14px; }
  }

  /* Mobile landscape / petite tablette */
  @media (max-width: 720px) {
    .topbar-inner {
      flex-direction: column;
      align-items: flex-start;
      padding: 10px 16px;
    }
    .topbar-contacts {
      width: 100%;
      gap: 12px;
    }
    .topbar-logo { width: 48px; height: 48px; }
    .topbar-brand-name { font-size: 15px; }
    .topbar-brand-sub { font-size: 10px; }
  }

  /* Mobile portrait */
  @media (max-width: 480px) {
    .topbar-contacts {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    .topbar-icon { width: 32px; height: 32px; }
    .topbar-val { font-size: 11.5px; }
    .topbar-val2 { font-size: 10.5px; }
    .topbar-fb { font-size: 11.5px; }
    .topbar-lbl { font-size: 8px; }
  }

  /* Très petit mobile */
  @media (max-width: 360px) {
    .topbar-contacts { grid-template-columns: 1fr; }
    .topbar-logo { width: 42px; height: 42px; }
  }
`

export default function TopBar() {
  return (
    <>
      <style>{STYLES}</style>
      <div className="topbar-root">
        <div className="topbar-inner">

          {/* Logo */}
          <Link to="/" className="topbar-brand">
            <img src={logo} alt="EPV MAREL" className="topbar-logo" />
            <div>
              <span className="topbar-brand-name">EPV MAREL</span>
              <span className="topbar-brand-sub">École Maternelle &amp; Primaire</span>
            </div>
          </Link>

          {/* Contacts */}
          <div className="topbar-contacts">

            <a href="tel:+22522503581" className="topbar-item">
              <div className="topbar-icon"><Phone size={15} style={{ color: '#8DC31E' }} /></div>
              <div>
                <p className="topbar-lbl">Nos contacts</p>
                <p className="topbar-val">+225 22 50 35 81</p>
                <p className="topbar-val2">+225 05 61 56 10</p>
              </div>
            </a>

            <div className="topbar-sep" />

            <a href="mailto:contact@etsmarel.ci" className="topbar-item">
              <div className="topbar-icon"><Mail size={15} style={{ color: '#8DC31E' }} /></div>
              <div>
                <p className="topbar-lbl">Notre Email</p>
                <p className="topbar-val">contact@etsmarel.ci</p>
              </div>
            </a>

            <div className="topbar-sep" />

            <a href="https://www.facebook.com/gsmarel" target="_blank" rel="noopener noreferrer" className="topbar-item">
              <div className="topbar-icon"><FaFacebook size={15} style={{ color: '#8DC31E' }} /></div>
              <div>
                <p className="topbar-lbl">Notre page Méta</p>
                <p className="topbar-fb">Visitez la page</p>
              </div>
            </a>

          </div>
        </div>
      </div>
    </>
  )
}