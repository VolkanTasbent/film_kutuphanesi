<script setup>
import { ref } from 'vue'
import AppHeader from '@/Components/AppHeader.vue'
import StatsBar from '@/Components/StatsBar.vue'
import FilmForm from '@/Components/FilmForm.vue'
import FilmList from '@/Components/FilmList.vue'
import { useFilms } from '@/composables/useFilms'

const emit = defineEmits(['navigate'])

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

function handleNavigate(page) {
  emit('navigate', page)
}

defineExpose({
  films,
  startEditing,
})
</script>

<template>
  <div class="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.18),_transparent_35%),linear-gradient(to_bottom,_#020617,_#0f172a)]">
    <AppHeader active-page="home" @navigate="handleNavigate" />

    <main class="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8">
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
