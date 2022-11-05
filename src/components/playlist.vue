<template>
  <div id="main-comp">

    <div v-if="features === null">
      <div class="header-error">
        <h1 class="no-playlist">Ops... ha ocurrido un problema</h1>
        <p class="explicacion">Aún no se ha creado tu playlist, para hacerlo solo tienes que <strong>añadir una
            canción.</strong></p>
      </div>
      <div class="body-error">
        <img src="../icons/music-album.png" />
      </div>
    </div>
    <div v-else>
      <div class="header">
        <div class="playlist-picture">
          <img class="picture" src='../icons/playlist_image.png'/>
        </div>
        <div class="playlist-info-container">
          <h4>Playlist</h4>
          <h1>{{ features.name }}</h1>
          <h4>{{ songsList.length }} canciones</h4>
        </div>
        <div class="edit-btn">
          <button class="edit" v-on:click="openEdit(true)">
            <img src="../icons/edit.png" class="edit-img" />
          </button>
        </div>
      </div>
      <div class="list-container">
        <ul class="list">
          <li v-for="(item, index) in songsList">
            <div role="row" class="result-item">
            <div class="play-pic-name-container">
              <div class="play-container" v-on:click="playSong(item, index)">
                <div class="track-playing" v-if="songPlayed === index">
                  <img class="n5XwsUqagSoVk8oMiw1x" width="14" height="14" alt=""
                    src="https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f93a2ef4.gif" />
                </div>
                <div v-else>
                  <label class="track-number-list">{{ index + 1 }}</label>
                </div>
              </div>
              <div class="pic-container">
                <img :src="item.picture" class="pic" />
              </div>
              <div class="name-container">
                <label>{{ item.name }}</label>
                <div class="artist">
                  <label v-for="(artist, i) in item.artists.split('::')">
                    <label v-if="i > 0"> ,</label>
                    {{ artist }}
                  </label>
                </div>
              </div>
            </div>

            <div class="album-btns-container">
              <div class="album-container">
                <label class="album">{{ item.album }}</label>
              </div>

              <div class="btns-container">

                <label class="track-duration" title="duración de la canción">{{ trackDuration(item.duration) }}
                </label>
                <button class="add-btn" title="añadir a playlist" v-on:click="deleteSong(index)">
                  <img src='../icons/icons8-cancel-32.png' class="delete-btn-img"/>
                </button>
              </div>
            </div>
          </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="isOpen" class="blur-background">
      <div class="edit-container" >
        <h1>Edita los detalles</h1>
        <label for="playlist-name-input">Dale un nuevo nombre a tu playlist:</label>
        <input id="playlist-name-input" type="search" v-model="newPlaylistName" :placeholder="features.name"/>
        <div class="edit-btns">
          <button class="add-btn" v-on:click="openEdit(false)">Cancelar</button>
          <button class="edit-name-btn" v-on:click="editPlaylistName()">Editar</button>
        </div>
        
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { onMounted, ref } from 'vue'
import { useSongStore } from '../stores/song';
import { useIsPlayingStore } from '../stores/isPlaying';
import { usePlaylistStore } from '../stores/user_songs';
import { usePlaylistFeatures } from '../stores/playlist_features';
import { useUserStore } from '../stores/user';
import { storeToRefs } from 'pinia';

const songStore = useSongStore();
const playlistStore = usePlaylistStore();
const isPlayingStore = useIsPlayingStore();
const playlistFeaturesStore = usePlaylistFeatures();
const songsList = ref([]);

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const { features } = storeToRefs(playlistFeaturesStore);
const isOpen = ref(false);
const songPlayed = ref(9999);
let playlistArray = [];
const newPlaylistName = ref('');

onMounted(() => getPlaylistUsuari());

async function editPlaylistName() {
  let res = await playlistFeaturesStore.editName(newPlaylistName.value, features.value.id);
  if (typeof res === 'string' && res.includes('Error:')) console.log(res);
  else {
    openEdit(false);
    await playlistFeaturesStore.fetchFeatures(user.value.id);
  }
}

async function playSong(song, index) {
  let url = song.url.split(':')[2];
  await isPlayingStore.playSong(url);
  songPlayed.value = index;
}

async function getPlaylistUsuari() {
  let playlist = await playlistStore.getPlaylist(user.value.id);
  if (typeof playlist === 'string' && playlist.includes('Error')) {
    console.log(playlist);
  } else {
    playlistArray = playlist;
    await getAllSongs(playlist);
  }

}

async function getAllSongs(playlist) {
  let isSongs = true;
  let songs = []
  for (let i = 0; i < playlist.length; ++i) {
    let song = await songStore.getSongById(playlist[i].song_id);
    if (typeof song === 'string' && song.includes('Error:')) {
      console.log(song);
      isSongs = false;
      break;
    } else {
      songs.push(song);
    }
  }
  if (isSongs) songsList.value = songs;
}

async function openEdit(open) {
  isOpen.value = open;
}

function trackDuration(ms) {
  let min = Math.floor((ms / 1000 / 60) << 0)
  let sec = Math.floor((ms / 1000) % 60)

  return min + ':' + (sec < 10 ? '0' : '') + sec
}

async function deleteSong(index) {
  let song = playlistArray[index];
  let error = await playlistStore.deleteSongFromPlaylist(song.id);
  if (typeof error === 'string') console.log(error);
  else {
    await getPlaylistUsuari();
    if (songPlayed.value === index) songPlayed.value = 9999;
    else if (songPlayed.value > index) songPlayed.value -= 1;
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

.header-error {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 30px;
}

.body-error {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 150px - 100px);
}

.no-playlist {
  color: #fff;
}

.explicacion {
  color: #fff;
  font-size: 18px;
}

.header {
  display: grid;
  grid-template-columns: 1fr 3fr 0.2fr;
  height: 300px;
  margin: 0;
  padding: 0;
  background: linear-gradient(360deg, rgba(33, 33, 33, 1) 0%, rgba(64, 64, 64, 1) 63%, rgba(117, 117, 117, 1) 100%);
}

.playlist-picture {
  width: 100%;
  height: 100%;
  padding: 30px;
}

.picture {
  width: 100%;
  height: 100%;
}

.playlist-info-container {
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 30px;
  align-items: flex-start;
}

.playlist-info-container h4 {
  font-size: 20px;
  font-weight: 200;
  display: flex;
  margin-bottom: 0;
}

.playlist-info-container h1 {
  font-size: 70px;
  font-weight: 600;
}

.edit-btn {
  display: flex;
  align-items: flex-end;
  padding: 30px;
}

.edit {
  background-color: transparent;
  border: 0px solid transparent;
  cursor: pointer;
}

.edit-img {
  width: 45px;
}

.edit-img:active {
  position: relative;
  top: 1px;
}

.edit-container {
  width: 450px;
  height: 200px;
  display: flex;
  position: fixed;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  right: calc(50vw - 225px);
  top: calc(50vh - 137.5px);
  z-index: 9;
  background-color: #3d3d3d;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0px 4px 15px 5px rgba(31, 29, 29, 0.5);
}

.edit-container h1 {
  color: #fff;
  font-weight: 600;
  font-size: x-large;
  padding-bottom: 10px;
}

.edit-container label {
  color: #fff;
  font-weight: 300;
  font-size: medium;
  padding-bottom: 10px;
  margin-bottom: 0;
  padding-bottom: 0;
}

.edit-container input {
  background-color: #979696;
  border: 0px;
  border-radius: 5px;
  color: #121212;
  margin-bottom: 20px;
  width: 75%;
}

.blur-background {
  background-color: #3339;
  width: 100vw;
  height: 100vh;
  position: absolute;
  right: 0;
  top: 0;
  display: block;
}

.list-container {
  width: 100%;
  height: calc(100vh - 100px - 300px);
  overflow-y: scroll;
}

/* width */
::-webkit-scrollbar {
  width: 15px;

}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.list {
  list-style: none;
  list-style-type: none;
}

.result-item {
  height: 60px;
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: 50px;
  margin-top: 5px;
}

.play-pic-name-container {
  display: flex;
  flex-direction: row;
}

.play-container {
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  color: #979696;
  font-weight: 600;
  font-size: larger;
  width: 40px;
}

.name-container {
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
}

.artist {
  color: #979696;
}

.pic-container {
  width: 55px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pic-container img {
  width: 100%;
  height: 100%;
}

.album-btns-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 40%;
  color: #979696;
}

.btns-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.track-duration {
  background-color: transparent;
  border: none;
  padding: 10px;
}

.add-btn {
  background-color: transparent;
  border: none;
  padding: 10px;
  color: #1ed760;
}

.blur-background {
  background-color: #3339;
  width: 100vw;
  height: 100vh;
  position: absolute;
  right: 0;
  top: 0;
  display: block;
}

.error-container {
  width: 400px;
  height: 150px;
  display: flex;
  position: fixed;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  right: calc(50vw - 200px);
  top: calc(50vh - 75px);
  z-index: 9;
  background-color: #fff;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0px 4px 15px 5px rgba(31, 29, 29, 0.5);
}

.error {
  font-size: 18px;
  font-weight: 800;
}

.error-btns {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}

.add-btn {
  text-align: center;
  font-size: small;
  color: #888;
  font-weight: 600;
}

.delete-btn-img {
  width: 24px;
  height: 24px;
}

.edit-btns {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}

.add-btn:active {
  position: relative;
  top: 1px;
}

.edit-name-btn {
  background-color: white;
  color: black;
  border: 0px;
  border-radius: 150px;
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
}

.edit-name-btn:active {
  position: relative;
  top: 1px;
}

</style>
  