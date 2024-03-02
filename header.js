// Function to handle the installation
function installApp() {
    if (deferredPrompt) {
        // Show the installation prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            // Reset the deferredPrompt
            deferredPrompt = null;
        });
    }
}

// Add this script to redirect to the Google Form
function redirectToForm() {
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSdosCudBPhLgV1hoYw7Hhvdl3u9ZLI2R4E2UTJAsi1MyI6fLw/viewform", "_blank");
}
