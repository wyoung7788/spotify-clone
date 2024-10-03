
import { logoutClick } from "@/app/page";
import { useSession } from "next-auth/react";
const Client = () => {
   // const { data: session } = useSession();

    return(
        <div>
            hi
            <div>
            <button onClick={logoutClick}>Log out</button>
            </div>
        </div>
        /*
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
*/
    )
}

export default Client;
