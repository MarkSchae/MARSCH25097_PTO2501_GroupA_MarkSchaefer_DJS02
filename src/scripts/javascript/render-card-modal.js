import { updatedDate } from "./helper-funcitons.js";

export default function renderCardModalFn(cardId, appData, shadowRoot) { // Use setter data (this.appData for all dataObjects data) and event listener dataObject id
    const dataObject = appData.find(dataObject => dataObject.id === cardId);
    // Create the modal container DOM element
    const dataObjectModalContainer = document.createElement('div');
    const modalDisplayClasses = 'fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md w-[90vw] max-w-lg flex flex-col gap-6 max-h-[90vh] overflow-y-auto'
    dataObjectModalContainer.classList.add(...modalDisplayClasses.split(' '));
    dataObjectModalContainer.id = 'data-modal-container-id'; 
    // Create and populate the DOM elements for the dataObject data
      // Title
      const dataObjectModalTitle = document.createElement('div');
      dataObjectModalTitle.innerHTML = dataObject.title; 
      // Large cover img
      const dataObjectModalImg = document.createElement('img');
      dataObjectModalImg.src = dataObject.image;
      dataObjectModalImg.alt = `${dataObject.title}: Cover Image`;
      // Description
      const dataObjectDescriptionHeading = document.createElement('div');
      dataObjectDescriptionHeading.innerHTML = 'Description'; // Side note: innerHTML use is safe here but for user inputs rather stick to textcontent as a rule
      const dataObjectDescription = document.createElement('div');
      dataObjectDescription.innerHTML = dataObject.description; 
      // Genres
      const dataObjectModalGenres = document.createElement('div');
      dataObjectModalGenres.innerHTML = 'Genres';
      const genreCard = document.createElement('div');
      const genersDisplayClasses = 'flex flex-row justify-between';
      genreCard.classList.add(...genersDisplayClasses.split(' '));
      dataObject.genreNames.forEach(genreName => {
          const genreModal = document.createElement('div');
          const genreNameDisplayClasses = 'bg-gray-300 rounded shadow shadow-black p-1'; 
          genreModal.classList.add(...genreNameDisplayClasses.split(' '));
          genreModal.innerHTML = genreName.title;
          genreCard.append(genreModal);
      });
      // Last updated as a normal date
      const dataObjectUpdatedDate = document.createElement('div');
      dataObjectUpdatedDate.innerHTML = `Last Updated: ${updatedDate(dataObject.updated)}`;
      dataObjectModalContainer.append(dataObjectUpdatedDate);
      // Seasons heading - Season (season number), season information like episodes and title
      const dataObjectModalSeasons = document.createElement('div');
      dataObjectModalSeasons.innerHTML = 'Seasons';
      const seasonsDisplayClasses = 'flex flex-col gap-4';
      dataObjectModalSeasons.classList.add(...seasonsDisplayClasses.split(' '));
      dataObject.seasonsData.forEach(season => {
        season.seasonDetails.forEach(season => {
          const seasonCard = document.createElement('div');
          const seasonCardDisplayClasses = 'flex flex-col sm:flex-row justify-between items-center gap-2 p-2 bg-gray-100 rounded shadow';
          seasonCard.classList.add(...seasonCardDisplayClasses.split(' '));
          const seasonTitle = document.createElement('div');
          seasonTitle.innerHTML = season.title;
          const seasonEpisodes = document.createElement('div');
          seasonEpisodes.innerHTML = `Episodes: ${season.episodes}`;
          seasonCard.append(seasonTitle, seasonEpisodes)
          dataObjectModalSeasons.append(seasonCard);
        })
      });
      // Create the exit button and the helper function to exit the modal
      const exit = document.createElement('img');
      exit.src = './src/images/exit.png';
      const exitDisplayClasses = 'w-3.5 h-3.5 cursor-pointer fixed top-2 right-2';
      exit.classList.add(...exitDisplayClasses.split(' '));
      exit.id = 'exit-btn-id';
      // Create and reveal the backdrop to focus the viewer on the modal
      const overlay = document.createElement('div');
      const overlayDisplayClasses = 'fixed inset-0 bg-black/50 z-40';
      overlay.classList.add(...overlayDisplayClasses.split(' '));
      overlay.id = 'overlay-id';
    
    dataObjectModalContainer.append(dataObjectModalTitle, dataObjectModalImg, dataObjectDescriptionHeading, dataObjectDescription, dataObjectModalGenres, genreCard, dataObjectModalSeasons, exit);
    shadowRoot.append(dataObjectModalContainer, overlay);
}