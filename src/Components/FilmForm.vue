<script setup>
import { reactive, watch } from 'vue'
import { GENRES, FILM_STATUSES, STATUS_LABELS, createEmptyFilm } from '@/Interfaces/Film'

const props = defineProps({
  editingFilm: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['submit', 'cancel'])

const form = reactive(createEmptyFilm())

watch(
  () => props.editingFilm,
  (film) => {
    if (film) {
      Object.assign(form, structuredClone(film))
      return
    }
    Object.assign(form, createEmptyFilm())
  },
  { immediate: true },
)

function handleSubmit() {
  if (!form.title.trim() || !form.director.trim()) return

  emit('submit', {
    title: form.title.trim(),
    director: form.director.trim(),
    genre: form.genre || GENRES[0],
    year: Number(form.year),
    rating: Number(form.rating),
    status: form.status,
    note: form.note.trim(),
    posterUrl: form.posterUrl.trim(),
  })

  if (!props.editingFilm) {
    Object.assign(form, createEmptyFilm())
  }
}
</script>

<template>
  <section class="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
    <div class="mb-5 flex items-center gap-2">
      <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600/20 text-violet-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </div>
      <h2 class="text-lg font-semibold text-white">
        {{ editingFilm ? 'Filmi Güncelle' : 'Yeni Film Ekle' }}
      </h2>
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="grid gap-4 lg:grid-cols-6 lg:items-end">
        <label class="grid gap-1.5 text-sm lg:col-span-1">
          <span class="text-slate-400">Film Adı</span>
          <input
            v-model="form.title"
            type="text"
            required
            placeholder="Film adını girin"
            class="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm outline-none transition focus:border-violet-400"
          />
        </label>

        <label class="grid gap-1.5 text-sm lg:col-span-1">
          <span class="text-slate-400">Yönetmen</span>
          <input
            v-model="form.director"
            type="text"
            required
            placeholder="Yönetmeni girin"
            class="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm outline-none transition focus:border-violet-400"
          />
        </label>

        <label class="grid gap-1.5 text-sm lg:col-span-1">
          <span class="text-slate-400">Tür</span>
          <select
            v-model="form.genre"
            class="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm outline-none transition focus:border-violet-400"
          >
            <option value="" disabled>Tür seçin</option>
            <option v-for="genre in GENRES" :key="genre" :value="genre">
              {{ genre }}
            </option>
          </select>
        </label>

        <label class="grid gap-1.5 text-sm lg:col-span-1">
          <span class="text-slate-400">Yıl</span>
          <input
            v-model.number="form.year"
            type="number"
            min="1900"
            :max="new Date().getFullYear() + 2"
            placeholder="Yıl girin"
            class="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm outline-none transition focus:border-violet-400"
          />
        </label>

        <label class="grid gap-1.5 text-sm lg:col-span-1">
          <span class="text-slate-400">Puan (1-10)</span>
          <input
            v-model.number="form.rating"
            type="number"
            min="1"
            max="10"
            step="0.1"
            placeholder="Puan girin"
            class="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm outline-none transition focus:border-violet-400"
          />
        </label>

        <button
          type="submit"
          class="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          {{ editingFilm ? 'Kaydet' : 'Film Ekle' }}
        </button>
      </div>

      <div v-if="editingFilm" class="mt-4 grid gap-4 border-t border-slate-800 pt-4 sm:grid-cols-3">
        <label class="grid gap-1.5 text-sm">
          <span class="text-slate-400">Durum</span>
          <select
            v-model="form.status"
            class="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm outline-none transition focus:border-violet-400"
          >
            <option v-for="status in FILM_STATUSES" :key="status" :value="status">
              {{ STATUS_LABELS[status] }}
            </option>
          </select>
        </label>

        <label class="grid gap-1.5 text-sm sm:col-span-2">
          <span class="text-slate-400">Poster URL (isteğe bağlı)</span>
          <input
            v-model="form.posterUrl"
            type="url"
            placeholder="https://..."
            class="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm outline-none transition focus:border-violet-400"
          />
        </label>

        <div class="flex gap-3 sm:col-span-3">
          <button
            type="button"
            class="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white"
            @click="emit('cancel')"
          >
            Düzenlemeyi İptal Et
          </button>
        </div>
      </div>
    </form>
  </section>
</template>
