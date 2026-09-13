/**
 * MOYKA EXECUTIVE ADVISORY - MAIN JAVASCRIPT
 * Handles mobile drawer, sticky header state, active nav, floating gold scroll indicator,
 * Tadbeer-style scroll text reveal animations, Proprietary EXPAND™ Framework Component,
 * and 3D Card Game Concept Parallax Tilt.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initHeaderScroll();
  initActiveNavLink();
  initScrollIndicatorWidget();
  initScrollTextAnimations();
  initExpandFramework();
  initFounderParallax();
  initCardGameTilt();
  initSaudiGrowthChart();
  initExecutiveCalendarBooking();
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

/**
 * Executive Scroll Text & Element Reveal Animation Engine
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

  // Target ALL hero text elements across all pages for smooth left slide reveal
  const heroTextElements = document.querySelectorAll('main > section:first-of-type .badge-tag, main > section:first-of-type h1, main > section:first-of-type .lead, main > section:first-of-type p, .hero-section .badge-tag, .hero-section h1, .hero-section .lead, .hero-section p');
  
  heroTextElements.forEach((el, index) => {
    el.classList.add('scroll-reveal');
    el.classList.add('scroll-reveal-left');
    el.style.setProperty('--reveal-delay', `${(index * 0.06) + 0.04}s`);
  });

  const elementsToAnimate = document.querySelectorAll(selectors.join(', '));

  elementsToAnimate.forEach((el) => {
    if (el.closest('.sector-index-card') || el.classList.contains('sector-index-card')) {
      return;
    }
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
 * Proprietary EXPAND™ Strategic Methodology Component Engine
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

  // Scroll progress auto-advance
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
 * Desktop Dampened Mouse Parallax for Founder Portrait Section
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

/**
 * Card Game Concept Interactive 3D Tilt & Metallic Sheen Engine
 */
function initCardGameTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cardSelectors = [
    '.card-executive',
    '.matrix-card-positive',
    '.matrix-card-negative',
    '.logo-card-item',
    '.process-step-card',
    '.insight-card',
    '.toolkit-card',
    '.expand-card-body'
  ];

  const cards = document.querySelectorAll(cardSelectors.join(', '));

  cards.forEach((card) => {
    if (card.closest('#contact-form-segment') || card.classList.contains('no-anim') || card.classList.contains('no-tilt')) {
      return;
    }

    if (!card.querySelector('.card-game-sheen')) {
      const sheen = document.createElement('div');
      sheen.className = 'card-game-sheen';
      card.appendChild(sheen);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      const mouseXPct = (x / rect.width) * 100;
      const mouseYPct = (y / rect.height) * 100;

      card.style.setProperty('--mouse-x', `${mouseXPct}%`);
      card.style.setProperty('--mouse-y', `${mouseYPct}%`);
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) scale(1.03)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
    });
  });
}

/**
 * Vision 2030 Sector Index Interactive Dashboard Engine (10 Sectors - Vector SVG)
 */
function initSaudiGrowthChart() {
  const container = document.querySelector('.sector-index-card');
  if (!container) return;

  const sectorsData = [
    {
      name: 'Manufacturing & Industry',
      shortName: 'Manufacturing',
      share: 18,
      metric: '$130B+ Target',
      sub: '10k+ Advanced Factories',
      color: '#C59B27'
    },
    {
      name: 'Mining & Minerals',
      shortName: 'Mining',
      share: 14,
      metric: '$1.3T+ Wealth',
      sub: '3rd Industrial Pillar',
      color: '#D4AF37'
    },
    {
      name: 'Tourism & Hospitality',
      shortName: 'Tourism',
      share: 12,
      metric: '150M Visitors',
      sub: 'Red Sea & Giga-Projects',
      color: '#E5C158'
    },
    {
      name: 'ICT, Digital Economy & AI',
      shortName: 'ICT & AI',
      share: 12,
      metric: '$40B+ Market',
      sub: 'Cloud & GenAI Hub',
      color: '#22D3EE'
    },
    {
      name: 'Healthcare & Life Sciences',
      shortName: 'Healthcare',
      share: 10,
      metric: '$65B+ Privatization',
      sub: 'Biotech & Digital Health',
      color: '#38BDF8'
    },
    {
      name: 'Transport & Logistics',
      shortName: 'Logistics',
      share: 9,
      metric: '3-Continent Hub',
      sub: 'Ports & Global Freight',
      color: '#60A5FA'
    },
    {
      name: 'Renewable Energy',
      shortName: 'Renewables',
      share: 8,
      metric: '58.7 GW Clean',
      sub: '50% Clean Energy 2030',
      color: '#F3E5AB'
    },
    {
      name: 'Financial Services & Fintech',
      shortName: 'Fintech',
      share: 7,
      metric: '500+ Fintechs',
      sub: 'SAMA Open Banking',
      color: '#818CF8'
    },
    {
      name: 'Real Estate & Giga-Projects',
      shortName: 'Giga-Projects',
      share: 6,
      metric: '$1.25T+ Pipeline',
      sub: 'NEOM, Qiddiya, ROSHN',
      color: '#A78BFA'
    },
    {
      name: 'Agriculture & Food Security',
      shortName: 'Agriculture',
      share: 4,
      metric: '$20B+ Agritech',
      sub: 'Water & Food Sovereignty',
      color: '#94A3B8'
    }
  ];

  const chartWrapper = document.querySelector('.sector-chart-wrapper');
  const centerVal = document.getElementById('sectorCenterVal');
  const centerName = document.getElementById('sectorCenterName');
  const centerSub = document.getElementById('sectorCenterSub');
  const svgArcs = document.querySelectorAll('.sector-svg-arc');
  const pills = document.querySelectorAll('.sector-pill-item');

  function resetCenter() {
    if (centerVal) {
      centerVal.textContent = '10';
      centerVal.style.color = 'var(--color-brand-gold)';
      centerVal.classList.remove('pop-update');
      void centerVal.offsetWidth;
      centerVal.classList.add('pop-update');
    }
    if (centerName) centerName.textContent = 'PRIORITY SECTORS';
    if (centerSub) centerSub.textContent = '$3.2T+ Vision 2030';
    if (chartWrapper) chartWrapper.classList.remove('has-active-sector');

    svgArcs.forEach(arc => {
      arc.classList.remove('is-active');
      arc.style.filter = '';
    });
    pills.forEach(pill => pill.classList.remove('is-selected'));
  }

  function setCenter(index) {
    if (index < 0 || index >= sectorsData.length) return resetCenter();
    const sector = sectorsData[index];
    if (centerVal) {
      centerVal.textContent = `${sector.share}%`;
      centerVal.style.color = sector.color;
      centerVal.classList.remove('pop-update');
      void centerVal.offsetWidth;
      centerVal.classList.add('pop-update');
    }
    if (centerName) centerName.textContent = sector.shortName;
    if (centerSub) centerSub.textContent = sector.metric;

    if (chartWrapper) chartWrapper.classList.add('has-active-sector');

    svgArcs.forEach((arc, i) => {
      if (i === index) {
        arc.classList.add('is-active');
        arc.style.filter = `drop-shadow(0 0 10px ${sector.color})`;
      } else {
        arc.classList.remove('is-active');
        arc.style.filter = '';
      }
    });

    pills.forEach((pill, i) => {
      if (i === index) pill.classList.add('is-selected');
      else pill.classList.remove('is-selected');
    });
  }

  // Interactivity on SVG Arcs
  svgArcs.forEach((arc) => {
    const idx = parseInt(arc.getAttribute('data-index'), 10);
    arc.addEventListener('mouseenter', () => setCenter(idx));
    arc.addEventListener('mouseleave', resetCenter);
    arc.addEventListener('click', () => setCenter(idx));
  });

  // Interactivity on pills
  pills.forEach((pill) => {
    const idx = parseInt(pill.getAttribute('data-sector-index'), 10);
    pill.addEventListener('mouseenter', () => setCenter(idx));
    pill.addEventListener('mouseleave', resetCenter);
    pill.addEventListener('click', () => setCenter(idx));
  });

  // Scroll reveal trigger with soft number roll
  if (typeof IntersectionObserver !== 'undefined' && chartWrapper) {
    let hasAnimated = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          chartWrapper.classList.add('animate-in');
          let count = 0;
          const target = 10;
          const stepTime = 55;
          const timer = setInterval(() => {
            count++;
            if (centerVal && !chartWrapper.classList.contains('has-active-sector')) {
              centerVal.textContent = count;
            }
            if (count >= target) clearInterval(timer);
          }, stepTime);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    observer.observe(chartWrapper);
  }

  // View Switcher (Chart View vs Ranked Index View)
  const viewBtns = document.querySelectorAll('.sector-view-btn');
  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetView = btn.getAttribute('data-view') || 'chart';
      if (typeof window.switchSectorView === 'function') {
        window.switchSectorView(targetView);
      } else {
        const chartView = document.getElementById('sectorChartView');
        const rankedView = document.getElementById('sectorRankedView');
        viewBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        if (targetView === 'ranked') {
          if (chartView) chartView.style.setProperty('display', 'none', 'important');
          if (rankedView) rankedView.style.setProperty('display', 'block', 'important');
        } else {
          if (rankedView) rankedView.style.setProperty('display', 'none', 'important');
          if (chartView) chartView.style.setProperty('display', 'block', 'important');
        }
      }
    });
  });
}

/**
 * Executive Calendar Appointment Booking Engine
 * Riyadh Practice • AST Timezone • Sunday - Thursday Working Week
 */
let currentCalDate = new Date();
let selectedDateStr = null;
let selectedTimeStr = null;
let selectedMeetingType = 'Google Meet Video';

const DEFAULT_TIME_SLOTS = [
  '09:00 AM',
  '10:00 AM',
  '11:30 AM',
  '01:30 PM',
  '03:00 PM',
  '04:30 PM'
];

window.openCalendarModal = function() {
  const modal = document.getElementById('executive-calendar-modal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    renderCalendar();
  }
};

window.closeCalendarModal = function() {
  const modal = document.getElementById('executive-calendar-modal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
};

window.selectMeetingType = function(btn, type) {
  selectedMeetingType = type;
  document.querySelectorAll('.cal-type-btn').forEach(b => b.classList.remove('is-active'));
  if (btn) btn.classList.add('is-active');
  const typeInput = document.getElementById('cal-input-type');
  if (typeInput) typeInput.value = type;
};

function renderCalendar() {
  const year = currentCalDate.getFullYear();
  const month = currentCalDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const monthLabel = document.getElementById('cal-month-label');
  if (monthLabel) {
    monthLabel.textContent = `${monthNames[month]} ${year}`;
  }

  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sun, 1 = Mon...
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const grid = document.getElementById('cal-days-grid');
  if (!grid) return;
  grid.innerHTML = '';

  // Blank leading days
  for (let i = 0; i < firstDayIndex; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'cal-day-cell cal-day-empty';
    grid.appendChild(emptyCell);
  }

  // Days of month
  for (let d = 1; d <= daysInMonth; d++) {
    const dayDate = new Date(year, month, d);
    dayDate.setHours(0, 0, 0, 0);
    const dayOfWeek = dayDate.getDay(); // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
    const isWeekend = (dayOfWeek === 5 || dayOfWeek === 6); // Friday & Saturday closed
    const isPast = dayDate < today;

    const dayCell = document.createElement('div');
    dayCell.className = 'cal-day-cell';
    dayCell.textContent = d;

    const dateFormatted = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

    if (isPast || isWeekend) {
      dayCell.classList.add('is-disabled');
      if (isWeekend) dayCell.title = 'Weekend (Closed for Client Retainers)';
      if (isPast) dayCell.title = 'Past Date';
    } else {
      dayCell.setAttribute('data-date', dateFormatted);
      if (selectedDateStr === dateFormatted) {
        dayCell.classList.add('is-selected');
      }
      dayCell.addEventListener('click', () => {
        selectDate(dateFormatted, d, monthNames[month], year, dayOfWeek);
      });
    }
    grid.appendChild(dayCell);
  }

  renderTimeSlots();
}

function selectDate(dateFormatted, day, monthName, year, dayOfWeek) {
  selectedDateStr = dateFormatted;
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const badge = document.getElementById('cal-selected-date-badge');
  if (badge) {
    badge.textContent = `${dayNames[dayOfWeek]}, ${monthName} ${day}`;
  }

  document.querySelectorAll('.cal-day-cell').forEach(c => {
    if (c.getAttribute('data-date') === dateFormatted) {
      c.classList.add('is-selected');
    } else {
      c.classList.remove('is-selected');
    }
  });

  updateSummary();
  renderTimeSlots();
}

function renderTimeSlots() {
  const slotsGrid = document.getElementById('cal-slots-grid');
  if (!slotsGrid) return;
  slotsGrid.innerHTML = '';

  if (!selectedDateStr) {
    slotsGrid.innerHTML = '<div style="grid-column: span 3; font-size: 0.75rem; color: #94A3B8; text-align: center; padding: 10px 0;">Please select an active date above</div>';
    return;
  }

  DEFAULT_TIME_SLOTS.forEach(slot => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cal-slot-btn';
    btn.setAttribute('data-time', slot);
    btn.textContent = slot;

    if (selectedTimeStr === slot) {
      btn.classList.add('is-selected');
    }

    btn.addEventListener('click', () => {
      selectedTimeStr = slot;
      document.querySelectorAll('.cal-slot-btn').forEach(b => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      updateSummary();
    });

    slotsGrid.appendChild(btn);
  });
}

function updateSummary() {
  const summaryEl = document.getElementById('cal-summary-datetime');
  const submitBtn = document.getElementById('cal-submit-btn');
  const inputDate = document.getElementById('cal-input-date');
  const inputTime = document.getElementById('cal-input-time');
  const subjectInput = document.getElementById('cal-form-subject');

  if (inputDate) inputDate.value = selectedDateStr || '';
  if (inputTime) inputTime.value = selectedTimeStr || '';

  if (selectedDateStr && selectedTimeStr) {
    if (summaryEl) {
      summaryEl.innerHTML = `<span style="color: var(--color-brand-gold);">&#128197; ${selectedDateStr}</span> &bull; <span style="color: #22D3EE;">&#9200; ${selectedTimeStr} (AST)</span>`;
    }
    if (submitBtn) submitBtn.disabled = false;
    if (subjectInput) {
      subjectInput.value = `Executive Advisory Meeting Booked: ${selectedDateStr} at ${selectedTimeStr} AST`;
    }
  } else if (selectedDateStr) {
    if (summaryEl) summaryEl.textContent = `${selectedDateStr} (Please choose a time slot)`;
    if (submitBtn) submitBtn.disabled = true;
  } else {
    if (summaryEl) summaryEl.textContent = 'Please choose a date & time on the left';
    if (submitBtn) submitBtn.disabled = true;
  }
}

function formatUtcBasic(dateObj) {
  return dateObj.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

function getMeetingUtcTimes(dateStr, timeStr) {
  if (!dateStr) dateStr = '2026-09-16';
  const parts = dateStr.split('-').map(n => parseInt(n, 10));
  const year = parts[0] || 2026;
  const month = parts[1] ? parts[1] - 1 : 8; // 0-indexed month
  const day = parts[2] || 16;

  let hours = 10;
  let minutes = 0;
  if (timeStr) {
    const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (match) {
      hours = parseInt(match[1], 10);
      minutes = parseInt(match[2], 10);
      const ampm = match[3].toUpperCase();
      if (ampm === 'PM' && hours < 12) hours += 12;
      if (ampm === 'AM' && hours === 12) hours = 0;
    }
  }

  // AST is UTC+3. Convert to UTC:
  const startUtc = new Date(Date.UTC(year, month, day, hours - 3, minutes, 0));
  const endUtc = new Date(startUtc.getTime() + 30 * 60 * 1000); // 30 min duration

  return {
    startIso: formatUtcBasic(startUtc),
    endIso: formatUtcBasic(endUtc)
  };
}

function getGoogleCalendarUrl(details) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: details.title || 'MOYKA Executive Advisory Consultation',
    dates: `${details.startIso}/${details.endIso}`,
    details: details.description || '',
    location: details.location || 'Google Meet',
    add: details.attendees || 'okhan@moykaconsults.com'
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function downloadIcsFile(details) {
  const nowIso = formatUtcBasic(new Date());
  const uid = `moyka-${Date.now()}-${Math.random().toString(36).substring(2, 8)}@moykaconsults.com`;
  const cleanDesc = (details.description || '').replace(/\r?\n/g, '\\n');

  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//MOYKA Executive Advisory//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${nowIso}`,
    `DTSTART:${details.startIso}`,
    `DTEND:${details.endIso}`,
    `SUMMARY:${details.title}`,
    `DESCRIPTION:${cleanDesc}`,
    `LOCATION:${details.location}`,
    'STATUS:CONFIRMED',
    'ORGANIZER;CN=MOYKA Executive Advisory:mailto:okhan@moykaconsults.com',
    details.attendeeEmail ? `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN=${details.attendeeName || 'Attendee'}:mailto:${details.attendeeEmail}` : '',
    'ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;CN=Omar Khan (MOYKA):mailto:okhan@moykaconsults.com',
    'BEGIN:VALARM',
    'TRIGGER:-PT15M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: MOYKA Executive Advisory Meeting in 15 minutes',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].filter(Boolean).join('\r\n');

  const blob = new Blob([icsLines], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `MOYKA-Advisory-${details.dateStr || 'Appointment'}.ics`);
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  }, 100);
}

function initExecutiveCalendarBooking() {
  const prevBtn = document.getElementById('cal-prev-month');
  const nextBtn = document.getElementById('cal-next-month');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentCalDate.setMonth(currentCalDate.getMonth() - 1);
      renderCalendar();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentCalDate.setMonth(currentCalDate.getMonth() + 1);
      renderCalendar();
    });
  }

  // Close on backdrop click
  const modal = document.getElementById('executive-calendar-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        window.closeCalendarModal();
      }
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeCalendarModal();
    }
  });

  // Handle Form Submission
  const calForm = document.getElementById('cal-booking-form');
  const calSuccess = document.getElementById('cal-success-view');
  const calSummary = document.getElementById('cal-confirmed-summary');

  if (calForm) {
    calForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('cal-submit-btn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Confirming Appointment...';
      }

      const formData = new FormData(calForm);
      const fullName = formData.get('full_name') || 'Executive Attendee';
      const email = formData.get('email') || '';
      const org = formData.get('organization') || 'Enterprise';
      const meetingType = formData.get('meeting_type') || 'Google Meet Video';
      const notes = formData.get('notes') || 'Executive Consultation';

      // Keep reply-to synced
      const replytoInput = document.getElementById('cal-replyto');
      if (replytoInput && email) replytoInput.value = email;

      const times = getMeetingUtcTimes(selectedDateStr, selectedTimeStr);
      const calDetails = {
        title: `MOYKA Executive Advisory: ${fullName} (${org})`,
        description: `Executive Advisory Consultation with MOYKA Practice Leadership.\n\nAttendee: ${fullName}\nOrganization: ${org}\nCorporate Email: ${email}\nMeeting Format: ${meetingType}\nDiscussion Topics: ${notes}\n\nTimezone: AST (Riyadh / UTC+3)\nHost: Omar Khan (okhan@moykaconsults.com)\nConfidential under strict NDA.`,
        location: meetingType.includes('Video') ? 'Google Meet Video Conference' : 'Phone Briefing (+966)',
        startIso: times.startIso,
        endIso: times.endIso,
        dateStr: selectedDateStr,
        attendeeName: fullName,
        attendeeEmail: email,
        attendees: `okhan@moykaconsults.com${email ? ',' + email : ''}`
      };

      // Configure instant 1-click Google Calendar & .ics buttons
      const googleBtn = document.getElementById('cal-add-google-btn');
      if (googleBtn) {
        googleBtn.href = getGoogleCalendarUrl(calDetails);
      }

      const icsBtn = document.getElementById('cal-download-ics-btn');
      if (icsBtn) {
        icsBtn.onclick = function(ev) {
          ev.preventDefault();
          downloadIcsFile(calDetails);
        };
      }

      const showSuccessScreen = (isLocal) => {
        calForm.style.display = 'none';
        if (calSuccess) calSuccess.style.display = 'block';
        if (calSummary) {
          calSummary.innerHTML = `<strong>${selectedDateStr} &bull; ${selectedTimeStr} AST</strong><br>Attendee: ${fullName} (${org}) &bull; ${meetingType}`;
        }
        const note = document.getElementById('cal-dispatch-note');
        if (note) {
          if (isLocal) {
            note.innerHTML = `⚠️ <em>Local Preview Notice:</em> FormSubmit automated emails require a live web server or custom domain to dispatch to <strong>okhan@moykaconsults.com</strong>.<br><span style="color: #22D3EE; font-weight: 600;">Use the buttons above to sync this meeting directly into your calendar!</span>`;
          } else {
            note.innerHTML = `Notification dispatched to <strong style="color: #FFFFFF;">okhan@moykaconsults.com</strong> &bull; Click buttons above to add to your calendar.`;
          }
        }
      };

      // FormSubmit requires HTTP/HTTPS origin; file:/// is rejected by FormSubmit
      if (window.location.protocol === 'file:') {
        showSuccessScreen(true);
      } else {
        fetch('https://formsubmit.co/ajax/okhan@moykaconsults.com', {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        })
        .then(response => response.json().catch(() => ({})))
        .then(data => {
          showSuccessScreen(false);
          const note = document.getElementById('cal-dispatch-note');
          if (note && data && data.success === 'false') {
            note.innerHTML = `⚠️ FormSubmit status: ${data.message || 'Check email activation'}. Destination: <strong>okhan@moykaconsults.com</strong>`;
          }
        })
        .catch(() => {
          showSuccessScreen(false);
        });
      }
    });
  }

  // Bind Booking Buttons on page
  const bookingTriggers = document.querySelectorAll('#google-calendar-booking-button, #google-calendar-booking-button-thankyou, #google-calendar-booking-button-home, [data-open-calendar]');
  bookingTriggers.forEach(container => {
    // If container is not a button and doesn't have child button, inject default button
    if (container.tagName !== 'BUTTON' && !container.querySelector('button')) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'qxCTlb';
      btn.setAttribute('aria-label', 'Instant Scheduling - Book an Executive Meeting');
      btn.innerHTML = '<span style="font-size: 1rem; margin-right: 6px;">&#128197;</span> Instant Scheduling';
      container.appendChild(btn);
    }

    container.addEventListener('click', (e) => {
      e.preventDefault();
      const bookingUrl = window.MOYKA_BOOKING_PAGE_URL;
      if (bookingUrl && bookingUrl !== 'YOUR_BOOKING_PAGE_URL' && bookingUrl.startsWith('https://calendar.google.com')) {
        window.open(bookingUrl, '_blank');
      } else {
        window.openCalendarModal();
      }
    });
  });
}

