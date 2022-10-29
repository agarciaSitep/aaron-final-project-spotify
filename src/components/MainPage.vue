<template>
  <div id="main-comp">
    <div class="cont">
      <div class="searcher-cont">
        <div class="form-floating">
          <input
            placeholder="¿Qué te apetece escuchar?"
            v-model="cerca"
            v-on:keyup.enter="onSearch"
            class="cerca form-control"
            maxlength="800"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            id="cercaInput"
          />
          <label for="cercaInput" class="cerca-placeholder"
            >¿Qué te apetece escuchar?</label
          >
        </div>

        <label for="selectSearchType" class="label-select-type"
          >Quiero buscar</label
        >
        <select
          class="form-select tipus-cerca "
          id="selectSearchType"
          v-model="searchType"
          v-on:change="onChangeSelectSearchType($event)"
        >
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
              <div class="play-container">
                <div class="track-playing" v-if="songPlayed === index">
                  <img
                    class="n5XwsUqagSoVk8oMiw1x"
                    width="14"
                    height="14"
                    alt=""
                    src="https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f93a2ef4.gif"
                  />
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
                <button class="fav-btn" title="añadir a favoritos">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 150 150"
                  >
                    <path
                      d="M125.784 35.0369C113.039 22.2916 92.9859 21.3682 79.1227 32.8994C79.1062 32.9135 77.318 34.3807 75 34.3807C72.6234 34.3807 70.9266 32.9416 70.8609 32.8853C57.0141 21.3682 36.9609 22.2916 24.2156 35.0369C17.6695 41.583 14.0625 50.2877 14.0625 59.5478C14.0625 68.808 17.6695 77.5127 24.0914 83.9228L64.3078 131.006C66.9844 134.14 70.882 135.938 75 135.938C79.1203 135.938 83.0156 134.14 85.6922 131.009L125.782 84.0611C139.301 70.5447 139.301 48.5533 125.784 35.0369ZM122.346 80.8807L82.1297 127.964C80.3461 130.05 77.7469 131.25 75 131.25C72.2531 131.25 69.6562 130.053 67.8703 127.964L27.532 80.7447C21.8695 75.0822 18.75 67.5541 18.75 59.5478C18.75 51.5392 21.8695 44.0135 27.5297 38.351C33.3961 32.4822 41.0555 29.5127 48.7336 29.5127C55.4742 29.5127 62.2289 31.8025 67.7977 36.4338C68.0977 36.7033 70.8586 39.0682 75 39.0682C79.0266 39.0682 81.8578 36.7314 82.1367 36.49C94.1109 26.5291 111.45 27.3307 122.47 38.351C134.159 50.0393 134.159 69.0564 122.346 80.8807Z"
                      fill="#535353"
                    />
                  </svg>
                </button>
                <lable class="track-duration" title="duración de la canción"
                  >{{ trackDuration(item.duration_ms) }}
                </lable>
                <button class="add-btn" title="añadir a playlist" v-on:click="addSong(index)">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 256 256"
                    version="1.1"
                    fill="#535353"
                  >
                    <g
                      inkscape:label="icon"
                      inkscape:groupmode="layer"
                      id="layer1"
                      fill="#535353"
                    >
                      <circle
                        style="fill:none;stroke:#535353;stroke-width:16;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                        id="path868"
                        cx="128"
                        cy="128"
                        r="112.00011"
                        fill="#535353"
                      />
                      <path
                        style="fill:#535353;stroke:#535353;stroke-width:16;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                        d="M 79.999992,128 H 176.0001"
                        id="path872"
                        fill="#535353"
                      />
                      <path
                        style="fill:#535353;stroke:#535353;stroke-width:16;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                        d="m 128.00004,79.99995 v 96.0001"
                        id="path874"
                        fill="#535353"
                      />
                    </g>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as config from '../config'
import { authorize } from './utils'
import { useSongStore } from '../stores/song';

const searchType = ref('track')
const cerca = ref('')
let cercaList = ref(new Array())
const songPlayed = ref(0)
const songStore = useSongStore();

async function addSong(index) {
  let song = cercaList.value[index];
  let songObj = {
    name: song.name,
    picture: song.album.images[2].url,
    url: song.uri,
  }

  let res = await songStore.saveSong(songObj);
  if (typeof res === 'string' && res.includes('Error')) {
    console.log(res);
  } else {
    console.log(res);
    await getSong(song.uri);
  }
}

async function getSong(url) {
  let res = await songStore.getSongByUrl(url);
  if (typeof res === 'string' && res.includes('Error')) {
    console.log(res);
  } else {
    console.log(res);
  }
}

function onChangeSelectSearchType (event) {
  searchType.value = event.target.value
}

function trackDuration (ms) {
  let min = Math.floor((ms / 1000 / 60) << 0)
  let sec = Math.floor((ms / 1000) % 60)

  return min + ':' + (sec < 10 ? '0' : '') + sec
}

async function onSearch () {
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

.tipus-cerca > option {
  color: #000;
}

.cerca-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1rem;
  font-weight: 400;
  font-family: var(
    --font-family,
    CircularSp,
    CircularSp-Arab,
    CircularSp-Hebr,
    CircularSp-Cyrl,
    CircularSp-Grek,
    CircularSp-Deva,
    var(--fallback-fonts, sans-serif)
  );
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
  font-family: var(
    --font-family,
    CircularSp,
    CircularSp-Arab,
    CircularSp-Hebr,
    CircularSp-Cyrl,
    CircularSp-Grek,
    CircularSp-Deva,
    var(--fallback-fonts, sans-serif)
  );
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

form-group > .form-control-input-lg {
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

.fav-btn {
  background-color: transparent;
  border: none;
  padding: 10px;
  color: #1ed760;
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
</style>
