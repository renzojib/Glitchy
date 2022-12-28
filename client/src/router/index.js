import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieView from '../views/MovieView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/movie',
    name: 'movie',
    component: MovieView
  },
  {
    path: '/:pathMatch(.*)*',
    component: HomeView
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
