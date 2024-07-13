import { signInWithPopup } from "firebase/auth";
import { auth , provider } from "../config/firebase.ts";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { useContext } from "react";
import { AppContext } from "../AppContext.js";

export const Login=()=>{
  const navigate = useNavigate();
  const data=useContext(AppContext);
  const signInWithGoogle= async ()=>{
      const result=await signInWithPopup(auth, provider)
      data.forceRender((userState)=> !userState)
      console.log(result);
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
            <p>&copy; 2024 Myntra. All rights reserved.</p>
            </div>
            </footer>
        </div>
    );
};
