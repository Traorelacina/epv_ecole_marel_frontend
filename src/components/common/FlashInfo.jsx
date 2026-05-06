import { useRef, useEffect } from 'react'

const STYLES = `
  .flash-root {
    background: #1a1a1a;
    color: #fff;
    height: 38px;
    display: flex;
    align-items: center;
    overflow: hidden;
    position: relative;
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
    z-index: 2;
  }
  .flash-dot {
    width: 7px; height: 7px;
    background: #fff;
    border-radius: 50%;
    animation: blink 1s infinite;
  }
  @keyframes blink {
    0%,100% { opacity: 1; }
    50% { opacity: 0; }
  }
  .flash-track {
    flex: 1;
    overflow: hidden;
    position: relative;
  }
  .flash-ticker {
    display: inline-flex;
    animation: ticker 120s linear infinite;
    will-change: transform;
  }
  .flash-ticker span {
    white-space: nowrap;
    padding-right: 60px;
  }
  @keyframes ticker {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
`

export default function FlashInfo() {
  const message = (
    <>
      Les inscriptions et réinscriptions pour l'année académique <strong>2026–2027</strong> sont ouvertes !&nbsp;&nbsp;
      Contactez-nous au <strong>+225 22 50 35 81</strong> ou venez nous rendre visite aux <strong>Deux Plateaux, Cocody — Abidjan</strong>.&nbsp;&nbsp;&nbsp;
    </>
  )

  // Deux copies identiques pour l'effet de boucle
  // L'animation translateX(-50%) décalera exactement d'une copie
  return (
    <>
      <style>{STYLES}</style>
      <div className="flash-root">
        <div className="flash-label">
          <span className="flash-dot" />
          Flash Info
        </div>
        <div className="flash-track">
          <div className="flash-ticker">
            <span>{message}</span>
            <span>{message}</span>
          </div>
        </div>
      </div>
    </>
  )
}