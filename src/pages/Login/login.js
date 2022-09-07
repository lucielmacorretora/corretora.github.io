import React from "react";
import {auth} from "../../service/firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import logout from "../../service/model"

const handleClickButtonLogin = () =>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((re)=>{
        if(re.user.uid == "AQ6y7NrXvMRQR1iOqmQZ4cGsNFk1"){
            window.location.replace("corretora.github.io/#/administrar");
        } else{
         logout();
         console.log("logout")
        }
    })
    .catch((err)=>{
        console.log(err);
    })
}

function Login(){
    return (
        <div>
            <button onClick={handleClickButtonLogin}>
                LOGIN GOOGLE
            </button>
        </div>
    );
}
export default Login;