/**
 * MOYKA EXECUTIVE ADVISORY - INTERACTIVE MODULES
 * Handles accordions, animated counters, category filters, and lead forms.
 */

document.addEventListener('DOMContentLoaded', () => {
  initAccordions();
  initAnimatedCounters();
  initToolkitFilters();
  initFormValidation();
});

/**
 * Accordion Component (FAQs & Capability details)
 */
function initAccordions() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all active items in same container if desired
      const parent = item.parentElement;
      if (parent) {
        parent.querySelectorAll('.accordion-item').forEach(sibling => {
          sibling.classList.remove('active');
        });
      }

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/**
 * Animated Stat Counters - Monty Holding Style Reveal & Deceleration Counters
 */
function initAnimatedCounters() {
  const sections = document.querySelectorAll('.hero-metrics-row, .hero-stats-grid');
  const allCounters = document.querySelectorAll('.stat-counter');
  if (!sections.length && !allCounters.length) return;

  sections.forEach(s => s.classList.add('js-anim'));

  const animateCounter = (target) => {
    const countTo = parseFloat(target.getAttribute('data-target') || '0');
    const prefix = target.getAttribute('data-prefix') || '';
    const suffix = target.getAttribute('data-suffix') || '';
    const decimals = parseInt(target.getAttribute('data-decimals') || '0', 10);
    const duration = 1200; // ms
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Premium easeOutExpo curve
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = ease * countTo;
      target.textContent = prefix + (decimals > 0 ? current.toFixed(decimals) : Math.floor(current)) + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        target.textContent = prefix + (decimals > 0 ? countTo.toFixed(decimals) : countTo) + suffix;
      }
    }
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sec = entry.target;
          sec.classList.add('is-revealed');
          const counters = sec.querySelectorAll('.stat-counter');
          counters.forEach((counter, idx) => {
            setTimeout(() => animateCounter(counter), 80 * idx);
          });
          obs.unobserve(sec);
        }
      });
    }, { threshold: 0.15 });

    sections.forEach(sec => observer.observe(sec));
  } else {
    sections.forEach(sec => sec.classList.add('is-revealed'));
    allCounters.forEach(counter => animateCounter(counter));
  }
}

/**
 * Toolkit & Insights Category Filter
 */
function initToolkitFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.filterable-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Form Validation & Client Feedback
 */
function initFormValidation() {
  // Handled cleanly by FormSubmit integration in contact.html
}
