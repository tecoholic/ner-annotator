// undoStack.js

const undoStack = [];

// Function to add an action to the undo stack
function addAction(undoAction) {
  undoStack.push(undoAction);
}

// Function to undo the last action
function undoLastAction() {
  if (undoStack.length > 0) {
    const lastAction = undoStack.pop();
    if (lastAction && typeof lastAction.undo === 'function') {
      lastAction.undo();
    }
  } else {
    console.warn("Undo stack is empty.");
  }
}

// Function to clear the undo stack
function clearUndoStack() {
  undoStack.length = 0;
}

export { addAction, undoLastAction, clearUndoStack };
