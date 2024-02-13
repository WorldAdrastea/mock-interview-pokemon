import { useState, useEffect } from "react"
import './MainView.css'

export default function MainView() {
    const [pokemonName, setPokemonName] = useState("");
    const [pokemonData, setPokemonData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [recentSearches, setRecentSearches] = useState([]);
    const [shouldFetch, setShouldFetch] = useState(false);

    const backend = 'http://localhost:8080';

    //Function to fetch pokemon data from the backend
    const fetchData = async() => {
        try {
            setLoading(true);

            const caseSensitiveInput = pokemonName.toLowerCase();

            const response = await fetch(`${backend}/pokemon/${caseSensitiveInput}`)
            
            const data = await response.json();

            console.log('Pokemon Name:', pokemonName);
            console.log('Data:', data);

            setPokemonData(data);

            //Updates recent searches by adding the current search to front of array
            setRecentSearches((prevSearches) => [pokemonName, ...prevSearches]);
        } catch (error) {
            console.error('Error fetching data: ', error);
        } finally {
            setLoading(false);
        }
    };

    //Event handler for input change 
    const handleInputChange = (event) => {
        setPokemonName(event.target.value);
        setShouldFetch(false)
    };

    //Event handler for key press using Enter key
    const handleKeypress = (event) => {
        if (event.key === "Enter") {
            setShouldFetch(true);
        }
    }

    //useEffect hook to fetch data when component mounts
    useEffect(() => {
        if (shouldFetch) {
            fetchData(pokemonName)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pokemonName, shouldFetch])

    //Event handler for recent searches
    const handleRecentSearchClick = (name) => {
        setPokemonName(name);
        setShouldFetch(true);
    }

    return (
        <main className="main">
            <section className="red">
                <h1>
                    Pokemon Search Engine
                </h1>
            </section>
            <section className="main-wrapper">
                <div className="outer-container">
                    <div className="container">
                        <div className="search-bar-container">
                            <input
                                type="text"
                                placeholder="Enter Pokemon Name"
                                value={pokemonName}
                                onChange={handleInputChange}
                                onKeyDown={handleKeypress}
                                id="input"
                            />
                            <button onClick={fetchData} id="search-button"> Search </button>
                        </div>
                        {/* When fetching shows "Loading..." and disappears when fetch is complete with no errors */}
                        {loading && <p id="loading">Loading...</p>}
                        {/* When pokemon has been searched shows pokemon name, description and if it is legendary and if true, name will be gold. If no pokemon is found then it will be invalid */}
                        {pokemonData ? (
                            <div>
                                <h2 
                                    style={{ 
                                        color: pokemonData.is_legendary ? 'gold' : 'black',
                                        fontFamily: pokemonData.is_legendary ? 'Hollow' : 'Solid',
                                        }}
                                    data-testid="pokemon-name"
                                >
                                    {pokemonData.name ? (pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)) : "Invalid Pokemon Name"}</h2>
                                <p data-testid="description">Description: {pokemonData.description}</p>
                                <p data-testid="legendary-label">Is Legendary? {pokemonData.is_legendary ? "Yes" : "No"}</p>
                            </div>
                        ) : (
                            <p>Pokemon not found.</p>
                        )}
                    </div>
                    <div className="recent-container">
                        <div className="recent-searches-wrapper">
                            <p id="recent-text">Recent Searches:</p>
                            {/* If at least one search has been made, displays the recent search as a button and if clicked with perform the search */}
                            {recentSearches.length > 0 && (
                                <ul>
                                    {recentSearches.slice(0, 5).map((search, index) => (
                                        <li key={index}>
                                            <button data-testid="recent-search" onClick={() => handleRecentSearchClick(search)}>
                                                {search.charAt(0).toUpperCase() + search.slice(1)  || "Invalid Search"}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <section className="white">
                {pokemonData && (
                    <>
                        {/* If the pokemon is legendary, text will display at the bottom */}
                        {pokemonData.is_legendary ? (
                            <div className="isLegend">
                                This pokemon is legendary!
                            </div>
                        ) : (
                            <>
                            </>
                        )}
                    </>
                )}
            </section>
        </main>
    )
}