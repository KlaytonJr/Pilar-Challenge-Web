<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import MoviesService from '../../services/MoviesService'
import type { MovieInterface } from '../../interfaces/MovieInterface'

const movies = ref<MovieInterface[]>([])
const currentIndex = ref(0)
const intervalDuration = 8000
const totalSteps = 100
const fillerWidth = computed(() => `${(100 / totalSteps) * progress.value}%`)
const progress = ref(0)

function getMovies() {
  const [request] = MoviesService.getUpcoming({
    page: 1,
    language: 'pt-BR',
  })

  request
    .then((response) => {
      movies.value = response.results.slice(0, 4)
    })
    .catch((error) => {
      console.log(error)
    })
}

function nextSlide(index?: number) {
  currentIndex.value = (index ? index : currentIndex.value + 1) % movies.value.length
  progress.value = 0
}

onMounted(() => {
  getMovies()

  setInterval(() => {
    nextSlide()
  }, intervalDuration)

  setInterval(() => {
    if (progress.value < totalSteps) {
      progress.value += 1
    }
  }, intervalDuration / totalSteps)
})
</script>

<template>
  <div class="relative w-full h-screen overflow-hidden">
    <div
      v-for="(movie, index) in movies"
      :key="movie.id"
      class="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-1000"
      :class="{
        'translate-x-0': currentIndex === index,
        'translate-x-full': currentIndex !== index,
      }"
      :style="{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${movie.backdrop_path ? 'https://image.tmdb.org/t/p/original' + movie.backdrop_path : ''})`,
      }"
    >
      <div class="absolute left-8 top-1/2 transform -translate-y-1/2 max-w-lg p-6 text-white">
        <span
          class="inline-block mb-4 px-3 py-1 text-sm font-medium bg-neutral-500 text-white rounded-full"
          >Lançamento</span
        >
        <h1 class="text-4xl font-bold mb-4">{{ movie.title }}</h1>
        <p class="text-lg mb-8">{{ movie.overview }}</p>
        <RouterLink
          :to="`/movie/${movie.id}`"
          class="inline-block px-6 py-2 text-sm font-semibold text-black bg-white rounded-md hover:bg-gray-200"
        >
          Mais informações →
        </RouterLink>
      </div>
    </div>

    <div class="absolute bottom-6 right-6 flex gap-2">
      <div
        v-for="(_, index) in movies"
        :key="index"
        class="w-12 h-1.5 bg-white/30 rounded-full overflow-hidden cursor-pointer"
      >
        <div
          class="h-full bg-white transition-all duration-100"
          :style="{ width: currentIndex === index ? fillerWidth : '0%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
