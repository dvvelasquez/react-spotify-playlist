import Icon from '../Icon/Icon';
import { FaPlay, FaPause } from "react-icons/fa";

export default function PlayButton({ onClick, isPlaying, className = "" }) {
    const playIcon = isPlaying ? FaPause : FaPlay;

    return (
        <div className={className}>
            <button
                type="button"
                onClick={onClick}
                className='cursor-pointer bg-slate-800 rounded-full p-4 relative'
                aria-label={isPlaying ? "Pause Song" : "Play Song"}
            >
                <Icon
                    icon={playIcon}
                    className='size-4 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
                />
            </button>
        </div>
    )
}
