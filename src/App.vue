<template>
  <div v-if="user !== undefined && user !== null && user">
    <BottomNav></BottomNav>
    <LeftNav></LeftNav>
    <RightNav></RightNav>
    <Playlist v-if="isPlaylist"></Playlist>
    <MainPage v-else></MainPage>
  </div>
  <Auth v-else />
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from './stores/user.js'
import { useIsPlaylistStore } from './stores/isPlaylist'
import { usePlaylistFeatures } from './stores/playlist_features'
import BottomNav from './components/BottomNav.vue'
import LeftNav from './components/LeftNav.vue'
import RightNav from './components/RightNav.vue'
import MainPage from './components/MainPage.vue'
import Auth from './components/Auth/Auth.vue'
import Playlist from './components/playlist.vue'


const userStore = useUserStore();
const isPlaylistStore = useIsPlaylistStore();
const playlistFeaturesStore = usePlaylistFeatures();
const { user } = storeToRefs(userStore);
const { isPlaylist } = storeToRefs(isPlaylistStore);

onMounted(async () => {
  try {
    await userStore.fetchUser() // here we call fetch user
    await playlistFeaturesStore.fetchFeatures(user.value.id);
  } catch (e) {
    console.log(e)
  }
})
</script>

<style>
#main {
  width: 100vw;
  height: 100vh;
  font-family: var(--font-family, CircularSp, CircularSp-Arab, CircularSp-Hebr, CircularSp-Cyrl, CircularSp-Grek, CircularSp-Deva, var(--fallback-fonts, sans-serif));
}
</style>
