// Starfield (teal/green-tinted to match the new theme)
(function() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [], W, H;
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  function init() {
    stars = [];
    for (let i = 0; i < 180; i++) {
      stars.push({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.5 + 0.5,
        a: Math.random() * 0.5 + 0.1,
        phase: Math.random() * Math.PI * 2
      });
    }
  }
  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    t += 0.005;
    stars.forEach(s => {
      const alpha = s.a * (0.6 + 0.4 * Math.sin(t + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(230,240,235,${alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize', () => { resize(); init(); });
  resize(); init(); draw();
})();

// Scroll animations
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

// Search
const si = document.getElementById('search-input');
if (si) {
  si.addEventListener('input', () => {
    const q = si.value.toLowerCase().trim();
    let vis = 0;
    document.querySelectorAll('.tool-card-wrap').forEach(c => {
      const match = !q || (c.dataset.name||'').includes(q) || (c.dataset.category||'').includes(q) || (c.dataset.desc||'').includes(q);
      c.style.display = match ? '' : 'none';
      if (match) vis++;
    });
    const nr = document.getElementById('no-results');
    if (nr) nr.classList.toggle('show', vis === 0);
  });
}

// Copy helper
function copyToClipboard(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.innerHTML;
    btn.innerHTML = '✓ Copied';
    btn.classList.add('copy-ok');
    setTimeout(() => { btn.innerHTML = orig; btn.classList.remove('copy-ok'); }, 2000);
  });
}

// Alert helper
function showAlert(id, msg, type = 'error') {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = msg;
  el.className = `alert alert-${type} show`;
  setTimeout(() => el.classList.remove('show'), 4000);
}
