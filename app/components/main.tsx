import { useEffect, useState } from "react";

//get top 100 USA
//get exitos espana 37i9dQZF1DXaxEKcoCdWHD

//use client code flow to get playlist info without logging in 

function callPlaylists(string playlist_id){
    try{
        const response = await fetch("https://api.spotify.com/v1/playlists/{playlist_id}/images",{
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + currentToken.access_token 

        }
        method: 'GET',
        
        },
    }
}


export default function Main(){
    return(
        <div>
            <h2>
                Pick up where you left off.. or discover something new
            </h2>
        </div>
    )
}