/**
 * @function saveCssBuildFn
 * @param {ShadowRoot} shadowRoot - The shadow DOM root where the CSS will be injected.
 * @param {string} tailwindCssBuild - The compiled Tailwind CSS string to insert into the shadow DOM.
 * @description
 * Creates a <style> element containing the provided Tailwind CSS and appends it
 * to the given shadow root, ensuring the component's styles are encapsulated.
 */
export default function saveCssBuildFn(shadowRoot, tailwindCssBuild) {
    const styleNode = shadowRoot;
    // Create a style tag
    const style = document.createElement('style');
    // Insert the 
    style.textContent = tailwindCssBuild; // Browser sees a string with all CSS
    styleNode.append(style);
}