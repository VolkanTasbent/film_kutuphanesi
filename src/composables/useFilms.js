import { ref, computed, watch } from 'vue'
import { STORAGE_KEY, createFilm } from '@/Interfaces/Film'
import { getPosterUrl } from '@/utils/posters'

/** @type {import('vue').Ref<import('@/Interfaces/Film').Film[]>} */
const films = ref(loadFilms())
const editingId = ref(null)

function normalizeFilm(film) {
  return {
    ...film,
    posterUrl: getPosterUrl(film.title, film.posterUrl),
    note: film.note ?? '',
  }
}

function loadFilms() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return getSeedFilms()
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed) || !parsed.length) return getSeedFilms()
    return parsed.map(normalizeFilm)
  } catch {
    return getSeedFilms()
  }
}

function getSeedFilms() {
  return [
    createFilm({
      title: 'Inception',
      director: 'Christopher Nolan',
      genre: 'Bilim Kurgu/Aksiyon',
      year: 2010,
      rating: 8.8,
      status: 'izlendi',
      posterUrl: getPosterUrl('Inception'),
    }),
    createFilm({
      title: 'Spirited Away',
      director: 'Hayao Miyazaki',
      genre: 'Animasyon/Fantastik',
      year: 2001,
      rating: 8.6,
      status: 'izlenecek',
      posterUrl: getPosterUrl('Spirited Away'),
    }),
    createFilm({
      title: 'Dune Part Two',
      director: 'Denis Villeneuve',
      genre: 'Bilim Kurgu/Macera',
      year: 2024,
      rating: 8.7,
      status: 'favori',
      posterUrl: getPosterUrl('Dune Part Two'),
    }),
  ]
}

watch(
  films,
  (value) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  },
  { deep: true },
)

export function useFilms() {
  const editingFilm = computed(() =>
    films.value.find((film) => film.id === editingId.value) ?? null,
  )

  const stats = computed(() => ({
    total: films.value.length,
    izlenecek: films.value.filter((f) => f.status === 'izlenecek').length,
    izlendi: films.value.filter((f) => f.status === 'izlendi').length,
    favori: films.value.filter((f) => f.status === 'favori').length,
  }))

  /**
   * @param {Omit<import('@/Interfaces/Film').Film, 'id' | 'createdAt'>} payload
   */
  function addFilm(payload) {
    const film = createFilm({
      ...payload,
      posterUrl: getPosterUrl(payload.title, payload.posterUrl),
    })
    films.value = [film, ...films.value]
  }

  /**
   * @param {string} id
   * @param {Partial<import('@/Interfaces/Film').Film>} payload
   */
  function updateFilm(id, payload) {
    films.value = films.value.map((film) => {
      if (film.id !== id) return film
      const title = payload.title ?? film.title
      return normalizeFilm({
        ...film,
        ...payload,
        id,
        posterUrl: getPosterUrl(title, payload.posterUrl ?? film.posterUrl),
      })
    })
    editingId.value = null
  }

  /** @param {string} id */
  function deleteFilm(id) {
    films.value = films.value.filter((film) => film.id !== id)
    if (editingId.value === id) editingId.value = null
  }

  /** @param {string} id */
  function startEditing(id) {
    editingId.value = id
  }

  function cancelEditing() {
    editingId.value = null
  }

  return {
    films,
    editingId,
    editingFilm,
    stats,
    addFilm,
    updateFilm,
    deleteFilm,
    startEditing,
    cancelEditing,
  }
}
