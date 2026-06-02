let currentSort = 'default';

//Setup sort
function setupSort() {

    const sortSelect = document.getElementById('sortSelect');
    sortSelect.addEventListener('change', () => {

        currentSort = sortSelect.value;
        renderTasks();
    });
}

//Get sorted tasks 
function getSortedTasks(filtered) {

    const sorted = [...filtered];

    if (currentSort === 'priority') {
        const order = {high: 0, medium: 1, low: 2};
        sorted.sort((a,b) => order[a.priority] - order[b.priority]);
    }
    else if (currentSort === 'date') {
        sorted.sort((a,b) => {
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return new Date(a.dueDate) - new Date(b.dueDate);
        });
    }
    else if (currentSort === 'name') {
        sorted.sort((a,b) => a.title.localeCompare(b.title));
    }

    return sorted;
}