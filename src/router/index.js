import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(/*import.meta.env.BASE_URL*/),
  routes: [
    {
      path: '/',
      name: 'home',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LogInView.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  next();
})

export default router
