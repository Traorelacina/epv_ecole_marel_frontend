import api from './api'

export const publicService = {
  // Homepage
  getHomepageData: ()                        => api.get('/homepage'),

  // Articles
  getArticles:  (params = {})               => api.get('/articles', { params }),
  getArticle:   (slug)                       => api.get(`/articles/${slug}`),
  postComment:  (slug, data)                 => api.post(`/articles/${slug}/commentaires`, data),

  // Galeries
  getGaleries:  (params = {})               => api.get('/galeries', { params }),
  getGalerie:   (slug)                       => api.get(`/galeries/${slug}`),

  // Niveaux
  getNiveaux:   ()                           => api.get('/niveaux'),
  getNiveau:    (slug)                       => api.get(`/niveaux/${slug}`),

  // Infos pratiques
  getHoraires:  ()                           => api.get('/horaires'),
  getCalendrier:(params = {})               => api.get('/calendrier', { params }),
  getEquipe:    ()                           => api.get('/equipe'),
  getPage:      (slug)                       => api.get(`/pages/${slug}`),

  // Contact
  sendContact:  (data)                       => api.post('/contact', data),
}