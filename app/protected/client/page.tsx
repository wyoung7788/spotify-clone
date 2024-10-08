'use client'
import { logoutClick } from "@/app/page";
import { fetchUserData } from "@/app/page";
import { useEffect, useState } from "react";
import  Playlists  from "@/app/components/playlists";

const Client = () => {
    const [userData, setUserData] = useState(null);
    useEffect(()=> {
        const getData = async () => {
            const data = await fetchUserData();
            setUserData(data);
        };
        getData();
    },[]);
    // need to fetch after data loads 
    useEffect(()=> {
        if (userData){
            try{
                const displayName = userData.display_name;
                const user_id = userData.id;
                localStorage.setItem("display_name", displayName)
                localStorage.setItem("user_id", user_id)
            } catch(error) {
                console.error('error')
            }
        }
    })
        

    return(
        <div className="items-center h-screen justify-center text-center text-green-400">
            <div className="mt-10 font-bold text-2xl">
            Welcome, {localStorage.getItem('display_name')}
            
            </div>
            <div>
            </div>
            <div className="text-white">
                <Playlists/>
            </div>
            <div className="justify-right">
            </div>
        <button onClick={logoutClick}>Log out</button>
        </div>

    )
}

export default Client;
