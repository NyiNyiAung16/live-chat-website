<template>
  <div class="welcome container">
    <div v-if="LoginForm">
      <Login @enterChatroom="enterChatroom"></Login>
      <p>Not a member?<span @click="LoginForm=!LoginForm">Create Account?</span></p>
    </div>
    <div v-else>
      <SignUp  @enterChatroom="enterChatroom"></SignUp>
      <p>Already have an account?<span  @click="LoginForm=!LoginForm">Login here?</span></p>
    </div>
    
  </div>
</template>

<script>
import { ref } from 'vue'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import {useRouter} from 'vue-router'
export default {
  components: {
    Login, SignUp },
    setup(){
      let LoginForm=ref(true);
      let router=useRouter();
      let enterChatroom=()=>{
          router.push({name:'Chatroom'})
      }

      return {LoginForm,enterChatroom};
    }

}
</script>

<style>
    .welcome{
        text-align: center;
        padding: 10px 0;
    }
    .welcome form{
      max-width: 300px;
      margin: 0 auto;
    }
    .welcome form input{
      padding: 10px;
      border: none;
      background: rgb(226, 226, 226);
      margin: 10px 0px;
      border-radius: 10px;
      width: 100%;
      box-sizing: border-box;
      border: 1px solid rgb(178, 178, 178);
    }
    .welcome button{
      margin: 16px auto;
    }
    .welcome span{
      font-weight: bold;
      text-decoration: underline;
      font-size: 17px;
      cursor: pointer;
      margin-left: 6px;
    }
    .welcome h2{
      color: aquamarine;
    }
</style>