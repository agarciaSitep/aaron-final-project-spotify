<template>
  <div v-if="user !== undefined && user !== null && user">
    <p>User {{ user.email }} loged in</p>
  </div>
  <div v-else>
    <div class="auth-container">
      <div class="background">
        <div class="login-card">
          <div class="logo-container">
            <img class="spotify-icon-logo" src="../../icons/spotify-2-logo-png-transparent.png" />
            <img class="spotify-logo" src="../../icons/Spotify-Logo-png-RGB-White.png" />
          </div>

          <div class="action">
            <label class="sign-in" v-on:click="onChangeSing('in')">SIGN IN</label>
            <label class="sign-up" v-on:click="onChangeSing('up')">SIGN UP</label>
          </div>
          <input class="input input-btn" type="email" v-model="email" placeholder="Username" />
          <input class="input input-btn" type="password" v-model="pw" placeholder="Password" v-on:keyup.enter="onClickAction()"/>
          <button v-on:click="onClickAction()" class="action-btn">
            {{ action }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="errModal" class="error-container">
    <label class="error">Algo ha salido mal</label>
    <label class="error-msg">{{ errMsg }}</label>
    <button class="close-btn" v-on:click="onCloseErrModal()">Cerrar</button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../../stores/user'

const email = ref('');
const pw = ref('');
const action = ref('SIGN IN');
const underlineSignIn = ref('#2FBD5A');
const underlineSignUp = ref('transparent');
const errMsg = ref('');
const errModal = ref(false);
const errBackground = ref('100%');

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

onMounted(async () => {
  try {
    await userStore.fetchUser() // here we call fetch user
  } catch (e) {
    console.log(e)
  }
})

async function signUp() {
  console.log(email.value + '   ' + pw.value)
  let resp = await userStore.signUp(email.value, pw.value)
  if (resp !== 'ok') {
    console.log(resp);
    errModal.value = true;
    errMsg.value = resp;
    errBackground.value = '50%'
  } else {
    errModal.value = false;
    errMsg.value = '';
  }
}

async function onCloseErrModal() {
  errBackground.value = '100%';
  errModal.value = false;
  errMsg.value = '';
}

async function signIn() {
  console.log(email.value + '   ' + pw.value)
  let resp = await userStore.signIn(email.value, pw.value);
  if (resp !== 'ok') {
    console.log(resp);
    errModal.value = true;
    errMsg.value = resp;
    errBackground.value = '50%'
  } else {
    errModal.value = false;
    errMsg.value = '';
  }
}

async function onChangeSing(type) {
  if (type === 'in') {
    underlineSignIn.value = '#2FBD5A'
    underlineSignUp.value = 'transparent'
    action.value = 'SIGN IN'
  } else if (type === 'up') {
    underlineSignUp.value = '#2FBD5A'
    underlineSignIn.value = 'transparent'
    action.value = 'SIGN UP'
  }
}

async function onClickAction() {
  if (action.value === 'SIGN IN') await signIn()
  else await signUp()
}
</script>
<style scoped>
.auth-container {
  width: 100vw;
  height: 100vh;
  opacity: v-bind(errBackground);
}

.background {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-image: url('../../icons/imageedit_1_8251359050.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

.login-card {
  width: 500px;
  height: 550px;
  background-color: #353639;
  border-radius: 10px;
  box-shadow: 0px 0px 30px 5px rgb(32, 32, 32);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.action {
  margin-top: 20px;
  margin-bottom: 20px;
}

.action label {
  color: #fff;
  font-weight: 600;
  font-size: large;
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  cursor: pointer;
}

.action label:active {
  position: relative;
  top: 1px;
}

.action label:hover {
  border-bottom: 4px solid #2fbd5a77;
}

.sign-in {
  border-bottom: 4px solid v-bind(underlineSignIn);
}

.sign-up {
  border-bottom: 4px solid v-bind(underlineSignUp);
}

.spotify-icon-logo {
  width: 80px;
}

.spotify-logo {
  margin-left: 10px;
  width: 140px;
}

.input-btn {
  width: 65%;
  height: 50px;
  border-radius: 50px;
  padding-left: 30px;
  font-size: 17px;
  font-weight: 600;
  margin-top: 20px;
}

.action-btn {
  background-color: #2fbd5a;
  color: #fff;
  width: 65%;
  height: 50px;
  border-radius: 50px;
  border: 0px;
  box-shadow: 0px 4px 20px 5px rgb(41, 39, 39);
  margin-top: 40px;
}

.action-btn:active {
  position: relative;
  top: 1px;
}

.error-container {
  width: 550px;
  height: 250px;
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  right: calc(50vw - 275px);
  top: calc(50vh - 125px);
  z-index: 9;
  background-color: #fff;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0px 4px 15px 5px rgba(97, 93, 93, 0.5);
}

.error {
  font-size: 24px;
  font-weight: 800;
}

.error-msg {
  padding: 20px;
  padding-left: 30px;
  padding-right: 30px;
  text-align: center;
}

.close-btn {
  background-color: #2fbd5a;
  color: #fff;
  width: 65%;
  height: 50px;
  border-radius: 50px;
  border: 0px;
  box-shadow: 0px 4px 10px 5px rgb(206, 205, 205);
}

@media screen and (max-width: 464px) {
  .login-card {
    width: 300px;
    height: 500px;
  }

  .action label {
    font-size: medium;
  }

  .action label:hover {
    border-bottom: 3px solid #2fbd5a;
  }

  .sign-in {
    border-bottom: 3px solid v-bind(underlineSignIn);
  }

  .sign-up {
    border-bottom: 3px solid v-bind(underlineSignUp);
  }

  .spotify-icon-logo {
    width: 60px;
  }

  .spotify-logo {
    width: 120px;
  }

  .input-btn {
    height: 40px;
    font-size: 14px;
  }

  .action-btn {
    height: 40px;
  }

  .error-container {
    width: 300px;
    right: calc(50vw - 150px);
    top: calc(50vh - 125px);
  }

  .error {
    font-size: 18px;
    font-weight: 800;
  }

  .error-msg {
    padding: 20px;
    padding-left: 30px;
    padding-right: 30px;
    text-align: center;
    font-size: small;
  }

  .close-btn {
    background-color: #2fbd5a;
    color: #fff;
    width: 65%;
    height: 40px;
    border-radius: 50px;
    border: 0px;
    box-shadow: 0px 4px 10px 5px rgb(206, 205, 205);
  }
}
</style>
