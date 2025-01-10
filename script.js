// Reload the page when Home link is clicked
document.getElementById("home-link").onclick = function () {
  window.location.reload();
};

// Smooth scroll to Features section when Features link is clicked
document
  .getElementById("features-link")
  .addEventListener("click", function (event) {
    event.preventDefault();
    document
      .getElementById("features-section")
      .scrollIntoView({ behavior: "smooth" });
  });

// Smooth scroll to Contact section when Contact link is clicked
document.getElementById("contact-link").addEventListener("click", function (e) {
  e.preventDefault(); // Prevent default link behavior
  document.getElementById("contact").scrollIntoView({
    behavior: "smooth", // Smooth scrolling
    block: "start", // Align to the top of the viewport
  });
});
