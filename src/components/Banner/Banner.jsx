import topBanner from '../../assets/banners/music-app-hero-banner.png';

export default function BannerImage() {
    return (
        <div className='w-full mb-5'>
            <div
                className="flex flex-wrap content-center w-full h-[44vw] sm:h-[19vw] xl:h-[15vw] bg-center bg-cover bg-no-repeat"
                style={{ backgroundImage: `url(${topBanner})` }}
            >
                <h1 className='px-10 text-xl font-bold'>Spotify Free API</h1>
            </div>
        </div>
    )
}
