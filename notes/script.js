document.querySelector("#uploadFile").addEventListener("change", handleFileUpload);

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

        document.querySelector("#noteContent").value = lines.slice(1).join("\n");
      };
      reader.readAsText(file);
    }
    else if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imagePreview = document.createElement("img");
        imagePreview.src = e.target.result;
        imagePreview.style.maxWidth = "300px";
        document.querySelector("#noteContent").value = ""; 
        document.querySelector("#noteContent").appendChild(imagePreview);
      };
      reader.readAsDataURL(file);
    }
    else if (file.type === "application/pdf") {
      document.querySelector("#noteContent").value = "PDF file uploaded!";
    } else {
      document.querySelector("#noteContent").value = "Unsupported file type!";
    }
  }
}
