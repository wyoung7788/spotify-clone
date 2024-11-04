'use client'
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
    const [header, setHeader] = useState(false);

    const scrollHeader = () =>{
      if(window.scrollY >= 20){
        setHeader(true)
      }else{
        setHeader(false)
      }
    }

    useEffect(()=> {
      window.addEventListener('scroll', scrollHeader)

      return ()=>{
        window.addEventListener('scroll', scrollHeader)
      }
    }, [])


    return(
        <div>
          <header className={header ? "fixed w-[100%] text-[white] bg-[#121010]": "bg-[#121010]"}>
            <nav>
              <ul className="flex items-center justify-between">
              <li className="text-green-400 text-5xl mt-3 ml-7">
                <Image width={40}src={spotify_logo} alt="Logo"/>
              </li>
              <li>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height={40} viewBox="0 0 48 48" style={{ fill: "#40C057" }}
                ><path d="M39.5,43h-9c-1.381,0-2.5-1.119-2.5-2.5v-9c0-1.105-0.895-2-2-2h-4c-1.105,0-2,0.895-2,2v9c0,1.381-1.119,2.5-2.5,2.5h-9	C7.119,43,6,41.881,6,40.5V21.413c0-2.299,1.054-4.471,2.859-5.893L23.071,4.321c0.545-0.428,1.313-0.428,1.857,0L39.142,15.52	C40.947,16.942,42,19.113,42,21.411V40.5C42,41.881,40.881,43,39.5,43z"></path>
              </svg>
              </li>
              <li>
                <Search/>
              </li>
              <li>
                <button className="font-semibold" 
                  onClick={registerUser}>Sign up
                </button>
              </li>
              <li>
                <button className="button font-semibold text-black h-30"
                  onClick={loginWithSpotifyClick}>Log in 
                </button>
              </li>
              </ul>
            </nav>
          </header>
    </div>
    

    )
}