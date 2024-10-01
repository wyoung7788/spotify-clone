
import { useEffect } from "react"
import { ACCESS_TOKEN, TOKEN_TYPE, EXPIRES_IN, CLIENT_ID} from "./components/shared";

export const REDIRECT_URI = "http://localhost:3000/protected/client"
export const scopes = "playlist-read-private playlist-read-collaborative user-follow-modify"

const authorizeUser = () => {
    const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${scopes}&show_dialog=true`;
    window.location.href= url;
};

//initializing the variables
const extractTokenFromHash = () =>{
    const hash  = window.location.hash;
    const searchParams = new URLSearchParams(hash.substring(1));
    const accessToken = searchParams.get("access_token");
    const tokenType = searchParams.get("token_type");
    const expiresIn = searchParams.get("expires_in");
    console.log(accessToken)
    return{accessToken, tokenType, expiresIn};
    }

const setItemsInLocalStorage = ({ accessToken, tokenType, expiresIn})=>{
    const tokenData = extractTokenFromHash();
    if (tokenData){
    
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(TOKEN_TYPE, tokenType);
    localStorage.setItem(EXPIRES_IN, Date.now() + parseInt(tokenData.expiresIn) * 1000);
    }
}

export const logOut = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(EXPIRES_IN);
    localStorage.removeItem(TOKEN_TYPE);
    window.location.href = "http://localhost:3000/"
}

const handleSpotifyCallback = () => {
    const { accessToken, tokenType, expiresIn } = extractTokenFromHash();
if (accessToken){
    setItemsInLocalStorage({accessToken, tokenType, expiresIn})
    window.location.href= '/protected/dashboard';

};
}

export default function Login() {
    useEffect(() => {
        // Handle the Spotify callback if the component is loaded with a hash in the URL
        if (window.location.hash) {
            handleSpotifyCallback();
        }
    }, []);

    return (
        <div>
            <button onClick={authorizeUser}>Log in</button>
        </div>
    );
}