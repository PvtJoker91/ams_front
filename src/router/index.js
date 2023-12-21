import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import ArchiveHomeView from '../views/ArchiveHomeView.vue'
import OrdersHomeView from '../views/Orders/OrdersHomeView.vue'
import OrderCreateView from '../views/Orders/OrderCreateView.vue'
import OrderListView from '../views/Orders/OrderListView.vue'
import MyOrdersView from '../views/Orders/MyOrdersView.vue'
import OrderDetailView from '../views/Orders/OrderDetailView.vue'
import OrdersFulfillmentView from '../views/Orders/OrdersFulfillmentView.vue'
import TasksView from '../views/Orders/TasksView.vue'
import TaskExecutionView from '../views/Orders/TaskExecutionView.vue'
import LogisticsHomeView from '../views/Logistics/LogisticsHomeView.vue'
import LogisticsCompletionView from '../views/Logistics/LogisticsCompletionView.vue'
import LogisticsPlacementView from '../views/Logistics/LogisticsPlacementView.vue'
import LogisticsCheckingView from '../views/Logistics/LogisticsCheckingView.vue'
import RegistrationView from '../views/Registration/RegistrationView.vue'
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
      path: '/orders/list',
      name: 'orderList',
      component: OrderListView
    },
    {
      path: '/orders/myorders',
      name: 'myOrders',
      component: MyOrdersView
    },
    {
      path: '/orders/:id',
      name: 'orderDetail',
      component: OrderDetailView
    },
    {
      path: '/orders/fulfillment',
      name: 'ordersFulfillment',
      component: OrdersFulfillmentView
    },
    {
      path: '/orders/tasks',
      name: 'orderTasks',
      component: TasksView
    },
    {
      path: '/orders/tasks/execution',
      name: 'taskExecution',
      component: TaskExecutionView
    },
    {
      path: '/archive',
      name: 'archive',
      component: ArchiveHomeView
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
      path: '/units/dossier/:id',
      name: 'dossierDetail',
      component: DossierDetailView
    },

  ]
})

export default router
