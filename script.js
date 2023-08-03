// Get references to the DOM elements
const form = document.getElementById('form');
const input = document.getElementById('input');
const list = document.getElementById('list');

// Load saved tasks from local storage
const saved = JSON.parse(localStorage.getItem('saved'));

// Add saved tasks to the list if there are any
if (saved) {
  saved.forEach((savedTask) => {
    addList(savedTask);
  });
}

// Add event listener for form submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  addList();
});

// Function to add a new task to the list
function addList(savedTask) {
  let text = input.value;

  // Use the saved task's text if provided
  if (savedTask) {
    text = savedTask.text;
  }

  // Check if the task text is not empty
  if (text) {
    const todo = document.createElement('li');

    // Add 'completed' class if the task was completed
    if (savedTask && savedTask.completed) {
      todo.classList.add('completed');
    }

    todo.innerText = text;
    list.appendChild(todo);
    input.value = '';

    // Toggle 'completed' class when the task is clicked
    todo.addEventListener('click', () => {
      todo.classList.toggle('completed');
      updateStorage();
    });

    // Remove the task when right-clicked
    todo.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      todo.remove();
      updateStorage();
    });

    updateStorage();
  }
}

// Function to update local storage with the current tasks
function updateStorage() {
  const listItems = document.querySelectorAll('li');
  const savedTasks = [];

  listItems.forEach((listItem) => {
    savedTasks.push({
      text: listItem.innerText,
      completed: listItem.classList.contains('completed'),
    });
  });

  localStorage.setItem('saved', JSON.stringify(savedTasks));
}
