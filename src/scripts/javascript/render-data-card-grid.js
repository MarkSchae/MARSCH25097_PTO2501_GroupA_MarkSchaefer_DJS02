import { lastUpdated } from "./helper-funcitons.js";

export default function renderGrid(shadowRoot, appData) { // Use setter data (this.appData for all dataObjects data)
    const domNode = shadowRoot; // root node of the shadow (essetially a copy of the DOM only availabe inside this component), encapsulated DOM tree inside this component
    // Create DOM elements dynamically, open, close, other funcitonality, and append to the shadowroot/dataObjectModal
    // Clear the old to avoid duplicates
    const container = shadowRoot.getElementById('data-container-shadow-dom');
    if(container) {
        container.remove();
    }
    // Create the container for the individual div cards
    const dataDisplayCardContainer = document.createElement('div');
    dataDisplayCardContainer.id = 'data-container-shadow-dom';
    const cardDisplayContainerClasses = 'flex flex-col gap-5 sm:grid sm:grid-cols-4';
    dataDisplayCardContainer.classList.add(...cardDisplayContainerClasses.split(' '));
    // Creating the cards to display individual object data
    appData.forEach (dataObject => {
        // Loop the array and create the DOM elements to display the specific data
        // Need from dataObjects array: cover img, title, amount of seasons, geners, last updated
        const dataDisplayCard = document.createElement('div');
        dataDisplayCard.dataset.card = dataObject.id; // Remember that the dataset attribute is viewable to anyone

        const cardDisplayClasses = 'flex flex-col gap-4 p-3.5 bg-white rounded modal-btn';  

        // Add the classes as an array split by spaces instead of comma's (can only add one class at a time or multiple but has to be seperated)
        dataDisplayCard.classList.add(...cardDisplayClasses.split(' ')); // ('item' 'item2')
        const dataObjectCoverImg = document.createElement('img');
        dataObjectCoverImg.src = dataObject.image;
        dataObjectCoverImg.alt = `${dataObject.title}: Cover Image`;

        const dataObjectTitle = document.createElement('div');
        dataObjectTitle.innerHTML = dataObject.title;

        const dataObjectSeasons = document.createElement('div');
        dataObjectSeasons.innerHTML = `${dataObject.seasons} Seasons`

        const dataObjectGenres = document.createElement('div');
        const genersDisplayClasses = 'flex flex-row justify-between';
        dataObjectGenres.classList.add(...genersDisplayClasses.split(' '));
        dataObject.genreNames.forEach(genreName => {
            const genre = document.createElement('div');
            const genreNameDisplayClasses = 'bg-gray-300 rounded shadow shadow-black p-1'; 
            genre.classList.add(...genreNameDisplayClasses.split(' '));
            genre.innerHTML = genreName.title;
            dataObjectGenres.append(genre);
        });

        const dataObjectLastUpdated = document.createElement('div');
        dataObjectLastUpdated.innerHTML = `Updated ${lastUpdated(dataObject.updated)}`;

        dataDisplayCard.append(dataObjectCoverImg, dataObjectTitle, dataObjectSeasons, dataObjectGenres, dataObjectLastUpdated);
        // Append to the container
        dataDisplayCardContainer.append(dataDisplayCard);
    });
    // Append to shadow DOM element
    domNode.append(dataDisplayCardContainer);
}