// Add item to quotation
function addToQuotation(button) {
  const row = button.closest("tr");
  const category = row.cells[0].innerText;
  const description = row.cells[1].innerText;
  const uom = row.cells[2].innerText;
  const price = parseFloat(row.cells[3].innerText.replace("$", ""));
  const unitInput = row.querySelector('input[type="number"]').value;
  const unit = parseInt(unitInput) || 0;

  if (unit <= 0) {
    showFloatingMessage("Please enter a valid unit quantity");
    return;
  }

  const total = (price * unit).toFixed(2);
  const quotationTable = document
    .getElementById("quotation-table")
    .querySelector("tbody");
  const newRow = quotationTable.insertRow();
  newRow.innerHTML = `
    <td data-label="Category:">${category}</td>
    <td data-label="Description:">${description}</td>
    <td data-label="UOM:">${uom}</td>
    <td data-label="Prices:">$${price.toFixed(2)}</td>
    <td data-label="Unit:">${unit}</td>
    <td data-label="Total:">$${total}</td>
  `;
  updateTotalPrice();
}

// Update total price
function updateTotalPrice() {
  const rows = document.querySelectorAll("#quotation-table tbody tr");
  const total = Array.from(rows).reduce((sum, row) => {
    const totalCell = row.cells[5].innerText.replace("$", "");
    return sum + parseFloat(totalCell) || 0;
  }, 0);
  document.getElementById("total-price").innerText = total.toFixed(2);
}

// Clear quotation table
function clearQuotation(event) {
  const quotationTable = document
    .getElementById("quotation-table")
    .querySelector("tbody");
  quotationTable.innerHTML = "";
  updateTotalPrice();

  // Reset all unit input fields in pricing-table
  const unitInputs = document
    .getElementById("pricing-table")
    .querySelectorAll('input[type="number"]');
  unitInputs.forEach((input) => {
    input.value = ""; // Or input.value = "0" if you prefer
  });

  // Update total price
  updateTotalPrice();
}

// Print quotation
function printQuotation(event) {
  try {
    window.print();
  } catch (e) {
    showFloatingMessage("Printing failed. Please try again.");
  }
}

// Show floating message
function showFloatingMessage(message) {
  const floatingMessage = document.getElementById("floatingMessage");
  floatingMessage.textContent = message;
  floatingMessage.classList.add("show");
  setTimeout(() => {
    floatingMessage.classList.remove("show");
  }, 3000);
}

// Search filter logic
let allRows = [];

function initializeTable() {
  const tableBody = document.getElementById("priceTable");
  if (!tableBody) {
    console.error("Table body with ID 'priceTable' not found.");
    return;
  }

  allRows = Array.from(tableBody.getElementsByTagName("tr"));
  console.log(`Total rows captured: ${allRows.length}`);
  setupSearch();
}

function setupSearch() {
  const searchInput = document.getElementById("search");
  if (!searchInput) {
    console.error("Search input with ID 'search' not found.");
    return;
  }

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const tableBody = document.getElementById("priceTable");
    tableBody.innerHTML = "";

    const filteredRows = allRows.filter((row) =>
      Array.from(row.cells).some((cell) =>
        cell.innerText.toLowerCase().includes(searchTerm)
      )
    );

    console.log(
      `Search term: "${searchTerm}", matching rows: ${filteredRows.length}`
    );
    filteredRows.forEach((row) => {
      const clonedRow = row.cloneNode(true);
      tableBody.appendChild(clonedRow);
      const button = clonedRow.querySelector("button");
      if (button) {
        button.onclick = () => addToQuotation(button);
      }
    });
  });
}

// Disable context menu and Ctrl+C
document.addEventListener("contextmenu", (event) => event.preventDefault());
document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key === "c") {
    event.preventDefault();
    showFloatingMessage("Copying is disabled");
  }
});

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  initializeTable();

  const printBtn = document.getElementById("print-btn");
  const clearBtn = document.getElementById("clear-btn");

  if (printBtn) {
    printBtn.addEventListener("click", printQuotation);
    // Handle touch devices carefully
    printBtn.addEventListener(
      "touchend",
      (event) => {
        event.preventDefault(); // Prevent synthetic click
        printQuotation(event);
      },
      { passive: false }
    );
  } else {
    console.error("Print button not found");
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", clearQuotation);
    clearBtn.addEventListener(
      "touchend",
      (event) => {
        event.preventDefault();
        clearQuotation(event);
      },
      { passive: false }
    );
  }
});
