document.getElementById("home-link").onclick = function () {
  window.location.reload();
};

document.getElementById("contact-link").onclick = function () {
  alert("Contact us at: squidnotes@gmail.com");
};

document
  .getElementById("features-link")
  .addEventListener("click", function (event) {
    event.preventDefault();
    document
      .getElementById("features-section")
      .scrollIntoView({ behavior: "smooth" });
  });
