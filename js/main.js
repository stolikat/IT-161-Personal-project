// Scroll Spy: highlight nav link for the section in view
document.addEventListener('DOMContentLoaded', () => {
  const sections = [
    'rainier','shasta','adams','hood','glacier-peak','baker','st-helens'
  ].map(id => document.getElementById(id)).filter(Boolean);

  const links = Array.from(document.querySelectorAll('.navbar a'));

  const linkFor = id => links.find(a => a.dataset.target === id);

  const observer = new IntersectionObserver((entries) => {
    // Pick the most visible section
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    const id = visible.target.id;
    links.forEach(a => a.classList.remove('active'));
    const current = linkFor(id);
    if (current) current.classList.add('active');
  }, {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // prioritize section near top third
    threshold: [0.1, 0.25, 0.5, 0.75]
  });

  sections.forEach(sec => observer.observe(sec));
});
