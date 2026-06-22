<script setup>
import { onMounted, ref } from 'vue'
import { getPosterUrl } from '@/utils/posters'

defineProps({
  filmCount: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['enter'])

const visible = ref(false)

const featuredPosters = [
  getPosterUrl('Inception'),
  getPosterUrl('Spirited Away'),
  getPosterUrl('Dune Part Two'),
]

const features = [
  { icon: 'plus', text: 'Film ekle ve düzenle' },
  { icon: 'poster', text: 'Posterli koleksiyon' },
  { icon: 'save', text: 'Tarayıcıda sakla' },
]

onMounted(() => {
  requestAnimationFrame(() => {
    visible.value = true
  })
})

function enter(destination = 'home') {
  visible.value = false
  setTimeout(() => emit('enter', destination), 400)
}
</script>

<template>
  <div
    class="welcome-root relative flex min-h-screen flex-col overflow-hidden bg-[#020617] text-white"
    :class="visible ? 'welcome-visible' : 'welcome-hidden'"
  >
    <div class="welcome-glow pointer-events-none absolute inset-0" />
    <div class="welcome-grid pointer-events-none absolute inset-0 opacity-30" />

    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        v-for="(poster, index) in featuredPosters"
        :key="index"
        class="welcome-poster absolute rounded-xl shadow-2xl shadow-violet-900/40"
        :class="`welcome-poster-${index}`"
      >
        <img :src="poster" alt="" class="h-full w-full rounded-xl object-cover" />
      </div>
    </div>

    <main class="relative z-10 mx-auto flex flex-1 w-full max-w-4xl flex-col items-center justify-center px-6 py-16 text-center">
      <div class="welcome-badge mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-200">
        <span class="relative flex h-2 w-2">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
          <span class="relative inline-flex h-2 w-2 rounded-full bg-violet-400" />
        </span>
        Kişisel film takip uygulaması
      </div>

      <div class="welcome-icon mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-600/20 text-violet-300 shadow-lg shadow-violet-500/20">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25M7.5 19.5v-7.125a2.25 2.25 0 012.25-2.25h5.25a2.25 2.25 0 012.25 2.25V19.5M12 6.75V4.5m0 0V3.375c0-.621.504-1.125 1.125-1.125h1.5c.621 0 1.125.504 1.125 1.125V4.5m-3.75 0h3.75" />
        </svg>
      </div>

      <h1 class="welcome-title text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
        Film
        <span class="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-400 bg-clip-text text-transparent">
          Kütüphanesi
        </span>
      </h1>

      <p class="welcome-subtitle mt-5 max-w-lg text-base text-slate-400 sm:text-lg">
        İzlediğiniz, izlemek istediğiniz ve favori filmlerinizi tek yerde toplayın.
        Posterli koleksiyonunuz sizi bekliyor.
      </p>

      <div class="welcome-features mt-8 flex flex-wrap justify-center gap-3">
        <span
          v-for="feature in features"
          :key="feature.text"
          class="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/60 px-4 py-2 text-sm text-slate-300 backdrop-blur-sm"
        >
          <svg v-if="feature.icon === 'plus'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <svg v-else-if="feature.icon === 'poster'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
          </svg>
          {{ feature.text }}
        </span>
      </div>

      <div class="welcome-actions mt-10 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          class="group inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-violet-600/30 transition hover:bg-violet-500 hover:shadow-violet-500/40"
          @click="enter('home')"
        >
          Kütüphaneme Gir
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
        <button
          type="button"
          class="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-500/40 bg-violet-500/5 px-8 py-3.5 text-base font-semibold text-violet-200 transition hover:border-violet-400 hover:bg-violet-500/15"
          @click="enter('collection')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          Koleksiyonum
          <span v-if="filmCount" class="rounded-full bg-violet-500/30 px-2 py-0.5 text-xs">{{ filmCount }}</span>
        </button>
      </div>
    </main>

    <footer class="relative z-10 pb-8 text-center text-sm text-slate-600">
      Vue 3 · Vite · Tailwind CSS
    </footer>
  </div>
</template>

<style scoped>
.welcome-glow {
  background:
    radial-gradient(ellipse 80% 50% at 50% -10%, rgba(124, 58, 237, 0.35), transparent),
    radial-gradient(ellipse 60% 40% at 80% 80%, rgba(168, 85, 247, 0.12), transparent),
    radial-gradient(ellipse 50% 30% at 10% 70%, rgba(79, 70, 229, 0.1), transparent);
}

.welcome-grid {
  background-image:
    linear-gradient(rgba(124, 58, 237, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(124, 58, 237, 0.05) 1px, transparent 1px);
  background-size: 48px 48px;
}

.welcome-poster {
  width: 110px;
  height: 165px;
  opacity: 0.45;
  border: 1px solid rgba(124, 58, 237, 0.25);
}

.welcome-poster-0 {
  top: 12%;
  left: 6%;
  transform: rotate(-12deg);
  animation: float-a 8s ease-in-out infinite;
}

.welcome-poster-1 {
  top: 18%;
  right: 8%;
  transform: rotate(10deg);
  animation: float-b 9s ease-in-out infinite;
}

.welcome-poster-2 {
  bottom: 14%;
  left: 12%;
  transform: rotate(6deg);
  animation: float-c 7s ease-in-out infinite;
}

@keyframes float-a {
  0%, 100% { transform: rotate(-12deg) translateY(0); }
  50% { transform: rotate(-12deg) translateY(-14px); }
}

@keyframes float-b {
  0%, 100% { transform: rotate(10deg) translateY(0); }
  50% { transform: rotate(10deg) translateY(12px); }
}

@keyframes float-c {
  0%, 100% { transform: rotate(6deg) translateY(0); }
  50% { transform: rotate(6deg) translateY(-10px); }
}

.welcome-root {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.welcome-hidden {
  opacity: 0;
  transform: scale(1.02);
  pointer-events: none;
}

.welcome-visible {
  opacity: 1;
  transform: scale(1);
}

.welcome-badge,
.welcome-icon,
.welcome-title,
.welcome-subtitle,
.welcome-features,
.welcome-actions {
  animation: fade-up 0.7s ease backwards;
}

.welcome-icon { animation-delay: 0.1s; }
.welcome-title { animation-delay: 0.2s; }
.welcome-subtitle { animation-delay: 0.3s; }
.welcome-features { animation-delay: 0.4s; }
.welcome-actions { animation-delay: 0.5s; }

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 640px) {
  .welcome-poster {
    width: 72px;
    height: 108px;
    opacity: 0.3;
  }
}
</style>
