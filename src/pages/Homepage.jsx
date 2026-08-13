import { useState, useEffect } from 'react';
import BannerImage from '../components/Banner/Banner';
import SongCard from '../components/SongCard/SongList';
import { fetchSpotifyAPI } from '../api/spotify';
import { songsFormatter } from '../utils/formatters';

export default function Homepage() {
    const [ tracks, setTracks ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const [ offset, setOffset ] = useState(0);

    const initialLimit = 10;
    const loadMoreLimit = 5;
    useEffect(() => {
        async function fetchSongs() {
            try {
                setLoading(true);

                const limit = offset === 0
                    ? initialLimit
                    : loadMoreLimit;
                const response = await fetchSpotifyAPI(`/search?q=popular&type=tracks&offset=${offset}&limit=${limit}&numberOfTopResults=5`);

                if (!response) {
                    throw new Error("No songs available");
                }

                const formatterdTracks = songsFormatter(response);

                if (offset === 0) {
                    setTracks(formatterdTracks);
                } else {
                    setTracks(prevTracks => {
                        const existingIds = new Set(prevTracks.map(track => track.id));
                        const filteredTracks = formatterdTracks.filter(track => !existingIds.has(track.id));

                        return [
                            ...prevTracks,
                            ...filteredTracks
                        ]
                    })
                }

                // const getArtistId = await fetchSpotifyAPI(`/search?q=chris%20brown`);
                // console.log(getArtistId);
            }
            catch (error) {
                setError(error.message);
            }
            finally {
                setLoading(false);
            }
        }

        fetchSongs();
    }, [offset]);

    const handleLoadMoreSongs = () => {
        setOffset(prevOffset => {
            if (prevOffset === 0) {
                return initialLimit;
            }

            return prevOffset + loadMoreLimit;
        });
    };

    return (
        <div className='py-10'>
            <BannerImage />

            <div className="text-white">
                <h2 className='text-4xl font-bold'>Top Songs</h2>

                {loading ? (
                    <div className="flex items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-400 border-t-transparent"></div>
                    </div>
                ) : error ? (
                    <h3>{error}</h3>
                ) : (
                    <div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4">
                            {tracks.map((song) => (
                                <SongCard song={song} key={song.id} />
                            ))}
                        </div>
                        {tracks.length < 20 && (
                            <div className="flex items-center justify-center">
                                <button
                                    className='cursor-pointer rounded-full py-2 px-6 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600'
                                    onClick={handleLoadMoreSongs}
                                >
                                    Load More
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
