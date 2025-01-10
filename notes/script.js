document
  .querySelector("#uploadFile")
  .addEventListener("change", handleFileUpload);

function handleFileUpload(event) {
  const file = event.target.files[0];

  if (file) {
    document.querySelector("#uploadedFileName").textContent = file.name;

    document.querySelector("#noteTitle").value = "";
    document.querySelector("#noteContent").value = "";

    if (file.type === "text/plain" || file.name.endsWith(".cpp")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const fileContent = e.target.result;
        const lines = fileContent.split("\n");

        document.querySelector("#noteTitle").value = lines[0];

        document.querySelector("#noteContent").value = lines
          .slice(1)
          .join("\n");
      };
      reader.readAsText(file);
    } else if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imagePreview = document.createElement("img");
        imagePreview.src = e.target.result;
        imagePreview.style.maxWidth = "300px";
        document.querySelector("#noteContent").value = "";
        document.querySelector("#noteContent").appendChild(imagePreview);
      };
      reader.readAsDataURL(file);
    } else if (file.type === "application/pdf") {
      document.querySelector("#noteContent").value = "PDF file uploaded!";
    } else {
      document.querySelector("#noteContent").value = "Unsupported file type!";
    }
  }
}

let savedNotes = [];

document.querySelector("#saveNoteButton").addEventListener("click", saveNote);

function saveNote() {
  const noteTitle = document.querySelector("#noteTitle").value;
  const noteContent = document.querySelector("#noteContent").value;

  if (noteTitle && noteContent) {
    const newNote = { title: noteTitle, content: noteContent };
    savedNotes.push(newNote);

    displaySavedNotes();
    clearNoteEditor();
  } else {
    alert("Please enter both title and content.");
  }
}

function displaySavedNotes() {
  const savedNotesList = document.querySelector("#savedNotesList");
  savedNotesList.innerHTML = "";

  savedNotes.forEach((note, index) => {
    const noteItem = document.createElement("li");
    noteItem.classList.add("note-item");

    const noteTitle = document.createElement("h3");
    noteTitle.textContent = note.title;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");

    noteItem.addEventListener("click", () => loadNoteIntoEditor(index));

    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteNote(index);
    });

    noteItem.appendChild(noteTitle);
    noteItem.appendChild(deleteButton);

    savedNotesList.appendChild(noteItem);
  });
}

function loadNoteIntoEditor(index) {
  const note = savedNotes[index];
  document.querySelector("#noteTitle").value = note.title;
  document.querySelector("#noteContent").value = note.content;
}

function deleteNote(index) {
  savedNotes.splice(index, 1);
  displaySavedNotes();
}

function clearNoteEditor() {
  document.querySelector("#noteTitle").value = "";
  document.querySelector("#noteContent").value = "";
}
