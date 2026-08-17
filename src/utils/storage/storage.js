const storage = {
    getStorage: () => {
        return JSON.parse(window.localStorage.getItem('savedTracks')) || [];
    },

    isAlreadySaved: (track) => {
        const existingTracks = storage.getStorage();
        return existingTracks.some(item => item.id === track.id)
    },

    setStorage: (track) => {
        const isSaved = storage.isAlreadySaved(track);
        const existingTracks = storage.getStorage();

        if (!isSaved) {
            const updateTracks = [...existingTracks, track];

            window.localStorage.setItem('savedTracks', JSON.stringify(updateTracks));
        } else {
            storage.removeItemFromStorage(track);
        }
    },

    removeItemFromStorage: (track) => {
        const existingTracks = storage.getStorage();
        const remainingTracks = existingTracks.filter(item => item.id !== track.id);

        if (remainingTracks.length === 0) {
            window.localStorage.removeItem('savedTracks');
            return;
        }

        return window.localStorage.setItem('savedTracks', JSON.stringify(remainingTracks));
    },

    removeStorage: () => {
        window.localStorage.removeItem('savedTracks');
    }
}

export { storage }
