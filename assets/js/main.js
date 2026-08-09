/**
 * MOYKA EXECUTIVE ADVISORY - MAIN JAVASCRIPT
 * Handles mobile drawer, sticky header state, active nav, floating gold scroll indicator,
 * Tadbeer-style scroll text reveal animations, Cuberto-style interactive custom cursor,
 * and the Proprietary EXPAND™ Framework Component.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initHeaderScroll();
  initActiveNavLink();
  initScrollIndicatorWidget();
  initScrollTextAnimations();
  initCubertoCursor();
  initExpandFramework();
  initFounderParallax();
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
 * Floating Executive Scroll Indicator Widget featuring M&Ouml;YKA Gold Emblem
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
    <img src="assets/images/moyka-emblem.png" alt="M&Ouml;YKA Gold Emblem" class="scroll-indicator-emblem" id="scroll-emblem-img">
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

/**
 * Executive Scroll Text & Element Reveal Animation Engine (Tadbeer & Cuberto Style Scroll Motion)
 * Automatically attaches observers to section headings, text blocks, cards, and grid items.
 * Animates text dynamically when scrolling up or down on any page.
 */
function initScrollTextAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const selectors = [
    'section .badge-tag',
    'section h1',
    'section h2',
    'section h3',
    'section .lead',
    'section p:not(.badge-tag)',
    '.card-executive',
    '.matrix-card-negative',
    '.matrix-card-positive',
    '.partner-row-clean .logo-card-item',
    '.expand-step-item',
    '.process-step-card',
    '.insight-card',
    '.toolkit-card',
    '.hero-grid > div',
    '.founder-seamless-container'
  ];

  // Target ALL hero text elements across all pages for slow left slide reveal
  const heroTextElements = document.querySelectorAll('main > section:first-of-type .badge-tag, main > section:first-of-type h1, main > section:first-of-type .lead, main > section:first-of-type p, .hero-section .badge-tag, .hero-section h1, .hero-section .lead, .hero-section p');
  
  heroTextElements.forEach((el, index) => {
    el.classList.add('scroll-reveal');
    el.classList.add('scroll-reveal-left');
    el.style.setProperty('--reveal-delay', `${(index * 0.12) + 0.08}s`);
  });

  const elementsToAnimate = document.querySelectorAll(selectors.join(', '));

  elementsToAnimate.forEach((el) => {
    if (!el.classList.contains('scroll-reveal')) {
      el.classList.add('scroll-reveal');

      if (el.tagName === 'H1') {
        el.classList.add('scroll-reveal-left');
      } else if (el.tagName === 'H2') {
        el.classList.add('scroll-reveal-up');
      } else if (el.classList.contains('badge-tag')) {
        el.classList.add('scroll-reveal-text');
      } else if (el.classList.contains('logo-card-item') || el.classList.contains('toolkit-card')) {
        el.classList.add('scroll-reveal-scale');
      }
    }
  });

  const gridContainers = document.querySelectorAll('.partner-row-clean, .grid-3col, .matrix-grid, .toolkit-grid, .insights-grid');
  gridContainers.forEach((container) => {
    const children = container.querySelectorAll('.scroll-reveal');
    children.forEach((child, index) => {
      const staggerClass = `stagger-${(index % 6) + 1}`;
      child.classList.add(staggerClass);
    });
  });

  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
      document.body.classList.add('scrolling-down');
      document.body.classList.remove('scrolling-up');
    } else if (currentScrollY < lastScrollY) {
      document.body.classList.add('scrolling-up');
      document.body.classList.remove('scrolling-down');
    }
    lastScrollY = currentScrollY;
  }, { passive: true });

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.12
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      } else {
        const rect = entry.boundingClientRect;
        if (rect.top > window.innerHeight || rect.bottom < 0) {
          entry.target.classList.remove('is-revealed');
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll('.scroll-reveal').forEach((el) => {
    revealObserver.observe(el);

    // Immediate viewport check for elements visible on initial page load
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('is-revealed');
    }
  });
}

/**
 * Cuberto Interactive Custom Cursor & Card Magnets
 */
function initCubertoCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (document.getElementById('cb-cursor')) return;

  const cursor = document.createElement('div');
  cursor.id = 'cb-cursor';
  cursor.className = 'cb-custom-cursor';
  document.body.appendChild(cursor);

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.classList.add('is-active');
  }, { passive: true });

  function renderCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Link & Button hover triggers
  const interactiveItems = document.querySelectorAll('a, button, .btn, .badge-tag, .nav-link, .expand-node-btn');
  interactiveItems.forEach((item) => {
    item.addEventListener('mouseenter', () => cursor.classList.add('is-hovered'));
    item.addEventListener('mouseleave', () => cursor.classList.remove('is-hovered'));
  });

  // Card hover triggers
  const cardItems = document.querySelectorAll('.card-executive, .matrix-card-positive, .matrix-card-negative, .logo-card-item, .process-step-card, .insight-card, .toolkit-card, .expand-card-body');
  cardItems.forEach((card) => {
    card.addEventListener('mouseenter', () => cursor.classList.add('is-card-hovered'));
    card.addEventListener('mouseleave', () => cursor.classList.remove('is-card-hovered'));
  });
}

/**
 * Proprietary EXPAND™ Strategic Methodology Component Engine
 * Handles progressive node entrance, SVG travel line, interactive stage card switching,
 * and scroll-driven natural stage progression.
 */
function initExpandFramework() {
  const frameworkSec = document.getElementById('expand-framework-section');
  if (!frameworkSec) return;

  const nodeBtns = frameworkSec.querySelectorAll('.expand-node-btn');
  const stageCards = frameworkSec.querySelectorAll('.expand-stage-card');
  const travelDot = frameworkSec.querySelector('.expand-travel-dot');

  if (!nodeBtns.length) return;

  let activeIndex = 0;

  function setActiveStage(index) {
    if (index < 0 || index >= nodeBtns.length) return;
    activeIndex = index;

    // Update node buttons
    nodeBtns.forEach((btn, i) => {
      if (i === index) {
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('is-active');
        btn.setAttribute('aria-selected', 'false');
      }
    });

    // Update active card
    stageCards.forEach((card, i) => {
      if (i === index) {
        card.classList.add('is-active');
      } else {
        card.classList.remove('is-active');
      }
    });

    // Move SVG travel dot along the connector track
    if (travelDot) {
      const stepPct = (index / (nodeBtns.length - 1)) * 100;
      travelDot.setAttribute('cx', `${stepPct}%`);
    }
  }

  // Node click and hover event listeners
  nodeBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => setActiveStage(index));
    btn.addEventListener('mouseenter', () => setActiveStage(index));
  });

  // Sequential viewport entrance animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        nodeBtns.forEach((btn, i) => {
          setTimeout(() => {
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
          }, i * 90);
        });
        setActiveStage(0);
      }
    });
  }, { threshold: 0.15 });

  observer.observe(frameworkSec);

  // Scroll progress auto-advance (natural scroll without scroll-jacking)
  window.addEventListener('scroll', () => {
    const rect = frameworkSec.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight * 0.7 && rect.bottom > windowHeight * 0.3) {
      const totalScrollable = rect.height;
      const currentProgress = (windowHeight * 0.7 - rect.top) / totalScrollable;
      const targetIndex = Math.min(Math.max(Math.floor(currentProgress * nodeBtns.length), 0), nodeBtns.length - 1);
      if (targetIndex !== activeIndex) {
        setActiveStage(targetIndex);
      }
    }
  }, { passive: true });
}

/**
 * Desktop Dampened Mouse Parallax for Founder Portrait Section (Strategic Aura)
 */
function initFounderParallax() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const founderContainers = document.querySelectorAll('.founder-seamless-container');
  if (!founderContainers.length) return;

  founderContainers.forEach(container => {
    const img = container.querySelector('.founder-seamless-img');
    const orbital = container.querySelector('.founder-orbital-svg');
    const signals = container.querySelectorAll('.founder-signal-point');
    const specks = container.querySelector('.founder-specks-container');

    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - (rect.width / 2);
      const y = e.clientY - rect.top - (rect.height / 2);

      const percentX = x / (rect.width / 2);
      const percentY = y / (rect.height / 2);

      if (specks) specks.style.transform = `translate3d(${percentX * 5}px, ${percentY * 5}px, 0)`;
      if (orbital) orbital.style.transform = `translate3d(${percentX * 3}px, ${percentY * 3}px, 0)`;
      signals.forEach(s => s.style.transform = `translate3d(${percentX * 3.5}px, ${percentY * 3.5}px, 0) scale(1)`);
      if (img) img.style.transform = `translate3d(${percentX * 1.5}px, ${percentY * 1.5}px, 0)`;
    });

    container.addEventListener('mouseleave', () => {
      if (specks) specks.style.transform = 'translate3d(0, 0, 0)';
      if (orbital) orbital.style.transform = 'translate3d(0, 0, 0)';
      signals.forEach(s => s.style.transform = 'translate3d(0, 0, 0) scale(1)');
      if (img) img.style.transform = 'translate3d(0, 0, 0)';
    });
  });
}
