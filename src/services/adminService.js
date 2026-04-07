import api from './api'

export const adminService = {
  // Auth
  login:           (data)           => api.post('/admin/login', data),
  logout:          ()               => api.post('/admin/logout'),
  getMe:           ()               => api.get('/admin/me'),
  updatePassword:  (data)           => api.put('/admin/me/password', data),
  forgotPassword:  (data)           => api.post('/admin/forgot-password', data),

  // Dashboard
  getDashboard:    ()               => api.get('/admin/dashboard'),

  // Articles
  getArticles:     (params = {})    => api.get('/admin/articles', { params }),
  getArticle:      (id)             => api.get(`/admin/articles/${id}`),
  createArticle:   (data)           => api.post('/admin/articles', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateArticle:   (id, data)       => api.post(`/admin/articles/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteArticle:   (id)             => api.delete(`/admin/articles/${id}`),
  toggleStatutArticle: (id, data)   => api.post(`/admin/articles/${id}/statut`, data),

  // Commentaires
  getCommentaires: (params = {})    => api.get('/admin/commentaires', { params }),
  approveComment:  (id)             => api.post(`/admin/commentaires/${id}/approve`),
  rejectComment:   (id)             => api.post(`/admin/commentaires/${id}/reject`),
  deleteComment:   (id)             => api.delete(`/admin/commentaires/${id}`),
  bulkApproveComments: (data)       => api.post('/admin/commentaires/bulk-approve', data),
  bulkDeleteComments:  (data)       => api.post('/admin/commentaires/bulk-delete', data),

  // Catégories
  getCategories:   ()               => api.get('/admin/categories'),
  createCategorie: (data)           => api.post('/admin/categories', data),
  updateCategorie: (id, data)       => api.put(`/admin/categories/${id}`, data),
  deleteCategorie: (id)             => api.delete(`/admin/categories/${id}`),

  // Galeries
  getGaleries:     (params = {})    => api.get('/admin/galeries', { params }),
  getGalerie:      (id)             => api.get(`/admin/galeries/${id}`),
  createGalerie:   (data)           => api.post('/admin/galeries', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateGalerie:   (id, data)       => api.post(`/admin/galeries/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteGalerie:   (id)             => api.delete(`/admin/galeries/${id}`),
  togglePublierGalerie: (id)        => api.post(`/admin/galeries/${id}/toggle-publier`),
  uploadPhoto:     (id, data)       => api.post(`/admin/galeries/${id}/upload-photo`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteMedia:     (id)             => api.delete(`/admin/medias/${id}`),

  // Contacts
  getContacts:     (params = {})    => api.get('/admin/contacts', { params }),
  getContact:      (id)             => api.get(`/admin/contacts/${id}`),
  toggleLuContact: (id)             => api.post(`/admin/contacts/${id}/toggle-lu`),
  archiveContact:  (id)             => api.post(`/admin/contacts/${id}/archive`),
  repondreContact: (id, data)       => api.post(`/admin/contacts/${id}/repondre`, data),
  deleteContact:   (id)             => api.delete(`/admin/contacts/${id}`),

  // Niveaux
  getNiveaux:      ()               => api.get('/admin/niveaux'),
  createNiveau:    (data)           => api.post('/admin/niveaux', data),
  updateNiveau:    (id, data)       => api.put(`/admin/niveaux/${id}`, data),
  deleteNiveau:    (id)             => api.delete(`/admin/niveaux/${id}`),

  // Témoignages
  getTemoignages:  (params = {})    => api.get('/admin/temoignages', { params }),
  createTemoignage:(data)           => api.post('/admin/temoignages', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateTemoignage:(id, data)       => api.post(`/admin/temoignages/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteTemoignage:(id)             => api.delete(`/admin/temoignages/${id}`),
  validerTemoignage:(id)            => api.post(`/admin/temoignages/${id}/valider`),
  rejeterTemoignage:(id)            => api.post(`/admin/temoignages/${id}/rejeter`),

  // Équipe
  getEquipe:       ()               => api.get('/admin/equipe'),
  createMembre:    (data)           => api.post('/admin/equipe', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateMembre:    (id, data)       => api.post(`/admin/equipe/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteMembre:    (id)             => api.delete(`/admin/equipe/${id}`),

  // Chiffres clés
  getChiffres:     ()               => api.get('/admin/chiffres-cles'),
  createChiffre:   (data)           => api.post('/admin/chiffres-cles', data),
  updateChiffre:   (id, data)       => api.put(`/admin/chiffres-cles/${id}`, data),
  deleteChiffre:   (id)             => api.delete(`/admin/chiffres-cles/${id}`),

  // Calendrier
  getCalendrier:   (params = {})    => api.get('/admin/calendrier', { params }),
  createEvenement: (data)           => api.post('/admin/calendrier', data),
  updateEvenement: (id, data)       => api.put(`/admin/calendrier/${id}`, data),
  deleteEvenement: (id)             => api.delete(`/admin/calendrier/${id}`),

  // Horaires
  getHoraires:     ()               => api.get('/admin/horaires'),
  createHoraire:   (data)           => api.post('/admin/horaires', data),
  updateHoraire:   (id, data)       => api.put(`/admin/horaires/${id}`, data),
  deleteHoraire:   (id)             => api.delete(`/admin/horaires/${id}`),

  // Utilisateurs
  getUsers:        ()               => api.get('/admin/users'),
  createUser:      (data)           => api.post('/admin/users', data),
  updateUser:      (id, data)       => api.put(`/admin/users/${id}`, data),
  deleteUser:      (id)             => api.delete(`/admin/users/${id}`),

  // Pages statiques
  getPages:        ()               => api.get('/admin/pages'),
  getPage:         (slug)           => api.get(`/admin/pages/${slug}`),
  updatePage:      (slug, data)     => api.put(`/admin/pages/${slug}`, data),
}