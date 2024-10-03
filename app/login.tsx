
import { useEffect } from "react"
import { ACCESS_TOKEN, code, TOKEN_TYPE, EXPIRES_IN, CLIENT_ID, REFRESH_TOKEN, startUp, getAccessToken} from "./components/shared";
export const REDIRECT_URI = "http://localhost:3000/callback/"

const authorizeUser = () => {
    const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${scopes}&show_dialog=true`;
    window.location.href= url;
};
/*
//initializing the variables
const extractTokenFromHash = () =>{
    const hash  = window.location.hash;
    const searchParams = new URLSearchParams(hash.substring(1));
    const accessToken = searchParams.get("access_token");
    const tokenType = searchParams.get("token_type");
    const expiresIn = searchParams.get("expires_in");
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



//refresh tokens can be used for indefinite amount of time
const handleSpotifyCallback = () => {
    const { accessToken} = getAccessToken(CLIENT_ID, code)
if (accessToken){
    console.log('hi')
    //setItemsInLocalStorage({accessToken, tokenType, expiresIn})
    window.location.href= '/protected/dashboard';

};
}
*/


export default function Login() {
    /*
    useEffect(() => {
        getAccessToken(CLIENT_ID, code);
        // Handle the Spotify callback if the component is loaded with a hash in the URL
        //if (window.location.hash) {
            //handleSpotifyCallback();
        //}
    }, []);
*/
    startUp();
    return (
        <div>
        <div>
            <button onClick={authorizeUser}>Log in</button>

        </div>
        <div>
            
            </div>
            </div>
    );
}