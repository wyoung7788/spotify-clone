'use client'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
async function getUserPlaylists() {
    const access_token = localStorage.getItem("access_token")
    const user_id = localStorage.getItem("user_id")
    const response = await fetch('https://api.spotify.com/v1/me/playlists?limit=8', {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + access_token },

    });
    if (!response.ok){
        console.error('failed to retrieve playlists')
        return;
    }
    const data =  await response.json();
    console.log('user playlists')
    return data
  }
/*
async function getUserPlaylists() {
    const access_token = localStorage.getItem("access_token")
    const user_id = localStorage.getItem("user_id")
    const response = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists?limit=5`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + access_token },

    });
    if (!response.ok){
        console.error('failed to retrieve playlists')
        return;
    }
    const data =  await response.json();
    console.log('user playlists')
    return data
  }

*/

  //map to show the image, and display name of playlist
export default function Playlists()  {
    const [playlistData, setPlaylistData] = useState([]);
    useEffect(()=> {
        const fetchPlaylists = async () => {
            const data = await getUserPlaylists();
            if (data && data.items){
                const playlistDatas = data.items.map(item=>({
                    name: item.name,
                    imageUrl: item.images[0].url
                }))
                setPlaylistData(playlistDatas);
                console.log(playlistDatas)
            }
        };
        fetchPlaylists();
    },[]);

    return(
        <div>
           <div className="justify-center flex space-x-10">
                <ul>
                    {playlistData.length > 0? (
                        playlistData.map((playlist, index)=>(
                            <li key={index}>
                                <h3>{playlist.name}</h3>
                                <img src={playlist.imageUrl} alt={playlist.name} width={100}/>
                            </li>
                        ))
                    ):(
                        <p>loading...</p>
                    
                    )}
                </ul>
            <div>
                show all 

            </div>

        </div>
        </div>
    );
}