import { useState, useRef, useEffect } from "react";

export default function useNotification() {
    const [ notification, setNotification ] = useState(null);
    const [ showNotification, setShowNotification ] = useState(false);
    const notificationTimeout = useRef(null);

    const showNotificationMessage = (track, isSaved) => {
        const action = !isSaved ? 'added to' : 'removed from';

        setNotification({
            type: 'success',
            track: track.albumName,
            action
        });

        requestAnimationFrame(() => {
            setShowNotification(true);
        });

        clearTimeout(notificationTimeout.current);

        notificationTimeout.current = setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    };

    useEffect(() => {
        if (!showNotification && notification) {
            const timeout = setTimeout(() => {
                setNotification(null);
            }, 500);

            return () => clearTimeout(timeout);
        }
    }, [showNotification, notification]);

    useEffect(() => {
        return () => {
            clearTimeout(notificationTimeout.current);
        };
    }, []);

    return {
        notification,
        showNotification,
        showNotificationMessage
    };
}
