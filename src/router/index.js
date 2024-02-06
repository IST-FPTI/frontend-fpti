import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin-dashboard',
      name: 'admin-dashboard',
      component: () => import('../views/admin/Dashboard.vue')
    },
    {
      path: '/admin-event',
      name: 'admin-event',
      component: () => import('../views/admin/Event.vue')
    },
    {
      path: '/admin-sponsor',
      name: 'admin-sponsor',
      component: () => import('../views/admin/Sponsor.vue')
    },
    {
      path: '/admin-pengeluaran',
      name: 'admin-pengeluaran',
      component: () => import('../views/admin/Pengeluaran.vue')
    },
    {
      path: '/admin-hutang',
      name: 'admin-hutang',
      component: () => import('../views/admin/Hutang.vue')
    },
    {
      path: '/admin-piutang',
      name: 'admin-piutang',
      component: () => import('../views/admin/Piutang.vue')
    },
    {
      path: '/admin-report/:eventId',
      name: 'admin-report',
      props: true,
      component: () => import('../views/admin/ReportEvent.vue')
    },


    
    

  ]
})

export default router
