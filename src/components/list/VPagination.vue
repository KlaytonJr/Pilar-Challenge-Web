<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
})

function changePage(direction: string) {
  const newPage = direction === 'prev' ? props.currentPage - 1 : props.currentPage + 1
  router.push({ query: { ...route.query, page: newPage } })
}
</script>

<template>
  <div class="flex justify-center gap-4 mt-5">
    <button
      @click="changePage('prev')"
      :disabled="currentPage === 1"
      class="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
    >
      &lt;-
    </button>
    <span class="flex items-center"> Página {{ currentPage }} de {{ totalPages }} </span>
    <button
      @click="changePage('next')"
      :disabled="currentPage === totalPages"
      class="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
    >
      ->
    </button>
  </div>
</template>

<style scoped></style>
