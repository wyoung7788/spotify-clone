
const BASE_API_URL = "https://api.spotify.com/v1"
import { REDIRECT_URI } from "../login";
export const ACCESS_TOKEN = "ACCESS_TOKEN";
export const TOKEN_TYPE = "TOKEN_TYPE";
export const EXPIRES_IN = "EXPIRES_IN"
export const CLIENT_ID = "6ddd58da55884e819b78f35fa173eafd"

const code = undefined;

if (!code) {
    redirectToAuthCodeFlow(CLIENT_ID);
} else {
    getTokenandProfile(CLIENT_ID, code)

}

export async function getTokenandProfile(clientId: string, code:string){
    try {
        const accessToken = await getAccessToken(clientId, code);
        const profile = await fetchProfile(accessToken);
        return profile
    } catch (error) {
        console.error("Error fetching token or profile:", error);
    }
}


async function fetchProfile(token: string): Promise<any> {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });
    return await result.json();
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

export async function getAccessToken(clientId: string, code: string): Promise<string> {
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

    const { access_token } = await result.json();
    return access_token;
}

export async function getProfile(clientId: string, code: string) {
    const profile = await getTokenandProfile(clientId, code);
    return profile ? profile.display_name : null; // Only return the display name
}

/*
export const logOut = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(EXPIRES_IN);
    localStorage.removeItem(TOKEN_TYPE);
}
*/
