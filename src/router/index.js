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
      path: '/orders',
      name: 'orders',
      component: () => import('../views/Orders/OrdersHomeView.vue')
    },
    {
      path: '/orders/create',
      name: 'orderCreate',
      component: () => import('../views/Orders/OrderCreateView.vue')
    },
    {
      path: '/orders/search',
      name: 'dossierSearch',
      component: () => import('../views/Orders/DossierSearchView.vue')
    },
    {
      path: '/orders/myorders',
      name: 'myorders',
      component: () => import('../views/Orders/myordersView.vue')
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('../views/RegistrationView.vue')
    },
    {
      path: '/logistic',
      name: 'logistic',
      component: () => import('../views/Logistic/LogisticHomeView.vue')
    },
    {
      path: '/logistic/completion',
      name: 'completion',
      component: () => import('../views/Logistic/LogisticCompletionView.vue')
    },
    {
      path: '/logistic/placement',
      name: 'placement',
      component: () => import('../views/Logistic/LogisticPlacementView.vue')
    },
    {
      path: '/logistic/checking',
      name: 'checking',
      component: () => import('../views/Logistic/LogisticCheckingView.vue')
    },
    {
      path: '/requests',
      name: 'requests',
      component: () => import('../views/RequestsView.vue')
    },

  ]
})

export default router
