import { endpoints } from "./endpoints";

/**
 * Generic function to fetch data from the Spotify API using a Bearer token.
 * @param {string} endpoint - The target Spotify API endpoint URL or path.
 * @param {string} token - Your valid Spotify access token.
 */
const fetchSpotifyAPI = async (endpoint) => {
    try {

        const url = `${endpoints.baseUrl}${endpoint}`
        const options = {
            method: "GET",
            headers: {
                'x-rapidapi-key': import.meta.env.VITE_SPOTIFY_KEY,
                'x-rapidapi-host': endpoints.host,
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(url, options);

        if (!response.ok) {
            const errorMessage = await response.text();

            throw new Error(
                `Spotify API error ${response.status}: ${errorMessage}`
            );
        }

        const jsonResponse = await response.json();

        return jsonResponse;

    } catch (error) {
        console.error("Spotify API error:", error);
        throw error;
    }
};

export {
    fetchSpotifyAPI
}
