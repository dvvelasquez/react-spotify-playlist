import { useState } from 'react';
import AlbumImage from './AlbumImage';
import SongInfo from './SongInfo';
import Icon from '../Icon/Icon';
import { FaHeart } from 'react-icons/fa';
import { storage } from '../../utils/storage/storage';

export default function SongCard({ track, onTrackSaved }) {
    const [ isTrackSaved, setIsTrackSaved ] = useState(storage.isAlreadySaved(track));
    const {
        albumName,
        artist,
        songLink,
        duration,
        srcImage,
    } = track;

    const handleStorage = () => {
        storage.setStorage(track);
        setIsTrackSaved(prev => !prev);

        onTrackSaved(track, isTrackSaved);
    }

    return (
        <div className="py-4" >
            <div className='relative'>
                <a href={songLink} target='_blank' className='block rounded-xl overflow-hidden'>
                    <AlbumImage
                        src={srcImage}
                        name={albumName}
                        className={'hover:scale-103 transition-all duration-500'}
                    />
                </a>
                <div className={`
                    absolute top-3 right-3 rounded-full z-100 hover:bg-slate-50 transition-colors duration-300
                    ${isTrackSaved ? 'bg-slate-50' : 'bg-slate-100/30'}
                `}>
                    <button
                        type="button"
                        className='cursor-pointer block'
                        onClick={handleStorage}
                    >
                        <Icon
                            icon={FaHeart}
                            className={`
                                size-7 p-1.5 opacity-60 hover:fill-blue-500 transition-colors duration-300
                                ${isTrackSaved ? 'fill-blue-500' : 'fill-slate-50'}
                            `}
                        />
                    </button>
                </div>
            </div>

            <div className=''>
                <SongInfo
                    albumName={albumName}
                    artist={artist}
                    songLink={songLink}
                    duration={duration}
                    className={`leading-normal p-4`}
                />
            </div>
        </div>
    )
}
