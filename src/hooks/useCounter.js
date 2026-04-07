import { useEffect, useRef, useState } from 'react'

export function useCounter(end, duration = 2200, start = 0) {
  const [count, setCount] = useState(start)
  const frameRef = useRef(null)

  const run = () => {
    const startTime = performance.now()
    const step = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(start + (end - start) * ease))
      if (progress < 1) frameRef.current = requestAnimationFrame(step)
    }
    frameRef.current = requestAnimationFrame(step)
  }

  useEffect(() => () => cancelAnimationFrame(frameRef.current), [])

  return [count, run]
}