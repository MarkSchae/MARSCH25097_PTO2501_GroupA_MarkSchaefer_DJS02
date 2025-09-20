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
      dataObjectGenres.classList.add('flex flex-row justify-between')
      dataObject.genreNames.forEach(genreName => {
          const genre = document.createElement('div');
          genre.classList.add('bg-gray-300 rounded shadow shadow-black p-1');
          genre.innerHTML = genreName.title;
          dataObjectGenres.append(genre);
      });

      const dataObjectLastUpdated = document.createElement('div');
      dataObjectLastUpdated.innerHTML = `Updated ${lastUpdated(dataObject.updated)}`;

      dataDisplayCard.append(dataObjectCoverImg, dataObjectTitle, dataObjectSeasons, dataObjectGenres, dataObjectLastUpdated);

      // Append to shadow DOM element
      domNode.append(dataDisplayCard);
    });
  }
  // Render modal view
  renderCardModal(cardId) { // Use setter data (this.appData for all dataObjects data) and event listener dataObject id

  }
  // Remove the modal elements from display when the exit button is clicked
  removeCardModal () {
    const targetRemove = this.shadowRoot.querySelector('#data-modal-container-id');
    if (targetRemove) {
        targetRemove.remove();
    }
  }
}