document.getElementById("home-link").onclick = function () {
  window.location.reload();
};

document
  .getElementById("features-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); 
    document
      .getElementById("features-section")
      .scrollIntoView({ behavior: "smooth" });
  });

document.getElementById("contact-link").addEventListener("click", function (e) {
  e.preventDefault(); 
  document.getElementById("contact").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});
