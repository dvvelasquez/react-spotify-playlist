import { useState } from "react";
import { storage } from "../utils/storage/storage";
import SongCard from "../components/SongCard/SongList";
import Notification from '../components/Notification/Notification';
import useNotification from "../hooks/useNotification";

export default function SavedSongs() {
    const [ tracks, setTracks ] = useState(storage.getStorage());
    const {
        notification,
        showNotification,
        showNotificationMessage,
    } = useNotification();

    const handleTrackSaved = (track, isSaved) => {
        setTracks(storage.getStorage());
        showNotificationMessage(track, isSaved);
    };

    return (
        <div className="py-10 relative">
            {notification?.type === "success" && (
                <Notification
                    notification={notification}
                    showNotification={showNotification}
                />
            )}
            <div className="text-white">
                <h1 className="text-4xl font-bold">Your Song Collection</h1>

                {tracks.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 mt-5">
                        {tracks.map((track) => (
                            <SongCard
                                track={track}
                                key={track.id}
                                onTrackSaved={handleTrackSaved}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="mt-5">
                        <p className="text-center text-2xl">Your collection is empty</p>
                        <p className="text-center mt-2">
                            Save your favourite songs to see them here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
