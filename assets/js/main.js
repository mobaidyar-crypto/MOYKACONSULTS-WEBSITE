/**
 * MOYKA EXECUTIVE ADVISORY - MAIN JAVASCRIPT
 * Handles mobile drawer, sticky header state, active nav, and floating gold scroll indicator
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initHeaderScroll();
  initActiveNavLink();
  initScrollIndicatorWidget();
});

/**
 * Mobile Navigation Drawer Toggle
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');

  if (!menuBtn || !drawer) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    } else {
      drawer.classList.add('open');
      menuBtn.setAttribute('aria-expanded', 'true');
    }
  });

  // Close drawer on clicking links
  drawer.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/**
 * Sticky Header Scroll State
 */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.6)';
    } else {
      header.style.boxShadow = 'none';
    }
  });
}

/**
 * Active Navigation Link Highlight based on current page
 */
function initActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-link');

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Floating Executive Scroll Indicator Widget featuring MÖYKA Gold Emblem
 * Dynamically tracks page scroll position, rotates/moves emblem on scroll up/down, and scrolls to top on click
 */
function initScrollIndicatorWidget() {
  if (document.getElementById('scroll-indicator-widget')) return;

  const widget = document.createElement('div');
  widget.id = 'scroll-indicator-widget';
  widget.className = 'scroll-indicator-widget';
  widget.setAttribute('aria-label', 'Scroll position indicator and scroll to top');
  widget.setAttribute('title', 'Scroll to top');

  widget.innerHTML = `
    <svg class="scroll-progress-ring" viewBox="0 0 56 56">
      <circle class="scroll-progress-circle" cx="28" cy="28" r="26"></circle>
    </svg>
    <img src="assets/images/moyka-emblem.png" alt="MÖYKA Gold Emblem" class="scroll-indicator-emblem" id="scroll-emblem-img">
  `;

  document.body.appendChild(widget);

  const circle = widget.querySelector('.scroll-progress-circle');
  const emblem = widget.querySelector('#scroll-emblem-img');
  const totalLength = 164; // 2 * PI * 26

  let lastScrollY = window.scrollY;

  function updateScroll() {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    if (maxScroll <= 0) return;

    // Show/hide widget after 100px scroll
    if (scrollY > 100) {
      widget.classList.add('visible');
    } else {
      widget.classList.remove('visible');
    }

    // Calculate progress ratio (0 to 1)
    const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
    const offset = totalLength - (progress * totalLength);
    if (circle) {
      circle.style.strokeDashoffset = offset;
    }

    // Dynamic motion: rotate & tilt gold emblem based on scroll movement
    const scrollDiff = scrollY - lastScrollY;
    if (emblem) {
      const tilt = Math.min(Math.max(scrollDiff * 0.8, -25), 25);
      const scale = 1 + Math.abs(scrollDiff) * 0.005;
      emblem.style.transform = `rotate(${tilt}deg) scale(${Math.min(scale, 1.25)})`;
      
      // Reset rotation back to zero when scrolling stops
      clearTimeout(window.emblemResetTimer);
      window.emblemResetTimer = setTimeout(() => {
        emblem.style.transform = 'rotate(0deg) scale(1)';
      }, 150);
    }

    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  // Smooth scroll back to top on click
  widget.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
