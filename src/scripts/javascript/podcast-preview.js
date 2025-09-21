// Web component to open a dataObject view on hover (already have a onclick open modal)
    // On hover, opens the modal but only enlarges in place instead of being in the center
    // If hovered off the modal, modal closes
    // Might need to make the variable names more vague and accept data seperate from the main app code

// Create the web component
class modalPreview extends HTMLElement { // Extending a normal html element creation meaning the container acts like a html element
  constructor() {
    super(); // Calls the constructor on the parent (is like a empty container that behaves like a html element like a div) which is the html element
    // No data gets passed in as a argument as the browser calls the DOM element creation when it chooses
    this.appData = [];
    this.attachShadow({mode: 'open'}); // Shadow DOM element, essentially a copy of the DOM elements but only accessable inside the component
  }

  connectedCallback() { // Initializes the data even if empty and the shadow DOM
    // Need to link the output css to the shadow DOM element from building the tailwind
    const tailwindCssLink = document.createElement('link');
    tailwindCssLink.setAttribute("rel", "stylesheet");
    tailwindCssLink.setAttribute("href", "src/styles/stylesheets/output.css");
    // Append to the shadow DOM
    this.shadowRoot.append(tailwindCssLink);
    this.render();
    // Set up the event listener for the shadow DOM element here
    this.shadowRoot.addEventListener('click', (click) => {
      // Find the nearest parent (or self) that has the modal-btn class
      const card = click.target.closest('.modal-btn');

      if (card) { // Checking if the element/target does exist in the DOM
          const cardId = card.dataset.card;
          this.renderCardModal(cardId); // Ensure data types are correct
          return; // Click was outside a dataObject card
      } 

      if (click.target.matches('#exit-btn-id')) {
      this.removeCardModal();
      const overlayRemove = this.shadowRoot.getElementById('overlay-id');
      overlayRemove.remove();
      }
    });
  }
  // Called with .dataFromApp
  set appDataset(dataFromApp) { // Setter allows external code to pass into the component
    this.appData = dataFromApp;
    this.render(); // Update the shadow DOM inside the component
  }
  // Render all dataObjects
  render() { // Use setter data (this.appData for all dataObjects data)
    const domNode = this.shadowRoot; // root node of the shadow (essetially a copy of the DOM only availabe inside this component), encapsulated DOM tree inside this component
    // Create DOM elements dynamically, open, close, other funcitonality, and append to the shadowroot/dataObjectModal
    // Clear the old to avoid duplicates
    domNode.innerHTML = '';
    this.appData.forEach (dataObject => {
      // Loop the array and create the DOM elements to display the specific data
      // Need from dataObjects array: cover img, title, amount of seasons, geners, last updated
      const dataDisplayCard = document.createElement('div');
      dataDisplayCard.dataset.card = dataObject.id; // Remember that the dataset attribute is viewable to anyone

      const cardDisplayClasses = 'flex flex-col gap-5 p-3.5 bg-white rounded sm:grid sm:grid-cols-4 modal-btn';  

      // Split by spaces into an array, then spread into classList.add
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
      dataObjectLastUpdated.innerHTML = `Updated ${this.lastUpdated(dataObject.updated)}`;

      dataDisplayCard.append(dataObjectCoverImg, dataObjectTitle, dataObjectSeasons, dataObjectGenres, dataObjectLastUpdated);

      // Append to shadow DOM element
      domNode.append(dataDisplayCard);
    });
  }
  // Render modal view
  renderCardModal(cardId) { // Use setter data (this.appData for all dataObjects data) and event listener dataObject id
    const dataObject = this.appData.find(dataObject => dataObject.id === cardId);
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
      dataObjectUpdatedDate.innerHTML = `Last Updated: ${this.updatedDate(dataObject.updated)}`;
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
    this.dataObjectsContainer.append(dataObjectModalContainer, overlay);
  }
  // Remove the modal elements from display when the exit button is clicked
  removeCardModal () {
    const targetRemove = this.shadowRoot.querySelector('#data-modal-container-id');
    if (targetRemove) {
        targetRemove.remove();
    }
  }
  // Helper methods
  lastUpdated (lastedUpdatedDate) {
    // Modify the data data to be human readable in a last update x days ago format
    // Get the current date object
    const currentDate = new Date();
    // Convert the ISO date from the podcast array and convert it back to a date object
    const updatedDate = new Date(lastedUpdatedDate);
    // Subtract the date object millisecond times to find the difference
    const dateDiffMil = currentDate - updatedDate;
    // Convert the difference in milliseconds to min/hours/days/months/years.
    const diffSec = Math.floor(dateDiffMil / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);
    // Return the difference and the x time ago string for each time period
    // Refine this
    if (diffSec < 60) return 'Just Now';
    if (diffMin < 60) return `${diffMin} minute/s ago`;
    if (diffHours < 24) return `${diffHours} hour/s ago`;
    if (diffDays < 30) return `${diffDays} day/s ago`;
    if (diffMonths < 12) return `${diffMonths} month/s ago`;
    return `${diffYears} year/s ago`;
  }

  updatedDate (dateString) {
    const isoString = dateString;
    const date = new Date(isoString);

    const formatted = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
    return formatted;
  }
}