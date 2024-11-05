
import { registerUser } from "./header";

export default function MainFooter(){
    return( 
        <div className="footer z-10 w-full text-left flex justify-between
        items-center bg-gradient-to-r from-rose-500 to-blue-400">
            <div className="flex flex-col ml-5">
            <div className="text-sm font-semibold">Preview of Spotify</div>
            <div className="font-thin">
                Sign up to get unlimited songs and podcasts with occasional ads.
                No credit card needed.
            </div>
            </div>
            <button className="button font-bold text-black bg-white px-4 py-2 mr-5"
            onClick={registerUser}
            >Sign up free</button>
            
        </div>
    )
}