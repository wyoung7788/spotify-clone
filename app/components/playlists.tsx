//grab the first 5 playlists to display on landing
import axios from "axios";
const accessToken = localStorage.getItem("ACCESS_TOKEN");
const tokenType = localStorage.getItem('TOKEN_TYPE');
//const playlistsUrl= `https://api.spotify.com/v1/users/${userId}/playlists`;

export default async function Playlists(){

        return(
            <div>
                hi
            </div>
            /*
            <div>
                <h1> Spotify Playlists </h1>
                {playlists? (
                    <div>
                        <h2>{playlists.name}</h2>
                    </div>
                ): (
                    <p>Loading playlist...</p>
                )
                }

            
            </div>
            */
        )
    }

