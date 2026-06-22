<script setup>
import { ref, computed } from 'vue'
import WelcomePage from '@/Pages/WelcomePage.vue'
import AppHeader from '@/Components/AppHeader.vue'
import HomePage from '@/Pages/HomePage.vue'
import CollectionPage from '@/Pages/CollectionPage.vue'
import { useFilms } from '@/composables/useFilms'

const WELCOME_KEY = 'film-kutuphanesi-welcome-seen'

const showWelcome = ref(!sessionStorage.getItem(WELCOME_KEY))
const currentPage = ref('home')
const previousPage = ref(null)
const homePageRef = ref(null)

const { films, startEditing } = useFilms()

const collectionFilms = computed(() => films.value)
const filmCount = computed(() => films.value.length)

function enterApp(destination = 'home') {
  sessionStorage.setItem(WELCOME_KEY, '1')
  previousPage.value = destination === 'collection' ? 'home' : null
  currentPage.value = destination
  showWelcome.value = false
  window.scrollTo({ top: 0 })
}

function goToWelcome() {
  previousPage.value = currentPage.value
  showWelcome.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function navigate(page) {
  if (page === currentPage.value) return
  previousPage.value = currentPage.value
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function goBack() {
  if (previousPage.value) {
    const target = previousPage.value
    previousPage.value = currentPage.value
    currentPage.value = target
  } else {
    currentPage.value = 'home'
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleCollectionEdit(id) {
  previousPage.value = 'collection'
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
    <div v-if="!showWelcome" class="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.18),_transparent_35%),linear-gradient(to_bottom,_#020617,_#0f172a)]">
      <AppHeader
        :active-page="currentPage"
        @navigate="navigate"
        @back="goBack"
        @welcome="goToWelcome"
      />

      <HomePage
        v-if="currentPage === 'home'"
        ref="homePageRef"
        @welcome="goToWelcome"
      />
      <CollectionPage
        v-else
        :films="collectionFilms"
        @edit="handleCollectionEdit"
        @back="goBack"
        @welcome="goToWelcome"
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
