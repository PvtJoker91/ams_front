import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ProfileView from '../views/ProfileView.vue'
import OrdersHomeView from '../views/Orders/OrdersHomeView.vue'
import DossierSearchView from '../views/Orders/DossierSearchView.vue'
import OrderCreateView from '../views/Orders/OrderCreateView.vue'
import MyOrdersView from '../views/Orders/MyOrdersView.vue'
import LogisticsHomeView from '../views/Logistics/LogisticsHomeView.vue'
import LogisticsCompletionView from '../views/Logistics/LogisticsCompletionView.vue'
import LogisticsPlacementView from '../views/Logistics/LogisticsPlacementView.vue'
import LogisticsCheckingView from '../views/Logistics/LogisticsCheckingView.vue'
import RegistrationView from '../views/Registration/RegistrationView.vue'
import RequestsView from '../views/Requests/RequestsView.vue'
import DossierDetailView from '../views/Units/DossierDetailView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/orders',
      name: 'orders',
      component: OrdersHomeView
    },
    {
      path: '/orders/create',
      name: 'orderCreate',
      component: OrderCreateView
    },
    {
      path: '/orders/search',
      name: 'dossierSearch',
      component: DossierSearchView
    },
    {
      path: '/orders/myorders',
      name: 'myorders',
      component: MyOrdersView
    },
    {
      path: '/registration',
      name: 'registration',
      component: RegistrationView
    },
    {
      path: '/logistics',
      name: 'logistics',
      component: LogisticsHomeView
    },
    {
      path: '/logistics/completion',
      name: 'completion',
      component: LogisticsCompletionView
    },
    {
      path: '/logistics/placement',
      name: 'placement',
      component: LogisticsPlacementView
    },
    {
      path: '/logistics/checking',
      name: 'checking',
      component: LogisticsCheckingView
    },
    {
      path: '/requests',
      name: 'requests',
      component: RequestsView
    },
    {
      path: '/orders/dossierdetail/:dossierId',
      name: 'dossierDetail',
      component: DossierDetailView
    },

  ]
})

export default router
