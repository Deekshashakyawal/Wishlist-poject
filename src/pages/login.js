import { signInWithPopup, getAuth } from "firebase/auth";
import { provider } from "../config/firebase.ts";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../AppContext.js";
import "./login.css";

export let currentUserEmail =""; // To store the current user email
const auth=getAuth();

export const Login=()=>{
    const navigate = useNavigate();
    const data=useContext(AppContext);
    const signInWithGoogle= async ()=>{
        const result=await signInWithPopup(auth, provider) // sign in with google by popup
        data.forceRender((userState)=> !userState)  // change user state
        currentUserEmail = result.user.email;
        navigate("/wishlist");
    };
    return (
        <div>
            <br/>
            <h2>Sign In With Google To Continue</h2>
            <br/>
            <button className="signG" onClick={signInWithGoogle}>Sign In With Google</button>
            <footer>
            <div class="container footer">
            <p>&copy; 2024. All rights reserved.</p>
            </div>
            </footer>
        </div>
    );
};

