
<template>
  <div id="main-comp">
    <div class="cont">
      <button class="menu-btn" v-on:click="openMenu()">
        <svg fill="#FFFFFF" viewBox="0 0 72 72" width="34px" height="34px">
          <path
            d="M56 48c2.209 0 4 1.791 4 4 0 2.209-1.791 4-4 4-1.202 0-38.798 0-40 0-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4C17.202 48 54.798 48 56 48zM56 32c2.209 0 4 1.791 4 4 0 2.209-1.791 4-4 4-1.202 0-38.798 0-40 0-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4C17.202 32 54.798 32 56 32zM56 16c2.209 0 4 1.791 4 4 0 2.209-1.791 4-4 4-1.202 0-38.798 0-40 0-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4C17.202 16 54.798 16 56 16z" />
        </svg>
      </button>
      <div class="searcher-cont">
        <div class="form-floating">
          <input placeholder="¿Qué te apetece escuchar?" v-model="cerca" v-on:keyup.enter="onSearch"
            class="cerca form-control" maxlength="800" autocorrect="off" autocapitalize="off" spellcheck="false"
            id="cercaInput" />
          <label for="cercaInput" class="cerca-placeholder">¿Qué te apetece escuchar?</label>
        </div>

        <label for="selectSearchType" class="label-select-type">Quiero buscar</label>
        <select class="form-select tipus-cerca " id="selectSearchType" v-model="searchType"
          v-on:change="onChangeSelectSearchType($event)">
          <option value="artist">un artista</option>
          <option value="track">una canción</option>
          <option value="album">un album</option>
        </select>
      </div>
    </div>
    <div class="result-list-container" role="grid">
      <ul class="result-list">
        <li v-for="(item, index) in cercaList">
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
                <img :src="item.album.images[2].url" class="pic" />
              </div>
              <div class="name-container">
                <label>{{ item.name }}</label>
                <div class="artist">
                  <label v-for="(artist, i) in item.artists">

                    <label v-if="i > 0"> ,</label>
                    {{ artist.name }}
                  </label>
                </div>
              </div>
            </div>

            <div class="album-btns-container">
              <div class="album-container">
                <label class="album">{{ item.album.name }}</label>
              </div>

              <div class="btns-container">

                <label class="track-duration" title="duración de la canción">{{ trackDuration(item.duration_ms) }}
                </label>
                <button class="add-btn" title="añadir a playlist" v-on:click="addSong(index)">
                  <svg width="24" height="24" viewBox="0 0 256 256" version="1.1" fill="#535353">
                    <g inkscape:label="icon" inkscape:groupmode="layer" id="layer1" fill="#535353">
                      <circle
                        style="fill:none;stroke:#535353;stroke-width:16;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                        id="path868" cx="128" cy="128" r="112.00011" fill="#535353" />
                      <path
                        style="fill:#535353;stroke:#535353;stroke-width:16;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                        d="M 79.999992,128 H 176.0001" id="path872" fill="#535353" />
                      <path
                        style="fill:#535353;stroke:#535353;stroke-width:16;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                        d="m 128.00004,79.99995 v 96.0001" id="path874" fill="#535353" />
                    </g>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="songAlreadyAdded.added" class="blur-background">
      <div class="error-container">
        <label class="error">Ya en la lista</label>
        <div class="error-btns">
          <button class="add-btn" v-on:click="addSongAnyways()">Añadir de todas formas</button>
          <button class="close-btn" v-on:click="closeAddSongAnyways()">No añadir</button>
        </div>
      </div>

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
import { usePlaylistFeatures } from '../stores/playlist_features';

const searchType = ref('track')
const cerca = ref('')
let cercaList = ref(new Array())
const songPlayed = ref(9999)
const songStore = useSongStore();
const playlistStore = usePlaylistStore();
const isPlayingStore = useIsPlayingStore();
const songAlreadyAdded = ref({ added: false, songObj: {} });
const playlistFeaturesStore = usePlaylistFeatures();
const innerWidth = ref(window.innerWidth);

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const { features } = storeToRefs(playlistFeaturesStore);

async function addSong(index) {
  let song = cercaList.value[index];

  let isSongAlreadyAdded = await songStore.getSongByUrl(song.uri);
  //miramos si la canción ya está añadida
  if (typeof isSongAlreadyAdded === 'string' && isSongAlreadyAdded.includes('Error:')) {
    //si la canción no está añadida la añadimos
    let artists = '';
    for (let i = 0; i < song.artists.length; ++i) {
      if (i > 0) artists += '::';
      artists += song.artists[i].name;
    }

    let songObj = {
      name: song.name,
      picture: song.album.images[2].url,
      url: song.uri,
      duration: song.duration_ms,
      album: song.album.name,
      artists: artists
    }

    let storedSong = await songStore.saveSong(songObj);
    if (typeof storedSong === 'string' && storedSong.includes('Error')) {
      console.log(storedSong);
    } else {
      //si ha salido bien el añadido, la añadimos a la playlist del usuario
      let obj = {
        added: false,
        songObj: {}
      }
      songAlreadyAdded.value = obj;

      console.log(storedSong);
      let playlist = {
        user_id: user.value.id,
        song_id: storedSong.id
      }
      let resp = await playlistStore.addSongToPlaylist(playlist);
      if (typeof resp === 'string' && resp.includes('Error:')) {
        console.log(resp);
      } else {
        if (features.value === null) await playlistFeaturesStore.createPlaylist(user.value.id);
      }
    }
  } else {
    //si la canción está añadida, miramos si ya está en la playlist del usuario
    let playlistSong = await playlistStore.checkSongIsAlreadyAdded(user.value.id, isSongAlreadyAdded.id);
    if (typeof playlistSong === 'string' && playlistSong.includes('Error:')) {
      //si no está en la playlist del usuario la añadimos
      let obj = {
        added: false,
        songObj: {}
      }
      songAlreadyAdded.value = obj;

      let playlist = {
        user_id: user.value.id,
        song_id: isSongAlreadyAdded.id
      }
      let resp = await playlistStore.addSongToPlaylist(playlist);
      if (typeof resp === 'string' && resp.includes('Error:')) {
        console.log(resp);
      } else {
        if (features.value === null) await playlistFeaturesStore.createPlaylist(user.value.id);
      }
    } else {
      //si está en la playlist del usuario le preguntamos si la quiere volver a añadir
      let obj = {
        added: true,
        songObj: playlistSong
      }
      songAlreadyAdded.value = obj;
    }

  }

}

async function openMenu() {
  if (window.innerWidth < 464) {
    //document.getElementById('left-nav').style.display = 'none';
    document.getElementById('left-nav').style.display = 'block';
  }
}

async function addSongAnyways() {
  if (songAlreadyAdded.value.added && typeof songAlreadyAdded.value.songObj[0] !== 'undefined') {
    let playlist = {
      user_id: user.value.id,
      song_id: songAlreadyAdded.value.songObj[0].song_id
    }
    let resp = await playlistStore.addSongToPlaylist(playlist);
    if (typeof resp === 'string' && resp.includes('Error:')) {
      console.log(resp);
    } else {
      if (features.value === null) await playlistFeaturesStore.createPlaylist(user.value.id);
    }
  }
  closeAddSongAnyways();
}

async function closeAddSongAnyways() {
  let obj = {
    added: false,
    songObj: {}
  }
  songAlreadyAdded.value = obj;
}

async function getSong(url) {
  let res = await songStore.getSongByUrl(url);
  if (typeof res === 'string' && res.includes('Error')) {
    console.log(res);
  } else {
    console.log(res);
  }
}

function onChangeSelectSearchType(event) {
  searchType.value = event.target.value
}

function trackDuration(ms) {
  let min = Math.floor((ms / 1000 / 60) << 0)
  let sec = Math.floor((ms / 1000) % 60)

  return min + ':' + (sec < 10 ? '0' : '') + sec
}

async function onSearch() {
  //creamos la url
  let url = config.spotify_base_url + config.spotify_search
  //añadimos el texto de la búsqueda
  url += '?q=' + cerca.value
  //añadimos el tipo de búsqueda
  url += '&type=' + searchType.value + '&limit=20'

  //obtenemos un token de acceso
  let token = await authorize()

  if (token !== null) {
    let header = new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    })

    let initRequest = {
      method: 'GET',
      headers: header
    }

    await fetch(url, initRequest)
      .then(function (response) {
        return response.json()
      })
      .then(respJSON => {
        cercaList.value = respJSON.tracks.items
      })
      .catch(error => console.error('Error:', error))
  } else {
    console.error('Error: ', 'no se ha podido obtener el token de acceso.')
  }
}

async function playSong(song, index) {
  let url = song.uri.split(':')[2];
  await isPlayingStore.playSong(url);
  songPlayed.value = index;
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

.menu-btn {
    display: none;
  }

.cont {
  display: grid;

  height: 80px;
  margin: 0;
  padding: 0;
}

.tipus-cerca {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  margin-block: 0px;
  font-size: 1.1rem;
  font-weight: 400;
  color: inherit;
  border: 0;
  border-radius: 500px;
  color: #fff;
  height: 45px;
  text-overflow: ellipsis;
  min-width: fit-content;
  width: 150px;
  text-align: center;
  margin-left: 10px;
  background-color: transparent;
  text-decoration: underline;
}

.tipus-cerca>option {
  color: #000;
}

.cerca-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1rem;
  font-weight: 400;
  text-overflow: ellipsis;
  color: #000;
  transform-origin: -150px 0;
}

.cerca {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  margin-block: 0px;
  font-size: 1rem;
  font-weight: 400;
  color: inherit;
  border: 0;
  border-radius: 500px;
  color: #000;
  height: 45px !important;
  padding: 6px 48px;
  text-overflow: ellipsis;
  min-width: 200px;
  width: 364px;
  text-align: center;
  background: url('../icons/search.png') no-repeat scroll 17px 10px;
  background-color: #fff;
  padding-left: 30px;
}

.searcher-cont {
  display: flex;
  align-items: center;
  padding-left: 50px;
}

.label-select-type {
  margin-left: 20px;
  font-size: 1.1rem;
  font-weight: 500;
  color: #fff;
  width: fit-content;
}

form-group>.form-control-input-lg {
  background: url(images/example.gif) no-repeat scroll 0px 0px;
  padding-left: 0px;
}

select {
  border: 0 solid transparent !important;
  box-shadow: none !important;
}

input {
  box-shadow: none !important;
}

.result-list-container {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: calc(100vh - 80px - 100px);
  width: 100%;
  padding: 20px;
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

.result-list {
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

.add-btn:active {
  position: relative;
  top: 1px;
}

.close-btn {
  background-color: #2fbd5a;
  color: rgb(0, 0, 0);
  width: 40%;
  height: 40px;
  border-radius: 50px;
  border: 0px;
  box-shadow: 0px 4px 10px 5px rgb(206, 205, 205);
  font-weight: 600;
}

.close-btn:active {
  position: relative;
  top: 1px;
}

@media screen and (max-width: 464px) {
  #main-comp {
    width: 100vw;
    height: calc(100vh - 80px);
    background-color: #121212;
    position: fixed;
    bottom: 80px;
    left: 0;
  }

  .cont {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .searcher-cont {
    display: flex;
    align-items: center;
    padding-left: 0px;
    justify-content: center;
  }

  .cerca {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    margin-block: 0px;
    font-size: 1rem;
    font-weight: 400;
    color: inherit;
    border: 0;
    border-radius: 500px;
    color: #000;
    height: 45px !important;
    padding: 20px 48px;
    text-overflow: ellipsis;
    min-width: 200px;
    width: 300px;
    text-align: center;
    background: none;
    background-color: #fff;
    padding-left: 50px;
  }

  .label-select-type {
    display: none;
  }

  .tipus-cerca {
    display: none;
  }

  .result-list-container {
    height: calc(100vh - 80px - 80px);
    padding: 0;
    ;
  }

  .result-list {
    padding-left: 10px;
    padding-right: 10px;
  }

  .result-item {
    height: 60px;
    color: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-right: 10px;
    margin-top: 5px;
  }

  .album-container {
    display: none;
  }

  .album-btns-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: #979696;
    width: 20%;
  }

  .track-duration {
    background-color: transparent;
    border: none;
    padding: 0px;
    display: none;
  }

  .play-pic-name-container {
    width: 70%;
  }

  .name-container {
    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    font-size: 12px;
    width: 50%;
  }

  .artist {
    display: none;
  }

  .error-container {
    width: 250px;
    right: calc(50vw - 125px);
  }

  .add-btn {
    width: 35%;
  }

  .close-btn {
    width: 40%;
  }

  .menu-btn {
    background-color: transparent;
    border: none;
    display: block;
  }
}
</style>
