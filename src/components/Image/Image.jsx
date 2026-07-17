export default function Image({ src, name, className }) {
    return (
        <img
            src={src}
            alt={name}
            className={className}
            loading="lazy"
        />
    )
}
