const darkModeButton = document.getElementById('darkMode');
const body = document.body;

darkModeButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const darkModeEnabled = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', darkModeEnabled);
});

// Check if dark mode preference is saved in local storage
const darkModeEnabled = localStorage.getItem('darkMode') === 'true';

// Apply dark mode if preference is true
if (darkModeEnabled) {
    body.classList.add('dark-mode');
}
