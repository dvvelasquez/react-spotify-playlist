export default function Audio({ audioRef, src, onLoadedMetadata, onTimeUpdate, onEnded }) {
    return (
        <audio
            ref={audioRef}
            src={src}
            onTimeUpdate={onTimeUpdate}
            onLoadedMetadata={onLoadedMetadata}
            onEnded={onEnded}
        />
    )
}
