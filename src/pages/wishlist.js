import { useEffect, useState } from "react";
import "./wishlist.css";
import { db } from "../config/firebase.ts";
import {doc, getDocs , getDoc,collection,updateDoc, arrayUnion , arrayRemove} from "firebase/firestore";
import { currentUserEmail } from "./login.js";


export const Wishlist=()=>{
  const [val,setVal]=useState([]); // State to store values of shared wishlist collection
  const value=collection(db,"wishlist");

  const [myVal,setMyVal]=useState([]); // State to store values of My wishlist collection
  const myWValue=collection(db,"MyWishlist");

  const [wishlist,setWishlist]=useState(true); // State to store whether the wishlist is personal or shared

  const [email,setEmail]=useState(""); // State to store new email address to share the wishlist

  const [AllowedUsers , setAllowedUsers] = useState([]); // State to store list of allowed users that can access the wishlist

  useEffect(()=>{
    const getData=async()=>{  // Get data from documents into state for Shared wishlist collection
      const dbVal=await getDocs(value)
      setVal(dbVal.docs.map(doc=>({...doc.data(),id:doc.id})))
    }
    getData()
  })
  useEffect(()=>{
    const getMyData=async()=>{  // Get data from documents into state for My wishlist collection
      const dbVal=await getDocs(myWValue)
      setMyVal(dbVal.docs.map(doc=>({...doc.data(),id:doc.id})))
    }
    getMyData()
  })
  useEffect(() => {
    const fetchAllowedUsers = async () => {     // To fetch allowed users from shared wishlist
      const docId = "ldb9RxD9Lybwqd40HQE2"; // documentID
      const docRef = doc(db, "wishlist", docId); // Reference to particular document
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) { //if document exists then set allowed users
          const data = docSnap.data();
          const userAllowed = data.allowedUsers || [];
          setAllowedUsers(userAllowed);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };
    fetchAllowedUsers();
  }, []);

  //change shared wishlist to my wishlist by toggling state
  const myWishlist=async()=>{
    setWishlist(!wishlist);
  }

  // show or hide the popup for shared with button
  const PopUP=()=>{
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }

  // show or hide the popup for share button
  const PopUpForm=()=>{
    var popup2 = document.getElementById("emailpopup");
    popup2.classList.toggle("show");
  }

  // To add new email to allowed users for shared wishlist
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email);
    addElementToArray("ldb9RxD9Lybwqd40HQE2",email);
    console.log(AllowedUsers);
    setEmail("");
  }

 // To add new user to allowedUsers array in a document in wishlist collection
const addElementToArray = async (docId, newElement) => {
  const userRef = doc(db, "wishlist", docId);
  try {
    await updateDoc(userRef, {
      allowedUsers: arrayUnion(newElement)
    });
    console.log("Element added successfully");
    AllowedUsers.push(newElement); // also adding the new user to AllowedUsers list
  } catch (error) {
    console.error("Error adding element: ", error);
  }
};

 // To delete an item from items array in any document in any collection
const deleteElementFromArray = async (collection,docId, item) => {
  const docRef = doc(db, collection , docId);
  try {
    await updateDoc(docRef, {
      item: arrayRemove(item) // Replace 'arrayFieldName' with your actual array field name
    });
    console.log("Item deleted successfully!");
  } catch (error) {
    console.error("Error deleting item: ", error);
  }
};

 // To delete a user from allowedUsers array in any document in any collection
const deleteFromAllowedUsers = async (collection,docId, userEmail) => {
  const docRef = doc(db, collection , docId);
  try {
    await updateDoc(docRef, {
      allowedUsers: arrayRemove(userEmail)
    });
    console.log("Element deleted successfully!");
  } catch (error) {
    console.error("Error deleting Element: ", error);
  }
};


    return (
        <div>

    <main class="main">
      <div class="container">
        {!wishlist &&
        <h1> Shared Wishlist</h1>}
        {wishlist &&
        <h1> My Wishlist</h1>}

        <div class="user-actions">
          {wishlist && <button class="btn" onClick={()=> myWishlist()}>Shared Wishlist</button>}
          {!wishlist && <button class="btn" onClick={()=> myWishlist()}>My Wishlist</button>}

          {!wishlist && <>
          <button class="btn popup" onDoubleClick={()=> PopUP()}>Shared With
            <span class="popuptext" id="myPopup">{ val.every(values => !values.allowedUsers.includes(currentUserEmail)) ?
              <div key="no-user"><h4>Not shared with anyone!!</h4></div>:(  //If not shared with anyone
              val.map(values =>
                values.allowedUsers.map(user =>
                  user !==  currentUserEmail ?   // Show allowed users other than current user
                  (<div><li class="sUser">{user}<button class="btn-remove"
                  onClick={()=>deleteFromAllowedUsers("wishlist",values.docId,user)}>
                  Remove</button></li></div>)
                  : null
                )
              ))
            }</span>
          </button>
          <button class="btn popup" onDoubleClick={()=> PopUpForm()}>Share
          <span class="popuptext2" id="emailpopup"><form onSubmit={handleSubmit}>
          <label>Enter friend's email :
          <input type="email" value={email}      // To add new user email to shared wishlist
          onChange={(e) => setEmail(e.target.value)} />
          </label>
          <button >Submit</button>
          </form>
          </span>
          </button>
          </>
          }
        </div>
        <br/>

        <ul id="wishlist-items">
          {!wishlist && val.map(values =>    // SHARED WISHLIST
            values.allowedUsers.map(user => user===currentUserEmail && // If user is allowedUser then
             <div>
            {values.item.map(items =>                                  //show items with delete button
                <li class="item">{items}
                <button class="dlt" id="del" onClick={()=> deleteElementFromArray("wishlist",values.docId,items)}>Delete</button></li>
                )}
          </div>) )}
          {wishlist && myVal.map(values =>      // MY WISHLIST
            values.user ===  currentUserEmail ?   // Only Current user logged in can view his personal wishlist
              <div>
              {
                values.item.map(items =>                       //show items with delete button
                  <li class="item">{items}
                  <button class="dlt" id="del" onClick={()=> deleteElementFromArray("MyWishlist",values.docId,items)}>Delete</button></li>
                  )
              }
              </div>
              : null // If no user logged in or you are not the same user as of that document then show empty wishlist
              )}
        </ul>
      </div>
    </main>

    <footer>
      <div class="container footer">
        <p>&copy; 2024. All rights reserved.</p>
      </div>
    </footer>
    </div>
    );
};

export default Wishlist;