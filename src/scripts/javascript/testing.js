// Researching code to embed the tailwind without having to fetch/link any external files after building (drop and go funcitonality for the user)

const fs = require('fs');

// Read your Tailwind output file
const css = fs.readFileSync('./output.css', 'utf8');

// Create a JS file with the CSS as a variable
const jsContent = `
export const TAILWIND_CSS = \`${css}\`;
`;
fs.writeFileSync('./tailwind-css.js', jsContent);

const style = document.createElement('style');
style.textContent = TAILWIND_CSS; // Browser sees a string with all CSS
this.shadowRoot.appendChild(style);