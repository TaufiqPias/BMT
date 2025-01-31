// Function to handle button clicks
function openCategoryPage(category) {
    if (category === 'Tree Trimming') {
      // Redirect to the Tree Trimming page
      window.location.href = 'pages/tree_trimming.html';
    } else {
      console.log(`You clicked: ${category}. Add navigation logic for this page.`);
    }
  }
  
  // Array to store all bids
  let bids = [];
  
  // Add Categories to Final Bid
  document.getElementById('addToBid').addEventListener('click', function () {
    const categories = document.querySelectorAll('#categories input[type="checkbox"]:checked');
    const bidSummary = document.getElementById('bidSummary');
  
    // Create a new bid item
    const bidItem = document.createElement('div');
    bidItem.className = 'bid-item';
  
    // Add selected categories to the bid item
    let categoriesText = 'Categories: ';
    categories.forEach((category, index) => {
      categoriesText += category.value;
      if (index < categories.length - 1) {
        categoriesText += ', ';
      }
    });
  
    bidItem.innerHTML = `<p>${categoriesText}</p>`;
    bidSummary.appendChild(bidItem);
  
    // Add the bid to the bids array
    bids.push(categoriesText);
  });

// Function to filter categories based on search input
function filterCategories() {
  const searchInput = document.getElementById("searchInput").value.toLowerCase();
  const categories = document.querySelectorAll(".category");

  categories.forEach((category) => {
    const categoryName = category.querySelector("h3").textContent.toLowerCase();
    const buttons = category.querySelectorAll(".category-buttons button");
    let hasVisibleButtons = false;

    buttons.forEach((button) => {
      const buttonText = button.textContent.toLowerCase();
      const buttonTitle = button.getAttribute("title")?.toLowerCase() || "";

      // Check if the search input matches either the button text or the title
      if (buttonText.includes(searchInput) || buttonTitle.includes(searchInput)) {
        button.style.display = "inline-block";
        hasVisibleButtons = true;
      } else {
        button.style.display = "none";
      }
    });

    // Show or hide the entire category based on whether it has visible buttons
    if (hasVisibleButtons) {
      category.style.display = "block";
    } else {
      category.style.display = "none";
    }
  });
}
  
  // Function to open a category page (placeholder)
  function openCategoryPage(categoryName) {
    // alert(`You clicked on: ${categoryName}`);
    // Add logic to open the category page or perform other actions
    // Convert the category name to a valid file name
  const fileName = categoryName.toLowerCase().replace(/ /g, "_") + ".html";

    // Redirect to the corresponding page
    window.location.href = `pages/${fileName}`;
  }
  
  function showTooltip() {
    document.getElementById("tooltip").style.display = "block";
  }

  function hideTooltip() {
    document.getElementById("tooltip").style.display = "none";
  }


