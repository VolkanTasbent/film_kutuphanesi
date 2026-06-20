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
  'Bilim Kurgu',
  'Drama',
  'Fantastik',
  'Gerilim',
  'Komedi',
  'Korku',
  'Romantik',
  'Animasyon',
  'Belgesel',
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
    genre: GENRES[0],
    year: new Date().getFullYear(),
    rating: 5,
    status: 'izlenecek',
    note: '',
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
