<script setup>
import { ref } from 'vue'
import StatsBar from '@/Components/StatsBar.vue'
import FilmForm from '@/Components/FilmForm.vue'
import FilmList from '@/Components/FilmList.vue'
import { useFilms } from '@/composables/useFilms'

const {
  films,
  editingId,
  editingFilm,
  stats,
  addFilm,
  updateFilm,
  deleteFilm,
  startEditing,
  cancelEditing,
} = useFilms()

const search = ref('')
const statusFilter = ref('all')
const genreFilter = ref('all')

function handleSubmit(payload) {
  if (editingFilm.value) {
    updateFilm(editingFilm.value.id, payload)
    return
  }
  addFilm(payload)
}

function handleDelete(id) {
  const film = films.value.find((item) => item.id === id)
  if (!film) return

  const confirmed = window.confirm(`"${film.title}" filmini silmek istediğinize emin misiniz?`)
  if (confirmed) deleteFilm(id)
}

defineEmits(['welcome'])
</script>

<template>
  <div>
    <main class="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8">
      <button
        type="button"
        class="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-600 bg-slate-800/60 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-violet-400 hover:text-violet-200"
        @click="$emit('welcome')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Giriş Ekranına Dön
      </button>

      <StatsBar :stats="stats" />

      <FilmForm
        :editing-film="editingFilm"
        @submit="handleSubmit"
        @cancel="cancelEditing"
      />

      <FilmList
        :films="films"
        :editing-id="editingId"
        :search="search"
        :status-filter="statusFilter"
        :genre-filter="genreFilter"
        @edit="startEditing"
        @delete="handleDelete"
        @update:search="search = $event"
        @update:status-filter="statusFilter = $event"
        @update:genre-filter="genreFilter = $event"
      />
    </main>

    <footer class="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
      © 2025 Film Kütüphanesi. Tüm hakları saklıdır.
      <span class="text-violet-400"> ♥</span>
    </footer>
  </div>
</template>
