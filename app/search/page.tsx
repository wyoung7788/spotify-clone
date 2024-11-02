'use client'
import { useState } from "react";
import { goHome } from "../register/page";

export default function Search(){
    //set the inputValue to storage if it exists
    const [inputValue, setInputValue] = useState(localStorage.getItem('search') || "");
    //priorities to load: 1) artist 2) song 3) playlist 4) album
    const [artists, setArtists] = useState([])
    const [songs, setSongs] = useState([])
    const [playlists, setPlaylists] = useState([])
    const [album, setAlbums] = useState([])
    
    const handleSearch = (type: string) => {
        if (inputValue) {
            getSearch(type)
            .then(data => {
              console.log(data);
              setArtists(data.artists.items)
              localStorage.setItem('search', inputValue);
            })
        }
    };
    //make sure that when search button is clicked again, it is updating
    //to local storage
    async function getSearch(type: string) {
        //use client flow token
        const token = localStorage.getItem('client_token')
        const input = localStorage.getItem('search') //retrieve user entry
        const endpoint = `https://api.spotify.com/v1/search?${input}=f&type=${type}`
        
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          })
        return await response.json();
      }
    
   return(
    <div>

    <div>
            <input
            type="text"
            value = {inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search for anything"
            />
            <button className="bg-green-400"
            onClick={() => handleSearch("artist")}> 
            Search
            </button>
            <button className="bg-green-400 rounded-xl p-2" onClick={goHome}>Home</button> 
        </div>

      
      
          
          <h2>Artists</h2>
          {artists.length > 0 ? (
                    <div className="flex space-x-4">
                        {artists.map((artist, index) => (
                            <div key={index} className="relative group">
                            <img className="hover:bg-slate-100"
                            src={artist.images[0].url} alt={artist.name} width="200"/>
                            <a className="absolute inset-0 flex items-center justify-center invisible group-hover:visible bg-slate-200 bg-opacity-50"
                            style={{ width: '200px'}}
                            >
                                <span className="text-gray-700 group-hover:text-gray-500 text-sm justify-center"
                                > {artist.name}
                                </span>
                            </a>
                            </div>
                        ))}
        </div>)
        :(
          <div>No results found</div>
        )}
        </div>
 
   );
   
}