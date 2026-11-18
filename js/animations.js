/* ============================================================
   GlowSwan — GSAP + ScrollTrigger Animations
   animations.js
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

// ── Wait for DOM + all assets (fonts, images) to load ──────────
window.addEventListener('load', () => {
  initAnimations();
});

function initAnimations() {

  // ════════════════════════════════════════════════════════════
  // 1. INITIAL STATES — set before anything is visible
  // ════════════════════════════════════════════════════════════

  // Hero (load‑triggered)
  gsap.set('.hero-label',    { opacity: 0, y: 20 });
  gsap.set('.hero-title',    { opacity: 1 });           // container visible
  gsap.set('.hero-subtitle', { opacity: 0, y: 20 });
  gsap.set('.hero-body',     { opacity: 0, y: 20 });
  gsap.set('.hero-price',    { opacity: 0, y: 20 });
  gsap.set('.hero-cta',      { opacity: 0, y: 20 });
  gsap.set('.hero-image',    { opacity: 0, scale: 0.92 });

  // Scroll‑triggered sections
  gsap.set('.marquee-section',   { opacity: 0 });
  gsap.set('.collection-header', { opacity: 0, y: 30 });
  gsap.set('.collection-intro',  { opacity: 0, y: 30 });
  gsap.set('.product-card',      { opacity: 0, y: 50 });
  gsap.set('.story-quote',       { opacity: 0, y: 30 });
  gsap.set('.usp-card',          { opacity: 0, y: 30 });
  gsap.set('.order-step',        { opacity: 0, x: -30 });
  gsap.set('.order-line',        { scaleX: 0, transformOrigin: 'left center' });
  gsap.set('.faq-item',          { opacity: 0, y: 20 });
  gsap.set('footer',             { opacity: 0, y: 20 });


  // ════════════════════════════════════════════════════════════
  // 2. HERO SECTION — triggers on page load (no scroll)
  // ════════════════════════════════════════════════════════════

  const heroTL = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // 2a. Small‑caps label
  heroTL.to('.hero-label', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: 0.3,
  });

  // 2b. Hero title & lines
  const heroLines = document.querySelectorAll('.hero-title [data-gsap]');
  if (heroLines.length) {
    heroTL.fromTo(heroLines, 
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: 1.0, stagger: 0.2, ease: 'power3.out' },
      '-=0.4'
    );
  } else {
    heroTL.fromTo('.hero-title',
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' },
      '-=0.4'
    );
  }

  // 2c. Subtitle
  heroTL.to('.hero-subtitle', {
    opacity: 1,
    y: 0,
    duration: 0.8,
  }, '-=0.5');

  // 2d. Body text
  heroTL.to('.hero-body', {
    opacity: 1,
    y: 0,
    duration: 0.8,
  }, '-=0.5');

  // 2e. Price tag
  heroTL.to('.hero-price', {
    opacity: 1,
    y: 0,
    duration: 0.6,
  }, '-=0.4');

  // 2f. CTA button
  heroTL.to('.hero-cta', {
    opacity: 1,
    y: 0,
    duration: 0.6,
  }, '-=0.3');

  // 2g. Hero product image (runs alongside text from early on)
  heroTL.to('.hero-image', {
    opacity: 1,
    scale: 1,
    duration: 1.4,
    ease: 'power3.out',
  }, 0.3);   // start at 0.3s absolute


  // ════════════════════════════════════════════════════════════
  // 3. MARQUEE SECTION — fade in on scroll
  // ════════════════════════════════════════════════════════════

  if (document.querySelector('.marquee-section')) {
    gsap.to('.marquee-section', {
      opacity: 1,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.marquee-section',
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });
  }


  // ════════════════════════════════════════════════════════════
  // 4. COLLECTION SECTION HEADER
  // ════════════════════════════════════════════════════════════

  if (document.querySelector('.collection-header')) {
    gsap.to('.collection-header', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.collection-header',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }

  if (document.querySelector('.collection-intro')) {
    gsap.to('.collection-intro', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.collection-intro',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }


  // ════════════════════════════════════════════════════════════
  // 5. PRODUCT CARDS — batched staggered reveal
  // ════════════════════════════════════════════════════════════

  const productCards = gsap.utils.toArray('.product-card');
  if (productCards.length) {
    ScrollTrigger.batch(productCards, {
      start: 'top 85%',
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          overwrite: true,
        });
      },
      once: true,
    });
  }


  // ════════════════════════════════════════════════════════════
  // 6. STORY / USP SECTION
  // ════════════════════════════════════════════════════════════

  // 6a. Story quote — fade in + parallax
  if (document.querySelector('.story-quote')) {
    gsap.to('.story-quote', {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.story-quote',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }

  // 6b. USP cards — staggered fade up
  const uspCards = gsap.utils.toArray('.usp-card');
  if (uspCards.length) {
    gsap.to(uspCards, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: uspCards[0],
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }


  // ════════════════════════════════════════════════════════════
  // 7. ORDER STEPS SECTION
  // ════════════════════════════════════════════════════════════

  // 7a. Steps — staggered slide from left
  const orderSteps = gsap.utils.toArray('.order-step');
  if (orderSteps.length) {
    gsap.to(orderSteps, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      stagger: 0.25,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: orderSteps[0],
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }

  // 7b. Connecting line — scaleX reveal
  if (document.querySelector('.order-line')) {
    gsap.to('.order-line', {
      scaleX: 1,
      duration: 1.0,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: '.order-line',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }


  // ════════════════════════════════════════════════════════════
  // 8. FAQ SECTION
  // ════════════════════════════════════════════════════════════

  const faqItems = gsap.utils.toArray('.faq-item');
  if (faqItems.length) {
    gsap.to(faqItems, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: faqItems[0],
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }


  // ════════════════════════════════════════════════════════════
  // 9. FOOTER
  // ════════════════════════════════════════════════════════════

  const footer = document.querySelector('footer');
  if (footer) {
    gsap.to(footer, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: footer,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });
  }

  // ── Notify other scripts that animations are ready ───────────
  window.dispatchEvent(new CustomEvent('glowswan:animations-ready'));
}
