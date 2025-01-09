const noteList = document.getElementById("noteList");
const noteTitle = document.getElementById("noteTitle");
const noteContent = document.getElementById("noteContent");
const newNoteButton = document.getElementById("newNoteButton");
const savedFilesButton = document.getElementById("savedFilesButton");
const savedFilesModal = document.getElementById("savedFilesModal");
const savedNoteList = document.getElementById("savedNoteList");
const closeModalBtn = document.getElementById("closeModalBtn");
const saveNoteButton = document.getElementById("saveNoteButton");

// Load notes from localStorage or initialize empty array
let notes = JSON.parse(localStorage.getItem("notes")) || [];
let currentNoteIndex = null;

function renderNotes() {
  noteList.innerHTML = "";
  notes.forEach((note, index) => {
    const noteItem = document.createElement("div");
    noteItem.className = "note-item";
    noteItem.textContent = note.title || "Untitled Note";

    // Add delete button to each note item
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";
    deleteButton.onclick = (event) => {
      event.stopPropagation(); // Prevent clicking the note from opening it
      deleteNote(index);
    };

    noteItem.appendChild(deleteButton);
    noteItem.onclick = () => loadNote(index);
    noteList.appendChild(noteItem);
  });
}

function loadNote(index) {
  currentNoteIndex = index;
  const note = notes[index];
  noteTitle.value = note.title;
  noteContent.value = note.content;
}

function saveCurrentNote() {
  if (currentNoteIndex !== null) {
    notes[currentNoteIndex] = {
      title: noteTitle.value,
      content: noteContent.value,
    };
    // Save notes to localStorage
    localStorage.setItem("notes", JSON.stringify(notes));
  }
}

function deleteNote(index) {
  notes.splice(index, 1); // Remove the note from the array
  localStorage.setItem("notes", JSON.stringify(notes)); // Save updated list to localStorage
  renderNotes(); // Re-render the list
}

// Add a new note
newNoteButton.onclick = () => {
  saveCurrentNote();
  notes.push({ title: "", content: "" });
  currentNoteIndex = notes.length - 1;
  loadNote(currentNoteIndex);
  renderNotes();
};

// Show the saved notes modal
savedFilesButton.onclick = () => {
  renderSavedFiles();
  savedFilesModal.style.display = "flex";
};

// Close the saved files modal
closeModalBtn.onclick = () => {
  savedFilesModal.style.display = "none";
};

// Render saved notes in the modal
function renderSavedFiles() {
  savedNoteList.innerHTML = "";
  notes.forEach((note, index) => {
    const savedNoteItem = document.createElement("div");
    savedNoteItem.className = "note-item";
    savedNoteItem.textContent = note.title || "Untitled Note";
    savedNoteItem.onclick = () => loadNote(index);
    savedNoteList.appendChild(savedNoteItem);
  });
}

// Save the current note when the "Save Note" button is clicked
saveNoteButton.onclick = () => {
  saveCurrentNote();
  alert("Note Saved!");
  renderNotes(); // Re-render the list of notes after saving
};

// Update the notes in localStorage on input
noteTitle.oninput = saveCurrentNote;
noteContent.oninput = saveCurrentNote;

// Initial render of the notes
renderNotes();
