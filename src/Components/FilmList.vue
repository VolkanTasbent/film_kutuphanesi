<script setup>
import { computed } from 'vue'
import FilmCard from '@/Components/FilmCard.vue'
import { GENRES, FILM_STATUSES, STATUS_LABELS } from '@/Interfaces/Film'

const props = defineProps({
  films: {
    type: Array,
    required: true,
  },
  editingId: {
    type: String,
    default: null,
  },
  search: {
    type: String,
    default: '',
  },
  statusFilter: {
    type: String,
    default: 'all',
  },
  genreFilter: {
    type: String,
    default: 'all',
  },
})

defineEmits(['edit', 'delete'])

const filteredFilms = computed(() => {
  const query = props.search.trim().toLowerCase()

  return props.films.filter((film) => {
    const matchesSearch =
      !query ||
      film.title.toLowerCase().includes(query) ||
      film.director.toLowerCase().includes(query) ||
      film.note.toLowerCase().includes(query)

    const matchesStatus = props.statusFilter === 'all' || film.status === props.statusFilter
    const matchesGenre = props.genreFilter === 'all' || film.genre === props.genreFilter

    return matchesSearch && matchesStatus && matchesGenre
  })
})
</script>

<template>
  <section class="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
    <div class="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <h2 class="text-xl font-semibold text-white">Film Listesi</h2>
        <p class="mt-1 text-sm text-slate-400">
          {{ filteredFilms.length }} film gösteriliyor
        </p>
      </div>

      <div class="grid gap-3 sm:grid-cols-3">
        <label class="grid gap-2 text-sm">
          <span class="text-slate-400">Ara</span>
          <input
            :value="search"
            type="search"
            placeholder="Film veya yönetmen"
            class="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 outline-none transition focus:border-violet-400"
            @input="$emit('update:search', $event.target.value)"
          />
        </label>

        <label class="grid gap-2 text-sm">
          <span class="text-slate-400">Durum</span>
          <select
            :value="statusFilter"
            class="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 outline-none transition focus:border-violet-400"
            @change="$emit('update:statusFilter', $event.target.value)"
          >
            <option value="all">Tümü</option>
            <option v-for="status in FILM_STATUSES" :key="status" :value="status">
              {{ STATUS_LABELS[status] }}
            </option>
          </select>
        </label>

        <label class="grid gap-2 text-sm">
          <span class="text-slate-400">Tür</span>
          <select
            :value="genreFilter"
            class="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 outline-none transition focus:border-violet-400"
            @change="$emit('update:genreFilter', $event.target.value)"
          >
            <option value="all">Tümü</option>
            <option v-for="genre in GENRES" :key="genre" :value="genre">
              {{ genre }}
            </option>
          </select>
        </label>
      </div>
    </div>

    <div v-if="filteredFilms.length" class="grid gap-4 lg:grid-cols-2">
      <FilmCard
        v-for="film in filteredFilms"
        :key="film.id"
        :film="film"
        :is-editing="editingId === film.id"
        @edit="$emit('edit', $event)"
        @delete="$emit('delete', $event)"
      />
    </div>

    <div
      v-else
      class="rounded-2xl border border-dashed border-slate-700 px-6 py-12 text-center text-slate-400"
    >
      Arama kriterlerinize uygun film bulunamadı.
    </div>
  </section>
</template>
