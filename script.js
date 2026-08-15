/* ========================================
   DO STORE — Premium E-Commerce Theme
   JavaScript Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Announcement Bar Ticker ──
  const announcementTrack = document.getElementById('announcementTrack');
  if (announcementTrack) {
    const messages = [
      "<span>★</span> FREE DELIVERY ON ORDERS OVER RS. 3,000",
      "<span>★</span> 10% OFF YOUR FIRST ORDER WITH CODE: WELCOME10",
      "<span>★</span> NEW 25/26 SEASON KITS NOW IN STOCK",
      "<span>★</span> CASH ON DELIVERY AVAILABLE NATIONWIDE"
    ];
    
    // Create HTML for one set
    const setHtml = messages.map(msg => `<div class="announcement-item">${msg}</div>`).join('');
    // Duplicate 4 times to ensure infinite smooth scrolling
    announcementTrack.innerHTML = setHtml + setHtml + setHtml + setHtml;
  }

  // ── 2. Brand Marquee Ticker ──
  const marqueeTrack = document.getElementById('marqueeTrack');
  if (marqueeTrack) {
    const brands = [
      "Real Madrid", "Barcelona", "Manchester City", "Arsenal", 
      "Liverpool", "Manchester United", "Bayern Munich", 
      "Paris Saint-Germain", "Juventus", "AC Milan"
    ];
    
    // Create HTML for one set
    const brandHtml = brands.map(brand => `
      <div class="marquee-item">
        ${brand} <span class="marquee-dot"></span>
      </div>
    `).join('');
    
    // Duplicate 4 times for infinite loop
    marqueeTrack.innerHTML = brandHtml + brandHtml + brandHtml + brandHtml;
  }

  // ── 3. Navbar Scroll Effect & Back to Top ──
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (backToTop) {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── 4. Mobile Menu Toggle ──
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      const spans = mobileMenuBtn.querySelectorAll('span');
      
      if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
        document.body.style.overflow = '';
      }
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
        document.body.style.overflow = '';
      });
    });
  }

  // ── 5. Scroll Reveal Animations ──
  const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => fadeObserver.observe(el));

  // ── 6. Newsletter Form Submission ──
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletterEmail');
      const submitBtn = newsletterForm.querySelector('button');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = 'Welcome to the Club ✓';
      submitBtn.style.background = 'var(--clr-success)';
      submitBtn.style.color = 'var(--clr-white)';
      emailInput.value = '';

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        submitBtn.style.color = '';
      }, 4000);
    });
  }

  // ── 7. Smooth Scroll for Anchor Links ──
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

});
