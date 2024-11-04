'use client'
import { useEffect, useState } from "react"
import Image from "next/image";


export default function SidebarHeader(){
const spotify_library = require("/app/assets/spotify_library.png");
const spotify_add = require("/app/assets/spotify_add.png")

const [header, setHeader] = useState(false)

const scrollHeader = () => {
    if (window.scrollY >= 20){
        setHeader(true)
    }
    else{
        setHeader(false)
    }
}

useEffect(()=> {
    window.addEventListener('scroll', scrollHeader)

    return ()=> {
        window.addEventListener('scroll', scrollHeader)
    }
}, [])


return (
    <div>
        <header className={header ? "fixed h-50 text-[white] bg-[#121010] z-20 w-[25%]": "fixed  bg-[#121010] z-20 w-[25%]"}>
            <div className="flex flex-row items-center z-10">
        <Image width={60} className="ml-5" src={spotify_library} alt="Logo"/>
        <div className="text-semibold mb-3 text-bold text-zinc-300">Your Library</div>
        <Image width={60} className="ml-20" src={spotify_add} alt="Logo"/>
            </div>
        </header>

        
        

        

    </div>
)
}