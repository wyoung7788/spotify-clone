'use client';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Client = () => {
    const { data: session } = useSession();
    
    return(
        <div className="mt-10 items-center h-screen justify-center text-center text-green-400 font-bold text-2xl">
            Welcome to your Spotify Dashboard
        </div>
    )
}

export default Client;
