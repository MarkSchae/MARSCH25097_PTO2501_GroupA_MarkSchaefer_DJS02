// Save the data using the class from the dataManager class

import { genres, podcasts, seasons } from "./data.js";
import dataManager from "./data-handling.js";
import relationalMapper from "./relational-mapper.js";
import './podcast-preview.js';

// Save the static arrays to local storage as it makes it easier to filter for relational data after saved

// Save the podcasts array to local storage
dataManager.saveDataLocal('podcasts', podcasts);
// Save the Genres array to local storage
dataManager.saveDataLocal('genres', genres);
// Save the Seasons array to local storage
dataManager.saveDataLocal('seasons', seasons);

// Load the data
const localStoragePodcasts = dataManager.loadDataFromLocal('podcasts');
const localStorageGenres = dataManager.loadDataFromLocal('genres');
const localStorageSeasons = dataManager.loadDataFromLocal('seasons');

export const combinedArrayData = relationalMapper.combineStaticArrays(localStoragePodcasts, localStorageGenres, localStorageSeasons);

// Build the render class now and call render podcast card, podcast modal, etc on the combined data array
const preview = document.querySelector('data-preview');
preview.appDataset = combinedArrayData;

// Logging the decoupled event/communication between the main app and the component
preview.addEventListener('card-clicked', (click) => {
    console.log('User clicked a card:', click.detail.cardId);
});


