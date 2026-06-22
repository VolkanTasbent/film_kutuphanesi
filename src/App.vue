<script setup>
import { ref, computed } from 'vue'
import HomePage from '@/Pages/HomePage.vue'
import CollectionPage from '@/Pages/CollectionPage.vue'
import { useFilms } from '@/composables/useFilms'

const currentPage = ref('home')
const homePageRef = ref(null)

const { films, startEditing } = useFilms()

const collectionFilms = computed(() => films.value)

function navigate(page) {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleCollectionEdit(id) {
  startEditing(id)
  currentPage.value = 'home'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <HomePage
    v-if="currentPage === 'home'"
    ref="homePageRef"
    @navigate="navigate"
  />
  <CollectionPage
    v-else
    :films="collectionFilms"
    @navigate="navigate"
    @edit="handleCollectionEdit"
  />
</template>
