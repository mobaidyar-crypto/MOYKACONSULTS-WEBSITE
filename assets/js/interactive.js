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
 * Animated Stat Counters
 */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.stat-counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const countTo = parseInt(target.getAttribute('data-target'), 10);
        let count = 0;
        const duration = 1500; // ms
        const increment = Math.ceil(countTo / (duration / 16));

        const timer = setInterval(() => {
          count += increment;
          if (count >= countTo) {
            target.textContent = countTo + (target.getAttribute('data-suffix') || '');
            clearInterval(timer);
          } else {
            target.textContent = count + (target.getAttribute('data-suffix') || '');
          }
        }, 16);

        obs.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
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
  const form = document.getElementById('executive-diagnostic-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const company = form.querySelector('[name="company"]');
    const responseBox = document.getElementById('form-response');

    if (!name.value || !email.value || !company.value) {
      if (responseBox) {
        responseBox.style.display = 'block';
        responseBox.style.color = '#F43F5E';
        responseBox.textContent = 'Please fill out all required executive credentials.';
      }
      return;
    }

    if (responseBox) {
      responseBox.style.display = 'block';
      responseBox.style.color = '#C59B27';
      responseBox.innerHTML = '<strong>Diagnostic Request Received.</strong> Our Senior Practice Team will contact you within 24 hours under NDA governance.';
    }

    form.reset();
  });
}
