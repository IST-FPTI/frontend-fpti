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
      path: '/admin-pemasukan',
      name: 'admin-pemasukan',
      component: () => import('../views/admin/Pemasukan.vue')
    },
    {
      path: '/admin-pemasukan-external',
      name: 'admin-pemasukan-external',
      component: () => import('../views/admin/PemasukanEksternal.vue')
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
      path: '/admin-audit',
      name: 'admin-audit',
      component: () => import('../views/admin/Audit.vue')
    },
    {
      path: '/admin-jurnal',
      name: 'admin-jurnal',
      component: () => import('../views/admin/Jurnal.vue')
    },
    {
      path: '/admin-ledger',
      name: 'admin-ledger',
      component: () => import('../views/admin/BukuBesar.vue')
    },
    {
      path: '/admin-realisasi-anggaran',
      name: 'admin-realisasi-anggaran',
      component: () => import('../views/admin/RealisasiAnggaran.vue')
    },
    {
      path: '/admin-pengguna',
      name: 'admin-pengguna',
      component: () => import('../views/admin/User.vue')
    },
    {
      path: '/admin-profile',
      name: 'admin-profile',
      component: () => import('../views/admin/Profile.vue')
    },

    
    // user
    {
      path: '/user-dashboard',
      name: 'user-dashboard',
      component: () => import('../views/user/Dashboard.vue')
    },
    {
      path: '/user-jurnal',
      name: 'user-jurnal',
      component: () => import('../views/user/Jurnal.vue')
    },
    {
      path: '/user-ledger',
      name: 'user-ledger',
      component: () => import('../views/user/BukuBesar.vue')
    },

  ]
})

export default router
