// Script to disable any popups on the site
document.addEventListener('DOMContentLoaded', function() {
  // Find the menu button and add a direct click handler
  const menuButton = document.getElementById('menu-button');
  if (menuButton) {
    menuButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      window.location.href = 'pages/menu.html';
    });
  }
  
  // Disable any potential popup triggers
  window.addEventListener('beforeunload', function(e) {
    // Cancel the event
    e.preventDefault();
    // Chrome requires returnValue to be set
    e.returnValue = '';
    // But we want to make sure it's empty for our menu button
    return null;
  }, {capture: true});
});
