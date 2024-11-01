export default function Search(){
    //priorities to load: 1) artist 2) song 3) playlist 4) album

    const handleSearch = (type: string) => {
        if (inputValue) {
            getSearch(inputValue, "artist")
            .then(data => console.log(data))
        }
    };

    async function getSearch(inputValue: string, type: string) {
        //use client flow token
        const token = localStorage.getItem('client_token')
        const endpoint = `https://api.spotify.com/v1/search?${inputValue}=f&type=${type}`
      
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
        Hello

        <div>
            <button className="bg-green-400 rounded-xl p-2">Home</button> 
        </div>
    </div>
   )
}