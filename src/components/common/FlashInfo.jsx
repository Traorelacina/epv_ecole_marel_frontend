const STYLES = `
  .flash-root {
    background: #1a1a1a;
    color: #fff;
    height: 38px;
    display: flex;
    align-items: center;
    overflow: hidden;
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 1200;
  }
  .flash-label {
    background: #8DC31E;
    color: #fff;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: .1em;
    padding: 0 16px;
    height: 100%;
    display: flex;
    align-items: center;
    white-space: nowrap;
    flex-shrink: 0;
    gap: 7px;
  }
  .flash-dot {
    width: 7px; height: 7px;
    background: #fff;
    border-radius: 50%;
    animation: blink 1s infinite;
  }
  @keyframes blink {
    0%,100%{opacity:1} 50%{opacity:0}
  }
  .flash-track {
    flex: 1;
    overflow: hidden;
  }
  .flash-ticker {
    display: inline-block;
    white-space: nowrap;
    font-size: 13px;
    font-weight: 500;
    color: rgba(255,255,255,.88);
    animation: ticker 55s linear infinite;
    padding-left: 60px;
  }
  .flash-ticker strong { color: #8DC31E; font-weight: 800; }
  @keyframes ticker {
    from { transform: translateX(100vw); }
    to   { transform: translateX(-100%); }
  }
`

export default function FlashInfo() {
  return (
    <>
      <style>{STYLES}</style>
      <div className="flash-root">
        <div className="flash-label">
          <span className="flash-dot" />
          Flash Info
        </div>
        <div className="flash-track">
          <span className="flash-ticker">
            Les inscriptions et réinscriptions pour l'année académique <strong>2026–2027</strong> sont ouvertes !&nbsp;&nbsp;
            Contactez-nous au <strong>+225 22 50 35 81</strong> ou venez nous rendre visite aux <strong>Deux Plateaux, Cocody — Abidjan</strong>.
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            Les inscriptions et réinscriptions pour l'année académique <strong>2026–2027</strong> sont ouvertes !&nbsp;&nbsp;
            Contactez-nous au <strong>+225 22 50 35 81</strong> ou venez nous rendre visite aux <strong>Deux Plateaux, Cocody — Abidjan</strong>.
          </span>
        </div>
      </div>
    </>
  )
}