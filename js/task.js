var tasks = loadTasks();

//Create Task 

//New task object from the input
function createTask(title, priority, category, dueDate) {
    return {
        id: crypto.randomUUID(),
        title: title,
        priority: priority,
        category: category,
        dueDate: dueDate,
        completed: false,
        createdAt: new Date().toISOString()
    }
}

//Add task 

//Reads the input, creates a task, saves and render
function addTask() {

    //Get values from input
    const titleInput = document.getElementById('taskInput');
    const priorityInput = document.getElementById('prioritySelect');
    const categoryInput = document.getElementById('categorySelect');
    const dueDateInput = document.getElementById('dueDateInput');

    const title = titleInput.value.trim();

    if (!title) {
        titleInput.focus();
        return;
    }

    //Create the task object 
    const task = createTask(
        title,
        priorityInput.value,
        categoryInput.value,
        dueDateInput.value
    );

    tasks.push(task);

    saveTasks(tasks);

    titleInput.value = '';
    dueDateInput.value = '';
    titleInput.focus();

    renderTasks();
}

//Delete Task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks(tasks);
    renderTasks();
}

//Toggle Complete 
function toggleTask(id) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks(tasks);
    renderTasks();
}

//Format Date 
function formatDate(dateStr) {
    if (!dateStr) return null;
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

//Overdue 
function isOverdue(dueDate, completed) {
    if (!dueDate || completed) return false;
    return new Date(dueDate) < new Date(new Date().toDateString());
}

//Build Task Card 

//Creates the HTML for a single task item
function buildTaskCard(task) {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.dataset.id = task.id;

    //Priority badge label
    const priorityLabel = {
        high: '🔴 High',
        medium: '🟡 Medium',
        low: '🟢 Low'
    }[task.priority] || task.priority;

    //Category badge label 
    const categoryLabel = {
        general: '📋 General',
        work: '💼 Work',
        personal: '🙂 Personal',
        study: '📚 Study'
    }[task.category] || task.category;

    //Due date badge 
    const dueDateHTML = task.dueDate
    ? `<span class="badge badge-due ${isOverdue(task.dueDate, task.completed) ? 'overdue' : ''}">
        📅 ${formatDate(task.dueDate)}
        </span>`
    : "";

    li.innerHTML = `
        <input
        type="checkbox"
        class="task-checkbox"
        ${task.completed ? 'checked' : ''}
        aria-label="Mark task complete"
        />

        <div class="task-content">
            <span class="task-title">${task.title}</span>
            <div class="task-badges">
                <span class="badge badge-${task.priority}">${priorityLabel}</span>
                <span class="badge badge-category">${categoryLabel}</span>
                ${dueDateHTML}
            </div>
        </div>

        <div class="task-actions">
            <button
            class="task-btn task-btn-edit"
            aria-label="Edit task"
            >
            ✏️ Edit
            </button>

            <button
            class="task-btn task-btn-delete"
            aria-label="Delete task"
            >
            🗑️
            </button>
        </div>
    `;

  //Checkbox event
   li.querySelector('.task-checkbox').addEventListener('change', () => {
    toggleTask(task.id);
    });

    //Edit button event 
    li.querySelector('.task-btn-edit').addEventListener('click', () => {
        openEditModal(task.id);
    });
   
    //Delete button event 
    li.querySelector('.task-btn-delete').addEventListener('click', () => {
        deleteTask(task.id);
    })

  return li;
}

//Render Tasks 
function renderTasks() {

    const taskList = document.getElementById('taskList');
    const emptyState = document.getElementById('emptyState');

    let filtered = getFilteredTasks();

    taskList.innerHTML = '';

    if (filtered.length === 0) {
        emptyState.removeAttribute('hidden');
    }
    else {
        emptyState.setAttribute('hidden', '');
        filtered.forEach(task => {
            taskList.appendChild(buildTaskCard(task));
        });
    }

    updateCounts();
    updateProgress();
}