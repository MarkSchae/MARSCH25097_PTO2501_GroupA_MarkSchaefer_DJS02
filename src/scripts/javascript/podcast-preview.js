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
    this.render();
    // Set up the event listener for the shadow DOM element here
    this.shadowRoot.addEventListener('click', (click) => {
    // Find the nearest parent (or self) that has the modal-btn class
    const card = click.target.closest('.modal-btn');

    if (card) { // Checking if the element/target does exist in the DOM
        const cardId = cardId.dataset.card;
        this.renderCardModal(cardId); // Ensure data types are correct
        return; // Click was outside a dataObject card
    } 

    if (click.target.matches('#exit-btn-id')) {
    this.removeCardModal();
    const overlayRemove = document.getElementById('overlay-id');
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

  }
  // Render modal view
  renderCardModal(cardId) { // Use setter data (this.appData for all dataObjects data) and event listener dataObject id

  }

  removeCardModal () {
    const targetRemove = this.shadowRoot.querySelector('#data-modal-container-id');
    if (targetRemove) {
        targetRemove.remove();
    }
  }
}