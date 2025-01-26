import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: {},
  },
  {
    path: '/list',
    name: 'list',
    children: [
      {
        path: 'movies',
        name: 'movies',
        component: {},
      },
      {
        path: 'series',
        name: 'series',
        component: {},
      },
      {
        path: 'search',
        name: 'search',
        component: {},
      },
    ],
  },
  {
    path: '/movie/:id',
    name: 'movie-detail',
    component: {},
  },
  {
    path: '/serie/:id',
    name: 'serie-detail',
    component: {},
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
