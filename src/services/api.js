import axios from 'axios'
import toast from 'react-hot-toast'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  timeout: 15000,
})

/* ── Intercepteur requêtes : ajouter le token ─────────────────── */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error),
)

/* ── Intercepteur réponses : gérer les erreurs globales ──────── */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status  = error.response?.status
    const message = error.response?.data?.message

    if (status === 401) {
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_user')
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login'
      }
    } else if (status === 403) {
      toast.error("Accès refusé. Vous n'avez pas les permissions nécessaires.")
    } else if (status === 422) {
      // Erreurs de validation — gérées localement dans les forms
    } else if (status === 500) {
      toast.error('Une erreur serveur est survenue. Veuillez réessayer.')
    } else if (!error.response) {
      toast.error('Impossible de contacter le serveur. Vérifiez votre connexion.')
    }

    return Promise.reject(error)
  },
)

export default api