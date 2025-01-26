<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SearchIcon from '../icons/SearchIcon.vue'

const router = useRouter()
const route = useRoute()

const searchQuery = ref(route.query.q?.toString() || '')

function handleSearch() {
  if (searchQuery.value.trim()) {
    router.push({ name: 'search', query: { q: searchQuery.value.trim() } })
  }
}
</script>

<template>
  <div class="relative">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Buscar por filme ou série"
      class="border-2 border-gray-700 px-4 py-1 rounded-lg w-60 text-neutral-700"
      @keyup.enter="handleSearch"
    />
    <SearchIcon
      id="search-icon"
      class="absolute right-2 top-2.5 w-4 h-4 cursor-pointer text-neutral-700"
      @click="handleSearch"
    />
  </div>
</template>

<style></style>
