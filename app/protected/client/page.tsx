'use client'
import { logoutClick } from "@/app/page";
import { fetchUserData } from "@/app/page";
import { useEffect, useState } from "react";

const Client = () => {
    const [userData, setUserData] = useState(null);

    useEffect(()=> {
        const getData = async () => {
            const data = await fetchUserData();
            setUserData(data);
        };
        getData();
    },[]);
        console.log(userData);


    return(
        
        
        
        <div className="items-center h-screen justify-center text-center text-green-400">
            <div className="mt-10 font-bold text-2xl">
            Welcome to your Spotify Dashboard
            </div>
            <div>
            </div>
            <div className="text-white">

            </div>
            <div className="justify-right">
            </div>
        <button onClick={logoutClick}>Log out</button>
        </div>

    )
}

export default Client;
