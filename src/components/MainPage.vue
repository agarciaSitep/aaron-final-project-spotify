<template>
  <div id="main-comp">
    <div class="cont">

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

      <ul>
        <li v-for="item in cercaList">{{item.name}} + ' - ' + {{item.artists[0].name}}</li>
      </ul>
    </div>
  </div>
</template>
  
<script setup>
import { onMounted, ref } from 'vue';
import * as config from '../config';
import { authorize } from './utils'

const searchType = ref('track');
const cerca = ref('');
let cercaList = ref(new Array());

function onChangeSelectSearchType(event) {
  searchType.value = event.target.value;
}

async function onSearch() {
  //creamos la url
  let url = config.spotify_base_url + config.spotify_search;
  //añadimos el texto de la búsqueda
  url += '?q=' + cerca.value;
  //añadimos el tipo de búsqueda
  url += '&type=' + searchType.value + '&limit=20';

  //obtenemos un token de acceso
  let token = await authorize();

  if (token !== null) {
    let header = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token,

    });

    let initRequest = {
      method: 'GET',
      headers: header,
    }

    await fetch(url, initRequest)
      .then(function (response) {
        return response.json();
        
      }).then(respJSON => {
        cercaList.value = respJSON.tracks.items;
      })
      .catch(error => console.error('Error:', error))
  } else {
    console.error('Error: ', 'no se ha podido obtener el token de acceso.');
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
  font-family: var(--font-family, CircularSp, CircularSp-Arab, CircularSp-Hebr, CircularSp-Cyrl, CircularSp-Grek, CircularSp-Deva, var(--fallback-fonts, sans-serif));
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
  font-family: var(--font-family, CircularSp, CircularSp-Arab, CircularSp-Hebr, CircularSp-Cyrl, CircularSp-Grek, CircularSp-Deva, var(--fallback-fonts, sans-serif));
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
</style>
  