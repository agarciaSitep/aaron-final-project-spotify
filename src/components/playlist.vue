<template>
    <div id="main-comp">
      <div class="cont">

      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  import * as config from '../config'
  import { authorize } from './utils'
  import { useSongStore } from '../stores/song';
  import { useIsPlayingStore } from '../stores/isPlaying';
  import { usePlaylistStore } from '../stores/user_songs';
  import { useUserStore } from '../stores/user';
  import { storeToRefs } from 'pinia';
  
  const searchType = ref('track')
  const cerca = ref('')
  let cercaList = ref(new Array())
  const songPlayed = ref(0)
  const songStore = useSongStore();
  const playlistStore = usePlaylistStore();
  const isPlayingStore = useIsPlayingStore();
  const songAlreadyAdded = ref({ added: false, songObj: {} });
  const songsList = ref([]);
  
  const userStore = useUserStore();
  const { user } = storeToRefs(userStore);

  onMounted(() => getPlaylistUsuari());

  async function getPlaylistUsuari() {
    let playlist = await playlistStore.getPlaylist(user.value.id);
    if (typeof playlist === 'string' && playlist.includes('Error')) {
        console.log(playlist);
    } else {
        await getAllSongs(playlist);
    }
    
  }

  async function getAllSongs(playlist) {
    for (let item in playlist) {
        let song = await songStore.getSongById(item.song_id);
        if (typeof song === 'string' && song.includes('Error:')) {
            console.log(song);
        } else {
            songsList.value.add(song);
        }
    }
  }

  </script>
  
  <style scoped>
  #main-comp {
    width: calc(100vw - 600px);
    height: calc(100vh - 100px);
    background-color: #121212;
    position: fixed;
    bottom: 100px;
    left: 300px;
  }
  
  .cont {
    display: grid;
  
    height: 80px;
    margin: 0;
    padding: 0;
  }
  
  </style>
  