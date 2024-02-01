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
      path: '/admin-candidate-list',
      name: 'admin-candidate-list',
      component: () => import('../views/admin/CandidateList.vue')
    },
    {
      path: '/admin-voter-list',
      name: 'admin-voter-list',
      component: () => import('../views/admin/VoterList.vue')
    },
    {
      path: '/admin-time-vote',
      name: 'admin-time-vote',
      component: () => import('../views/admin/TimeVote.vue')
    },
    {
      path: '/admin-aspirasi',
      name: 'admin-aspirasi',
      component: () => import('../views/admin/Aspirasi.vue')
    },
    
    // voter
    {
      path: '/voter-dashboard',
      name: 'voter-dashboard',
      component: () => import('../views/voter/Dashboard.vue')
    },
    {
      path: '/voter-vote',
      name: 'voter-vote',
      component: () => import('../views/voter/Candidate.vue')
    },
    {
      path: '/voter-aspirasi',
      name: 'voter-aspirasi',
      component: () => import('../views/voter/Aspirasi.vue')
    },
  ]
})

export default router
