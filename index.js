document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.nav-links .nav-link');
  const sections = Array.from(navLinks).map(link => {
    const id = link.getAttribute('href').substring(1);
    return document.getElementById(id);
  }).filter(Boolean);

  const collapseEl = document.getElementById('navMenu');
  const bsCollapse = collapseEl ? new bootstrap.Collapse(collapseEl, { toggle: false }) : null;

  // Close mobile menu after clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (bsCollapse && collapseEl.classList.contains('show')) {
        bsCollapse.hide();
      }
    });
  });

  // Highlight active nav link based on scroll position
  function setActiveLink() {
    let currentId = sections[0] ? sections[0].id : '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
  }

  window.addEventListener('scroll', setActiveLink);
  setActiveLink();
});