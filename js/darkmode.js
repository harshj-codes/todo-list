const THEME_KEY = 'todo-list-theme';

//Attaches click event to the toggle button 
function setupDarkMode() {

    const toggleBtn = document.getElementById('darkModeToggle');
    const themeIcon = document.getElementById('themeIcon') || toggleBtn;

    //Load saved theme on page load 
    const savedTheme = localStorage.getItem(THEME_KEY);

    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggleBtn.textContent = '☀️';
    }

    //Toggle on button click
    toggleBtn.addEventListener('click', () => {

        const currentTheme = document.documentElement.getAttribute('data-theme');

        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            toggleBtn.textContent = '🌙';
            localStorage.setItem(THEME_KEY, 'light');
        }
        else {
            document.documentElement.setAttribute('data-theme', 'dark');
            toggleBtn.textContent = '☀️';
            localStorage.setItem(THEME_KEY, 'dark');
        }
    });
}