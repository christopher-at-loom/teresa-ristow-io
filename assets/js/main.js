(function() {
  'use strict';

  // Mobile nav toggle
  var toggle = document.querySelector('.site-header__toggle');
  var nav = document.querySelector('.site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function() {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('site-nav--open');
    });
  }

  // Close mobile nav on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && nav && nav.classList.contains('site-nav--open')) {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('site-nav--open');
      toggle.focus();
    }
  });
})();
