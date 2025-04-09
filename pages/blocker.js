// Block right-click context menu
document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
  alert("Right-click is disabled!");
});

// Block F12 key
document.addEventListener("keydown", function (event) {
  if (event.key === "F12") {
    event.preventDefault();
    alert("F12 is disabled!");
  }
});

// Block Ctrl+Shift+I (or Cmd+Shift+I on Mac)
document.addEventListener("keydown", function (event) {
  if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === "I") {
    event.preventDefault();
    alert("Ctrl+Shift+I is disabled!");
  }
});

// Toggle functionality for mobile only
document.querySelectorAll(".toggle-btn").forEach((button) => {
  button.addEventListener("click", function () {
    if (window.innerWidth <= 1200) {
      const content = this.nextElementSibling;
      content.classList.toggle("collapsed");
      // Scroll to top to ensure content is visible
      if (!content.classList.contains("collapsed")) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  });
});

// Apply collapsed state to info-content on mobile load and resize
window.addEventListener("load", function () {
  const infoContent = document.querySelector(".info-content");
  const toggleButtons = document.querySelectorAll(".toggle-btn");
  if (window.innerWidth <= 1200) {
    infoContent.classList.add("collapsed");
    toggleButtons.forEach((btn) => (btn.style.display = "block"));
  } else {
    infoContent.classList.remove("collapsed");
    toggleButtons.forEach((btn) => (btn.style.display = "none"));
  }
});

window.addEventListener("resize", function () {
  const infoContent = document.querySelector(".info-content");
  const toggleButtons = document.querySelectorAll(".toggle-btn");
  if (window.innerWidth <= 1200) {
    infoContent.classList.add("collapsed");
    toggleButtons.forEach((btn) => (btn.style.display = "block"));
  } else {
    infoContent.classList.remove("collapsed");
    toggleButtons.forEach((btn) => (btn.style.display = "none"));
  }
});
