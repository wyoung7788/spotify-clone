import { useEffect, useState } from "react";
import { CLIENT_ID, CLIENT_SECRET } from "./auth_pkce";
//get top 100 USA
//get exitos espana 37i9dQZF1DXaxEKcoCdWHD

//use client code flow to get playlist info without logging in 

async function getClientFlow(client_id, client_secret){
    const authString = btoa(`${client_id}:${client_secret}`);

    const response = await fetch("https://api.spotify.com/v1/playlists/{playlist_id}/images",{
            method: 'POST',
            headers: { 
                'Authorization': `Basic ${authString}`,
                'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'grant_type': 'client_credentials'
        })
    });
}

    async function getPlaylistInfo(token, playlist_id) {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
    }

export default function Main(){
    const [playlist, setPlaylist] = useState(null);
    useEffect(()=> {
        const fetchToken = async () => {
            const token = await getClientFlow(CLIENT_ID, CLIENT_SECRET);
            const playlistData = await getPlaylistInfo(token, "37i9dQZF1DXaxEKcoCdWHD"); // 'Exitos España'
            setPlaylist(playlistData);
        };
        fetchToken();
    }, []);
    return(
        <div>
            <h2>
                Pick up where you left off.. or discover something new
            </h2>
                {playlist ? (
                    <div>
                        <h3>
                            {playlist.name}
                        </h3>
                        <img src={playlist.images[0].url} alt="playlist.name" width="300"/>
                    </div>
                ): (
                    <p> Loading playlist...</p>
                )}
        </div>
    );
}