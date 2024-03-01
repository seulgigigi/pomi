
// Function to handle scrolling to the "Pomi Timer - Features" section
function scrollToFeatures() {        // Get the offset top position of the "Pomi Timer - Features" section
    var featuresSection = document.querySelector('.tutorial-content');
    var offsetTop = featuresSection.offsetTop;

        // Scroll smoothly to the features section
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
}

    // Add an event listener to the "?" button to trigger the scroll
    document.getElementById('tutorialButton').addEventListener('click', scrollToFeatures);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service.js')
        .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
            console.error('Service Worker registration failed:', error);
        });
}