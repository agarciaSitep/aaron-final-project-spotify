<template>
  <div id="right-nav">
    <div class="cont">
      <div class="btns-cont">
        <button class="log-out-btn" v-on:click="signOut()">Sign Out</button>
      </div>
    </div>
    <div class="separator"></div>
    <div class="publicidad">
      <img src='../icons/newsong.png' alt="publicidad" class="publicidad-img" />
      <img src='../icons/djnvikk.png' alt="publicidad" class="publicidad-img" />
    </div>
  </div>
</template>
  
<script setup>
import { useUserStore } from '../stores/user';

const userStore = useUserStore();

async function signOut() {
  let resp = await userStore.signOut();
  if (resp !== 'ok') {
    console.log("Error: " + resp);
  } else {
    this.$forceUpdate();
  }
}
</script>
  
<style scoped>
#right-nav {
  position: fixed;
  width: 300px;
  right: 0;
  bottom: 100px;
  height: calc(100vh - 100px);
  background-color: #000;
}

.separator {
  margin: 0;
  margin-left: 10px;
  margin-right: 10px;
  border-bottom: 0.2px solid #535353;
}

.cont {
  display: grid;

  height: 80px;
  margin: 0;
  padding: 0;
}

.btns-cont {
  display: flex;
  align-items: center;
  justify-content: center;
}

.log-out-btn {
  background-color: #fff;
  border: 0;
  border-radius: 500px;
  font-family: var(--font-family, CircularSp, CircularSp-Arab, CircularSp-Hebr, CircularSp-Cyrl, CircularSp-Grek, CircularSp-Deva, var(--fallback-fonts, sans-serif));
  font-size: 1rem;
  text-overflow: ellipsis;
  font-weight: 400;
  color: inherit;
  color: #000;
  height: 40px;
  padding: 6px 48px;
  cursor: pointer
}

.log-out-btn:active {
  position: relative;
  top: 1px;
}

.publicidad {
  height: calc(100% - 80px);
  width: 100%;
  padding: 10px;
  margin-top: 30px;
  margin-bottom: -50px;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.publicidad-img {
  width: 280px;
  height: 49%;
}

@media screen and (max-width: 464px) {
  #right-nav {
    display: none;
  }
}
</style>
  