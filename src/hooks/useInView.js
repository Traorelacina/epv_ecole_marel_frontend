import { useEffect, useRef, useState } from 'react'

/**
 * Déclenche une animation quand l'élément entre dans le viewport.
 * @param {number} threshold - 0 à 1, fraction visible avant déclenchement
 * @param {boolean} once - ne déclenche qu'une fois
 */
export function useInView(threshold = 0.15, once = true) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, once])

  return [ref, inView]
}