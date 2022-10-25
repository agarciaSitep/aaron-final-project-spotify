<template>
  <div v-if="user !== undefined && user !== null && user">
    <p>User {{user.email}} loged in</p>
  </div>
  <div v-else>
    {{user}}
    <input class="input" type="email" v-model="email" placeholder="email" />
    <input class="input" type="password" v-model="pw" placeholder="password" />
    <button v-on:click="signUp()">Sign up</button>
    <button v-on:click="signIn()">Sign in</button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../../stores/user'

const email = ref('');
const pw = ref('');

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

onMounted(async () => {
  try {
    await userStore.fetchUser() // here we call fetch user
  } catch (e) {
    console.log(e)
  }
})

async function signUp () {
  console.log(email.value + '   ' + pw.value);
  await userStore.signUp(email.value, pw.value);
}

async function signIn() {
  console.log(email.value + '   ' + pw.value);
  await userStore.signIn(email.value, pw.value);
}
</script>
