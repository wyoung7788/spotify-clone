import { useEffect, useState } from "react";
import { CLIENT_ID, CLIENT_SECRET } from "./auth_pkce";
//get top 100 USA 
//get exitos espana 37i9dQZF1DXaxEKcoCdWHD

//use client code flow to get playlist info without logging in 
async function getClientFlow(client_id: string, client_secret: string){
    const authString = btoa(`${client_id}:${client_secret}`);

    const response = await fetch("https://accounts.spotify.com/api/token",{
            method: 'POST',
            headers: { 
                'Authorization': `Basic ${authString}`,
                'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'grant_type': 'client_credentials'
        }),
    });
    const data = await response.json()
    return data.access_token
}

    async function getPlaylistInfo(token: string, playlist_id: string) {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json()
        return data
    }

export default function Main(){
    //exitos espana, beast mode, arctice monkeys, mint
    const playlist_list = ["37i9dQZF1DXaxEKcoCdWHD", "37i9dQZF1DX76Wlfdnj7AP",
        "37i9dQZF1DZ06evO4BaAkp", "37i9dQZF1DX4dyzvuaRJ0n"];
    const [playlists, setPlaylists] = useState([]);
    useEffect(()=> {
        const fetchToken = async () => {
            const token = await getClientFlow(CLIENT_ID, CLIENT_SECRET);
            const playlistPromises = playlist_list.map(playlistId=> getPlaylistInfo(token, playlistId));
            
            const playlistArray = await Promise.all(playlistPromises); // 'Exitos España'
            
            setPlaylists(playlistArray);

        };
        fetchToken();
    }, []);
    return(
        <div>
            <h2>
                Pick up where you left off.. or discover something new
            </h2>
                {playlists ? (
                    <div className="flex space-x-4">
                        {playlists.map((playlist, index) => (
                            <div key={index} className="relative">
                            <img className="hover:bg-slate-100"
                            src={playlist.images[0].url} alt="image" width="200"/>
                            
                            <a className="absolute inset-0 flex items-center justify-center invisible group-hover:visible bg-slate-200 bg-opacity-50"
                            style={{ width: '200px'}}
                            >
                                <span className="text-gray-700 group-hover:text-gray-500">
                                    Call
                                </span>
                            </a>
                            </div>
                        ))}
                    </div>
                ): (
                    <p> Loading playlist...</p>
                )}
        </div>
    );
}