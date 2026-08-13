import { formatSongDuration } from '../../utils/formatters.js';

export default function SongInfo({ albumName, artist, duration, songLink, className = "" }) {
    return (
        <div className={className}>
            <div className="flex items-center mb-2">
                <h5 className="text-xl font-bold tracking-tight text-heading mr-3">{albumName}</h5>
            </div>
            <p className='text-sm text-slate-500'>{formatSongDuration(duration)}</p>
                <a href={songLink} target='_blank' className='block'>
                    <p className="text-sm text-slate-500 hover:text-slate-400 transition-colors duration-500">
                        {artist} -
                            <span className="text-sm text-slate-500"></span>
                    </p>
                </a>
        </div>
    );
}

