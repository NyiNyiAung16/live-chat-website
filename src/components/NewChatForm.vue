<template>
  <form>
    <textarea placeholder="text message and hit enter to send" v-model="message" @keypress.enter="handleSubmit"></textarea>
  </form>
</template>

<script>
import { ref } from 'vue'
import getUser from '../composables/getUser'
import {timestamp} from '../firebase/config'
import useCollection from '../composables/useCollection'
export default {
    setup(){
        let message=ref("");
        let {user}=getUser();
        let {error,addDoc}=useCollection('messages');
        let  handleSubmit=async()=>{
            let chat={
                message:message.value,
                name:user.value.displayName,
                created_time:timestamp()
            }
           await addDoc(chat);
            message.value=""
        }


        return {message,handleSubmit}
    }
}
</script>

<style>
    form{
        margin-right: 10px;
    }
    textarea{
        width: 100%;
        box-sizing: border-box;
        border-radius: 3px;
        padding: 15px;
        margin: 6px;
        border: none;
        border-top: 2px solid rgb(239, 245, 246);
        font-family:'Times New Roman', Times, serif;
        font-weight: bold;
    }
</style>