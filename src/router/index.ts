import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieView from '../views/MovieView.vue'
import ListView from '@/views/ListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/list',
      name: 'list',
      children: [
        {
          path: 'movies',
          name: 'movies',
          component: ListView,
        },
        {
          path: 'series',
          name: 'series',
          component: ListView,
        },
      ],
    },
    {
      path: '/movie/:id',
      name: 'movie-detail',
      component: MovieView,
    },
  ],
})

export default router
