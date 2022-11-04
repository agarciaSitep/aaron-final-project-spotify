import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue';
import Playlist from '../components/Playlist.vue';
import Auth from '../components/Auth/Auth.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: App
    },
    {
      path: '/playlist',
      name: 'playlist',
      component: Playlist
    },
    {
      path: '/login',
      name: 'login',
      component: Auth
    }
  ],
})



export default router
