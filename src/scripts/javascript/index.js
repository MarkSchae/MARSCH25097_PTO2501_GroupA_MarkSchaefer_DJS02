// Save the data using the class from the dataManager class

import { genres, podcasts, seasons } from "./data.js";
import dataManager from "./data-handling.js";
import relationalMapper from "./relational-mapper.js";
import render from "./render.js";
import tailwindCssBuild from './tailwind-css.js';

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
const podcastsContainer = document.getElementById('podcasts-container');
const renderer = new render(podcastsContainer, combinedArrayData);
renderer.renderPodcastsCard();

// Render the modal onclick
// Add one event listner to the body to listen for all clicks, check if the click matches the 'target' of a class on the podcast DOM, then run the render method
document.body.addEventListener('click', (click) => {
    // Find the nearest parent (or self) that has the modal-btn class
    const card = click.target.closest('.modal-btn');

    if (card) { // Checking if the element/target does exist in the DOM
        const podcastId = card.dataset.podcast;
        renderer.renderPodcastsModal(podcastId); // Ensure data types are correct
        return; // Click was outside a podcast card
    } 

    if (click.target.matches('#exit-btn-id')) {
    renderer.removePodcastsModal();
    const overlayRemove = document.getElementById('overlay-id');
    overlayRemove.remove();
    }
});

