import { useEffect, useRef } from 'react'

export default function PageTransition({ children }) {
  const ref = useRef(null)
  useEffect(() => {
    if (ref.current) {
      ref.current.style.opacity = '0'
      ref.current.style.transform = 'translateY(12px)'
      requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.transition = 'opacity 0.35s ease, transform 0.35s ease'
          ref.current.style.opacity = '1'
          ref.current.style.transform = 'translateY(0)'
        }
      })
    }
  }, [])
  return <div ref={ref}>{children}</div>
}