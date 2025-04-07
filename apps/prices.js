// Function to add item to the quotation
function addToQuotation(button) {
    const row = button.closest('tr');
    const category = row.cells[0].innerText;
    const description = row.cells[1].innerText;
    const uom = row.cells[2].innerText;
    const price = parseFloat(row.cells[3].innerText.replace('$', ''));
    const unit = parseInt(row.querySelector('input[type="number"]').value);
    const total = (price * unit).toFixed(2);

    // Add row to the quotation table
    const quotationTable = document.getElementById('quotation-table').getElementsByTagName('tbody')[0];
    const newRow = quotationTable.insertRow();
    newRow.innerHTML = `
      <td>${category}</td>
      <td>${description}</td>
      <td>${uom}</td>
      <td>$${price.toFixed(2)}</td>
      <td>${unit}</td>
      <td>$${total}</td>
    `;

    // Update total price
    updateTotalPrice();
  }

    // Function to update the total price
  function updateTotalPrice() {
    const rows = document.querySelectorAll('#quotation-table tbody tr');
    let total = 0;
    rows.forEach(row => {
      const totalCell = row.cells[5].innerText.replace('$', '');
      total += parseFloat(totalCell);
    });
    document.getElementById('total-price').innerText = total.toFixed(2);
  }
  

  // Function to print the quotation
  function printQuotation() {
    window.print();
  }

  // Function to refresh the page
  function refreshPage() {
    location.reload(); // Reloads the current page
  }

  document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
  });

  // Function to show the floating message
  function showFloatingMessage(message) {
    const floatingMessage = document.getElementById("floatingMessage");
    floatingMessage.textContent = message;
    floatingMessage.classList.add("show");

    // Hide the message after 3 seconds
    setTimeout(() => {
      floatingMessage.classList.remove("show");
    }, 3000);
  }

  // Disable Ctrl+C and show the floating message
  document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === "c") {
      event.preventDefault();
      showFloatingMessage("Request Denied");
    }
  });
  
