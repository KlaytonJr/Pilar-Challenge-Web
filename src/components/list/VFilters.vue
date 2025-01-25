<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const selectedSortBy = ref<string>(route.query.sortBy?.toString() || 'popularity.desc')
const selectedGenre = ref<string>(route.query.genre?.toString() || '')

const props = defineProps({
  genres: { type: Array, required: true },
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
  <div class="flex justify-end mb-5 gap-4">
    <!-- Dropdown de ordenação -->
    <select
      v-model="selectedSortBy"
      @change="updateSortBy(selectedSortBy)"
      class="p-2 border rounded text-gray-700"
    >
      <option value="popularity.desc">Popularidade (decrescente)</option>
      <option value="release_date.desc">Data de Lançamento (decrescente)</option>
      <option value="vote_average.desc">Avaliação (decrescente)</option>
    </select>

    <!-- Dropdown de gêneros -->
    <select
      v-model="selectedGenre"
      @change="updateGenre(selectedGenre)"
      class="p-2 border rounded text-gray-700"
    >
      <option value="">Todos os Gêneros</option>
      <option v-for="genre in genres" :key="genre.id" :value="genre.id">
        {{ genre.name }}
      </option>
    </select>
  </div>
</template>
