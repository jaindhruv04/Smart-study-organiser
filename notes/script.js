const noteList = document.getElementById("noteList");
const noteTitle = document.getElementById("noteTitle");
const noteContent = document.getElementById("noteContent");
const newNoteButton = document.getElementById("newNoteButton");
const savedFilesButton = document.getElementById("savedFilesButton");
const savedFilesModal = document.getElementById("savedFilesModal");
const savedNoteList = document.getElementById("savedNoteList");
const closeModalBtn = document.getElementById("closeModalBtn");
const saveNoteButton = document.getElementById("saveNoteButton");
const uploadNoteButton = document.getElementById("uploadNoteButton");
const noteFileInput = document.getElementById("noteFileInput");

let notes = JSON.parse(localStorage.getItem("notes")) || [];
let currentNoteIndex = null;

function renderNotes() {
  noteList.innerHTML = "";
  notes.forEach((note, index) => {
    const noteItem = document.createElement("div");
    noteItem.className = "note-item";
    noteItem.textContent = note.title || "Untitled Note";

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";
    deleteButton.onclick = (event) => {
      event.stopPropagation();
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
    localStorage.setItem("notes", JSON.stringify(notes));
  }
}

function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
}

newNoteButton.onclick = () => {
  saveCurrentNote();
  notes.push({ title: "", content: "" });
  currentNoteIndex = notes.length - 1;
  loadNote(currentNoteIndex);
  renderNotes();
};

uploadNoteButton.onclick = () => {
  noteFileInput.click();
};

noteFileInput.onchange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;
      saveCurrentNote(); // Save current note before uploading
      notes.push({ title: file.name, content: fileContent });
      currentNoteIndex = notes.length - 1;
      loadNote(currentNoteIndex);
      renderNotes();
    };
    reader.readAsText(file);
  }
};

savedFilesButton.onclick = () => {
  renderSavedFiles();
  savedFilesModal.style.display = "flex";
};

closeModalBtn.onclick = () => {
  savedFilesModal.style.display = "none";
};

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

saveNoteButton.onclick = () => {
  saveCurrentNote();
  alert("Note Saved!");
  renderNotes();
};

noteTitle.oninput = saveCurrentNote;
noteContent.oninput = saveCurrentNote;

renderNotes();
