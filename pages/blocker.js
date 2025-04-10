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
    if (window.innerWidth <= 1200 && this.nextElementSibling) {
      const content = this.nextElementSibling;
      content.classList.toggle("collapsed");
      if (!content.classList.contains("collapsed")) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  });
});

// Initial state on load
window.addEventListener("load", function () {
  const infoContents = document.querySelectorAll(".info-content");
  if (window.innerWidth <= 1200) {
    infoContents.forEach((content) => content.classList.add("collapsed"));
  } else {
    infoContents.forEach((content) => content.classList.remove("collapsed"));
  }
});

// Handle resize for content visibility
window.addEventListener("resize", function () {
  const infoContents = document.querySelectorAll(".info-content");
  if (window.innerWidth > 1200) {
    infoContents.forEach((content) => content.classList.remove("collapsed"));
  } else {
    infoContents.forEach((content) => content.classList.add("collapsed"));
  }
});
