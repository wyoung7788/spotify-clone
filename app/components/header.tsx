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
          <header className={header ? "fixed w-[100%] text-[white] bg-[#121010]": "bg-[transparent]"}>
            <nav>
              <ul className="flex items-center justify-between">
              <li className="text-green-400 text-5xl mt-6 mx-20">
                <Image width={60}src={spotify_logo} alt="Logo"/>
              </li>
              <li>
                <Search/>
              </li>
              <li>
                <button className="rounded ml-5 mr-5 hover:bg-green-300 text-gray-200 py-2 px-4"
                  onClick={registerUser}>Sign up
                </button>
              </li>
              <li>
                <button className="rounded ml-5 mr-10 p-5 bg-white hover:bg-gray-50 text-black py-2 px-4 border"
                  onClick={loginWithSpotifyClick}>Log in 
                </button>
              </li>
              </ul>
            </nav>
          </header>
    </div>
    

    )
}