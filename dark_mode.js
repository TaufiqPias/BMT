// Function to initialize the toggle button text based on the current mode
function initializeButton() {
  const toggleButton = document.getElementById("darkModeToggle");
  const isDarkMode = document.documentElement.classList.contains("dark-mode");
  toggleButton.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
}

// Function to toggle the mode and save to localStorage
function toggleMode() {
  const toggleButton = document.getElementById("darkModeToggle");
  document.documentElement.classList.toggle("dark-mode");

  // Update button text and save preference
  const isDarkMode = document.documentElement.classList.contains("dark-mode");
  toggleButton.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
  localStorage.setItem("themeMode", isDarkMode ? "dark" : "light");
}

// Initialize button text on page load
document.addEventListener("DOMContentLoaded", initializeButton);

// Add event listener for toggle button
document.getElementById("darkModeToggle").addEventListener("click", toggleMode);
