import { useEffect, useState } from "react";
import { CLIENT_ID, CLIENT_SECRET } from "./auth_pkce";

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

export default function Main() {
    const [playlists, setPlaylists] = useState([]);
    const [newReleases, setNewReleases] = useState([]);
    const [loadingPlaylists, setLoadingPlaylists] = useState(true);
    const [loadingReleases, setLoadingReleases] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const token = await getClientFlow(CLIENT_ID, CLIENT_SECRET);
            const fetchedPlaylists = await getPlaylistInfo(token);
            const fetchedNewReleases = await getNewReleases(token);
            setPlaylists(fetchedPlaylists);
            setNewReleases(fetchedNewReleases);
            setLoadingPlaylists(false);
            setLoadingReleases(false);
        };
        fetchData();
    }, []);

    return (
        <div className="bg-zinc-900">
            <div className="flex p-5 text-xl font-semibold">Featured Playlists</div>
            <div className="flex p-5 justify-left">
                {loadingPlaylists ? (
                    <p>Loading playlists...</p>
                ) : (
                    <div className="flex space-x-4">
                        {playlists.map((playlist, index) => (
                            <div key={index} className="relative group">
                                <img className="hover:bg-slate-100"
                                    src={playlist.images[0]?.url} alt="Playlist cover" width="200" />
                                <a className="absolute inset-0 items-center justify-center invisible group-hover:visible bg-slate-200 bg-opacity-50 h-20"
                                    style={{ width: '200px' }}>
                                    <span className="text-gray-700 group-hover:text-gray-500 text-sm justify-center">
                                        <a className="text-white" href={playlist.external_urls.spotify}>{playlist.name}</a>
                                    </span>
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex p-5 text-xl font-semibold">New Releases</div>
            <div className="flex p-5 justify-left">
                {loadingReleases ? (
                    <p>Loading new releases...</p>
                ) : (
                    <div className="flex space-x-4">
                        {newReleases.map((album, index) => (
                            <div key={index} className="relative group">
                                <img className="hover:bg-slate-100"
                                    src={album.images[0]?.url} alt="Album cover" width="200" />
                                <a className="absolute inset-0 items-center justify-center invisible group-hover:visible bg-slate-200 bg-opacity-50 h-20"
                                    style={{ width: '200px' }}>
                                    <span className="text-gray-700 group-hover:text-gray-500 text-sm justify-center">
                                        <a className="text-white" href={album.external_urls.spotify}>{album.name}</a>
                                    </span>
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
