<template>
  <div id="main-comp">
    <div class="cont">

      <div class="searcher-cont">
        <div class="form-floating">
          <input placeholder="¿Qué te apetece escuchar?" :value="cerca" class="cerca form-control" maxlength="800"
            autocorrect="off" autocapitalize="off" spellcheck="false" id="cercaInput" />
          <label for="cercaInput" class="cerca-placeholder">¿Qué te apetece escuchar?</label>
        </div>


        <label for="selectSearchType" class="label-select-type" >Quiero buscar</label>
        <select class="form-select tipus-cerca " id="selectSearchType" v-model="searchType" v-on:change="onChangeSelectSearchType($event)">
          <option value="artist">un artista</option>
          <option value="song">una canción</option>
        </select>
      </div>

    </div>
  </div>
</template>
  
<script setup>
 import { onMounted, ref } from 'vue';

 const searchType = ref('song');

function onChangeSelectSearchType(event) {
  searchType.value = event.target.value;
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

form-group > .form-control-input-lg
{
  background: url(images/example.gif) no-repeat scroll 0px 0px;
  padding-left:0px;
}

select {
  border: 0 solid transparent !important;
  box-shadow: none !important;
}

input {
  box-shadow: none !important;
}
</style>
  