<script setup lang="ts">
import MovieSlider from '@/components/home/MovieSlider.vue'
import MovieCarousel from '@/components/home/MovieCarousel.vue'
</script>

<template>
  <main>
    <MovieSlider id="movie-slider" />
    <MovieCarousel title="Filmes em Cartaz" endpoint="nowPlaying" class="movie-carousel" />
    <MovieCarousel title="Popular" endpoint="popular" class="movie-carousel" infinity-scroll />
  </main>
</template>

<style scoped></style>
