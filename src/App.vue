<script setup>
import { ref, computed } from 'vue'
import WelcomePage from '@/Pages/WelcomePage.vue'
import HomePage from '@/Pages/HomePage.vue'
import CollectionPage from '@/Pages/CollectionPage.vue'
import { useFilms } from '@/composables/useFilms'

const WELCOME_KEY = 'film-kutuphanesi-welcome-seen'

const showWelcome = ref(!sessionStorage.getItem(WELCOME_KEY))
const currentPage = ref('home')
const homePageRef = ref(null)

const { films, startEditing } = useFilms()

const collectionFilms = computed(() => films.value)
const filmCount = computed(() => films.value.length)

function enterApp(destination = 'home') {
  sessionStorage.setItem(WELCOME_KEY, '1')
  currentPage.value = destination
  showWelcome.value = false
  window.scrollTo({ top: 0 })
}

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
  <WelcomePage
    v-if="showWelcome"
    :film-count="filmCount"
    @enter="enterApp"
  />

  <Transition name="app-fade">
    <div v-if="!showWelcome">
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
    </div>
  </Transition>
</template>

<style>
.app-fade-enter-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.app-fade-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
</style>
