import { Link } from "react-router-dom";
import {auth} from "../config/firebase.ts"
//import {useAuthState} from "react-firebase-hooks/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { doc } from "firebase/firestore";
import {db} from "../config/firebase.ts";
import { deleteDoc } from "firebase/firestore";

export const Navbar=()=>{
    const navigate = useNavigate();
    //var user = useAuthState(auth);
    const [userState, forceRender]=useState(false);
    const signUserOut=async()=>{
        await signOut(auth);
        forceRender ((userState)=> !userState);
        navigate('/login');
    }
    const signUserIn=async()=>{
      forceRender ((userState)=> userState);
      navigate('/login');
  }
    return (
        <div>
        <header>
      <nav>
        <div class="logo">
          <img
            src="data:image/jpeg;base64,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"
            alt="Myntra Logo"
          />
        </div>
          <ul>
            <li><Link >MEN</Link></li>
            <li><Link >WOMEN</Link></li>
            <li><Link >KIDS</Link></li>
            <li><Link >HOME & LIVING</Link></li>
            <li><Link >ESSENTIALS</Link></li>
          </ul>
          <div class="user-actions">
            {!userState && (
                <>
                <button onClick={signUserIn} class="btn btn-primary">Log In</button>
                </>
            )}
          {userState && (
          <button class="btn" onClick={signUserOut}>Log Out</button>
          )}
          </div>
         </nav>
        </header>
        </div>
    );
}

export default Navbar;
export async function DeleteFromFirestore(collectionname, id) {
  return await deleteDoc(doc(db, collectionname, id));
}