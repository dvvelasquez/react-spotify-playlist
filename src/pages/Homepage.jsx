import BannerImage from '../components/Banner/Banner';
import SongCard from '../components/SongCard/SongList';
import { mockSongs } from '../data/mockSongs';

export default function Homepage() {
    return (
        <div className="text-white py-10">
            <BannerImage />

            <div className='songsContainer'>
                {mockSongs.map(song => (
                    <SongCard song={song} key={song.id} />
                ))}
            </div>
        </div>
    )
}
