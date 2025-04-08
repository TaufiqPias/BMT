// Function to handle missing links and redirect to 404 page
function handleMissingLinks() {
  const links = document.querySelectorAll(".category-buttons a");

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      // If the user is holding Ctrl or using MMB, let the default behavior handle it
      if (event.ctrlKey || event.metaKey || event.button === 1) {
        return; // Allow the link to open in a new tab/window
      }

      // Otherwise, prevent the default behavior and handle the click
      event.preventDefault();
      const href = link.getAttribute("href");

      // Check if the link is missing or broken
      fetch(href, { method: "HEAD" })
        .then((response) => {
          if (!response.ok) {
            window.location.href = "pages/404.html";
          } else {
            window.location.href = href;
          }
        })
        .catch(() => {
          window.location.href = "pages/404.html";
        });
    });
  });
}

// Call the function to handle missing links
handleMissingLinks();

// Function to filter categories based on search input
function filterCategories() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const categories = document.querySelectorAll(".category");

  categories.forEach((category) => {
    const categoryName = category.querySelector("h3").textContent.toLowerCase();
    const links = category.querySelectorAll(".category-buttons a"); // Target <a> tags
    let hasVisibleLinks = false;

    links.forEach((link) => {
      const linkText = link.textContent.toLowerCase();
      const linkTitle = link.getAttribute("title")?.toLowerCase() || "";

      // Check if the search input matches either the link text or the title
      if (linkText.includes(searchInput) || linkTitle.includes(searchInput)) {
        link.style.display = "inline-block";
        hasVisibleLinks = true;
      } else {
        link.style.display = "none";
      }
    });

    // Show or hide the entire category based on whether it has visible links
    if (hasVisibleLinks) {
      category.style.display = "block";
    } else {
      category.style.display = "none";
    }
  });
}

// // Function to handle link clicks without interfering with default behavior
// document.querySelectorAll('.category-buttons a').forEach((link) => {
//   link.addEventListener('click', (event) => {
//     // If the user is holding Ctrl or using MMB, let the default behavior handle it
//     if (event.ctrlKey || event.metaKey || event.button === 1) {
//       return; // Allow the link to open in a new tab/window
//     }

//     // Otherwise, prevent the default behavior and handle the click
//     event.preventDefault();
//     const categoryName = link.textContent.trim();
//     openCategoryPage(categoryName);
//   });
// });

// Tooltip functions (if needed)
function showTooltip() {
  document.getElementById("tooltip").style.display = "block";
}

function hideTooltip() {
  document.getElementById("tooltip").style.display = "none";
}

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
