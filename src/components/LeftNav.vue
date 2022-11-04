<template>
  <div id="left-nav">
    <div class="cont">
      <div class="logo-cont">
        <a class="logo" draggable="false" href="/">
          <svg viewBox="0 0 1134 340">
            <title>Spotify</title>
            <path
              fill="#fff"
              d="M8 171c0 92 76 168 168 168s168-76 168-168S268 4 176 4 8 79 8 171zm230 78c-39-24-89-30-147-17-14 2-16-18-4-20 64-15 118-8 162 19 11 7 0 24-11 18zm17-45c-45-28-114-36-167-20-17 5-23-21-7-25 61-18 136-9 188 23 14 9 0 31-14 22zM80 133c-17 6-28-23-9-30 59-18 159-15 221 22 17 9 1 37-17 27-54-32-144-35-195-19zm379 91c-17 0-33-6-47-20-1 0-1 1-1 1l-16 19c-1 1-1 2 0 3 18 16 40 24 64 24 34 0 55-19 55-47 0-24-15-37-50-46-29-7-34-12-34-22s10-16 23-16 25 5 39 15c0 0 1 1 2 1s1-1 1-1l14-20c1-1 1-1 0-2-16-13-35-20-56-20-31 0-53 19-53 46 0 29 20 38 52 46 28 6 32 12 32 22 0 11-10 17-25 17zm95-77v-13c0-1-1-2-2-2h-26c-1 0-2 1-2 2v147c0 1 1 2 2 2h26c1 0 2-1 2-2v-46c10 11 21 16 36 16 27 0 54-21 54-61s-27-60-54-60c-15 0-26 5-36 17zm30 78c-18 0-31-15-31-35s13-34 31-34 30 14 30 34-12 35-30 35zm68-34c0 34 27 60 62 60s62-27 62-61-26-60-61-60-63 27-63 61zm30-1c0-20 13-34 32-34s33 15 33 35-13 34-32 34-33-15-33-35zm140-58v-29c0-1 0-2-1-2h-26c-1 0-2 1-2 2v29h-13c-1 0-2 1-2 2v22c0 1 1 2 2 2h13v58c0 23 11 35 34 35 9 0 18-2 25-6 1 0 1-1 1-2v-21c0-1 0-2-1-2h-2c-5 3-11 4-16 4-8 0-12-4-12-12v-54h30c1 0 2-1 2-2v-22c0-1-1-2-2-2h-30zm129-3c0-11 4-15 13-15 5 0 10 0 15 2h1s1-1 1-2V93c0-1 0-2-1-2-5-2-12-3-22-3-24 0-36 14-36 39v5h-13c-1 0-2 1-2 2v22c0 1 1 2 2 2h13v89c0 1 1 2 2 2h26c1 0 1-1 1-2v-89h25l37 89c-4 9-8 11-14 11-5 0-10-1-15-4h-1l-1 1-9 19c0 1 0 3 1 3 9 5 17 7 27 7 19 0 30-9 39-33l45-116v-2c0-1-1-1-2-1h-27c-1 0-1 1-1 2l-28 78-30-78c0-1-1-2-2-2h-44v-3zm-83 3c-1 0-2 1-2 2v113c0 1 1 2 2 2h26c1 0 1-1 1-2V134c0-1 0-2-1-2h-26zm-6-33c0 10 9 19 19 19s18-9 18-19-8-18-18-18-19 8-19 18zm245 69c10 0 19-8 19-18s-9-18-19-18-18 8-18 18 8 18 18 18zm0-34c9 0 17 7 17 16s-8 16-17 16-16-7-16-16 7-16 16-16zm4 18c3-1 5-3 5-6 0-4-4-6-8-6h-8v19h4v-6h4l4 6h5zm-3-9c2 0 4 1 4 3s-2 3-4 3h-4v-6h4z"
            ></path>
          </svg>
        </a>
      </div>
    </div>
    <div class="separator"></div>
    <div class="actions">
      <button class="crear-lista-btn">
        <div class="crear-lista-icon-container">
          <div class="crear-lista-icon-wrapper">
            <svg
              role="img"
              height="12"
              width="12"
              aria-hidden="true"
              viewBox="0 0 16 16"
            >
              <path
                d="M15.25 8a.75.75 0 01-.75.75H8.75v5.75a.75.75 0 01-1.5 0V8.75H1.5a.75.75 0 010-1.5h5.75V1.5a.75.75 0 011.5 0v5.75h5.75a.75.75 0 01.75.75z"
              ></path>
            </svg>
          </div>
        </div>
        <div class="crear-lista-text-container">
          <span class="crear-lista-text">Crear lista</span>
        </div>
      </button>
    </div>
    <div class="separator"></div>
    <div class="my-playlist-container" role="list">
      <p class="playlist-list-title">Tus playlists</p>
      <ul class="playlist-list">
        <li class="playlist-elem">
          <a class="playlist-name">Playlist 1</a>
        </li>
        <li class="playlist-elem">
          <a class="playlist-name">Playlist 2</a>
        </li>
        <li class="playlist-elem">
          <a class="playlist-name">Playlist 3</a>
        </li>
        <li class="playlist-elem">
          <a class="playlist-name">Playlist 4</a>
        </li>
        <li class="playlist-elem">
          <a class="playlist-name">Playlist 5</a>
        </li>
        <li class="playlist-elem">
          <a class="playlist-name">Playlist 6</a>
        </li>
        <li class="playlist-elem">
          <a class="playlist-name">Playlist 7</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
#left-nav {
  position: fixed;
  width: 300px;
  left: 0;
  bottom: 100px;
  height: calc(100vh - 100px);
  background-color: #000;
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

.crear-lista-btn {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  min-height: -webkit-max-content;
  min-height: -moz-max-content;
  min-height: max-content;
  opacity: 0.7;
  padding: 8px var(--left-sidebar-padding-right) 8px
    var(--left-sidebar-padding-left);
  -webkit-transition: opacity 0.2s linear;
  transition: opacity 0.2s linear;
  width: 100%;
}

.crear-lista-icon-container {
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -ms-flex-negative: 0;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex-shrink: 0;
  height: 24px;
  justify-content: center;
  padding: 4px;
  position: relative;
  width: 24px;
  align-items: center;
}

.crear-lista-icon-wrapper {
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  align-items: center;
  background: #fff;
  border-radius: 2px;
  color: #000;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 100%;
  justify-content: center;
  position: absolute;
  width: 100%;
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
  font-size: 0.875rem;
  font-weight: 700;
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
  text-align: left;
  margin-left: 10px;
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

.playlist-list {
  border: 0;
  margin: 0;
  padding: 0;
  vertical-align: baseline;
  list-style: none;
}

.playlist-list-title {
  margin-left: 35px;
  color: #b3b3b3;
  font-size: 1.2rem;
  font-weight: 600;
}

.playlist-elem {
  -webkit-box-flex: 1;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-bottom: none;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex: 1;
  flex: 1;
  height: var(--left-sidebar-item-height);
  justify-content: flex-start;
  line-height: var(--left-sidebar-item-height);
  overflow: hidden;
  margin-left: 35px;
  margin-bottom: 10px;
}

.playlist-name {
  color: #b3b3b3;
  cursor: default;
  text-decoration: none;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  margin-block: 0px;
  font-size: 1rem;
  font-weight: 400;
}
</style>
