import { combinedArrayData } from "./index.js";

// Web component to open a podcast view on hover (already have a onclick open modal)
    // On hover, opens the modal but only enlarges in place instead of being in the center
    // If hovered off the modal, modal closes

// Create the web component
class podcastPreview extends HTMLElement { // Extending the normal html DOM creation
  constructor() {
    super(); // Calls the constructor on the parent which is the html element
    // No data gets passed in as a argument as the browser calls the DOM element creation when it chooses
    this.podcasts = [];
    this.attachShadow({mode: 'open'}); // Shadow DOM, essentially a copy of the DOM elements but only accessable inside the component
  }

  connectedCallback() { // Initializes the data even if empty and the shadow DOM
    this.render();
  }
  // Called with .podcastData
  set podcastData(combinedArrayData) { // Setter allows external code to pass into the component
    this.podcasts = combinedArrayData;
    this.render(); // Update the shadow DOM inside the component
  }

  render() {
    const podcastModal = this.shadowRoot; // root node of the shadow (essetially a copy of the DOM only availabe inside this component), encapsulated DOM tree inside this component

    // Create DOM elements dynamically, open, close, other funcitonality, and append to the shadowroot/podcastModal
  }

  // Close modal
}
