// Function to add item to the quotation
function addToQuotation(button) {
  const row = button.closest("tr");
  const category = row.cells[0].innerText;
  const description = row.cells[1].innerText;
  const uom = row.cells[2].innerText;
  const price = parseFloat(row.cells[3].innerText.replace("$", ""));
  const unit = parseInt(row.querySelector('input[type="number"]').value);
  const total = (price * unit).toFixed(2);

  const quotationTable = document
    .getElementById("quotation-table")
    .getElementsByTagName("tbody")[0];
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

// Function to update the total price
function updateTotalPrice() {
  const rows = document.querySelectorAll("#quotation-table tbody tr");
  let total = 0;
  rows.forEach((row) => {
    const totalCell = row.cells[5].innerText.replace("$", "");
    total += parseFloat(totalCell);
  });
  document.getElementById("total-price").innerText = total.toFixed(2);
}

document
  .getElementById("print-btn")
  .addEventListener("touchend", printQuotation);
document
  .getElementById("clear-btn")
  .addEventListener("touchend", clearQuotation);

function clearQuotation() {
  const quotationTable = document
    .getElementById("quotation-table")
    .getElementsByTagName("tbody")[0];
  quotationTable.innerHTML = "";
  updateTotalPrice();
}

// Function to print the quotation
function printQuotation() {
  window.print();
}

// Function to refresh the page
function refreshPage() {
  location.reload();
}

// Disable context menu and Ctrl+C
document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
});

document.addEventListener("keydown", function (event) {
  if (event.ctrlKey && event.key === "c") {
    event.preventDefault();
    showFloatingMessage("Request Denied");
  }
});

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
    console.error("Table body with ID 'priceTable' not found. Retrying...");
    setTimeout(initializeTable, 500);
    return;
  }

  // Capture all rows
  allRows = Array.from(tableBody.getElementsByTagName("tr"));
  console.log(`Total rows captured: ${allRows.length}`);

  // Retry up to 3 times if no rows are found
  if (allRows.length === 0) {
    let retries = 0;
    const maxRetries = 3;
    const retryInterval = 500;

    function tryCaptureRows() {
      allRows = Array.from(tableBody.getElementsByTagName("tr"));
      console.log(`Retry ${retries + 1}: rows captured: ${allRows.length}`);

      if (allRows.length > 0 || retries >= maxRetries) {
        if (allRows.length === 0) {
          console.error(
            "No rows found in priceTable after retries. Check data loading."
          );
        }
        console.log(`Final rows captured: ${allRows.length}`);
        setupSearch();
      } else {
        retries++;
        setTimeout(tryCaptureRows, retryInterval);
      }
    }

    tryCaptureRows();
  } else {
    setupSearch();
  }
}

function setupSearch() {
  document.getElementById("search").addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const tableBody = document.getElementById("priceTable");
    tableBody.innerHTML = ""; // Clear current rows

    // Filter and display matching rows
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

document.addEventListener("DOMContentLoaded", () => {
  initializeTable();
});
