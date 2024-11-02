import { useState } from "react";

export default function Search(){
    const [inputValue, setValue] = useState("");


    //search function to store value in local storage and redirect
    const launchSearch = () => {
        if (inputValue) {
            localStorage.setItem("search", inputValue)
            window.location.href = "/search"
        }
    }
    return(
        <div>
        <input className="bg-gray-400 rounded-md w-45 h-8"type="text"
        id="inputId" placeholder="What do you want to play?" 
        value={inputValue}
        onChange={(e)=> setValue(e.target.value)}/>
        <button onClick={launchSearch} className="p-5">
            Search 
        </button>
        
        </div>
        
    )
}