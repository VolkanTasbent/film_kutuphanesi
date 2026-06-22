<script setup>
import { computed } from 'vue'

const props = defineProps({
  activePage: {
    type: String,
    default: 'home',
  },
})

defineEmits(['navigate', 'back', 'welcome'])

const pageTitle = computed(() =>
  props.activePage === 'collection' ? 'Film Koleksiyonum' : 'Film Kütüphanesi',
)

const backLabel = computed(() =>
  props.activePage === 'home' ? 'Giriş Ekranı' : 'Geri',
)
</script>

<template>
  <header class="border-b border-violet-500/20 bg-slate-950/90 backdrop-blur">
    <div class="mx-auto max-w-6xl px-4 py-4">
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="flex shrink-0 items-center gap-2 rounded-xl border border-slate-600 bg-slate-800/80 px-3 py-2.5 text-sm font-semibold text-white transition hover:border-violet-400 hover:bg-violet-500/10 hover:text-violet-200"
          @click="activePage === 'home' ? $emit('welcome') : $emit('back')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          {{ backLabel }}
        </button>

        <button
          type="button"
          class="flex min-w-0 flex-1 items-center gap-3 text-left transition hover:opacity-80"
          @click="$emit('navigate', 'home')"
        >
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-600/20 text-violet-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25M7.5 19.5v-7.125a2.25 2.25 0 012.25-2.25h5.25a2.25 2.25 0 012.25 2.25V19.5M12 6.75V4.5m0 0V3.375c0-.621.504-1.125 1.125-1.125h1.5c.621 0 1.125.504 1.125 1.125V4.5m-3.75 0h3.75" />
            </svg>
          </div>
          <h1 class="truncate text-lg font-bold text-white sm:text-2xl">
            {{ pageTitle }}
          </h1>
        </button>

        <button
          v-if="activePage === 'home'"
          type="button"
          class="flex shrink-0 items-center gap-2 rounded-xl border border-violet-500/40 px-3 py-2.5 text-sm font-semibold text-violet-300 transition hover:border-violet-400 hover:bg-violet-500/10"
          @click="$emit('navigate', 'collection')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <span class="hidden sm:inline">Koleksiyon</span>
        </button>

        <button
          v-else
          type="button"
          class="flex shrink-0 items-center gap-2 rounded-xl border border-violet-500/40 px-3 py-2.5 text-sm font-semibold text-violet-300 transition hover:border-violet-400 hover:bg-violet-500/10"
          @click="$emit('welcome')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <span class="hidden sm:inline">Giriş</span>
        </button>
      </div>
    </div>
  </header>
</template>
