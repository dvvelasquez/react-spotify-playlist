import Image from '../Image/Image';

export default function AlbumImage({ src, name, className = "" }) {
    return (
        <div className={className}>
            <Image className='w-full aspect-square object-cover' src={src} name={name} />
        </div>
    )
}
