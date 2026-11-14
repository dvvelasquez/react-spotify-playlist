import { useState, useEffect } from 'react';
import BannerImage from '../components/Banner/Banner';
import SongCard from '../components/SongCard/SongList';
import { fetchSpotifyAPI } from '../api/spotify';
import { songsFormatter } from '../utils/formatters';
import { mockSongs } from '../data/mockSongs';
import Notification from '../components/Notification/Notification';
import useNotification from '../hooks/useNotification';
import Spinner from '../components/Spinner/Spinner';

export default function Homepage() {
    const [ tracks, setTracks ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ loadingMore, setLoadingMore ] = useState(false);
    const [ hasMore, setHasMore ] = useState(true);
    const [ error, setError ] = useState(null);
    const [ offset, setOffset ] = useState(0);
    const {
        notification,
        showNotification,
        showNotificationMessage,
    } = useNotification();

    const initialLimit = 10;
    const loadMoreLimit = 5;
    // useEffect(() => {
    //     async function fetchSongs() {
    //         try {
    //             if (offset === 0) {
    //                 setLoading(true);
    //             } else {
    //                 setLoadingMore(true);
    //             }

    //             const limit = offset === 0
    //                 ? initialLimit
    //                 : loadMoreLimit;
    //             const response = await fetchSpotifyAPI(`/search?q=popular&type=tracks&offset=${offset}&limit=${limit}&numberOfTopResults=5`);

    //             if (!response) {
    //                 throw new Error("No songs available");
    //             }

    //             const formatterdTracks = songsFormatter(response);

    //             if (offset === 0) {
    //                 setTracks(formatterdTracks);
    //             } else {
    //                 setTracks(prevTracks => {
    //                     const existingIds = new Set(prevTracks.map(track => track.id));
    //                     const filteredTracks = formatterdTracks.filter(
    //                         track => !existingIds.has(track.id)
    //                     );

    //                     return [
    //                         ...prevTracks,
    //                         ...filteredTracks
    //                     ]
    //                 })
    //             }

    //             setHasMore(formatterdTracks.length === limit);

    //             // const getArtistId = await fetchSpotifyAPI(`/search?q=chris%20brown`);
    //             // console.log(getArtistId);
    //         }
    //         catch (error) {
    //             setError(error.message);
    //         }
    //         finally {
    //             if (offset === 0) {
    //                 setLoading(false);
    //             } else {
    //                 setLoadingMore(false);
    //             }
    //         }
    //     }

    //     fetchSongs();
    // }, [offset]);

    useEffect(() => {
        async function fetchSongs() {
            try {
                setLoading(true);
                setTracks(mockSongs);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchSongs();
    }, []);

    const handleLoadMoreSongs = () => {
        setOffset(prevOffset => {
            if (prevOffset === 0) {
                return initialLimit;
            }

            return prevOffset + loadMoreLimit;
        });
    };

    const handleTrackSaved = (track, isSaved) => {
        showNotificationMessage(track, isSaved);
    };

    return (
        <div className="relative">
            {notification?.type === "success" && (
                <Notification
                    notification={notification}
                    showNotification={showNotification}
                />
            )}

            <BannerImage />

            <div className="text-white max-w-7xl mx-auto px-4 mb-12.5">
                <h2 className="text-4xl font-bold">Top Tracks</h2>

                {loading ? (
                    <Spinner />
                ) : error ? (
                    <h3>{error}</h3>
                ) : (
                    <div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4">
                            {tracks.map((track) => (
                                <SongCard
                                    track={track}
                                    key={track.id}
                                    onTrackSaved={handleTrackSaved}
                                />
                            ))}
                        </div>
                        {loadingMore && (
                            <Spinner />
                        )}
                        {hasMore && (
                            <div className="flex items-center justify-center">
                                <button
                                    className="cursor-pointer rounded-full py-4 px-6 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600"
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
