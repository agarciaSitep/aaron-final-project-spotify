import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue';
import playlist from '../components/playlist.vue';
import Auth from '../components/Auth/Auth.vue';

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: App
    },
    {
      path: '/playlist',
      name: 'playlist',
      component: playlist
    },
    {
      path: '/login',
      name: 'login',
      component: Auth
    }
  ],
})

router.beforeEach((to, from, next) => {
  next();
});

export default router
