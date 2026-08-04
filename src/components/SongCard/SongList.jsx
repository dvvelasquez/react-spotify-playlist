import { useState, useRef } from 'react';
import AlbumImage from './AlbumImage';
import SongInfo from './SongInfo';
import PlayButton from './PlayButton';
import Audio from './Audio';
import ProgressBar from './ProgressBar.jsx';

export default function SongCard({ song }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);

    const {
        title,
        albumImage,
        album,
        artist,
        audioUrl,
        genre
    } = song;

    // Toggle Play / Pause
    const togglePlay = async () => {
        const currentSong = audioRef.current;
        if (!currentSong) return;

        if (isPlaying) {
            currentSong.pause();
            setIsPlaying(false);
            return;
        }

        try {
            await currentSong.play();
            setIsPlaying(true);
        } catch (error) {
            console.error(error)
        }
    }

    // Update track slider progress
    const handleTimeUpdate = () => {
        const currentSong = audioRef.current;
        if (!currentSong) return;

        const { currentTime, duration } = currentSong;

        if (duration) {
            setProgress((currentTime / duration) * 100);
        }

        setCurrentTime(currentTime);
        setTimeLeft(Math.max(0, duration - currentTime));
    }

    // Allow user to scrub through the track
    const handleProgressChange = ({ target }) => {
        const currentSong = audioRef.current;
        if (!currentSong) return;

        const newProgress = target.value;
        const songDuration = currentSong.duration;
        setProgress(newProgress);

        if (songDuration) {
            currentSong.currentTime = (newProgress / 100) * songDuration;
        }
    }

    const handleLoadedMetadata = () => {
        const currentSong = audioRef.current;
        if (!currentSong) return;

        setTimeLeft(currentSong.duration)
    }

    return (
        <div className='w-full'>
            <div className="flex items-center py-4 flex-row" >
                <AlbumImage
                    src={albumImage}
                    name={title}
                    className={'max-w-25 mr-4 rounded-xl overflow-hidden'}
                />

                <div className='w-full'>
                    <SongInfo
                        album={album}
                        title={title}
                        artist={artist}
                        genre={genre}
                        isPlaying={isPlaying}
                        className={`leading-normal p-4 ${isPlaying ? "text-green-500" : ''}`}
                    />
                    <div className='flex w-full px-4'>
                        <PlayButton
                            onClick={togglePlay}
                            isPlaying={isPlaying}
                            className='mr-3'
                        />
                        <div className='grow'>
                            <Audio
                                audioRef={audioRef}
                                src={audioUrl}
                                onTimeUpdate={handleTimeUpdate}
                                onEnded={() => setIsPlaying(false)}
                                onLoadedMetadata={handleLoadedMetadata}
                            />
                            <ProgressBar
                                currentTime={currentTime}
                                timeLeft={timeLeft}
                                value={progress}
                                onChange={handleProgressChange}
                                className='w-full'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
