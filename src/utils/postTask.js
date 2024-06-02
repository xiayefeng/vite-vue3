function customYield () {
  return new Promise((resolve) => {
    setTimeout(resolve, 0)
  })
}

export async function postTask (tasks) {

  // Loop over the tasks
  while (tasks.length > 0) {
    // Shift the first task off the tasks array
    const task = tasks.shift()

    // Run the task
    task()

    // Yield to the main thread
    await customYield()
  }
}

export async function main (tasks) {

  while (tasks.length > 0) {
    // Yield to a pending user input
    if (navigator.scheduling?.isInputPending?.()) {
      await customYield()
    } else {
      // Shift the first task off the tasks array
      const task = tasks.shift();

      // Run the task
      task();
    }
  }
}
function validateForm () {}

function showSpinner(){}
function saveToDatabase(){}
function updateUI(){}
function sendAnalytics(){}

export function saveSettings () {
  // Validate the form at high priority
  window.scheduler.postTask(validateForm, { priority: 'user-blocking' });

  // Show the spinner at high priority:
  window.scheduler.postTask(showSpinner, { priority: 'user-blocking' });

  // Update the database in the background:
  window.scheduler.postTask(saveToDatabase, { priority: 'background' });

  // Update the user interface at high priority:
  window.scheduler.postTask(updateUI, { priority: 'user-blocking' });

  // Send analytics data in the background:
  window.scheduler.postTask(sendAnalytics, { priority: 'background' });
}

export async function saveSettings2 () {
  // A task queue of functions
  const tasks = [    validateForm,    showSpinner,    saveToDatabase,    updateUI,    sendAnalytics  ];

  let deadline = performance.now() + 50;

  while (tasks.length > 0) {
    // Optional chaining operator used here helps to avoid
    // errors in browsers that don't support `isInputPending`:
    if (navigator.scheduling?.isInputPending() || performance.now() >= deadline) {
      // There's a pending user input, or the
      // deadline has been reached. Yield here:
      await customYield();

      // Extend the deadline:
      deadline += 50;

      // Stop the execution of the current loop and
      // move onto the next iteration:
      continue;
    }

    // Shift the the task out of the queue:
    const task = tasks.shift();

    // Run the task:
    task();
  }
}