/**
 * Formate un montant en FCFA
 */
export function formatMontant(montant, devise = 'FCFA') {
  return `${parseInt(montant).toLocaleString('fr-FR')} ${devise}`
}

/**
 * Tronque un texte à une longueur donnée
 */
export function truncate(text, length = 100) {
  if (!text) return ''
  return text.length > length ? text.slice(0, length) + '…' : text
}

/**
 * Génère l'URL complète d'une image stockée
 */
export function storageUrl(path) {
  if (!path) return null
  if (path.startsWith('http')) return path
  const base = import.meta.env.VITE_STORAGE_URL || 'http://localhost:8000/storage'
  return `${base}/${path}`
}

/**
 * Extrait l'ID d'une vidéo YouTube depuis son URL
 */
export function getYouTubeId(url) {
  if (!url) return null
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
  return match?.[1] || null
}

/**
 * Retourne les initiales d'un nom
 */
export function getInitials(name) {
  if (!name) return '?'
  return name
    .split(' ')
    .slice(0, 2)
    .map(n => n.charAt(0).toUpperCase())
    .join('')
}

/**
 * Classe CSS conditionnelle (lightweight clsx)
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Délai (pour simuler un chargement ou debounce)
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Debounce d'une fonction
 */
export function debounce(fn, delay = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}