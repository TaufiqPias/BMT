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
