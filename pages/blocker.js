    // Block right-click context menu
    document.addEventListener('contextmenu', function (event) {
        event.preventDefault();
        alert('Right-click is disabled!');
    });

    // Block F12 key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'F12') {
            event.preventDefault();
            alert('F12 is disabled!');
        }
    });

    // Block Ctrl+Shift+I (or Cmd+Shift+I on Mac)
    document.addEventListener('keydown', function (event) {
        if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'I') {
            event.preventDefault();
            alert('Ctrl+Shift+I is disabled!');
        }
    });

// resets hidden field value to empty string
// document.addEventListener('DOMContentLoaded', function() {
//   const forms = document.querySelectorAll('Form');
  
//   forms.forEach(form => {
//     form.addEventListener('submit', function(event) {
//       // Get all form elements
//       const elements = form.querySelectorAll('input, select, textarea');
      
//       elements.forEach(element => {
//         // If element or its parent container is hidden, clear its value
//         if (window.getComputedStyle(element).display === 'none' || 
//             (element.parentElement && window.getComputedStyle(element.parentElement).display === 'none')) {
//           if (element.tagName === 'SELECT' || element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
//             element.value = ''; // Or set to 0 for numeric fields if preferred
//           }
//         }
//       });
//       // Form submission continues with modified values
//     });
//   });
// });
