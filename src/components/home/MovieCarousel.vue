<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import MoviesService from '@/services/MoviesService'
import MovieCard from './MovieCard.vue'
import type { MovieCarouselStateInterface } from '../../interfaces/MovieCarouselStateInterface'
import type { MoviesQuery } from '@/query/MoviesQuery'
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
const isLoadingMore = ref(false)

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
  loading: true,
  error: false,
})

function getMovies(page: number) {
  state.error = false
  const serviceMap: { [key: string]: (query: MoviesQuery) => ServiceObject<MovieDTO> } = {
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
      state.error = true
      console.log(error)
    })
    .finally(() => {
      state.loading = false
      isLoadingMore.value = false
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
      state.movies!.page < state.movies!.total_pages &&
      !isLoadingMore.value
    ) {
      isLoadingMore.value = true

      getMovies(state.movies!.page + 1)
    }
  }
}

function reloadData() {
  state.loading = true
  getMovies(1)
}
</script>

<template>
  <section class="mt-10 mx-20 relative" :id="`carousel-${props.endpoint}`">
    <h1 class="text-4xl font-bold text-left pb-8 text-white">{{ props.title }}</h1>

    <div class="flex gap-10 w-full overflow-y-auto px-8" ref="containerRef" @scroll="handleScroll">
      <div v-if="state.loading" class="flex gap-10 w-full overflow-y-hidden px-8 h-56">
        <div v-for="n in 4" :key="n" class="w-40 h-56 bg-gray-300 rounded-lg animate-pulse"></div>
      </div>

      <div
        v-else-if="state.error"
        class="text-center w-full h-56 flex flex-col items-center justify-center"
      >
        <p class="text-red-600 font-semibold">
          Não foi possível carregar os dados. Tente novamente.
        </p>
        <button
          @click="reloadData"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600"
        >
          Tentar novamente
        </button>
      </div>
      <MovieCard
        v-else
        v-for="movie in state.movies?.results"
        :key="movie.id"
        :movie="movie"
        class="movie-card"
      />
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
