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
            <div className="">
  <div className="searchBar">
    <div></div>
    <input className="font-thin text-gray-200 "id="searchQueryInput" type="text" name="searchQueryInput" placeholder="What do you want to play?" value={inputValue}
    onChange={(e)=> setValue(e.target.value)} 
    />
    
    <button onClick ={launchSearch} id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
    </button>
  </div>
</div>
        </div>
        
    )
}