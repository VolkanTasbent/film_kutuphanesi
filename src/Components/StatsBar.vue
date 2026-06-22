<script setup>
defineProps({
  stats: {
    type: Object,
    required: true,
  },
})

const cards = [
  {
    key: 'total',
    label: 'Toplam Film',
    icon: 'film',
  },
  {
    key: 'izlenecek',
    label: 'İzlenecek',
    icon: 'clock',
  },
  {
    key: 'izlendi',
    label: 'İzlendi',
    icon: 'check',
  },
  {
    key: 'favori',
    label: 'Favori',
    icon: 'star',
  },
]
</script>

<template>
  <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    <article
      v-for="card in cards"
      :key="card.key"
      class="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
    >
      <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-violet-600/20 text-violet-400">
        <svg v-if="card.icon === 'film'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25M7.5 19.5v-7.125a2.25 2.25 0 012.25-2.25h5.25a2.25 2.25 0 012.25 2.25V19.5" />
        </svg>
        <svg v-else-if="card.icon === 'clock'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <svg v-else-if="card.icon === 'check'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      </div>
      <div>
        <p class="text-sm text-slate-400">{{ card.label }}</p>
        <p class="text-3xl font-bold text-white">{{ stats[card.key] }}</p>
      </div>
    </article>
  </section>
</template>
