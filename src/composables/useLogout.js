import { ref } from "vue";
import {auth} from "../firebase/config"
let error=ref(null);

let singout=async()=>{
    try{
       return await auth.signOut();
      }catch(err){
        error.value=err.message
      }
}

let useLogout=()=>{
    return{error,singout};
}


export default useLogout;
