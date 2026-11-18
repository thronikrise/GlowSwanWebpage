/* ============================================================
   GlowSwan — Core Functionality
   main.js
   ============================================================ */

;(function () {
  'use strict';

  // ════════════════════════════════════════════════════════════
  // 1. SMOOTH SCROLL (Native browser 60/120fps scrolling)
  // ════════════════════════════════════════════════════════════
  // We rely on native browser smooth-scrolling for instant, zero-lag performance.



  // ════════════════════════════════════════════════════════════
  // 2. NAVIGATION SCROLL EFFECT
  // ════════════════════════════════════════════════════════════

  const navbar = document.getElementById('navbar') || document.querySelector('header') || document.querySelector('nav');

  if (navbar) {
    let lastScrolled = false;

    const checkNavScroll = () => {
      const scrolled = window.scrollY > 40;
      if (scrolled !== lastScrolled) {
        navbar.classList.toggle('nav-scrolled', scrolled);
        lastScrolled = scrolled;
      }
    };

    // Initial check
    checkNavScroll();

    // Passive listener for performance
    window.addEventListener('scroll', checkNavScroll, { passive: true });
  }


  // ════════════════════════════════════════════════════════════
  // 3. MOBILE NAVIGATION TOGGLE
  // ════════════════════════════════════════════════════════════

  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav     = document.getElementById('mobile-nav');
  const mobileClose   = mobileNav ? mobileNav.querySelector('.mobile-nav-close') : null;

  if (mobileMenuBtn && mobileNav) {

    const openMobileNav = () => {
      mobileNav.classList.add('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };

    const closeMobileNav = () => {
      mobileNav.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    // Expose globally for inline onclick handlers
    window.closeMobileMenu = closeMobileNav;

    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('active');
      isOpen ? closeMobileNav() : openMobileNav();
    });

    // Close button inside overlay
    if (mobileClose) {
      mobileClose.addEventListener('click', closeMobileNav);
    }

    // Close when any link inside mobile nav is clicked
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        closeMobileNav();
      });
    });
  }


  // ════════════════════════════════════════════════════════════
  // 4. WHATSAPP ORDER FUNCTION (global)
  // ════════════════════════════════════════════════════════════

  window.orderOnWhatsApp = function orderOnWhatsApp(productName) {
    const phone   = '919894046703';
    const message = encodeURIComponent(
      `Hi! I'd like to order the GlowSwan *${productName}* soap (₹120 / 100g bar). Please share payment and delivery details. 🧼`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };


  // ════════════════════════════════════════════════════════════
  // 5. GENERIC WHATSAPP CONTACT FUNCTION (global)
  // ════════════════════════════════════════════════════════════

  window.contactWhatsApp = function contactWhatsApp() {
    const phone   = '919894046703';
    const message = encodeURIComponent(
      `Hi! I'm interested in GlowSwan soaps. Please share details about your collection. 🧼`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };


  // ════════════════════════════════════════════════════════════
  // 6. FLOATING WHATSAPP BUTTON VISIBILITY
  // ════════════════════════════════════════════════════════════

  const orderSection  = document.getElementById('order');
  const whatsappFloat = document.getElementById('whatsapp-float');

  if (orderSection && whatsappFloat) {
    const floatObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          whatsappFloat.classList.toggle('hidden', entry.isIntersecting);
        });
      },
      { threshold: 0.3 }
    );

    floatObserver.observe(orderSection);
  }


  // ════════════════════════════════════════════════════════════
  // 7. SMOOTH SCROLL FOR ANCHOR LINKS
  // ════════════════════════════════════════════════════════════

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      e.preventDefault();

      // Close mobile nav first if open
      if (mobileNav && mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        if (mobileMenuBtn) {
          mobileMenuBtn.textContent = '☰';
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
        document.body.style.overflow = '';
      }

      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });


  // ════════════════════════════════════════════════════════════
  // 8. ACTIVE NAVIGATION HIGHLIGHT
  // ════════════════════════════════════════════════════════════

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              const isMatch = link.getAttribute('href') === `#${id}`;
              link.classList.toggle('active', isMatch);
            });
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',   // fire when section is ~20% from top
        threshold: 0,
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }


  // ════════════════════════════════════════════════════════════
  // 9. CURRENT YEAR IN FOOTER
  // ════════════════════════════════════════════════════════════

  const yearEl = document.getElementById('year') || document.querySelector('.footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }


  // ════════════════════════════════════════════════════════════
  // 10. FAQ ACCORDION (auto-close other open details items)
  // ════════════════════════════════════════════════════════════

  const detailsList = document.querySelectorAll('details.faq-item');
  detailsList.forEach((targetDetail) => {
    targetDetail.addEventListener('toggle', () => {
      if (targetDetail.open) {
        detailsList.forEach((detail) => {
          if (detail !== targetDetail && detail.open) {
            detail.removeAttribute('open');
          }
        });
      }
    });
  });


  // ════════════════════════════════════════════════════════════
  // 11. PRELOADER / PAGE LOAD
  // ════════════════════════════════════════════════════════════

  window.addEventListener('load', () => {
    // Remove preloader if one exists
    const preloader = document.getElementById('preloader') || document.querySelector('.preloader');
    if (preloader) {
      gsap.to(preloader, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          preloader.style.display = 'none';
        },
      });
    }

    // Remove loading class from body
    document.body.classList.remove('is-loading');
    document.body.classList.add('is-loaded');
  });

})();
