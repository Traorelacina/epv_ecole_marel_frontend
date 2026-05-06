import { useRef, useEffect } from 'react'

const STYLES = `
  .flash-root {
    background: #1a1a1a; /* reste noir */
    color: #fff;
    height: 38px;
    display: flex;
    align-items: center;
    overflow: hidden;
    position: relative;
  }
  .flash-label {
    background: #8DC31E; /* vert du logo uniquement ici */
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
    display: flex;
    width: max-content;
    animation: ticker 90s linear infinite;
    transform: translate3d(0, 0, 0); /* accélération GPU */
    backface-visibility: hidden;
    will-change: transform;
  }
  .flash-ticker span {
    white-space: nowrap;
    padding-right: 60px;
    display: inline-block;
  }
  @keyframes ticker {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(-50%, 0, 0);
    }
  }
  @media (max-width: 768px) {
    .flash-ticker {
      animation-duration: 120s;
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

  const tickerRef = useRef(null)

  useEffect(() => {
    const ticker = tickerRef.current
    if (!ticker) return

    const forceRestart = () => {
      ticker.style.animation = 'none'
      ticker.offsetHeight
      ticker.style.animation = null
    }

    const timer = setTimeout(forceRestart, 100)
    window.addEventListener('load', forceRestart)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('load', forceRestart)
    }
  }, [])

  return (
    <>
      <style>{STYLES}</style>
      <div className="flash-root">
        <div className="flash-label">
          <span className="flash-dot" />
          Flash Info
        </div>
        <div className="flash-track">
          <div className="flash-ticker" ref={tickerRef}>
            <span>{message}</span>
            <span>{message}</span>
          </div>
        </div>
      </div>
    </>
  )
}
