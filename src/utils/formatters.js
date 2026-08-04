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
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

export {
    getFullYear,
    formatTime
}