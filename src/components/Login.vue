<template>
  <h2>Login</h2>
  <form @submit.prevent="SignUp">
    <input type="email" placeholder="email" v-model="email">
    <input type="password" placeholder="password" v-model="password">
    <button>Login</button>
  </form>
</template>

<script>
import { ref } from 'vue'
export default {
    setup(){
        let email=ref('');
        let password=ref('');
        let SignUp=()=>{
            console.log(email.value,password.value)
        }

        return {email,password,SignUp}
    }
}
</script>

<style>

</style>