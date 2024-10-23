import spotify_logo from "/app/assets/spotify_logo.png"
import Image from 'next/image'
import { loginWithSpotifyClick } from "../page"
import React, { useEffect, useState } from "react";
import { Events } from 'react-scroll';
import { Router } from "express";

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
                Spotify 
                <div className="text-2xl text-white">
                  Music for Everyone
                </div>
              </li>
                <a href="/recommendation">Recommend me something</a>
                <li>About</li>
              <li>
                <button className="rounded bg-green-400 hover:bg-green-300 text-white font-bold py-2 px-4 border border-green-500"
                  onClick={loginWithSpotifyClick}>Log in 
                </button>
              </li>
              </ul>
            </nav>
          </header>
    </div>
    

    )
}