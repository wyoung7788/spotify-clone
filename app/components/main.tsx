'use client'
import { useEffect, useState } from "react";
import { CLIENT_ID, CLIENT_SECRET } from "./auth_pkce";
import spotify_play from "app/assets/spotify_play.png"
import Image from 'next/image'
import Popup from "./popup";

// Use client code flow to get token
export async function getClientFlow(client_id, client_secret) {
    const authString = btoa(`${client_id}:${client_secret}`);

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: 'POST',
        headers: { 
            'Authorization': `Basic ${authString}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'grant_type': 'client_credentials'
        }),
    });
    const data = await response.json();
    localStorage.setItem('client_token', data.access_token);
    return data.access_token;
}

// Function to get featured playlists
async function getPlaylistInfo(token) {
    const response = await fetch("https://api.spotify.com/v1/browse/featured-playlists?limit=5", {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return data.playlists.items;
}

// Function to get new releases
async function getNewReleases(token) {
    const response = await fetch("https://api.spotify.com/v1/browse/new-releases?limit=5", {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return data.albums.items;
}

// Function to get house playlists
async function getHousePlaylists(token) {
    const response = await fetch('https://api.spotify.com/v1/browse/categories/house/playlists?limit=5', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return data.playlists.items;
}

export default function Main() {
    const spotify_play = require("/app/assets/spotify_play.png");
    const [playlists, setPlaylists] = useState([]);
    const [newReleases, setNewReleases] = useState([]);
    const [housePlaylists, sethousePlaylists] = useState([]);
    const [loadingPlaylists, setLoadingPlaylists] = useState(true);
    const [loadingReleases, setLoadingReleases] = useState(true);
    const [loadingHouse, setLoadingHouse] = useState(true);
    const [popupContent, setPopupContent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = await getClientFlow(CLIENT_ID, CLIENT_SECRET);
            const fetchedPlaylists = await getPlaylistInfo(token);
            const fetchedNewReleases = await getNewReleases(token);
            const fetchedHousePlaylists = await getHousePlaylists(token);
            setPlaylists(fetchedPlaylists);
            setNewReleases(fetchedNewReleases);
            sethousePlaylists(fetchedHousePlaylists);
            setLoadingPlaylists(false);
            setLoadingReleases(false);
            setLoadingHouse(false);

        };
        fetchData();
    }, []);

    const handlePopup = (content) => {
        setPopupContent(content);
    };

    return (
        <div className="bg-zinc-900">
            <div className="flex-auto">

            <div className="flex p-5 text-xl font-semibold">Featured Playlists</div>
            <div className="text-right pr-4"> Show all </div>
            </div>
            <div className="flex p-5 justify-left">
                {loadingPlaylists ? (
                    <p></p>
                ) : (
                    <div className="flex space-x-4">
                        {playlists.map((playlist, index) => (
                            <div key={index} className="relative group">
                                
                                <img className="hover:bg-slate-100" width={60}
                                src={playlist.images[0]?.url} alt="Playlist cover" width="200" />
                                <a className="absolute inset-0 items-center justify-center invisible group-hover:visible bg-slate-200 bg-opacity-50 h-20"
                                    style={{ width: '200px' }}>
                                    <span className="text-gray-700 group-hover:justify-center">
                                    <button
                                    onClick={() => handlePopup(<iframe src={playlist.external_urls.spotify} width="300" height="380"></iframe>)}
                                    className="absolute inset-0 items-center justify-center invisible group-hover:visible bg-slate-200 bg-opacity-50 h-20"
                                    style={{ width: '200px' }}
                                ><Image width={60} src={spotify_play} alt="Logo"/></button>
                                        
                                    </span>
                                </a>
                                
                            </div>
                            
                        ))}
                    </div>
                )}
            </div>
            {popupContent && (
                <Popup trigger={popupContent} onClose={() => setPopupContent(null)}>
                    {popupContent}
                </Popup>
            )}

            <div className="flex p-5 text-xl font-semibold">New Releases</div>
            <div className="flex p-5 justify-left">
                {loadingReleases ? (
                    <p></p>
                ) : (
                    <div className="flex space-x-4">
                        {newReleases.map((album, index) => (
                            <div key={index} className="relative group">
                                <img className="hover:bg-slate-100"
                                    src={album.images[0]?.url} alt="Album cover" width="200" />
                                <a className="absolute inset-0 items-center justify-center invisible group-hover:visible bg-slate-200 bg-opacity-50 h-20"
                                    style={{ width: '200px' }}>
                                    <span className="text-gray-700 group-hover:text-gray-500 text-sm justify-center">
                                    <a className="text-white" href={album.external_urls.spotify}><Image width={60} src={spotify_play} alt="Logo"/></a>
                                    </span>
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div>
            <div className="flex p-5 text-xl font-semibold">House Playlists</div>
            <div className="flex p-5 justify-left">
                {loadingHouse ? (
                    <p></p>
                ) : (
                    <div className="flex space-x-4">
                        {housePlaylists.map((playlist, index) => (
                            <div key={index} className="relative group">
                                <img className="hover:bg-slate-100"
                                    src={playlist.images[0]?.url} alt="Playlist cover" width="200" />
                                <a className="absolute inset-0 items-center justify-center invisible group-hover:visible bg-slate-200 bg-opacity-50 h-20"
                                    style={{ width: '200px' }}>
                                    <span className="text-gray-700 group-hover:text-gray-500 text-sm justify-center">
                                    <a className="text-white" href={playlist.external_urls.spotify}><Image width={60} src={spotify_play} alt="Logo"/></a>
                                    </span>
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            </div>
        </div>
    );
}
