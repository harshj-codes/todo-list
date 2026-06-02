const STORAGE_KEY = 'todo-list-tasks';

function saveTasks(tasks)  {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function clearTasks() {
    localStorage.removeItem(STORAGE_KEY);
}
