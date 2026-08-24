/* ========================================
   DO STORE — Premium E-Commerce Theme
   JavaScript Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Announcement Bar Ticker ──
  const announcementTrack = document.getElementById('announcementTrack');
  if (announcementTrack) {
    const messages = [
      "<span>✦</span> FREE DELIVERY ON ORDERS OVER RS. 3,000",
      "<span>✦</span> 10% OFF YOUR FIRST ORDER — CODE: WELCOME10",
      "<span>✦</span> NEW 25/26 SEASON KITS NOW IN STOCK",
      "<span>✦</span> CASH ON DELIVERY AVAILABLE NATIONWIDE",
      "<span>✦</span> AUTHENTIC MATCH-DAY QUALITY JERSEYS"
    ];
    
    const setHtml = messages.map(msg => `<div class="announcement-item">${msg}</div>`).join('');
    announcementTrack.innerHTML = setHtml + setHtml + setHtml + setHtml;
  }

  // ── 2. Brand Marquee Ticker ──
  const marqueeTrack = document.getElementById('marqueeTrack');
  if (marqueeTrack) {
    const brands = [
      "Real Madrid", "Barcelona", "Manchester City", "Arsenal", 
      "Liverpool", "Manchester United", "Bayern Munich", 
      "Paris Saint-Germain", "Juventus", "AC Milan",
      "Portugal", "Brazil", "Argentina", "England"
    ];
    
    const brandHtml = brands.map(brand => `
      <div class="marquee-item">
        ${brand} <span class="marquee-dot"></span>
      </div>
    `).join('');
    
    marqueeTrack.innerHTML = brandHtml + brandHtml + brandHtml + brandHtml;
  }

  // ── 3. Navbar Scroll Effect & Back to Top ──
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    if (backToTop) {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }

    // Parallax on hero
    const hero = document.querySelector('.hero-collage');
    if (hero) {
      const scrolled = window.scrollY;
      hero.style.transform = `translateY(${scrolled * 0.25}px)`;
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── 4. Mobile Menu Toggle — Premium Side Drawer ──
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  // Create backdrop element once
  let backdrop = document.querySelector('.mobile-nav-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'mobile-nav-backdrop';
    document.body.appendChild(backdrop);
  }

  function openDrawer() {
    navLinks.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    const spans = mobileMenuBtn.querySelectorAll('span');
    spans[0].style.transform = 'rotate(45deg) translate(4px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(4px, -5px)';
  }

  function closeDrawer() {
    navLinks.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
    const spans = mobileMenuBtn.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    // Close when clicking backdrop
    backdrop.addEventListener('click', closeDrawer);

    // Close when clicking any nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        closeDrawer();
      }
    });
  }

  // ── 5. Premium Scroll Reveal Animations ──
  const animatedElements = document.querySelectorAll(
    '.fade-in, .fade-in-left, .fade-in-right, .scale-in, .slide-up, .reveal-line'
  );

  const observerOptions = {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Small natural delay for organic feel
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => revealObserver.observe(el));

  // ── 6. Counter Animate (for stats) ──
  function animateCounter(el, target, duration = 1200) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        el.textContent = target + (el.dataset.suffix || '');
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(start) + (el.dataset.suffix || '');
      }
    }, 16);
  }

  const statObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const num = entry.target.dataset.count;
        if (num) animateCounter(entry.target, parseInt(num));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => statObserver.observe(el));

  // ── 7. Newsletter Form Submission ──
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletterEmail');
      const submitBtn = newsletterForm.querySelector('button[type="submit"]') || newsletterForm.querySelector('button');
      const originalText = submitBtn?.textContent;

      if (submitBtn) {
        submitBtn.textContent = 'Welcome to the Club ✓';
        submitBtn.style.background = 'var(--clr-success)';
        submitBtn.style.color = 'var(--clr-white)';
      }
      if (emailInput) emailInput.value = '';

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
          submitBtn.style.color = '';
        }
      }, 4000);
    });
  }

  // ── 8. Smooth Scroll for Anchor Links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // ── 9. Product Detail Interactivity ──
  // Size Selector
  const sizeBtns = document.querySelectorAll('.size-btn');
  if (sizeBtns.length > 0) {
    sizeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sizeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  // Quantity Selector
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');
  const qtyInput = document.getElementById('qtyInput');

  if (qtyMinus && qtyPlus && qtyInput) {
    qtyMinus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value) || 1;
      if (val > 1) {
        qtyInput.value = val - 1;
      }
    });
    
    qtyPlus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value) || 1;
      let max = parseInt(qtyInput.getAttribute('max')) || 10;
      if (val < max) {
        qtyInput.value = val + 1;
      }
    });
  }

  // Product Accordions
  const accordions = document.querySelectorAll('.accordion-header');
  if (accordions.length > 0) {
    // Open the first one by default
    accordions[0].parentElement.classList.add('open');
    accordions[0].nextElementSibling.style.maxHeight = accordions[0].nextElementSibling.scrollHeight + "px";

    accordions.forEach(acc => {
      acc.addEventListener('click', function() {
        const item = this.parentElement;
        const content = this.nextElementSibling;
        
        accordions.forEach(otherAcc => {
          if (otherAcc !== this) {
            otherAcc.parentElement.classList.remove('open');
            otherAcc.nextElementSibling.style.maxHeight = null;
          }
        });

        if (item.classList.contains('open')) {
          item.classList.remove('open');
          content.style.maxHeight = null;
        } else {
          item.classList.add('open');
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    });
  }

  // ── 10. Add to Cart Button ──
  const addToCartBtn = document.querySelector('.add-to-cart-btn');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
      const originalText = this.textContent;
      this.textContent = '✓ Added to Cart';
      this.style.background = 'var(--clr-success)';
      
      // Update cart count
      const cartCount = document.querySelector('.cart-count');
      if (cartCount) {
        const current = parseInt(cartCount.textContent) || 0;
        cartCount.textContent = current + 1;
        cartCount.style.transform = 'scale(1.3)';
        setTimeout(() => { cartCount.style.transform = ''; }, 300);
      }

      setTimeout(() => {
        this.textContent = originalText;
        this.style.background = '';
      }, 2000);
    });
  }

  // ── 11. Cursor scroll line animation for headings ──
  // Animate section title underlines
  const sectionTitles = document.querySelectorAll('.section-title');
  const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('title-visible');
      }
    });
  }, { threshold: 0.3 });

  sectionTitles.forEach(t => titleObserver.observe(t));

  // ── 12. Hover cursor effects on product cards ──
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
      card.style.transform = `perspective(800px) rotateX(${-y}deg) rotateY(${x}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ── 13. Page enter animation ──
  document.body.classList.add('page-loaded');
  
});
