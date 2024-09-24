'use client'
import { useEffect } from "react"

const CLIENT_ID = "6ddd58da55884e819b78f35fa173eafd"
const REDIRECT_URI = "http://localhost:3000/protected/client"
const scopes = "playlist-read-private user-follow-modify"

const ACCESS_TOKEN_KEY = "ACCESS_TOKEN";
const TOKEN_TYPE_KEY = "TOKEN_TYPE";
const EXPIRES_IN_KEY = "EXPIRES_IN"


const authorizeUser = () => {
    const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${scopes}&show_dialog=true`;
    window.open(url, "login");
};

const setItemsInLocalStorage = ({ accessToken, tokenType, expiresIn})=>{
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(TOKEN_TYPE_KEY, tokenType);
    localStorage.setItem(EXPIRES_IN_KEY, (Date.now() + expiresIn * 1000));
}

const extractTokenFromHash = () =>{
const { hash } = window.location;
const searchParams = new URLSearchParams(hash);
const accessToken = searchParams.get("#access_token");
const tokenType = searchParams.get("token_type");
const expiresIn = searchParams.get("expires_in");

return{accessToken, tokenType, expiresIn};
}

const handleSpotifyCallback = () => {
    const { accessToken, tokenType, expiresIn } = extractTokenFromHash();
if (accessToken){
    
    setItemsInLocalStorage({accessToken, tokenType, expiresIn})
    window.close();
} else{
    window.close();
};
}

export default function Login() {
    useEffect(() => {
        // Handle the Spotify callback if the component is loaded with a hash in the URL
        if (typeof window !== "undefined" && window.location.hash) {
            handleSpotifyCallback();
        }
    }, []);

    return (
        <div>
            <button onClick={authorizeUser}>Log in</button>
        </div>
    );
}