import {  useState } from "react";
import { auth,googleProvider } from "../config/firebase.config";
import {createUserWithEmailAndPassword,signInWithPopup, signOut} from 'firebase/auth';

export default function Auth(){

    const [Email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [img,setImg] = useState(null);


    async function sign(){
        try{
            await createUserWithEmailAndPassword(auth,Email,password);
        } catch(err){
            alert('Something Wrong Happend');
        }
    }

    async function signWithGoogle(){
        try{
            await signInWithPopup(auth,googleProvider);
            setImg(<img src={auth?.currentUser?.photoURL}/>)
        } catch(err){
            alert('Something Wrong Happend');
        }
    }

    async function signOutFromGoogle(){
        try{
            await signOut(auth);
        } catch(err){
            alert('Something Wrong Happend');
        }
    }

    return(
        <div>
            {img !== null && img}
            <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Your Email" />
            <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Your Password"/>
            <input onClick={sign} type="submit" value="Send" />

            <h3>or</h3>

            <button onClick={signWithGoogle}>sign with google</button>
            <button onClick={signOutFromGoogle}>sign out</button>


        </div>
    )
}