/**
 * @typedef {Object} Film
 * @property {string} id
 * @property {string} title
 * @property {string} director
 * @property {string} genre
 * @property {number} year
 * @property {number} rating
 * @property {'izlenecek' | 'izlendi' | 'favori'} status
 * @property {string} note
 * @property {string} posterUrl
 * @property {string} createdAt
 */

/** @type {Film['status'][]} */
export const FILM_STATUSES = ['izlenecek', 'izlendi', 'favori']

/** @type {Record<Film['status'], string>} */
export const STATUS_LABELS = {
  izlenecek: 'İzlenecek',
  izlendi: 'İzlendi',
  favori: 'Favori',
}

/** @type {string[]} */
export const GENRES = [
  'Aksiyon',
  'Animasyon',
  'Animasyon/Fantastik',
  'Belgesel',
  'Bilim Kurgu',
  'Bilim Kurgu/Aksiyon',
  'Bilim Kurgu/Macera',
  'Drama',
  'Fantastik',
  'Gerilim',
  'Komedi',
  'Korku',
  'Romantik',
]

export const STORAGE_KEY = 'film-kutuphanesi-data'

/**
 * @returns {Film}
 */
export function createEmptyFilm() {
  return {
    id: '',
    title: '',
    director: '',
    genre: '',
    year: new Date().getFullYear(),
    rating: 5,
    status: 'izlenecek',
    note: '',
    posterUrl: '',
    createdAt: new Date().toISOString(),
  }
}

/**
 * @param {Partial<Film>} [overrides]
 * @returns {Film}
 */
export function createFilm(overrides = {}) {
  return {
    ...createEmptyFilm(),
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...overrides,
  }
}
