import { useState } from "react";
export default function Search(){
    const [inputValue, setValue] = useState(null);
    // this handle function should call multiple types
    // first let's call artist 
    // define a function that let's us pass in a type 

    const redirectSearch = () => {
        const url = '/search';
        window.location.href = url; // Redirect to search window
    };


    return(
        <div>
        <input className="bg-gray-400 rounded-md"type="text"
        id="inputId" placeholder="Search for..." 
        value={inputValue}
        //store this value into local storage? or save as a variable to be accessed in search page

        //check if we are already in the search page, just load elements, if not-> redirect
        onChange={(e)=> setValue(e.target.value)}/>

        
        <button onClick={redirectSearch}>
            Search 
        </button>
        
        </div>
        
    )
}