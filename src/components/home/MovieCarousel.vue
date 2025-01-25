<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import MoviesService from '@/services/MoviesService'
import MovieCard from './MovieCard.vue'
import type { MovieCarouselStateInterface } from '../../interfaces/MovieCarouselStateInterface'
import type { MovieQuery } from '@/query/MovieQuery'
import type { MovieDTO } from '@/dtos/MovieDTO'
import type { ServiceObject } from '@/services/BaseService'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  endpoint: {
    type: String,
    required: true,
  },
  infinityScroll: {
    type: Boolean,
    default: false,
  },
})

const containerRef = ref<HTMLElement | null>(null)
const isLeftVisible = ref(false)

const state = reactive<MovieCarouselStateInterface>({
  movies: {
    dates: {
      maximum: '',
      minimum: '',
    },
    results: [],
    page: 1,
    total_pages: 1,
    total_results: 0,
  },
})

function getMovies(page: number) {
  const serviceMap: { [key: string]: (query: MovieQuery) => ServiceObject<MovieDTO> } = {
    nowPlaying: MoviesService.getNowPlaying,
    popular: MoviesService.getPopular,
    upcoming: MoviesService.getUpcoming,
  }

  const serviceFunction = serviceMap[props.endpoint]
  if (!serviceFunction) {
    console.error(`Endpoint "${props.endpoint}" não é válido.`)
    return
  }

  const [request] = serviceFunction({
    page,
    language: 'pt-BR',
  })

  request
    .then((response) => {
      state.movies!.results = [...state.movies!.results, ...response.results]
      state.movies!.page = response.page
      state.movies!.total_pages = response.total_pages
      state.movies!.total_results = response.total_results
    })
    .catch((error) => {
      console.log(error)
    })
}

onMounted(() => {
  getMovies(1)
})

function scrollToNext() {
  if (containerRef.value) {
    containerRef.value.scrollTo({
      left: containerRef.value.scrollLeft + window.screen.width - 160,
      behavior: 'smooth',
    })
  }

  // Para mostrar o botão esquerdo quando não estiver no início da lista
  isLeftVisible.value = true
}

function scrollToPrev() {
  if (containerRef.value) {
    containerRef.value.scrollTo({
      left: containerRef.value.scrollLeft - window.screen.width - 160,
      behavior: 'smooth',
    })

    // Para não mostrar o botão esquerdo quando está no início da lista
    if (containerRef.value.scrollLeft <= 0) {
      isLeftVisible.value = false
    }
  }
}

// Quando o usuário chega a 75% da lista carregar mais filmes
function handleScroll() {
  if (containerRef.value && props.infinityScroll) {
    const scrollLeft = containerRef.value.scrollLeft
    const scrollWidth = containerRef.value.scrollWidth
    const clientWidth = containerRef.value.clientWidth

    if (
      scrollLeft + clientWidth >= scrollWidth * 0.75 &&
      state.movies!.page < state.movies!.total_pages
    ) {
      getMovies(state.movies!.page + 1)
    }
  }
}
</script>

<template>
  <section class="mt-10 mx-20 relative">
    <h1 class="text-4xl font-bold text-left pb-8 text-white">{{ props.title }}</h1>

    <div class="flex gap-10 w-full overflow-y-auto px-8" ref="containerRef" @scroll="handleScroll">
      <MovieCard v-for="movie in state.movies?.results" :key="movie.id" :movie="movie" />
    </div>

    <div class="absolute top-1/2 left-0 transform h-80 -ml-12" v-if="isLeftVisible">
      <button
        @click="scrollToPrev"
        class="rounded-full w-8 h-8 text-white bg-neutral-400 font-bold"
      >
        &lt;-
      </button>
    </div>

    <div class="absolute top-1/2 right-0 transform h-80 -mr-12">
      <button
        @click="scrollToNext"
        class="rounded-full w-8 h-8 text-white bg-neutral-400 font-bold"
      >
        ->
      </button>
    </div>
  </section>
</template>

<style></style>
