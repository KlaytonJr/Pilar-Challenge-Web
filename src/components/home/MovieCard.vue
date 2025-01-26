<script lang="ts" setup>
import { computed } from 'vue'
import StartIcon from '../icons/StartIcon.vue'
import fallbackImage from '@/assets/img/unknown-person.jpg'
import { useRoute } from 'vue-router'

const route = useRoute()

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
})

const formattedDate = computed(() => {
  if (!props.movie || (!props.movie.release_date && !props.movie.first_air_date)) {
    return 'Sem data'
  }

  const date = new Date(props.movie.release_date || props.movie.first_air_date)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
})

const baseUrl = 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2'

function handleImageError(event: Event) {
  const imgElement = event.target as HTMLImageElement
  imgElement.src = fallbackImage
}
</script>

<template>
  <RouterLink
    :to="`/${route.name === 'series' ? 'serie' : 'movie'}/${props.movie.id}`"
    class="w-40 h-82"
  >
    <img
      :src="`${baseUrl}/${props.movie.poster_path}`"
      alt="Movie Poster"
      class="min-w-40"
      @error="handleImageError($event)"
    />
    <h3 class="text-white font-semibold my-2">{{ props.movie.title }}</h3>
    <div class="flex items-end divide-x-2">
      <div class="flex items-center pr-2">
        <StartIcon class="text-yellow-500 w-4 h-4 mr-1" />
        <p class="text-white">{{ props.movie.vote_average?.toFixed(1) || '?' }}</p>
      </div>
      <p class="pl-2 text-white">{{ formattedDate }}</p>
    </div>
  </RouterLink>
</template>

<style></style>
