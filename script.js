function navigateTo(id) {
    // 1. Hide the Landing View
    document.getElementById('main-view').style.display = 'none';

    // 2. Hide all sub-pages first to be safe
    const allPages = document.querySelectorAll('.page');
    allPages.forEach(p => p.style.display = 'none');

    // 3. Show the requested page
    const target = document.getElementById('page-' + id);
    if (target) {
        target.style.display = 'block';
        window.scrollTo(0, 0);
    }
}

function goHome() {
    // Hide all sub-pages
    const allPages = document.querySelectorAll('.page');
    allPages.forEach(p => p.style.display = 'none');

    // Show main landing view
    document.getElementById('main-view').style.display = 'block';
    window.scrollTo(0, 0);
}

// Handle Escape key to return home
window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") goHome();
});