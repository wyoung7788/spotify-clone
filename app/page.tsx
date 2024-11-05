'use client'
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
export const REDIRECT_URI = "http://localhost:3000/protected/client"
export const ACCESS_TOKEN = "ACCESS_TOKEN";
export const REFRESH_TOKEN = "REFRESH_TOKEN";
export const TOKEN_TYPE = "TOKEN_TYPE";
export const EXPIRES_IN = "EXPIRES_IN"
export const CLIENT_ID = "6ddd58da55884e819b78f35fa173eafd"
export const CLIENT_SECRET = "9505018581594a77958a54aad18a6cc7"
export const scopes = "playlist-read-private playlist-read-collaborative user-follow-modify user-read-private user-read-email"
import Header from "./components/header";
import Main from "./components/main";
import NavBar from "./components/navbar";
import SideBar from "./components/sidebar";
import MainFooter from "./components/mainfooter";



const authorizationEndpoint = "https://accounts.spotify.com/authorize";
const tokenEndpoint = "https://accounts.spotify.com/api/token";
const scope = 'user-read-private user-read-email';

// Data structure that manages the current active token, caching it in localStorage
const currentToken = {
  get access_token() { return localStorage.getItem('access_token') || null; },
  get refresh_token() { return localStorage.getItem('refresh_token') || null; },
  get expires_in() { return localStorage.getItem('refresh_in') || null },
  get expires() { return localStorage.getItem('expires') || null },

  save: function (response) {
    const { access_token, refresh_token, expires_in } = response;
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    localStorage.setItem('expires_in', expires_in);

    const now = new Date();
    const expiry = new Date(now.getTime() + (expires_in * 1000));
    localStorage.setItem('expires', expiry);
  }
};

// On page load, try to fetch auth code from current browser search URL
const args = new URLSearchParams(window.location.search);
const code = args.get('code');

// If we find a code, we're in a callback, do a token exchange
if (code) {
  const token = await getToken(code);
  currentToken.save(token);

  // Remove code from URL so we can refresh correctly.
  const url = new URL(window.location.href);
  url.searchParams.delete("code");

  const updatedUrl = url.search ? url.href : url.href.replace('?', '');
  window.history.replaceState({}, document.title, updatedUrl);
}

export async function fetchUserData(){{
  const accessToken = localStorage.getItem('access_token')
  if (accessToken){
    const userData = await getUserData();
    return userData
  }
}}

// If we have a token, we're logged in, so fetch user data and render logged in template

if (currentToken.access_token) {
  const userData = await getUserData();
}
  

async function redirectToSpotifyAuthorize() {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomValues = crypto.getRandomValues(new Uint8Array(64));
  const randomString = randomValues.reduce((acc, x) => acc + possible[x % possible.length], "");

  const code_verifier = randomString;
  const data = new TextEncoder().encode(code_verifier);
  const hashed = await crypto.subtle.digest('SHA-256', data);

  const code_challenge_base64 = btoa(String.fromCharCode(...new Uint8Array(hashed)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  window.localStorage.setItem('code_verifier', code_verifier);

  const authUrl = new URL(authorizationEndpoint)
  const params = {
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: scope,
    code_challenge_method: 'S256',
    code_challenge: code_challenge_base64,
    redirect_uri: REDIRECT_URI,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString(); // Redirect the user to the authorization server for login
}

// Spotify API Calls
async function getToken(code) {
  const code_verifier = localStorage.getItem('code_verifier');

  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI,
      code_verifier: code_verifier,
    }),
  });

  return await response.json();
}

async function refreshToken() {
  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: 'refresh_token',
      refresh_token: currentToken.refresh_token
    }),
  });

  return await response.json();
}

async function getUserData() {
  const response = await fetch("https://api.spotify.com/v1/me", {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + currentToken.access_token },
  });

  return await response.json();
}




// Click handlers
export async function loginWithSpotifyClick() {
  await redirectToSpotifyAuthorize();
}

export async function logoutClick() {
  localStorage.clear();
  window.location.href = 'http://localhost:3000/';
}

async function refreshTokenClick() {
  const token = await refreshToken();
  currentToken.save(token);
}


export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  if (session){
    router.push('/protected/client')
  }
  return (

    <div>
    <div className="fixed top-0 left-0 w-full z-20">
        <Header/>
    </div>
    <div className="grid grid-cols-4 pt-[4rem] h-screen">
        <div className="col-span-1">
          <SideBar/>
        </div>
        <div className="border-radius:25px col-span-3 p-4">
              <Main/>
        </div>
      </div>
      <div className="w-[100%] flex"><MainFooter/></div>
    
    </div>
    
    
  );
}
