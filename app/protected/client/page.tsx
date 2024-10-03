'use client';
import { useSession } from "next-auth/react";
import UserInfo from "@/app/components/userinfo";
import Link from "next/link";
import { startUp } from "@/app/components/shared";
import { logOut } from "@/app/components/shared";

const Client = () => {
    const { data: session } = useSession();
    startUp()
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
        <button onClick={logOut}>Log out</button>
        </div>

    )
}

export default Client;
