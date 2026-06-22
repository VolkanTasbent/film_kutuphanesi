<script setup>
import { ref } from 'vue'
import { STATUS_LABELS } from '@/Interfaces/Film'
import { getPosterUrl } from '@/utils/posters'

defineProps({
  films: {
    type: Array,
    required: true,
  },
})

defineEmits(['edit', 'back', 'welcome'])

const posterErrors = ref({})

function posterSrc(film) {
  if (posterErrors.value[film.id]) return getPosterUrl(film.title)
  return film.posterUrl || getPosterUrl(film.title)
}

function onPosterError(id) {
  posterErrors.value = { ...posterErrors.value, [id]: true }
}

const statusStyles = {
  izlenecek: 'bg-amber-500/20 text-amber-300',
  izlendi: 'bg-violet-500/20 text-violet-300',
  favori: 'bg-pink-500/20 text-pink-300',
}
</script>

<template>
  <div>
    <main class="mx-auto max-w-6xl px-4 py-8">
      <div class="mb-6 flex flex-wrap gap-3">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-800/60 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-violet-400 hover:text-violet-200"
          @click="$emit('back')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Ana Sayfaya Dön
        </button>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-xl border border-violet-500/40 bg-violet-500/5 px-4 py-2.5 text-sm font-semibold text-violet-200 transition hover:border-violet-400 hover:bg-violet-500/15"
          @click="$emit('welcome')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          Giriş Ekranına Dön
        </button>
      </div>

      <div class="mb-6">
        <h2 class="text-xl font-semibold text-white">Film Koleksiyonum</h2>
        <p class="mt-1 text-sm text-slate-400">{{ films.length }} film</p>
      </div>

      <div v-if="films.length" class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <article
          v-for="film in films"
          :key="film.id"
          class="group cursor-pointer overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 transition hover:border-violet-500/40 hover:shadow-lg hover:shadow-violet-500/10"
          @click="$emit('edit', film.id)"
        >
          <div class="relative aspect-[2/3] overflow-hidden">
            <img
              :src="posterSrc(film)"
              :alt="`${film.title} poster`"
              class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              @error="onPosterError(film.id)"
            />
            <span
              class="absolute right-2 top-2 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur-sm"
              :class="statusStyles[film.status]"
            >
              {{ STATUS_LABELS[film.status] }}
            </span>
          </div>
          <div class="p-4">
            <h3 class="truncate font-semibold text-white">{{ film.title }}</h3>
            <p class="mt-1 truncate text-sm text-slate-400">{{ film.director }}</p>
            <div class="mt-2 flex items-center justify-between text-sm">
              <span class="text-slate-500">{{ film.year }}</span>
              <span class="inline-flex items-center gap-1 text-violet-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
                {{ film.rating }}
              </span>
            </div>
          </div>
        </article>
      </div>

      <div
        v-else
        class="rounded-2xl border border-dashed border-slate-700 px-6 py-16 text-center text-slate-400"
      >
        Henüz koleksiyonunuzda film yok. Ana sayfadan film ekleyebilirsiniz.
      </div>
    </main>

    <footer class="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
      © 2025 Film Kütüphanesi. Tüm hakları saklıdır.
      <span class="text-violet-400"> ♥</span>
    </footer>
  </div>
</template>
