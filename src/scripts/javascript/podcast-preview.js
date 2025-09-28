import renderGrid from './render-data-card-grid.js';
import renderCardModalFn from './render-card-modal.js';
import removeCardModalFn from './exit-modal-view.js';
import saveCssBuildFn from './save-css.js';
import { tailwindCssBuild } from './tailwind-css.js';
// Web component refactor of previous class for displaying podcast data

/**
 * @class DataPreview
 * @extends HTMLElement
 * 
 * @description
 * A Web Component that displays podcast (or any data (purpose of the vague name)) previews as cards.
 * Handles rendering the cards responsively, and displaying a modal of the card with details on click,
 * as well as sending a custom event/message to notify the main app of user clicks.
 * Uses Shadow DOM for encapsulation and immutability of data.
 * Uses imported functions within the methods for better readability (encapsulation is still achieved)
 */
// Create the web component
class DataPreview extends HTMLElement { // Extending a normal html element creation meaning the container acts like a html element
  /** 
    * @private
    * @type {Array<Object>} #appData - Declaration of private empty array to later store external data
    */
  #appData = [];
  constructor() {
    super(); // Calls the constructor on the parent (is like a empty container that behaves like a html element like a div) which is the html element
    // No data gets passed in as a argument as the browser calls the DOM element creation when it chooses
    this.attachShadow({mode: 'open'}); // Shadow DOM element, essentially a copy of the DOM elements but only accessable inside the component
    this.saveCssBuild();
  }
  connectedCallback() { // Initializes the data even if empty and the shadow DOM
    // Need to link the output css to the shadow DOM element from building the tailwind
    /*const tailwindCssLink = document.createElement('link');
    tailwindCssLink.setAttribute("rel", "stylesheet");
    tailwindCssLink.setAttribute("href", "src/styles/stylesheets/output.css");
    // Append to the shadow DOM
    this.shadowRoot.append(tailwindCssLink);*/
    this.render();
    // Set up the event listener for the shadow DOM element here
    this.shadowRoot.addEventListener('click', (click) => {
      // Find the nearest parent (or self) that has the modal-btn class
      const card = click.target.closest('.modal-btn');

      // Add custom event to notify/communicate with the 'main app'
      if (click.target.closest('.modal-btn')) { // Avoid sending this event for clicks that are not the card
        this.dispatchEvent(new CustomEvent('card-clicked', {
          detail: { cardId: card.dataset.card },
          bubbles: true, // True - can reach all the elements inside the DOM tree (child and parent), False - stops at the current element
          composed: true // Allows the event to pass from the shadowDOM to the light DOM
        }));
      }

      // Rendering the card modal
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
  /**
   * @setter appDataset
   * @param {Array<Object>} dataFromApp - external array of data objects from the main app
   * @description
   * This setter can now be used to store data from the main app inside this component.
   * Triggers a re-render of the shadow DOM to include any changes to the dataset.
   */
  // Called with .dataFromApp. Need to set up a getter to update with the private data in future
  set appDataset(dataFromApp) { // Setter allows external code to pass into the component
    this.#appData = [...dataFromApp]; // Make this private data so it is immutable externally
    this.render(); // Update the shadow DOM inside the component
  }
  // Render all dataObjects
  render() {
    renderGrid(this.shadowRoot, this.#appData);
  }
  /**
   * @method renderCardModal
   * @param {string|number} cardId - The ID of the card to render in the modal view
   * @description
   * Displays a modal for the selected data/card object. Calls DOM creation with renderCardModalFn imported function.
   */
  // Render modal view onclick with the id of the element passed into the method/function
  renderCardModal(cardId) {
    renderCardModalFn(cardId, this.#appData, this.shadowRoot);
  }
  // Remove the modal elements from display when the exit button is clicked
  removeCardModal() {
    removeCardModalFn(this.shadowRoot);
  }
  // Build the css with node to be used/saved in the constructor/callback
  saveCssBuild() {
    saveCssBuildFn(this.shadowRoot, tailwindCssBuild);
  }
}

// Define the component
customElements.define('data-preview', DataPreview);