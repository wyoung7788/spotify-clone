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
                <div>
                <Image width={60}src={spotify_logo} alt="Logo"/>
                </div>
                Spotify 
                <div className="text-2xl text-white">
                  Music for Everyone
                </div>
              </li>
             
                <Search/>
 
                
                <div>
                <button className="rounded ml-5 mr-5 bg-green-400  hover:bg-green-300 text-white py-2 px-4 border"
                  onClick={registerUser}>Register
                </button>

                <button className="rounded ml-5 mr-10 bg-green-400 hover:bg-green-300 text-white py-2 px-4 border"
                  onClick={loginWithSpotifyClick}>Log in 
                </button>

                </div>
  
              </ul>
            </nav>
          </header>
    </div>
    

    )
}