<template>
    <nav v-if="user">
        <div>
            <p>Hi {{user.displayName}}</p>
            <p class="email">logged in as {{user.email}}</p>
        </div>
        <button @click="logout">Logout</button>
    </nav>
</template>

<script>
import { ref } from 'vue'
import useLogout from '../composables/useLogout'
import getUser from '../composables/getUser'
export default {
    setup(){
        let{error,singout}=useLogout();
        let {user}=getUser();
        
        let logout=async()=>{
           await singout();
        }
        
        return {logout,error,user};
    }
}
</script>

<style scoped>
    nav{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px; 
    }
    .email{
        color: rgb(163, 155, 155);
    }
    div p{
        font-family:'Times New Roman', Times, serif;
        font-weight: bold;
    }
</style>