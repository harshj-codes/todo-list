//SETUP EDIT MODAL 

// Tracks which task is currently being edited
let editingTaskId = null;


// Opens the modal and fills it with the task's current values
function openEditModal(id) {

  const task = tasks.find(t => t.id === id);
  if (!task) return;

  // Remember which task we are editing
  editingTaskId = id;

  // Fill modal fields with current task values
  document.getElementById('editTaskInput').value = task.title;
  document.getElementById('editPrioritySelect').value = task.priority;
  document.getElementById('editCategorySelect').value = task.category;
  document.getElementById('editDueDateInput').value = task.dueDate || '';

  // Show the modal
  document.getElementById('editModal').removeAttribute('hidden');

}

// Closes the modal without saving
function closeEditModal() {
  editingTaskId = null;
  document.getElementById('editModal').setAttribute('hidden', '');
}

// Saves the edited task and closes the modal
function saveEditModal() {

  if (!editingTaskId) return;

  const newTitle = document.getElementById('editTaskInput').value.trim();
  if (!newTitle) return;

  // Update the task in the array
  tasks = tasks.map(task =>
    task.id === editingTaskId
      ? {
          ...task,
          title: newTitle,
          priority: document.getElementById('editPrioritySelect').value,
          category: document.getElementById('editCategorySelect').value,
          dueDate: document.getElementById('editDueDateInput').value
        }
      : task
  );

  // Save and re-render
  saveTasks(tasks);
  renderTasks();
  closeEditModal();

}

//SETUP BULK ACTIONS 
function setupBulkActions() {

  // Clear completed button
  document.getElementById('clearCompletedBtn').addEventListener('click', () => {
    tasks = tasks.filter(t => !t.completed);
    saveTasks(tasks);
    renderTasks();
  });

  // Mark all done button
  document.getElementById('markAllBtn').addEventListener('click', () => {
    tasks = tasks.map(t => ({ ...t, completed: true }));
    saveTasks(tasks);
    renderTasks();
  });

}

//SETUP ADD TASK 
function setupAddTask() {

  // Click on + Add button
  document.getElementById('addTaskBtn').addEventListener('click', () => {
    addTask();
  });

  // Press Enter in the input field
  document.getElementById('taskInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask();
  });

}


//SETUP MODAL BUTTONS 
function setupModalButtons() {

  document.getElementById('modalCloseBtn').addEventListener('click', () => {
    closeEditModal();
  });

  document.getElementById('modalCancelBtn').addEventListener('click', () => {
    closeEditModal();
  });

  document.getElementById('modalSaveBtn').addEventListener('click', () => {
    saveEditModal();
  });

  document.getElementById('editModal').addEventListener('click', (e) => {
    if (e.target.id === 'editModal') closeEditModal();
  });

}

function init() {
  setupDarkMode();
  setupFilterTabs();
  setupCategoryPills();
  setupSearch();
  setupSort();
  setupAddTask();
  setupModalButtons();
  setupBulkActions();
  renderTasks();
}


// Start the app
init();