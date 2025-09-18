// Might be easier to filter the podcasts first into their relavent genres

// Create a dedicated filter class

/* Filter class and methods: (more of a mapper where the data from the differnt array have been combined by their relations)
    Saved data (arrays) as argument
    Filter method to display certian parts of the arrays in the DOM*/

// Using a seperate class to map out the static array data into a combined array thus linking the relational data in a more convienient package

/**
 * Combines podcasts, genres, and seasons arrays into a single array with linked data.
 * @param {Object[]} podcasts - Array of podcast objects.
 * @param {Object[]} genres - Array of genre objects.
 * @param {Object[]} seasons - Array of season objects.
 * @returns {Object[]} Array of combined podcast objects with genreNames and seasonsData properties.
 */
export default class relationalMapper {
    static combineStaticArrays (podcasts, genres, seasons) {
        const combinedArrays = podcasts.map(podcast => {
            // For every podcast object, return the podcast object combined with the relavant genre objects
            return {
                ...podcast,
                // For every genre id in the podcast object loop with map for every podcastGenreId - 
                // Run the find method on the genres array, for every genres object return the genre object where the genre.id is equal to the current podcast object genre field value id
                genreNames: podcast.genres.map(podcastGenreId => genres.find(genre => genre.id === podcastGenreId)),
                // Do the same thing here with the seasons array
                // Filter returns all the objects that satisfy the condition
                seasonsData: seasons.filter(season => season.id === podcast.id)
            }
        });
        return combinedArrays;
    }
}

