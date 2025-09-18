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
  }
}
