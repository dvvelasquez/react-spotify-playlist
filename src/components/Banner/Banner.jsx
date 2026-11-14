import topBanner from '../../assets/banners/music-app-hero-banner.jpg';

export default function BannerImage() {
    return (
        <div className='w-full mb-12.5'>
            <div
                className="flex justify-center flex-wrap content-center w-full h-[44vw] sm:h-[28vw] xl:h-[23vw] bg-center bg-cover bg-no-repeat"
                style={{ backgroundImage: `url(${topBanner})` }}
            >
                <h1 className='px-5 text-white text-5xl font-bold text-shadow-lg text-shadow-blue-950/90'>Spotify API</h1>
            </div>
        </div>
    )
}
