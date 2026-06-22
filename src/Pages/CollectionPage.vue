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

defineEmits(['navigate', 'edit'])

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
  <div class="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.18),_transparent_35%),linear-gradient(to_bottom,_#020617,_#0f172a)]">
    <header class="border-b border-violet-500/20 bg-slate-950/90 backdrop-blur">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <div class="flex items-center gap-3">
          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 text-slate-400 transition hover:border-violet-400 hover:text-violet-300"
            @click="$emit('navigate', 'home')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <div>
            <h1 class="text-2xl font-bold text-white">Film Koleksiyonum</h1>
            <p class="text-sm text-slate-400">{{ films.length }} film</p>
          </div>
        </div>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-4 py-8">
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
