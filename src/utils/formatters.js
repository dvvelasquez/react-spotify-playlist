/**
 * Get and Format Full Year
 * @returns {Number} A number with a formatted year
 */
const getFullYear = () => {
    return new Date().getFullYear().toString();
};

/**
 * Format song time duration
 * @param {number} seconds - the song current time
 * @returns {string} the formated time in minutes
 */
const formatSongDuration = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const paddedSeconds = String(seconds).padStart(2, '0');

  return `${minutes}:${paddedSeconds}`;
};

const getTracks = (song) => {
    let topArtist = [];
    song?.tracks?.map(track => {
        return topArtist.push(track.data);
    });
    return topArtist;
}

const spotifyLinkFormatter = (uri) => {
    const [, type, id] = uri.split(':');
    return `https://open.spotify.com/${type}/${id}`;
}

const songsFormatter = (data) => {
    const tracks = getTracks(data);
    console.log(tracks);

    const artistObj = tracks.map(singer => {
        return {
            albumName: singer.albumOfTrack.name,
            artist: singer.artists.items[0].profile.name,
            songLink: spotifyLinkFormatter(singer.uri),
            duration: singer.duration.totalMilliseconds,
            id: singer.id,
            srcImage: singer.albumOfTrack.coverArt.sources[2].url,
        }
    });

    return artistObj;
}

export {
    getFullYear,
    formatSongDuration,
    songsFormatter
}
