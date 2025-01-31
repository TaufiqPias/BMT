// Save bid as a note
document.getElementById('MSForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const bidPrefix = document.getElementById('bidPrefix').value;
    const rqtype = document.getElementById('rqtype').value;
    const servic = document.getElementById('servic').value;
    const propsize = document.getElementById('propsize').value;
    const additionalInfo = document.getElementById('additionalInfo').value;
    const conj = document.getElementById('conj').value;
    const price = parseFloat(document.getElementById('price').value);

    // Format the price with commas
    const formattedPrice = price.toLocaleString('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    // Generate the bid text
    const bidText = `${bidPrefix} ${rqtype} Need to perform ${servic} on ${propsize} SF of property including but not limited to complete cleaning and replacing air freshener. ${conj ? `***Must be approved in conjunction to ${conj} bid.***` : ''} ${additionalInfo}\nPrice: $${formattedPrice}`;
    // Save the bid as a note
    saveBidAsNote(bidText);
});

// Function to save bid as a note
function saveBidAsNote(bidText) {
    const notesList = document.getElementById('notesList');

    // Replace newline characters with <br> tags for HTML formatting
    const formattedBidText = bidText.replace(/\n/g, '<br>');

    // Create a new note element
    const note = document.createElement('div');
    note.className = 'note';
    note.innerHTML = `
        <p>${formattedBidText}</p>
        <span class="copy-icon">📄</span> <!-- Copy icon -->
    `;

    // Add the note to the notes list
    notesList.appendChild(note);

    // Add click event to the copy icon
    const copyIcon = note.querySelector('.copy-icon');
    copyIcon.addEventListener('click', function() {
        navigator.clipboard.writeText(bidText)
            .then(() => {
                // Show the floating message
                const floatingMessage = document.getElementById('floatingMessage');
                floatingMessage.textContent = 'Copied!';
                floatingMessage.classList.add('show');

                // Hide the message after 2 seconds
                setTimeout(() => {
                    floatingMessage.classList.remove('show');
                }, 2000);
            })
            .catch(() => {
                alert('Failed to copy bid. Please try again.');
            });
    });

    // Scroll to the bottom of the notes list
    notesList.scrollTop = notesList.scrollHeight;
}

// Copy All Bids Functionality
document.getElementById('copyAllBidsButton').addEventListener('click', function() {
    const notes = document.querySelectorAll('.note p');
    let allBidsText = '';

    // Concatenate all bids into a single string
    notes.forEach(note => {
        allBidsText += note.textContent + '\n\n'; // Add a blank line between bids
    });

    // Copy the concatenated bids to the clipboard
    navigator.clipboard.writeText(allBidsText.trim())
        .then(() => {
            // Show the floating message
            const floatingMessage = document.getElementById('floatingMessage');
            floatingMessage.textContent = 'All bids copied!';
            floatingMessage.classList.add('show');

            // Hide the message after 2 seconds
            setTimeout(() => {
                floatingMessage.classList.remove('show');
            }, 2000);
        })
        .catch(() => {
            alert('Failed to copy bids. Please try again.');
        });
});

// Save in Final Bids Functionality
document.getElementById('saveInFinalBidsButton').addEventListener('click', function() {
    const notes = document.querySelectorAll('.note p');
    let allBids = [];

    // Collect all bids into an array
    notes.forEach(note => {
        allBids.push(note.textContent);
    });

    // Retrieve existing bids from localStorage (if any)
    const existingBids = JSON.parse(localStorage.getItem('finalBids')) || [];

    // Append new bids to the existing bids (avoid duplicates)
    const updatedBids = [...new Set([...existingBids, ...allBids])];

    // Save the updated bids to localStorage
    localStorage.setItem('finalBids', JSON.stringify(updatedBids));

});



document.getElementById('saveInFinalBidsButton').addEventListener('click', function() {
    const notes = document.querySelectorAll('.note p');
    let allBidsText = '';

    // Concatenate all bids into a single string
    notes.forEach(note => {
        allBidsText += note.textContent + '\n\n'; // Add a blank line between bids
    });

    // Save the concatenated bids to localStorage
    localStorage.setItem('finalBids', allBidsText.trim());

    // Create a floating message element
    const floatingMessage = document.createElement('div');
    floatingMessage.textContent = 'Bids saved in Final Bids section!';
    
    // Apply inline styles for the floating message
    floatingMessage.style.position = 'fixed';
    floatingMessage.style.bottom = '20px';
    floatingMessage.style.right = '20px';
    floatingMessage.style.backgroundColor = '#4CAF50'; // Green background
    floatingMessage.style.color = 'white'; // White text
    floatingMessage.style.padding = '10px 20px';
    floatingMessage.style.borderRadius = '5px';
    floatingMessage.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    floatingMessage.style.zIndex = '1000';
    floatingMessage.style.transition = 'opacity 0.5s ease-out';
    floatingMessage.style.fontFamily = 'Arial, sans-serif';
    floatingMessage.style.fontSize = '36px';
    floatingMessage.style.opacity = '1'; // Start fully visible

    // Append the floating message to the body
    document.body.appendChild(floatingMessage);

    // Remove the floating message after 3 seconds
    setTimeout(() => {
        floatingMessage.style.opacity = '0'; // Fade out
        setTimeout(() => {
            document.body.removeChild(floatingMessage); // Remove from DOM after fade-out
        }, 500); // Wait for the fade-out transition to complete
    }, 2000); // Show for 2 seconds
});

// Save in Final Bids Functionality
document.getElementById('saveInFinalBidsButton').addEventListener('click', function() {
    const notes = document.querySelectorAll('.note p');
    let allBids = [];

    // Collect all bids into an array
    notes.forEach(note => {
        allBids.push(note.textContent);
    });

    // Save the bids to localStorage
    localStorage.setItem('finalBids', JSON.stringify(allBids));

});

const updatedBids = [...new Set([...existingBids, ...allBids])];