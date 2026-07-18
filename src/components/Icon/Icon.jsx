export default function Icon({ icon: IconComponent, className = 'size-6', size = 24, color = "currentColor", ...props}) {
    return <IconComponent className={className} size={size} color={color} {...props} />;
}