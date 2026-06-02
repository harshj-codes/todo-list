let currentFilter = 'all';
let currentCategory = 'all';

// Get filtered tasks

//returns tasks array filtered by status and category
function getFilteredTasks() {

    let filtered = [...tasks];

    //Filters by status tab
    if (currentFilter === 'active') {
        filtered = filtered.filter(task => !task.completed);
    }
    else if (currentFilter === 'completed') {
        filtered = filtered.filter(task => task.completed);
    }

    //Filter by category pill
    if (currentCategory !== 'all') {
        filtered = filtered.filter(task => task.category === currentCategory);
    }

    //Apply search on top of filter 
    filtered = applySearch(filtered);

    //Apply sort on top of filters
    return getSortedTasks(filtered);
}

//Update Counts 

//Updates the number badges on All, Active, Completed tabs
function updateCounts() {

    document.getElementById('countAll').textContent = tasks.length;

    document.getElementById('countActive').textContent = tasks.filter(t => !t.completed).length;

    document.getElementById('countCompleted').textContent = tasks.filter(t => t.completed).length;
}

//Setup filter tabs 

//Attaches click events to All, Active, Completed buttons
function setupFilterTabs() {

    const tabs = document.querySelectorAll('.filter-tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {

            currentFilter = tab.dataset.filter;
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active')
            renderTasks();
        });
    });
}

//Setup Category Pills

//Attaches click events ro category pill buttons 
function setupCategoryPills() {

    const pills = document.querySelectorAll('.category-pill');

    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            
            currentCategory = pill.dataset.category;
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            renderTasks();
        });
    });
}