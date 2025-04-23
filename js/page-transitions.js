// Page Transition System for GourmetBliss
document.addEventListener('DOMContentLoaded', function() {
  // Initialize page
  document.body.classList.add('transition-ready');
  
  // Add a delay to ensure animations are ready
  setTimeout(() => {
    document.body.classList.add('page-loaded');
  }, 100);
  
  // Get all internal links EXCEPT those with data-no-transition attribute
  const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"], a[href^="index.html"], a[href^="pages/"]');
  
  // Add click handlers to internal links
  internalLinks.forEach(link => {
    // Skip links that should navigate directly
    if (link.target === '_blank' || 
        link.getAttribute('data-no-transition') === 'true' ||
        link.classList.contains('no-transition') ||
        link.textContent.trim() === 'Explore our Menu') {
      return;
    }
    
    // Only handle links to pages within our site
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('javascript:') || 
        href.startsWith('http://') || href.startsWith('https://')) {
      return;
    }
    
    link.addEventListener('click', function(e) {
      // Prevent default navigation
      e.preventDefault();
      
      // Add exit animation
      document.body.classList.add('page-transitioning');
      document.body.classList.remove('page-loaded');
      
      // Navigate after animation completes
      setTimeout(() => {
        window.location.href = href;
      }, 300); // Match this timing with the CSS transition duration
    });
  });
  
  // Store the scroll position before leaving the page
  window.addEventListener('beforeunload', function() {
    // Only store scroll position for internal navigation
    if (!document.body.classList.contains('direct-navigation')) {
      localStorage.setItem('scrollPosition', window.scrollY);
    }
  });
  
  // Restore scroll position if coming back to a page
  if (localStorage.getItem('scrollPosition')) {
    // Only restore position if navigating back
    if (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD) {
      window.scrollTo(0, parseInt(localStorage.getItem('scrollPosition')));
    }
    localStorage.removeItem('scrollPosition');
  }
});
