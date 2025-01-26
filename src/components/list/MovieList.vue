<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DiscoverService from '../../services/DiscoverService'
import SearchService from '../../services/SearchService'
import type { ServiceObject } from '@/services/BaseService'
import MovieCard from '../home/MovieCard.vue'
import Filters from './VFilters.vue'
import Pagination from './VPagination.vue'
import type DiscoverQuery from '@/query/DiscoverQuery'

const route = useRoute()

const genres = ref<any[]>([])
const items = ref<any[]>([])
const loading = ref(false)

const sortBy = ref(route.query.sortBy || 'popularity.desc')
const genre = ref(route.query.genre || '')
const page = ref(Number(route.query.page) || 1)
const totalPages = ref(1)
const searchQuery = ref(route.query.q || '')

async function fetchGenres() {
  try {
    const serviceMap: { [key: string]: (query: DiscoverQuery) => ServiceObject<any> } = {
      movies: DiscoverService.getMoviesGenres,
      series: DiscoverService.getSeriesGenres,
    }

    let serviceFunction
    if (route.name === 'search') {
      serviceFunction = serviceMap['movies']
    } else {
      serviceFunction = serviceMap[route.name?.toString() || '']
    }
    if (!serviceFunction) {
      console.error(`Endpoint "${route.name?.toString() || ''}" não é válido.`)
      return
    }

    const [request] = serviceFunction({
      language: 'pt-BR',
    })
    request
      .then((response) => {
        genres.value = response.genres
      })
      .catch((error) => {
        console.log(error)
        throw error
      })
  } catch (error) {
    console.error('Erro ao carregar os gêneros:', error)
  }
}

async function fetchData() {
  loading.value = true
  try {
    if (route.name === 'search' && searchQuery.value) {
      const [request] = SearchService.getSearch({
        query: searchQuery.value,
        language: 'pt-BR',
        page: page.value,
        adult: false,
      })
      await request
        .then((response) => {
          items.value = response.results
          totalPages.value = response.total_pages
        })
        .catch((error) => {
          console.error('Erro na busca:', error)
          throw error
        })
    } else {
      const serviceMap: { [key: string]: (query: DiscoverQuery) => ServiceObject<any> } = {
        movies: DiscoverService.getMovies,
        series: DiscoverService.getSeries,
      }

      const serviceFunction = serviceMap[route.name?.toString() || '']
      if (!serviceFunction) {
        console.error(`Endpoint "${route.name?.toString() || ''}" não é válido.`)
        return
      }

      const [request] = serviceFunction({
        language: 'pt-BR',
        page: page.value,
        sort_by: sortBy.value.toString(),
        with_genres: genre.value.toString(),
        include_adult: false,
        include_video: false,
      })
      request
        .then((response) => {
          items.value = response.results
          totalPages.value = response.total_pages
        })
        .catch((error) => {
          console.log(error)
          throw error
        })
    }
  } catch (error) {
    console.error('Erro ao carregar os dados:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchGenres()
  fetchData()
})

watch(
  () => route.query,
  (newQuery) => {
    sortBy.value = newQuery.sortBy || 'popularity.desc'
    genre.value = newQuery.genre || ''
    page.value = Number(newQuery.page) || 1
    searchQuery.value = newQuery.q || ''
    fetchData()
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <main class="mt-28">
    <Filters :genres="genres" />

    <div>
      <div v-if="loading" class="text-center">Carregando...</div>
      <div v-else>
        <div
          class="w-full grid justify-center place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-10 px-20"
        >
          <MovieCard v-for="item in items" :key="item.id" :movie="item" />
        </div>
      </div>
    </div>

    <Pagination :currentPage="page" :totalPages="totalPages" />
  </main>
</template>

<style scoped></style>
