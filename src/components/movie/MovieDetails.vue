<script lang="ts" setup>
import type { MovieInterface } from '@/interfaces/MovieInterface'
import MovieService from '@/services/MovieService'
import SerieService from '@/services/SerieService'
import { computed, onMounted, ref } from 'vue'
import StartIcon from '../icons/StartIcon.vue'
import type { CreditsInterface } from '@/interfaces/CreditsInterface'
import fallbackImage from '@/assets/img/unknown-person.jpg'
import { useRoute } from 'vue-router'

const route = useRoute()

const baseUrl = 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2'

const id = useRoute().params.id
const movie = ref<MovieInterface | null>(null)
const credits = ref<CreditsInterface | null>(null)

function getMovie() {
  const [request] = (route.name === 'serie-detail' ? SerieService : MovieService).getDetails(
    { id },
    { language: 'pt-BR' },
  )

  request
    .then((response) => {
      movie.value = response
    })
    .catch((error) => {
      console.log(error)
    })
}

function getCredits() {
  const [request] = (route.name === 'serie-detail' ? SerieService : MovieService).getCredits(
    { id },
    { language: 'pt-BR' },
  )

  request
    .then((response) => {
      credits.value = response
    })
    .catch((error) => {
      console.log(error)
    })
}

onMounted(() => {
  getMovie()
  getCredits()
})

const formattedDate = computed(() => {
  if (!movie.value || !movie.value.release_date) return 'Sem data'

  const date = new Date(movie.value.release_date)
  return date.toLocaleDateString('pt-BR')
})

function handleImageError(event: Event) {
  const imgElement = event.target as HTMLImageElement
  imgElement.src = fallbackImage
}
</script>

<template>
  <section class="mt-28 px-32">
    <div class="flex gap-12">
      <img
        :src="`${baseUrl}/${movie?.poster_path}`"
        alt="Movie Poster"
        class="w-1/4 h-4/5"
        @error="handleImageError($event)"
      />

      <div class="flex flex-col gap-4">
        <h1 class="text-white text-4xl font-bold">{{ movie?.title }}</h1>
        <div class="flex divide-x-2">
          <div class="flex items-center gap-2 pr-4">
            <StartIcon class="text-yellow-500 w-4 h-4 mr-1" />
            <p class="text-white">{{ movie?.vote_average.toFixed(1) }}</p>
          </div>
          <p class="text-white px-4">{{ formattedDate }}</p>
          <p v-for="genre of movie?.genres" :key="genre.id" class="text-white px-4">
            {{ genre.name }}
          </p>
        </div>

        <div class="flex flex-col gap-4 mt-8" v-if="movie?.overview">
          <h1 class="text-white text-4xl font-bold">Sinopse</h1>
          <p class="text-white">{{ movie?.overview }}</p>
        </div>

        <div class="flex flex-col gap-4 mt-8">
          <h1 class="text-white text-4xl font-bold">Elenco</h1>
          <div class="grid grid-cols-6 gap-4">
            <div
              v-for="actor of credits?.cast"
              :key="actor.id"
              class="flex flex-col items-center gap-2"
            >
              <img
                :src="`${baseUrl}${actor.profile_path}`"
                alt="Actor Poster"
                class="w-32"
                @error="handleImageError($event)"
              />
              <p class="text-white">{{ actor.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style></style>
