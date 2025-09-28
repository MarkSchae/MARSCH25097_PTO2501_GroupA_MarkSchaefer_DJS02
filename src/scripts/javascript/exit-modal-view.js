export default function removeCardModalFn (shadowRoot) {
    const targetRemove = shadowRoot.querySelector('#data-modal-container-id');
    if (targetRemove) {
        targetRemove.remove();
    }
}