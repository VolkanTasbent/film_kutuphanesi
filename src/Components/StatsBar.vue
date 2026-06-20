<script setup>
defineProps({
  stats: {
    type: Object,
    required: true,
  },
})

const cards = [
  { key: 'total', label: 'Toplam Film', accent: 'text-white' },
  { key: 'izlenecek', label: 'İzlenecek', accent: 'text-amber-300' },
  { key: 'izlendi', label: 'İzlendi', accent: 'text-emerald-300' },
  { key: 'favori', label: 'Favori', accent: 'text-pink-300' },
]
</script>

<template>
  <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    <article
      v-for="card in cards"
      :key="card.key"
      class="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-black/20"
    >
      <p class="text-sm text-slate-400">{{ card.label }}</p>
      <p class="mt-2 text-3xl font-bold" :class="card.accent">
        {{ stats[card.key] }}
      </p>
    </article>
  </section>
</template>
