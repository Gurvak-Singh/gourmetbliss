// GourmetBliss Animation and Performance Scripts

// Intersection Observer for scroll animations
document.addEventListener('DOMContentLoaded', function() {
  // Helper function to create and configure IntersectionObserver
  function createScrollObserver(elements, animationClass, threshold = 0.1, rootMargin = '0px') {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animationClass);
            // Once the animation is applied, we don't need to observe it anymore
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null, // viewport
        threshold: threshold,
        rootMargin: rootMargin
      }
    );

    // Start observing elements
    elements.forEach((el) => observer.observe(el));
    return observer;
  }

  // Apply animations to different element types
  const fadeElements = document.querySelectorAll('.fade-in-element');
  if (fadeElements.length > 0) {
    createScrollObserver(fadeElements, 'fade-in-visible');
  }

  const slideElements = document.querySelectorAll('.slide-up-element');
  if (slideElements.length > 0) {
    createScrollObserver(slideElements, 'slide-up-visible');
  }

  const scaleElements = document.querySelectorAll('.scale-element');
  if (scaleElements.length > 0) {
    createScrollObserver(scaleElements, 'scale-visible');
  }

  // Staggered animations for card grids
  const cardContainers = document.querySelectorAll('.stagger-container');
  cardContainers.forEach(container => {
    const cards = container.querySelectorAll('.stagger-item');
    if (cards.length > 0) {
      cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
      });
      createScrollObserver([container], 'stagger-visible');
    }
  });

  // NEW: Performance optimization for background images
  const bgElements = document.querySelectorAll('[data-bg-image]');
  
  const bgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const imageUrl = element.getAttribute('data-bg-image');
        
        // Create an image to preload
        const img = new Image();
        img.onload = function() {
          // Once image is loaded, apply it to the background
          element.style.backgroundImage = `url('${imageUrl}')`;
          element.classList.add('bg-loaded');
        };
        img.src = imageUrl;
        
        bgObserver.unobserve(element);
      }
    });
  }, { rootMargin: '200px' }); // Load images a bit before they come into view
  
  bgElements.forEach(element => {
    // Add a low-quality placeholder if not already set
    if (!element.style.backgroundImage) {
      element.style.backgroundColor = '#f3f4f6'; // Light gray placeholder
    }
    bgObserver.observe(element);
  });
  
  // NEW: Detect and optimize all hero sections even without data-bg-image
  const heroSections = document.querySelectorAll('.parallax-hero');
  heroSections.forEach(hero => {
    if (!hero.hasAttribute('data-bg-image') && hero.style.backgroundImage) {
      // Extract URL from inline style if present
      const bgUrl = hero.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
      if (bgUrl) {
        // Set a placeholder and use the original as data-bg-image
        const originalBg = hero.style.backgroundImage;
        hero.style.backgroundImage = 'none';
        hero.setAttribute('data-bg-image', bgUrl);
        hero.style.backgroundColor = '#1a202c'; // Dark placeholder for hero
        bgObserver.observe(hero);
      }
    }
  });
});

// Performance optimizations
document.addEventListener('DOMContentLoaded', function() {
  // Lazy load background images
  const lazyBackgrounds = document.querySelectorAll('.lazy-background');
  
  if ('IntersectionObserver' in window && lazyBackgrounds.length > 0) {
    const backgroundObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lazyBackground = entry.target;
          const dataSrc = lazyBackground.getAttribute('data-background-src');
          
          if (dataSrc) {
            lazyBackground.style.backgroundImage = `url('${dataSrc}')`;
            lazyBackground.removeAttribute('data-background-src');
            backgroundObserver.unobserve(lazyBackground);
          }
        }
      });
    });

    lazyBackgrounds.forEach(lazyBackground => {
      backgroundObserver.observe(lazyBackground);
    });
  }
});
