<script lang="ts" setup>
import SearchIcon from './icons/SearchIcon.vue'
</script>

<template>
  <div class="relative">
    <input
      type="text"
      placeholder="Buscar por filme ou série"
      class="border-2 border-gray-700 px-4 py-1 rounded-lg w-60"
    />
    <SearchIcon class="absolute right-2 top-2.5 w-4 h-4 cursor-pointer" />
  </div>
</template>

<style></style>
