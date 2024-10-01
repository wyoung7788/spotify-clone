'use client';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import UserInfo from "@/app/components/userinfo";
import Link from "next/link";
import Playlists from "@/app/components/playlists";
const Client = () => {
    const { data: session } = useSession();
    
    return(
        <div className="items-center h-screen justify-center text-center text-green-400">
            <div className="mt-10 font-bold text-2xl">
            Welcome to your Spotify Dashboard
            </div>
            <div>
                <UserInfo/>
            </div>
            <div className="text-white">

            </div>
            <div className="justify-right">
            <Link href="/playlists">See all playlists</Link>
            </div>
        <div>Log out here</div>
        </div>

    )
}

export default Client;
