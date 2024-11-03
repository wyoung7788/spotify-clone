import spotify_logo from "/app/assets/spotify_logo.png"
import Image from 'next/image'
import { loginWithSpotifyClick } from "../page"
import React, { useEffect, useState } from "react";
import { Events } from 'react-scroll';
import Search from "./search";

const registerUser = () => {
    const url = '/register'
    window.location.href = url; // Redirect to register page
};


export default function Header(){
    const [isSticky, setIsSticky] = useState(false);
      useEffect(()=> {
        Events.scrollEvent.register('begin', ()=> setIsSticky(true));
        Events.scrollEvent.register('end', ()=> setIsSticky(false));

        return ()=>{
          Events.scrollEvent.remove('begin');
          Events.scrollEvent.remove('end');
        };
    }, []);

    return(
        <div>
          <header className={isSticky? 'sticky-header': ''}>
            <nav>
              <ul className="flex items-center justify-between">
              
              <li className="text-green-400 text-5xl mt-6 mx-20">

                <Image width={60}src={spotify_logo} alt="Logo"/>

              </li>
             
                <Search/>
 
                
                <div>
                <button className="rounded ml-5 mr-5 hover:bg-green-300 text-gray-200 py-2 px-4"
                  onClick={registerUser}>Sign up
                </button>

                <button className="rounded ml-5 mr-10 p-5 bg-white hover:bg-gray-50 text-black py-2 px-4 border"
                  onClick={loginWithSpotifyClick}>Log in 
                </button>

                </div>
  
              </ul>
            </nav>
          </header>
    </div>
    

    )
}