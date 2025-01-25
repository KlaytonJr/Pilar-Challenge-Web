<script setup lang="ts">
import MovieSlider from '@/components/home/MovieSlider.vue'
import MovieCarousel from '@/components/home/MovieCarousel.vue'
</script>

<template>
  <main class="">
    <MovieSlider />
    <MovieCarousel title="Filmes em Cartaz" endpoint="nowPlaying" />
    <MovieCarousel title="Popular" endpoint="popular" infinity-scroll />
  </main>
</template>

<style scoped></style>
