document.addEventListener("DOMContentLoaded", () => {
  const itemTable = document.getElementById("item-rows");
  const addItemBtn = document.getElementById("add-item");
  const subtotalEl = document.getElementById("subtotal");
  const discountEl = document.getElementById("discount");
  const taxEl = document.getElementById("tax");
  const totalEl = document.getElementById("total");
  const amountPaidEl = document.getElementById("amount-paid");
  const balanceDueEl = document.getElementById("balance-due");
  const downloadBtn = document.getElementById("download-pdf");
  const logoUpload = document.getElementById("logo-upload");
  const logoPreview = document.getElementById("logo-preview");
  const changeLogoBtn = document.getElementById("change-logo");
  let logoDataUrl = null;

  // Handle logo upload
  logoUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        logoDataUrl = e.target.result;
        logoPreview.src = logoDataUrl;
        logoPreview.style.display = "block";
        logoUpload.style.display = "none";
        changeLogoBtn.style.display = "block";
      };
      reader.readAsDataURL(file);
    }
  });

  // Handle "Change Logo" button click
  changeLogoBtn.addEventListener("click", () => {
    logoUpload.style.display = "block";
    changeLogoBtn.style.display = "none";
    logoPreview.src = "";
    logoPreview.style.display = "block";
    logoDataUrl = null;
    logoUpload.value = "";
  });

  // Add new item row
  addItemBtn.addEventListener("click", () => {
    const row = document.createElement("tr");
    row.innerHTML = `
              <td><input type="text" class="item-desc" placeholder="Description of item/service..."></td>
              <td><input type="number" class="quantity" value="1" min="1"></td>
              <td><input type="number" class="rate" value="0" min="0" step="0.01"></td>
              <td class="amount">$0.00</td>
              <td><button class="remove-item">✖</button></td>
          `;
    itemTable.appendChild(row);
    attachEventListeners(row);
    calculateTotal();
  });

  // Attach event listeners to inputs in a row
  function attachEventListeners(row) {
    const quantityInput = row.querySelector(".quantity");
    const rateInput = row.querySelector(".rate");
    const removeBtn = row.querySelector(".remove-item");

    quantityInput.addEventListener("input", calculateTotal);
    rateInput.addEventListener("input", calculateTotal);
    removeBtn.addEventListener("click", () => {
      row.remove();
      calculateTotal();
    });
  }

  // Initial event listeners for the first row
  document
    .querySelectorAll("#item-rows tr")
    .forEach((row) => attachEventListeners(row));

  // Recalculate totals on discount or tax change
  discountEl.addEventListener("input", calculateTotal);
  taxEl.addEventListener("input", calculateTotal);

  // Calculate totals
  function calculateTotal() {
    let subtotal = 0;

    document.querySelectorAll("#item-rows tr").forEach((row) => {
      const quantity = parseFloat(row.querySelector(".quantity").value) || 0;
      const rate = parseFloat(row.querySelector(".rate").value) || 0;
      const amount = quantity * rate;
      row.querySelector(".amount").textContent = `$${amount.toFixed(2)}`;
      subtotal += amount;
    });

    const discountPercent = parseFloat(discountEl.value) || 0;
    const taxPercent = parseFloat(taxEl.value) || 0;

    const discountAmount = (subtotal * discountPercent) / 100;
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = (taxableAmount * taxPercent) / 100;
    const total = taxableAmount + taxAmount;
    const amountPaid = 0;
    const balanceDue = total - amountPaid;

    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    totalEl.textContent = `$${total.toFixed(2)}`;
    amountPaidEl.textContent = `$${total.toFixed(2)}`;
    balanceDueEl.textContent = `$${balanceDue.toFixed(2)}`;
  }

  // Download PDF
  downloadBtn.addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    if (logoDataUrl) {
      const img = new Image();
      img.src = logoDataUrl;
      img.onload = () => {
        const imgWidth = img.width;
        const imgHeight = img.height;
        const minPdfWidth = 66;
        let pdfWidth = minPdfWidth;
        let pdfHeight = (imgHeight / imgWidth) * pdfWidth;

        if (pdfWidth > 190) {
          pdfWidth = 190;
          pdfHeight = (imgHeight / imgWidth) * pdfWidth;
        }

        if (pdfHeight > 50) {
          pdfHeight = 50;
          pdfWidth = (imgWidth / imgHeight) * pdfHeight;
        }

        doc.addImage(logoDataUrl, "PNG", 10, 10, pdfWidth, pdfHeight);
        continuePDFGeneration(doc);
      };
      img.onerror = () => {
        continuePDFGeneration(doc);
      };
    } else {
      continuePDFGeneration(doc);
    }

    function continuePDFGeneration(doc) {
      // Add title and invoice number
      doc.setFontSize(18);
      doc.text("INVOICE", 10, 50);
      doc.setFontSize(12);
      doc.text(
        `Invoice Number\n ${document.getElementById("invoice-number").value}`,
        180,
        50,
        { align: "right" }
      );
      // Add Asset Number below Invoice Number
      doc.text(
        `Asset Number\n ${
          document.getElementById("asset-number").value || "N/A"
        }`,
        180,
        60,
        { align: "right" }
      );

      // Add Address above Billing From
      doc.text("Address:", 10, 70);
      const address = document.getElementById("address").value || "N/A";
      const addressLines = doc.splitTextToSize(address, 180); // Wrap text if too long
      doc.text(addressLines, 10, 75);

      // Adjust position of sender, receiver, and details based on address lines
      const addressHeight = addressLines.length * 5; // Approx 5mm per line
      const nextY = 75 + addressHeight + 5; // Add some padding

      // Sender, receiver, and details
      doc.text("From:", 10, nextY);
      doc.text(
        document.querySelector(".from textarea").value.split("\n"),
        10,
        nextY + 10
      );
      doc.text("Bill To:", 70, nextY);
      doc.text(
        document.querySelector(".to textarea").value.split("\n"),
        70,
        nextY + 10
      );
      doc.text("Date:", 140, nextY);
      doc.text(
        document.querySelector('.details input[type="date"]').value,
        140,
        nextY + 10
      );

      // Prepare table data for items
      const tableData = [];
      document.querySelectorAll("#item-rows tr").forEach((row) => {
        const desc = row.querySelector(".item-desc").value || "N/A";
        const qty = row.querySelector(".quantity").value || "0";
        const rate = row.querySelector(".rate").value || "0";
        const amount = row.querySelector(".amount").textContent || "$0.00";
        tableData.push([desc, qty, `$${rate}`, amount]);
      });

      // Add items table using autoTable
      doc.autoTable({
        startY: nextY + 30, // Adjust table start based on previous content
        head: [["Description", "Quantity", "Rate", "Amount"]],
        body: tableData,
        theme: "grid",
        styles: { fontSize: 10, cellPadding: 2 },
        headStyles: { fillColor: [4, 61, 98] },
        columnStyles: {
          0: { cellWidth: 80 },
          1: { cellWidth: 30, halign: "center" },
          2: { cellWidth: 30, halign: "right" },
          3: { cellWidth: 40, halign: "right" },
        },
      });

      // Add totals below the table
      let finalY = doc.lastAutoTable.finalY + 10;
      doc.text(`Subtotal: ${subtotalEl.textContent}`, 140, finalY);
      finalY += 10;
      doc.text(`Total: ${totalEl.textContent}`, 140, finalY);
      finalY += 10;
      doc.text(`Balance Due: ${balanceDueEl.textContent}`, 140, finalY);
      finalY += 20;

      // Add notes
      doc.text("Notes:", 10, finalY);
      const notes =
        document.querySelector(".notes-terms textarea").value || "N/A";
      const notesLines = doc.splitTextToSize(notes, 180);
      doc.text(notesLines, 10, finalY + 10);

      // Save PDF
      doc.save("invoice.pdf");
    }
  });
});
