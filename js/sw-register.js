document.addEventListener('DOMContentLoaded', (event) => {
    registerSW();
});

// Register the Service Worker
async function registerSW() {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('serviceworker.js');
            console.log("Service Worker Registered!");
        } catch (e) {
            console.error('SW registration failed:', e);
        }
    }
}
