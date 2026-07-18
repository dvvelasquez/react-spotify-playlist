/**
 * Get and Format Full Year
 * @returns {Number} A number with a formatted year
 */
const getFullYear = () => {
    return new Date().getFullYear().toString();
}

export {
    getFullYear
}