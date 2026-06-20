import { ref, computed, watch } from 'vue'
import { STORAGE_KEY, createFilm } from '@/Interfaces/Film'

/** @type {import('vue').Ref<import('@/Interfaces/Film').Film[]>} */
const films = ref(loadFilms())
const editingId = ref(null)

function loadFilms() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return getSeedFilms()
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) && parsed.length ? parsed : getSeedFilms()
  } catch {
    return getSeedFilms()
  }
}

function getSeedFilms() {
  return [
    createFilm({
      title: 'Inception',
      director: 'Christopher Nolan',
      genre: 'Bilim Kurgu',
      year: 2010,
      rating: 9,
      status: 'izlendi',
      note: 'Rüya içinde rüya konsepti harika.',
    }),
    createFilm({
      title: 'Spirited Away',
      director: 'Hayao Miyazaki',
      genre: 'Animasyon',
      year: 2001,
      rating: 10,
      status: 'favori',
      note: 'Ghibli klasiklerinden biri.',
    }),
    createFilm({
      title: 'Dune: Part Two',
      director: 'Denis Villeneuve',
      genre: 'Bilim Kurgu',
      year: 2024,
      rating: 8,
      status: 'izlenecek',
      note: 'İlk filmden sonra mutlaka izlenecek.',
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
    films.value = [createFilm(payload), ...films.value]
  }

  /**
   * @param {string} id
   * @param {Partial<import('@/Interfaces/Film').Film>} payload
   */
  function updateFilm(id, payload) {
    films.value = films.value.map((film) =>
      film.id === id ? { ...film, ...payload, id } : film,
    )
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
