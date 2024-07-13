import { useEffect, useState } from "react";
import "./wishlist.css";
import { collection } from "firebase/firestore";
import { db } from "../config/firebase.ts";
import {doc, getDocs ,deleteDoc} from "firebase/firestore";



export const Wishlist=()=>{
  const [val,setVal]=useState([])
  const value=collection(db,"wishlist")
  useEffect(()=>{
    const getData=async()=>{
      const dbVal=await getDocs(value)
      setVal(dbVal.docs.map(doc=>({...doc.data(),id:doc.id})))
    }
    getData()
  })
  const handleDelete=async(id)=>{
    const deleteVal= doc(db,"wishlist",id)
    await deleteDoc(deleteVal)
  }
    return (
        <div>

    <main class="main">
      <div class="container">
        <h1>My Wishlist</h1>
        <div class="user-actions">
          <button class="btn">Shared With</button>
        </div>
        <ul id="wishlist-items">
          {val.map(values => <div>
                <li class="item">{values.item}
                <button class="dlt" id="del" onClick={()=> handleDelete(values.id)}>Delete</button></li>
          </div>)}
        </ul>
      </div>
    </main>

    <footer>
      <div class="container footer">
        <p>&copy; 2024 Myntra. All rights reserved.</p>
      </div>
    </footer>
    </div>
    );
};



export default Wishlist;