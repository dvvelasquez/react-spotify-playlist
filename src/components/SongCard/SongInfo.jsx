export default function SongInfo({ album, title, artist, genre, className = "", isPlaying }) {
    return (
        <div className={className}>
            <div className="flex items-center mb-2">
                <h5 className="text-xl font-bold tracking-tight text-heading mr-3">{album}</h5>
                {isPlaying &&
                    <p className="text-[11px] py-1 px-2 bg-slate-800"><span>Now Playing</span></p>
                }
            </div>
            <p className="text-body">{title} - {artist} - <span className="text-sm text-slate-500">{genre}</span></p>
        </div>
    );
}
