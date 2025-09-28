export default function saveCssBuildFn(shadowRoot, tailwindCssBuild) {
    const styleNode = shadowRoot;
    // Create a style tag
    const style = document.createElement('style');
    // Insert the 
    style.textContent = tailwindCssBuild; // Browser sees a string with all CSS
    styleNode.append(style);
}