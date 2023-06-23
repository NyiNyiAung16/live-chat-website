<template>
  <div class="message" >
    <div class="message-content" ref="msgbox">
        <div class="message-body" v-for="messageContent in formattedMessages" :key="messageContent.id">
            <span class="time">{{messageContent.created_time}}</span>
            <span class="name">{{messageContent.name}}</span>
            <span>{{messageContent.message}}</span>
        </div>
    </div>
    <aside class="scroll"></aside>
  </div>
</template>

<script>
import { computed, onUpdated, ref } from 'vue'
import {db} from '../firebase/config'
import {formatDistanceToNow} from 'date-fns'
export default {
    setup(){
        let msgContents=ref([]);
        let msgbox=ref(null);
        onUpdated(()=>{
            msgbox.value.scrollTop=msgbox.value.scrollHeight
        })

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
        height: 777px;
        overflow: auto;
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
    ::-webkit-scrollbar{
        width: 15px;

    }
    ::-webkit-scrollbar-track{
        background: rgb(125, 123, 123);
    }
    ::-webkit-scrollbar-thumb{
       background: linear-gradient(rgb(198, 196, 196),rgb(40, 223, 217));
        border-radius: 10px;
    }
</style>