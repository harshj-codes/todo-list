let currentSearch = '';

//Setup search 

//Attaches input event to the search box
function setupSearch() {

    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {

        currentSearch = searchInput.value.trim().toLowerCase();
        renderTasks();
    });
}

//Apply search 
function applySearch(filtered) {

    if (!currentSearch) return filtered;

    return filtered.filter(task =>
        task.title.toLowerCase().includes(currentSearch)
    );
}