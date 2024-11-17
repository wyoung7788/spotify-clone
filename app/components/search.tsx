import { useRouter } from "next/navigation.js";
import { useState, lazy, Suspense } from "react";


export default function Search() {
    const router = useRouter();
    const [inputValue, setInputValue] = useState("");

    // Lazy loading for tabs
    const HomeTab = lazy(() =>import('../page'));
    const SearchTab = lazy(() => import('../search/page'));

    // Function to handle search input
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    // Function to redirect after search
    const launchSearch = () => {
        if (inputValue) {
            localStorage.setItem("search", inputValue);
            router.push('/search');
        }
    };

    // Initializing the state for activeTab
    const [activeTab, setActiveTab] = useState("home");

    return (
        <div>
            <div className="searchBarContainer">
                <div className="searchBar">
                    <div></div>
                    <input
                        className="font-thin text-gray-200"
                        id="searchQueryInput"
                        type="text"
                        name="searchQueryInput"
                        placeholder="What do you want to play?"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <button
                        onClick={launchSearch}
                        id="searchQuerySubmit"
                        type="submit"
                        name="searchQuerySubmit"
                    >
                        Search
                    </button>
                </div>
            </div>

            <div>
                {/* Render the active tab */}
                <Suspense fallback={<div>Loading...</div>}>
                    {activeTab === "home" && <HomeTab />}
                    {activeTab === "search" && <SearchTab/>}
                </Suspense>
            </div>
        </div>
    );
}
