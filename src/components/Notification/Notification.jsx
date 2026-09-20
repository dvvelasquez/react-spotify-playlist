export default function Notification({ notification, showNotification }) {
    return (
        <div className={`
            fixed  top-5 right-0 z-50
            bg-green-300 px-4 py-3
            text-green-900 shadow-lg
            transition-all duration-500 ease-in-out
            ${showNotification
                ? 'translate-x-0 opacity-100'
                : 'translate-x-5 opacity-0'
            }
        `}>
            <b>{notification.track}</b> {notification.action} your collection
        </div>
    )
}
