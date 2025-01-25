<script setup lang="ts">
import MovieCarousel from '@/components/home/MovieCarousel.vue'
</script>

<template>
  <main class="">
    <MovieCarousel title="Filmes em Cartaz" endpoint="nowPlaying" />
    <MovieCarousel title="Popular" endpoint="popular" infinity-scroll />
  </main>
</template>

<style scoped></style>
