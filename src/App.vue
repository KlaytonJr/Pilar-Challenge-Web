<script setup lang="ts">
import { RouterView } from 'vue-router'
import VHeader from './components/base/VHeader.vue'
import VFooter from './components/base/VFooter.vue'
</script>

<template>
  <VHeader />

  <RouterView />

  <VFooter />
</template>

<style scoped></style>
