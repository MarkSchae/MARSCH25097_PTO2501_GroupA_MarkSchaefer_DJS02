// Create a class that manages the storage of the data
/**
 * Save data to localStorage.
 * @param {string} key - The key under which the data is stored.
 * @param {any} data - The data to store (will be JSON stringified).
 */

/**
 * Load data from localStorage.
 * @param {string} key - The key to load data from.
 * @returns {any[]} Returns the parsed data array, or an empty array if nothing found.
 */
export default class dataManager {
    static saveDataLocal (key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    static loadDataFromLocal (key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }

    // Add save to and load from api or database
}
