<template>
  <div id="app">
    <div v-if="user !== undefined && user !== null && user">
      <BottomNav></BottomNav>
      <LeftNav></LeftNav>
      <RightNav></RightNav>
      <MainPage></MainPage>
    </div>
    <Auth v-else />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from './stores/user.js'
import BottomNav from './components/BottomNav.vue'
import LeftNav from './components/LeftNav.vue'
import RightNav from './components/RightNav.vue'
import MainPage from './components/MainPage.vue'
import Auth from './components/Auth/Auth.vue'

const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

onMounted(async () => {
  try {
    await userStore.fetchUser() // here we call fetch user
  } catch (e) {
    console.log(e)
  }
})
</script>

<style scoped>
#app  {
  width: 100vw;
  height: 100vh;
  font-family: var(--font-family, CircularSp, CircularSp-Arab, CircularSp-Hebr, CircularSp-Cyrl, CircularSp-Grek, CircularSp-Deva, var(--fallback-fonts, sans-serif));
}
</style>
