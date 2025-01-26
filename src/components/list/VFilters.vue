<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { type GenreInterface } from '@/interfaces/GenreInterface'

const router = useRouter()
const route = useRoute()

const selectedSortBy = ref<string>(route.query.sortBy?.toString() || 'popularity.desc')
const selectedGenre = ref<string>(route.query.genre?.toString() || '')

const props = defineProps({
  genres: { type: Array<GenreInterface>, required: true },
})

function updateSortBy(value: string) {
  selectedSortBy.value = value
  router.push({ query: { ...route.query, sortBy: value } })
}

function updateGenre(value: string) {
  selectedGenre.value = value
  router.push({ query: { ...route.query, genre: value } })
}
</script>

<template>
  <div class="flex flex-col md:flex-row justify-end mb-5 gap-4">
    <!-- Dropdown de ordenação -->
    <select
      v-model="selectedSortBy"
      @change="updateSortBy(selectedSortBy)"
      class="p-2 border rounded text-gray-700"
      id="sortby-select"
    >
      <option value="popularity.desc" class="sortby-option">Popularidade (decrescente)</option>
      <option value="release_date.desc" class="sortby-option">
        Data de Lançamento (decrescente)
      </option>
      <option value="vote_average.desc" class="sortby-option">Avaliação (decrescente)</option>
    </select>

    <!-- Dropdown de gêneros -->
    <select
      v-model="selectedGenre"
      @change="updateGenre(selectedGenre)"
      class="p-2 border rounded text-gray-700"
      id="genre-select"
    >
      <option value="" class="genre-option">Todos os Gêneros</option>
      <option v-for="genre in genres" :key="genre.id" :value="genre.id" class="genre-option">
        {{ genre.name }}
      </option>
    </select>
  </div>
</template>
