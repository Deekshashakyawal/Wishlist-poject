import { Link } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext.js";


export const Navbar=()=>{

    const navigate = useNavigate(); // useNavigate hook to navigate to different page
    const data = useContext(AppContext); // useContext hook to share data/context without props

    const signUserOut=async()=>{
        data.forceRender ((userState)=> !userState); // change user state
        navigate('/login');
    }
    const signUserIn=async()=>{
      navigate('/login');
  }
    return (
        <div>
        <header>
      <nav>

          <ul>
            <li><Link >MEN</Link></li>
            <li><Link >WOMEN</Link></li>
            <li><Link >KIDS</Link></li>
            <li><Link >HOME & LIVING</Link></li>
            <li><Link >ESSENTIALS</Link></li>
          </ul>
          <div class="user-actions">
            {!data.userState && (  // If no user is logged in then show Log In button
                <button onClick={signUserIn} class="btn btn-primary">Log In</button>
            )}
          {data.userState && (  // If user is logged in then show Log Out button
          <button class="btn" onClick={signUserOut}>Log Out</button>
          )}
          </div>
         </nav>
        </header>
        </div>
    );
}

export default Navbar;