<script setup>
import { STATUS_LABELS } from '@/Interfaces/Film'

defineProps({
  film: {
    type: Object,
    required: true,
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['edit', 'delete'])

const statusStyles = {
  izlenecek: 'bg-amber-500/15 text-amber-200 ring-amber-400/30',
  izlendi: 'bg-emerald-500/15 text-emerald-200 ring-emerald-400/30',
  favori: 'bg-pink-500/15 text-pink-200 ring-pink-400/30',
}
</script>

<template>
  <article
    class="rounded-2xl border bg-slate-900/70 p-5 transition"
    :class="isEditing ? 'border-violet-400 shadow-lg shadow-violet-500/10' : 'border-slate-800 hover:border-slate-700'"
  >
    <div class="flex items-start justify-between gap-3">
      <div>
        <h3 class="text-lg font-semibold text-white">{{ film.title }}</h3>
        <p class="mt-1 text-sm text-slate-400">{{ film.director }}</p>
      </div>
      <span
        class="rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset"
        :class="statusStyles[film.status]"
      >
        {{ STATUS_LABELS[film.status] }}
      </span>
    </div>

    <dl class="mt-4 grid grid-cols-2 gap-3 text-sm">
      <div>
        <dt class="text-slate-500">Tür</dt>
        <dd class="mt-1 font-medium text-slate-200">{{ film.genre }}</dd>
      </div>
      <div>
        <dt class="text-slate-500">Yıl</dt>
        <dd class="mt-1 font-medium text-slate-200">{{ film.year }}</dd>
      </div>
      <div>
        <dt class="text-slate-500">Puan</dt>
        <dd class="mt-1 font-medium text-violet-200">{{ film.rating }}/10</dd>
      </div>
      <div>
        <dt class="text-slate-500">Eklenme</dt>
        <dd class="mt-1 font-medium text-slate-200">
          {{ new Date(film.createdAt).toLocaleDateString('tr-TR') }}
        </dd>
      </div>
    </dl>

    <p v-if="film.note" class="mt-4 rounded-xl bg-slate-950/70 px-4 py-3 text-sm text-slate-300">
      {{ film.note }}
    </p>

    <div class="mt-5 flex flex-wrap gap-3">
      <button
        type="button"
        class="rounded-xl border border-violet-400/40 px-4 py-2 text-sm font-semibold text-violet-200 transition hover:bg-violet-500/10"
        @click="$emit('edit', film.id)"
      >
        Düzenle
      </button>
      <button
        type="button"
        class="rounded-xl border border-rose-400/30 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/10"
        @click="$emit('delete', film.id)"
      >
        Sil
      </button>
    </div>
  </article>
</template>
