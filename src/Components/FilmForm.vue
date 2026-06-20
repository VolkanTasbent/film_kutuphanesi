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
    genre: form.genre,
    year: Number(form.year),
    rating: Number(form.rating),
    status: form.status,
    note: form.note.trim(),
  })

  if (!props.editingFilm) {
    Object.assign(form, createEmptyFilm())
  }
}
</script>

<template>
  <section class="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-black/30">
    <div class="mb-6 flex items-center justify-between gap-3">
      <div>
        <h2 class="text-xl font-semibold text-white">
          {{ editingFilm ? 'Filmi Güncelle' : 'Yeni Film Ekle' }}
        </h2>
        <p class="mt-1 text-sm text-slate-400">
          {{ editingFilm ? 'Seçili film bilgilerini düzenleyin.' : 'Kütüphanenize yeni bir film ekleyin.' }}
        </p>
      </div>
      <span
        class="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
        :class="editingFilm ? 'bg-amber-500/20 text-amber-200' : 'bg-violet-500/20 text-violet-200'"
      >
        {{ editingFilm ? 'Güncelle' : 'Ekle' }}
      </span>
    </div>

    <form class="grid gap-4" @submit.prevent="handleSubmit">
      <div class="grid gap-4 md:grid-cols-2">
        <label class="grid gap-2 text-sm">
          <span class="text-slate-300">Film Adı *</span>
          <input
            v-model="form.title"
            type="text"
            required
            placeholder="Örn: Interstellar"
            class="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-violet-400"
          />
        </label>

        <label class="grid gap-2 text-sm">
          <span class="text-slate-300">Yönetmen *</span>
          <input
            v-model="form.director"
            type="text"
            required
            placeholder="Örn: Christopher Nolan"
            class="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-violet-400"
          />
        </label>
      </div>

      <div class="grid gap-4 md:grid-cols-3">
        <label class="grid gap-2 text-sm">
          <span class="text-slate-300">Tür</span>
          <select
            v-model="form.genre"
            class="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-violet-400"
          >
            <option v-for="genre in GENRES" :key="genre" :value="genre">
              {{ genre }}
            </option>
          </select>
        </label>

        <label class="grid gap-2 text-sm">
          <span class="text-slate-300">Yıl</span>
          <input
            v-model.number="form.year"
            type="number"
            min="1900"
            :max="new Date().getFullYear() + 2"
            class="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-violet-400"
          />
        </label>

        <label class="grid gap-2 text-sm">
          <span class="text-slate-300">Puan (1-10)</span>
          <input
            v-model.number="form.rating"
            type="number"
            min="1"
            max="10"
            class="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-violet-400"
          />
        </label>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <label class="grid gap-2 text-sm">
          <span class="text-slate-300">Durum</span>
          <select
            v-model="form.status"
            class="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-violet-400"
          >
            <option v-for="status in FILM_STATUSES" :key="status" :value="status">
              {{ STATUS_LABELS[status] }}
            </option>
          </select>
        </label>

        <label class="grid gap-2 text-sm md:col-span-1">
          <span class="text-slate-300">Not</span>
          <input
            v-model="form.note"
            type="text"
            placeholder="Kısa bir not ekleyin"
            class="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-violet-400"
          />
        </label>
      </div>

      <div class="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          class="rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400"
        >
          {{ editingFilm ? 'Değişiklikleri Kaydet' : 'Filmi Ekle' }}
        </button>
        <button
          v-if="editingFilm"
          type="button"
          class="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white"
          @click="emit('cancel')"
        >
          Düzenlemeyi İptal Et
        </button>
      </div>
    </form>
  </section>
</template>
