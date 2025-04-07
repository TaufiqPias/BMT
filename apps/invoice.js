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
  let logoDataUrl = null; // To store the logo for PDF generation

  // Handle logo upload
  logoUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        logoDataUrl = e.target.result; // Store for PDF
        logoPreview.src = logoDataUrl;
        logoPreview.style.display = "block"; // Ensure the preview is visible
        logoUpload.style.display = "none"; // Hide the input after upload
        changeLogoBtn.style.display = "block"; // Show the "Change Logo" button
      };
      reader.readAsDataURL(file);
    }
  });

  // Handle "Change Logo" button click
  changeLogoBtn.addEventListener("click", () => {
    logoUpload.style.display = "block"; // Show the file input again
    changeLogoBtn.style.display = "none"; // Hide the "Change Logo" button
    logoPreview.src = ""; // Clear the current logo preview
    logoPreview.style.display = "block"; // Keep preview visible for placeholder
    logoDataUrl = null; // Reset the stored logo data
    logoUpload.value = ""; // Clear the file input selection
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

  // Calculate totals (removed shipping)
  function calculateTotal() {
    let subtotal = 0;

    // Calculate subtotal from items
    document.querySelectorAll("#item-rows tr").forEach((row) => {
      const quantity = parseFloat(row.querySelector(".quantity").value) || 0;
      const rate = parseFloat(row.querySelector(".rate").value) || 0;
      const amount = quantity * rate;
      row.querySelector(".amount").textContent = `$${amount.toFixed(2)}`;
      subtotal += amount;
    });

    // Apply discount and tax
    const discountPercent = parseFloat(discountEl.value) || 0;
    const taxPercent = parseFloat(taxEl.value) || 0;

    const discountAmount = (subtotal * discountPercent) / 100;
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = (taxableAmount * taxPercent) / 100;
    const total = taxableAmount + taxAmount;
    const amountPaid = 0; // Static for now, can be made dynamic
    const balanceDue = total - amountPaid;

    // Update UI
    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    totalEl.textContent = `$${total.toFixed(2)}`;
    amountPaidEl.textContent = `$${total.toFixed(2)}`;
    balanceDueEl.textContent = `$${balanceDue.toFixed(2)}`;
  }

  // Download PDF
  downloadBtn.addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add logo to PDF if uploaded
    if (logoDataUrl) {
      const img = new Image();
      img.src = logoDataUrl;
      img.onload = () => {
        const imgWidth = img.width;
        const imgHeight = img.height;
        const minPdfWidth = 66; // ≈ 250px at 96 DPI (66 mm)
        let pdfWidth = minPdfWidth; // Start with minimum width
        let pdfHeight = (imgHeight / imgWidth) * pdfWidth; // Maintain aspect ratio

        // Cap at page width (190 mm to leave margin) if too wide
        if (pdfWidth > 190) {
          pdfWidth = 190;
          pdfHeight = (imgHeight / imgWidth) * pdfWidth;
        }

        // Adjust height if it exceeds a reasonable limit (e.g., 50 mm)
        if (pdfHeight > 50) {
          pdfHeight = 50;
          pdfWidth = (imgWidth / imgHeight) * pdfHeight;
        }

        doc.addImage(logoDataUrl, "PNG", 10, 10, pdfWidth, pdfHeight); // Adjusted size
        continuePDFGeneration(doc); // Continue after image is added
      };
      img.onerror = () => {
        continuePDFGeneration(doc); // Fallback if image fails to load
      };
    } else {
      continuePDFGeneration(doc); // No logo, proceed directly
    }

    // Function to continue PDF generation after logo handling
    function continuePDFGeneration(doc) {
      // Add title and invoice number
      doc.setFontSize(18);
      doc.text("INVOICE", 10, 50);
      doc.setFontSize(12);
      doc.text(
        `Invoice Number: ${document.getElementById("invoice-number").value}`,
        180,
        50,
        {
          align: "right",
        }
      );

      // Sender, receiver, and details
      doc.text("From:", 10, 70);
      doc.text(
        document.querySelector(".from textarea").value.split("\n"),
        10,
        80
      );
      doc.text("Bill To:", 70, 70);
      doc.text(
        document.querySelector(".to textarea").value.split("\n"),
        70,
        80
      );
      doc.text("Date:", 140, 70);
      doc.text(
        document.querySelector('.details input[type="date"]').value,
        140,
        80
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
        startY: 100,
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

      // Add notes with max width of 180
      doc.text("Notes:", 10, finalY);
      const notes =
        document.querySelector(".notes-terms textarea").value || "N/A";
      const notesLines = doc.splitTextToSize(notes, 180);
      doc.text(notesLines, 10, finalY + 10);
      finalY += 10 + notesLines.length * 10;

      // Add terms with max width of 180
      doc.text("Terms:", 10, finalY);
      const terms =
        document.querySelectorAll(".notes-terms textarea")[1].value || "N/A";
      const termsLines = doc.splitTextToSize(terms, 180);
      doc.text(termsLines, 10, finalY + 10);
      finalY += 10 + termsLines.length * 10;

      // Save PDF
      doc.save("invoice.pdf");
    }
  });
});
