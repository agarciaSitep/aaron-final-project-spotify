<template>
  <div id="left-nav" class="selected">
    <div class="cont">
      <div class="logo-cont">
        <a class="logo" draggable="false" href="/">
          <svg viewBox="0 0 1134 340">
            <title>Spotify</title>
            <path fill="#fff"
              d="M8 171c0 92 76 168 168 168s168-76 168-168S268 4 176 4 8 79 8 171zm230 78c-39-24-89-30-147-17-14 2-16-18-4-20 64-15 118-8 162 19 11 7 0 24-11 18zm17-45c-45-28-114-36-167-20-17 5-23-21-7-25 61-18 136-9 188 23 14 9 0 31-14 22zM80 133c-17 6-28-23-9-30 59-18 159-15 221 22 17 9 1 37-17 27-54-32-144-35-195-19zm379 91c-17 0-33-6-47-20-1 0-1 1-1 1l-16 19c-1 1-1 2 0 3 18 16 40 24 64 24 34 0 55-19 55-47 0-24-15-37-50-46-29-7-34-12-34-22s10-16 23-16 25 5 39 15c0 0 1 1 2 1s1-1 1-1l14-20c1-1 1-1 0-2-16-13-35-20-56-20-31 0-53 19-53 46 0 29 20 38 52 46 28 6 32 12 32 22 0 11-10 17-25 17zm95-77v-13c0-1-1-2-2-2h-26c-1 0-2 1-2 2v147c0 1 1 2 2 2h26c1 0 2-1 2-2v-46c10 11 21 16 36 16 27 0 54-21 54-61s-27-60-54-60c-15 0-26 5-36 17zm30 78c-18 0-31-15-31-35s13-34 31-34 30 14 30 34-12 35-30 35zm68-34c0 34 27 60 62 60s62-27 62-61-26-60-61-60-63 27-63 61zm30-1c0-20 13-34 32-34s33 15 33 35-13 34-32 34-33-15-33-35zm140-58v-29c0-1 0-2-1-2h-26c-1 0-2 1-2 2v29h-13c-1 0-2 1-2 2v22c0 1 1 2 2 2h13v58c0 23 11 35 34 35 9 0 18-2 25-6 1 0 1-1 1-2v-21c0-1 0-2-1-2h-2c-5 3-11 4-16 4-8 0-12-4-12-12v-54h30c1 0 2-1 2-2v-22c0-1-1-2-2-2h-30zm129-3c0-11 4-15 13-15 5 0 10 0 15 2h1s1-1 1-2V93c0-1 0-2-1-2-5-2-12-3-22-3-24 0-36 14-36 39v5h-13c-1 0-2 1-2 2v22c0 1 1 2 2 2h13v89c0 1 1 2 2 2h26c1 0 1-1 1-2v-89h25l37 89c-4 9-8 11-14 11-5 0-10-1-15-4h-1l-1 1-9 19c0 1 0 3 1 3 9 5 17 7 27 7 19 0 30-9 39-33l45-116v-2c0-1-1-1-2-1h-27c-1 0-1 1-1 2l-28 78-30-78c0-1-1-2-2-2h-44v-3zm-83 3c-1 0-2 1-2 2v113c0 1 1 2 2 2h26c1 0 1-1 1-2V134c0-1 0-2-1-2h-26zm-6-33c0 10 9 19 19 19s18-9 18-19-8-18-18-18-19 8-19 18zm245 69c10 0 19-8 19-18s-9-18-19-18-18 8-18 18 8 18 18 18zm0-34c9 0 17 7 17 16s-8 16-17 16-16-7-16-16 7-16 16-16zm4 18c3-1 5-3 5-6 0-4-4-6-8-6h-8v19h4v-6h4l4 6h5zm-3-9c2 0 4 1 4 3s-2 3-4 3h-4v-6h4z">
            </path>
          </svg>
        </a>
      </div>
    </div>
    <div class="separator"></div>
    <div class="actions">
      <div class="crear-lista-text-container" v-on:click="onChangePage(true)">
        <span class="crear-lista-text">Tu Playlist</span>
      </div>
    </div>
    <div class="separator"></div>
    <div class="actions">
      <div class="crear-lista-text-container" v-on:click="onChangePage(false)">
        <span class="crear-lista-text">Buscar una canci??n</span>
      </div>
    </div>
    <div class="separator"></div>
    <div class="actions">
      <div class="crear-lista-text-container">
        <a class="crear-lista-text" href="https://www.linkedin.com/in/aaron-garcia-84088a154/" target="_blank">Mi
          LinkedIn</a>
      </div>
    </div>
    <div class="separator"></div>

  </div>
</template>

<script setup>
import { useIsPlaylistStore } from '../stores/isPlaylist';

const isPlaylistStore = useIsPlaylistStore();

async function onChangePage(isPlaylist) {
  if (window.innerWidth < 464) {
    //document.getElementById('left-nav').style.display = 'none';
     document.getElementById('left-nav').style.display = 'none';
  }
  await isPlaylistStore.onChangeMainPage(isPlaylist);
}

</script>


<style scoped>
#left-nav {
  position: fixed;
  width: 300px;
  left: 0;
  bottom: 100px;
  height: calc(100vh - 100px);
  background-color: #000;
  z-index: 3;
}

a {
  background-color: transparent !important;
}

.cont {
  display: grid;
  height: 80px;
  margin: 0;
  padding: 0;
  margin-left: 35px;
}

.separator {
  margin: 0;
  margin-left: 10px;
  margin-right: 10px;
  border-bottom: 0.2px solid #535353;
}

.actions {
  margin: 10px;
  margin-left: 35px;
  padding: 0;
  padding-right: 35px;
  height: 20px;

}

.crear-lista-text-container {
  display: flex;
  align-items: center;
  height: 100%;
  width: fit-content;
}

.crear-lista-text {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  margin-block: 0px;
  font-size: 1.125rem;
  font-weight: 700;
  text-decoration: none;
  color: inherit;
  text-align: left;
  color: #b3b3b3;
  cursor: pointer;
}

.crear-lista-text:hover {
  position: relative;
  left: 3px;
  color: #e2e2e2;
}

.logo-cont {
  display: flex;
  align-items: center;
  padding: 0 24px;
}

.logo {
  height: 45px;
  max-width: 131px;
  width: 100%;
}

.my-playlist-container {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  -ms-flex-line-pack: start;
  -webkit-box-align: start;
  -ms-flex-align: start;
  -ms-grid-row-align: flex-start;
  align-content: flex-start;
  align-items: flex-start;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  justify-content: flex-start;
  overflow: visible !important;
  position: relative;
  overflow: hidden;
  height: 100%;
  overscroll-behavior-y: contain;
  padding: 8px 0;
}

@media screen and (max-width: 464px) {
  #left-nav {
    width: 100vw;
    bottom: 80px;
    height: calc(100vh - 80px);
  }

  .cont {
    margin: 0;
  }

  .logo-cont {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .separator {
    margin: 0;
  }

  .crear-lista-text-container {
    justify-content: center;
    align-items: center;
    width: auto;
  }

  .selected {
  animation: slide-in 0.5s forwards;
  -webkit-animation: slide-in 0.5s forwards;
}

.dismiss {
  animation: slide-out 0.5s forwards;
  -webkit-animation: slide-out 0.5s forwards;
}

@keyframes slide-in {
  0% {
    -webkit-transform: translateX(-100%);
  }
  100% {
    -webkit-transform: translateX(0%);
  }
}

@-webkit-keyframes slide-in {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0%);
  }
}

@keyframes slide-out {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
}

@-webkit-keyframes slide-out {
  0% {
    -webkit-transform: translateX(0%);
  }
  100% {
    -webkit-transform: translateX(100%);
  }
}
}
</style>
