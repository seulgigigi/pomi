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
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSf1nytpAv-i1xYy7wXb_Et3JU51sw7lz8TCHcpHn5jIoklmHQ/viewform", "_blank");
}
