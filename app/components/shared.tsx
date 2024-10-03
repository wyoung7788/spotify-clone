
import { REDIRECT_URI } from "../login";
export const ACCESS_TOKEN = "ACCESS_TOKEN";
export const REFRESH_TOKEN = "REFRESH_TOKEN";
export const TOKEN_TYPE = "TOKEN_TYPE";
export const EXPIRES_IN = "EXPIRES_IN"
export const CLIENT_ID = "6ddd58da55884e819b78f35fa173eafd"
export const scopes = "playlist-read-private playlist-read-collaborative user-follow-modify user-read-private user-read-email"

const params = new URLSearchParams(window.location.search);
const code = params.get("code");

export const logOut = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(EXPIRES_IN);
    localStorage.removeItem(TOKEN_TYPE);
    localStorage.removeItem(REFRESH_TOKEN);
    window.location.href = "http://localhost:3000/"
}

export async function startUp() {
    if (!code) {
        redirectToAuthCodeFlow(CLIENT_ID);
    } else {
        const accessToken = await getAccessToken(CLIENT_ID, code);
        console.log(accessToken)
    }
}

startUp()
/*
export async function getTokens(code: string, clientId: string, redirectUri: string){
    let codeVerifier = localStorage.getItem('verifier')
    const url = "https://accounts.spotify.com/api/token"
    const payload: RequestInit ={
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }, 
        body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            code: code, 
            redirect_uri: redirectUri,
            code_verifier: codeVerifier,
        }),
    }
        const body = await fetch(url, payload);

        const response = await body.json();
        console.log(response)
        localStorage.setItem('access_token', response.access_token)
        localStorage.setItem('refresh_token', response.refresh_token)
    
}
*/
    
export async function getAccessToken(clientId: string, code: string): Promise<string>  {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", REDIRECT_URI);
    params.append("code_verifier", verifier!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });
    console.log(result)
    const { access_token } = await result.json();
    return access_token;
}


export async function redirectToAuthCodeFlow(clientId: string) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);
    localStorage.setItem("verifier", verifier);
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", REDIRECT_URI);
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length: number) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier: string) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

