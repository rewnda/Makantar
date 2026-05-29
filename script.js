document.addEventListener('DOMContentLoaded', () => {
  // Set initial state for animated elements
  const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-fade-in-delay, .animate-fade-in-delay-2');
  animatedElements.forEach(el => {
    el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-500');
  });

  // Add delay classes for staggered animation
  const delay1 = document.querySelector('.animate-fade-in-delay');
  const delay2 = document.querySelector('.animate-fade-in-delay-2');

  if (delay1) delay1.classList.add('delay-200');
  if (delay2) delay2.classList.add('delay-300');

  // Run animation on scroll initially
  animateOnScroll();

  // Load initial batch of cards
  loadCards();
});

// Animate elements on scroll
window.addEventListener('scroll', animateOnScroll);

// Navbar scroll effect (add/remove class 'scrolled')
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');

    if (!mobileMenu.classList.contains('hidden')) {
      mobileMenuButton.innerHTML = '<i class="fas fa-times"></i>';
    } else {
      mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
}

// Load more cards button event
const loadMoreBtn = document.getElementById('load-more');
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', loadCards);
}

// Search box show/hide on hover and scroll
const navbar = document.querySelector('nav.navbar');
const searchBox = document.getElementById('search-box');

function showSearch() {
  if (searchBox) searchBox.classList.remove('hidden');
}

function hideSearch() {
  if (searchBox) searchBox.classList.add('hidden');
}

if (navbar && searchBox) {
  navbar.addEventListener('mouseenter', showSearch);
  navbar.addEventListener('mouseleave', () => {
    if (window.scrollY < 100) {
      hideSearch();
    }
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      showSearch();
    } else {
      hideSearch();
    }
  });
}
