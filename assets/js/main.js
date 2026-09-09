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
 * Vision 2030 Sector Index Interactive Dashboard Engine (10 Sectors)
 */
function initSaudiGrowthChart() {
  const canvas = document.getElementById('saudiGrowthChart');
  if (!canvas || typeof Chart === 'undefined') return;

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

  const ctx = canvas.getContext('2d');
  const centerVal = document.getElementById('sectorCenterVal');
  const centerName = document.getElementById('sectorCenterName');
  const centerSub = document.getElementById('sectorCenterSub');

  function resetCenter() {
    if (centerVal) centerVal.textContent = '10';
    if (centerName) centerName.textContent = 'PRIORITY SECTORS';
    if (centerSub) centerSub.textContent = '$3.2T+ Vision 2030';
  }

  function setCenter(sector) {
    if (!sector) return resetCenter();
    if (centerVal) centerVal.textContent = `${sector.share}%`;
    if (centerName) centerName.textContent = sector.shortName;
    if (centerSub) centerSub.textContent = sector.metric;
  }

  const chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: sectorsData.map(s => s.name),
      datasets: [{
        data: sectorsData.map(s => s.share),
        backgroundColor: sectorsData.map(s => s.color),
        borderColor: '#06101E',
        borderWidth: 2,
        hoverOffset: 0,
        hoverBorderColor: '#FFFFFF'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      hover: {
        mode: 'nearest',
        intersect: true,
        animationDuration: 0
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          animation: false,
          backgroundColor: 'rgba(6, 16, 30, 0.95)',
          titleColor: '#F8FAFC',
          bodyColor: '#C59B27',
          borderColor: 'rgba(197, 155, 39, 0.4)',
          borderWidth: 1,
          padding: 8,
          displayColors: true,
          callbacks: {
            label: function(context) {
              const item = sectorsData[context.dataIndex];
              return ` ${item.share}% Focus Share • ${item.metric}`;
            },
            afterLabel: function(context) {
              const item = sectorsData[context.dataIndex];
              return ` Focus: ${item.sub}`;
            }
          }
        }
      },
      cutout: '68%',
      onHover: (event, activeElements) => {
        if (activeElements && activeElements.length > 0) {
          const index = activeElements[0].index;
          setCenter(sectorsData[index]);
          highlightPill(index);
        } else {
          resetCenter();
          highlightPill(-1);
        }
      }
    }
  });

  // Highlight pill item in the list
  const pills = document.querySelectorAll('.sector-pill-item');
  function highlightPill(index) {
    pills.forEach((p, i) => {
      if (i === index) {
        p.classList.add('is-selected');
      } else {
        p.classList.remove('is-selected');
      }
    });
  }

  // Interactivity on pills
  pills.forEach((pill) => {
    const idx = parseInt(pill.getAttribute('data-sector-index'), 10);
    pill.addEventListener('mouseenter', () => {
      if (idx >= 0 && idx < sectorsData.length) {
        setCenter(sectorsData[idx]);
        chart.setActiveElements([{ datasetIndex: 0, index: idx }]);
        chart.tooltip.setActiveElements([{ datasetIndex: 0, index: idx }], { x: 0, y: 0 });
        chart.update('none');
      }
    });
    pill.addEventListener('mouseleave', () => {
      resetCenter();
      chart.setActiveElements([]);
      chart.tooltip.setActiveElements([], { x: 0, y: 0 });
      chart.update('none');
    });
    pill.addEventListener('click', () => {
      if (idx >= 0 && idx < sectorsData.length) {
        setCenter(sectorsData[idx]);
        chart.setActiveElements([{ datasetIndex: 0, index: idx }]);
        chart.update('none');
      }
    });
  });

  // View Switcher (Chart View vs Ranked Index View)
  const viewBtns = document.querySelectorAll('.sector-view-btn');
  const chartView = document.getElementById('sectorChartView');
  const rankedView = document.getElementById('sectorRankedView');

  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      viewBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const targetView = btn.getAttribute('data-view');
      if (targetView === 'ranked') {
        if (chartView) chartView.style.display = 'none';
        if (rankedView) rankedView.style.display = 'block';
      } else {
        if (rankedView) rankedView.style.display = 'none';
        if (chartView) chartView.style.display = 'block';
      }
    });
  });
}
