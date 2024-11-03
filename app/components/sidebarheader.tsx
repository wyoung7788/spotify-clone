'use client'
import { useEffect, useState } from "react"

export default function sidebarHeader(){

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
        Your Library 
    </div>
)
}