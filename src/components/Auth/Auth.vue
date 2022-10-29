<template>
  <div v-if="user !== undefined && user !== null && user">
    <p>User {{ user.email }} loged in</p>
  </div>
  <div v-else>
    <div class="auth-container">
      <div class="background">
        <div class="login-card">
          <div class="logo-container">
            <img class="spotify-icon-logo" src='../../icons/spotify-2-logo-png-transparent.png' />
            <img class="spotify-logo" src='../../icons/Spotify-Logo-png-RGB-White.png' />
          </div>

          <div class="action">
            <label class="sign-in"  v-on:click="onChangeSing('in')">SIGN IN</label>
            <label class="sign-up"  v-on:click="onChangeSing('up')">SIGN UP</label>
          </div>
          <input class="input input-btn" type="email" v-model="email" placeholder="Username" />
          <input class="input input-btn" type="password" v-model="pw" placeholder="Password" />
          <button v-on:click="onClickAction()" class="action-btn">{{ action }}</button>
        </div>
      </div>
    </div>
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
const underlineSignUp = ref("transparent")

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

onMounted(async () => {
  try {
    await userStore.fetchUser() // here we call fetch user
  } catch (e) {
    console.log(e)
  }
})

function cssVars() {
  return {
    '--borderIn': underlineSignIn,
    '--borderUp': underlineSignUp
  }
}

async function signUp() {
  console.log(email.value + '   ' + pw.value);
  await userStore.signUp(email.value, pw.value);
}

async function signIn() {
  console.log(email.value + '   ' + pw.value);
  await userStore.signIn(email.value, pw.value);
}

async function onChangeSing(type) {
  if (type === 'in') {
    underlineSignIn.value = '#2FBD5A';
    underlineSignUp.value = 'transparent';
    action.value = 'SIGN IN';
  }
  else if (type === 'up') {
    underlineSignUp.value = '#2FBD5A';
    underlineSignIn.value = 'transparent';
    action.value = 'SIGN UP';
  }
}

async function onClickAction() {
  if (action === 'SIGN IN') await signIn();
  else await signUp();
}

</script>
<style scoped>
.auth-container {
  width: 100vw;
  height: 100vh;
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
  border-bottom: 4px solid #2FBD5A77;
}

.sign-in {
  border-bottom: 4px solid v-bind(underlineSignIn);
}

.sign-up {
  border-bottom: 4px solid v-bind(underlineSignUp);
}

.logo-container {}

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
  background-color: #2FBD5A;
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

@media screen and (max-width: 464px) {
  .login-card {
    width: 300px;
    height: 500px;
  }

  .action label {
    font-size: medium;
  }

  .action label:hover {
    border-bottom: 3px solid #2FBD5A;
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

}
</style>
