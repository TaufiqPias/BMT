// Toggle dark mode on button click
// Function to initialize the mode based on localStorage
function initializeMode() {
  // Check if a mode is stored in localStorage
  const savedMode = localStorage.getItem("themeMode");
  const toggleButton = document.getElementById("darkModeToggle");

  // If a mode is saved, apply it; otherwise, default to light mode
  if (savedMode === "dark") {
    document.body.classList.add("dark-mode");
    toggleButton.textContent = "Light Mode";
  } else {
    document.body.classList.remove("dark-mode");
    toggleButton.textContent = "Dark Mode";
  }
}

// Function to toggle the mode and save to localStorage
function toggleMode() {
  const toggleButton = document.getElementById("darkModeToggle");
  document.body.classList.toggle("dark-mode");

  // Update button text and save preference
  const isDarkMode = document.body.classList.contains("dark-mode");
  toggleButton.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
  localStorage.setItem("themeMode", isDarkMode ? "dark" : "light");
}

// Initialize mode on page load
document.addEventListener("DOMContentLoaded", initializeMode);

// Add event listener for toggle button
document.getElementById("darkModeToggle").addEventListener("click", toggleMode);
