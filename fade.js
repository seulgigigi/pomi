document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.fade-in');
    const fadeInOptions = {
        threshold: 0.5 // Adjust threshold as needed
    };
    const fadeInObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, fadeInOptions);
    elements.forEach(function(element) {
        fadeInObserver.observe(element);
    });
});
