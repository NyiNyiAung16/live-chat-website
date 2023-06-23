<template>
  <div class="message" >
    <div class="message-content">
        <div class="message-body" v-for="messageContent in formattedMessages" :key="messageContent.id">
            <span class="time">{{messageContent.created_time}}</span>
            <span class="name">{{messageContent.name}}</span>
            <span>{{messageContent.message}}</span>
        </div>
    </div>
    <div class="scroll"></div>
  </div>
  <!-- ref="msgbox" -->
</template>

<script>
import { computed, onUpdated, ref } from 'vue'
import {db} from '../firebase/config'
import {formatDistanceToNow} from 'date-fns'
export default {
    setup(){
        let msgContents=ref([]);
        // let msgbox=ref(null);

        // onUpdated(()=>{
        //     msgbox.value.scrollTop=msgbox.value.scrollHeight
        // })




        let formattedMessages=computed(()=>{
            return msgContents.value.map((msgContent)=>{
                let formatTime=formatDistanceToNow(msgContent.created_time.toDate())
                return {...msgContent,created_time:formatTime}
            })
        })

        db.collection('messages').orderBy('created_time').onSnapshot((snap)=>{
            let results=[];
            snap.docs.forEach((doc)=>{
                let document={...doc.data(),id:doc.id};
               doc.data().created_time && results.push(document);
               msgContents.value=results;
            })
        })
        return {msgContents,formattedMessages,msgbox};
    }
}
</script>

<style>
    .message{
        background-color: rgb(211, 215, 218);
        display: grid;
        grid-template-columns: 3fr auto;
    }
    .message-content{
        padding: 20px;
        
    }
    .message-body{
        margin-bottom: 20px;
    }
    .message-content span{
        margin: 8px 0px;
        background-color: transparent;
    }
    .message-content .time{
        display: block;
        color: rgb(121, 121, 124);
    }
    .message-content .name{
        margin-right: 8px;
        font-weight: bold;
        font-size: 18px;
    }
    .scroll{
        overflow: hidden;
        overflow-y: scroll;
    }
</style>