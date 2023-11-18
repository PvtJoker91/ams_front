import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue')
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('../views/RegistrationView.vue')
    },

    {
      path: '/logistic/completion',
      name: 'completion',
      component: () => import('../views/LogisticCompletionView.vue')
    },
    {
      path: '/logistic/placement',
      name: 'placement',
      component: () => import('../views/LogisticPlacementView.vue')
    },
    {
      path: '/requests',
      name: 'requests',
      component: () => import('../views/RequestsView.vue')
    },

  ]
})

export default router
