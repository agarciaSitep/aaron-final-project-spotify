<template>
  <div id="bottom-nav">
    <span v-html="songUrl" class="iframe"></span>
  </div>
</template>
  
<script setup>
import { useIsPlayingStore } from '../stores/isPlaying';
import useAsyncComputed from './use-async-computed'

const isPlayingStore = useIsPlayingStore();
const [songUrl] = useAsyncComputed(getSongUrl, 0)

async function getSongUrl() {
  let url = await isPlayingStore.getActualSong();
  url = "https://open.spotify.com/embed/track/" + url + "?utm_source=generator&theme=0";
  let iframe = '<iframe style="border-radius:0px; background-color:transparent" ' +
    'src=' + url +
    ' height="80px"' +
    ' width="100%"' +
    ' frameBorder="0"' +
    ' allowfullscreen=""' +
    ' allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"' +
    ' loading="lazy"' +
    ' auto_play="true">' +
    '</iframe>'
  return iframe.replace(/\/+$/, '');
}
</script>
  
<style scoped>
#bottom-nav {
  position: fixed;
  width: 100vw;
  bottom: 0;
  height: 100px;
  background-color: #2a2a2a;
  border-top: 0.1px solid #535353;
  display: flex;
  justify-content: center;
  align-items: center;
}

.iframe {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  background-color: transparent;
  display: contents;
}

@media screen and (max-width: 464px) {

  #bottom-nav {
    height: 80px;
  }

}
</style>
  