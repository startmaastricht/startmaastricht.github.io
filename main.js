/**
 * main.js – Interaktionen, Animationen und UI-Funktionen
 * für START Maastricht.
 */

(function () {
  'use strict';

  /* ===== Mobile Navigation Menu ===== */
  var menuBtn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!isOpen));
      nav.classList.toggle('open', !isOpen);
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        menuBtn.setAttribute('aria-expanded', 'false');
        nav.classList.remove('open');
      }
    });
  }

  /* ===== Scroll Progress Bar ===== */
  var progressBar = document.querySelector('.progress');
  var tick = false;

  function updateProgress() {
    if (!progressBar) return;
    var totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = totalHeight > 0 ? Math.min(window.scrollY / totalHeight, 1) : 0;
    progressBar.style.setProperty('--p', progress);
    tick = false;
  }

  window.addEventListener('scroll', function () {
    if (!tick) {
      tick = true;
      requestAnimationFrame(updateProgress);
    }
  }, { passive: true });

  updateProgress();

  /* ===== Scroll-Reveals & Animations ===== */
  var revealObserver = null;

  function initReveals() {
    if (!document.documentElement.classList.contains('js') || !('IntersectionObserver' in window)) return;

    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    }

    var selector = 'main section:not(.hero) .h, main section:not(.hero) .sub, main section:not(.hero) .lead, main section:not(.hero) .photo, main section:not(.hero) .stat, main section:not(.hero) .rule-top, main section:not(.hero) .faq details, main section:not(.hero) .actions, main section:not(.hero) .event-text p, .scope-inner > *, main section:not(.hero) .socials';
    var elements = document.querySelectorAll(selector);
    var seenParents = new Map();

    elements.forEach(function (el) {
      if (el.hasAttribute('data-reveal')) return; // Bereits registriert
      var parent = el.parentNode;
      var index = seenParents.get(parent) || 0;
      seenParents.set(parent, index + 1);

      el.style.setProperty('--d', Math.min(index * 0.09, 0.5) + 's');
      el.setAttribute('data-reveal', '');
      revealObserver.observe(el);
    });
  }

  // Für content.js global verfügbar machen
  window.initReveals = initReveals;
  initReveals();

  /* ===== Zahl-Zähler Animation (Counter) ===== */
  if ('IntersectionObserver' in window) {
    function runCounter(el) {
      var end = parseFloat(el.getAttribute('data-count'));
      var decimals = +el.getAttribute('data-decimals') || 0;
      var prefix = el.getAttribute('data-prefix') || '';
      var suffix = el.getAttribute('data-suffix') || '';
      var startTime = null;
      var duration = 1500;

      el.textContent = prefix + (0).toFixed(decimals) + suffix;

      function step(currentTime) {
        if (!startTime) startTime = currentTime;
        var progress = Math.min((currentTime - startTime) / duration, 1);
        var easeOut = 1 - Math.pow(1 - progress, 3);
        el.textContent = prefix + (end * easeOut).toFixed(decimals) + suffix;
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }

      requestAnimationFrame(step);
    }

    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    document.querySelectorAll('[data-count]').forEach(function (el) {
      counterObserver.observe(el);
    });
  }

  /* ===== Privacy Policy Modal ===== */
  var privacyModal = document.getElementById('privacy-modal');
  var privacyLinks = document.querySelectorAll('a[href="#privacy"], [data-open-modal="privacy"], #privacy-link');
  var closeBtns = document.querySelectorAll('[data-close-modal]');
  var lastActiveElement = null;

  function openPrivacyModal(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (!privacyModal) return;

    lastActiveElement = document.activeElement;
    privacyModal.hidden = false;

    // Trigger reflow for CSS transition
    void privacyModal.offsetWidth;

    privacyModal.classList.add('is-open');
    document.body.classList.add('modal-open');

    // Accessibility focus on the close button
    var closeBtn = privacyModal.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
  }

  function closePrivacyModal() {
    if (!privacyModal || !privacyModal.classList.contains('is-open')) return;

    privacyModal.classList.remove('is-open');
    document.body.classList.remove('modal-open');

    setTimeout(function () {
      if (!privacyModal.classList.contains('is-open')) {
        privacyModal.hidden = true;
      }
    }, 300);

    if (window.location.hash === '#privacy') {
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      } else {
        window.location.hash = '';
      }
    }

    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  }

  privacyLinks.forEach(function (link) {
    link.addEventListener('click', openPrivacyModal);
  });

  closeBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      closePrivacyModal();
    });
  });

  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && privacyModal && privacyModal.classList.contains('is-open')) {
      closePrivacyModal();
    }
  });

  if (window.location.hash === '#privacy') {
    openPrivacyModal();
  }

  window.addEventListener('hashchange', function () {
    if (window.location.hash === '#privacy') {
      openPrivacyModal();
    } else if (privacyModal && privacyModal.classList.contains('is-open')) {
      closePrivacyModal();
    }
  });
})();
