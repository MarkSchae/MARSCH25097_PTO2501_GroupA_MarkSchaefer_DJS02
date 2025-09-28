// File system module for node.js at build instead of the browser (able to use node which is serverside)
import fs from 'fs';

function cssBuild() {
    // Read your Tailwind output css file
    const cssOutput = fs.readFileSync('src/styles/stylesheets/output.css', 'utf8'); // Reading the css fule in text
    // Create a JS variable with the CSS 'file' as a string (js cannot read raw css)
    const cssOutputString = `export const tailwindCssBuild = ${JSON.stringify(cssOutput)}`;
    // Create a js file that stores all the css as a string
    // Have to write to a new js file as the variable containing the css at the moment is only inside a node script
    fs.writeFileSync('src/scripts/javascript/tailwind-css.js', cssOutputString);
}

cssBuild();