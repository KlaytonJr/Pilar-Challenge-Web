<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import SearchInput from './SearchInput.vue'
</script>

<template>
  <header class="w-full flex justify-between items-center py-8 px-10 fixed top-0 z-10">
    <RouterLink to="/"><h1 class="text-2xl text-white font-extrabold">Movie Now</h1></RouterLink>

    <nav class="flex gap-4">
      <RouterLink to="/" class="text-neutral-400">Home</RouterLink>
      <RouterLink to="/list/movies" class="text-neutral-400">Filmes</RouterLink>
      <RouterLink to="/list/series" class="text-neutral-400">Séries</RouterLink>
    </nav>

    <div class="flex gap-10">
      <SearchInput />
    </div>
  </header>
</template>

<style>
header {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 30%, #000 100%);
}

nav a.router-link-exact-active {
  color: var(--vt-c-white);
  font-weight: bold;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}
</style>
