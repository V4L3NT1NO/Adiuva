/* =============================================
   ADIUVA PRO — main.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── CUSTOM CURSOR ──────────────────────── */
  const cursor    = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  let mx = -100, my = -100, cx = -100, cy = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursorDot.style.left = mx + 'px';
    cursorDot.style.top  = my + 'px';
  });

  // Smooth cursor follow
  function animateCursor() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cursor scale on interactive elements
  const interactives = document.querySelectorAll('a, button, input, select, .feat-card, .prob-card, .testi-card, .omod');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1.8)';
      cursor.style.borderColor = 'rgba(201,168,76,0.6)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      cursor.style.borderColor = 'rgba(122,158,142,0.5)';
    });
  });

  /* ─── NAV SCROLL ─────────────────────────── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  /* ─── BURGER MENU ────────────────────────── */
  const burger  = document.getElementById('burger');
  const mobMenu = document.getElementById('mobMenu');
  burger.addEventListener('click', () => mobMenu.classList.toggle('open'));
  mobMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobMenu.classList.remove('open'));
  });

  /* ─── REVEAL ON SCROLL ───────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  const revObs  = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  reveals.forEach(el => revObs.observe(el));

  // Hero reveals immediate
  document.querySelectorAll('.hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 80 + i * 60);
  });

  /* ─── COUNTER ANIMATION ──────────────────── */
  const counters = document.querySelectorAll('[data-count]');
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animCount(e.target, parseInt(e.target.dataset.count, 10));
        countObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.6 });
  counters.forEach(el => countObs.observe(el));

  function animCount(el, target) {
    const t0 = performance.now();
    const dur = 1600;
    const ease = t => 1 - Math.pow(1 - t, 4);
    function tick(now) {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = Math.round(target * ease(p));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ─── MAGNETIC BUTTONS ───────────────────── */
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r   = btn.getBoundingClientRect();
      const dx  = e.clientX - (r.left + r.width / 2);
      const dy  = e.clientY - (r.top  + r.height / 2);
      btn.style.transform = `translate(${dx * 0.25}px, ${dy * 0.25}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  /* ─── HERO PARALLAX LEAKS ────────────────── */
  window.addEventListener('mousemove', e => {
    const cx2 = window.innerWidth / 2;
    const cy2 = window.innerHeight / 2;
    const dx  = (e.clientX - cx2) / cx2;
    const dy  = (e.clientY - cy2) / cy2;
    document.querySelectorAll('.hero .leak').forEach((lk, i) => {
      const f = (i + 1) * 15;
      lk.style.transform = `translate(${dx * f}px, ${dy * f}px)`;
    });
  }, { passive: true });

  /* ─── TYPEWRITER HERO ────────────────────── */
  const accentLine = document.querySelector('.hero-h1 .accent-line');
  if (accentLine) {
    const words   = ['que crece', 'que se adapta', 'que mejora'];
    let wi        = 0, ci = 0, deleting = false, paused = false;

    function type() {
      if (paused) return;
      const w = words[wi];
      if (!deleting) {
        accentLine.textContent = w.slice(0, ++ci);
        if (ci === w.length) {
          paused = true;
          setTimeout(() => { paused = false; deleting = true; type(); }, 2600);
          return;
        }
        setTimeout(type, 65);
      } else {
        accentLine.textContent = w.slice(0, --ci);
        if (ci === 0) {
          accentLine.textContent = '\u00A0';
          deleting = false;
          wi = (wi + 1) % words.length;
        }
        setTimeout(type, 38);
      }
    }
    setTimeout(type, 1000);
  }

  /* ─── ORBIT MODULE PULSE ─────────────────── */
  const omods = document.querySelectorAll('.omod');
  if (omods.length) {
    setInterval(() => {
      const rand = omods[Math.floor(Math.random() * omods.length)];
      rand.style.background    = 'rgba(122,158,142,0.18)';
      rand.style.borderColor   = 'rgba(122,158,142,0.5)';
      setTimeout(() => {
        rand.style.background  = '';
        rand.style.borderColor = '';
      }, 700);
    }, 1100);
  }

  /* ─── AVATAR BACKGROUND APPLY ────────────── */
  document.querySelectorAll('.testi-av').forEach(av => {
    av.style.background = av.style.getPropertyValue('--bg') || av.dataset.bg || '';
  });

  /* ─── FORM VALIDATION ────────────────────── */
  const form      = document.getElementById('mainForm');
  const submitBtn = document.getElementById('submitBtn');
  const formOk    = document.getElementById('formOk');

  if (!form) return;

  const rules = {
    fn: v => !v.trim() ? 'Ingresa tu nombre.' : v.trim().length < 3 ? 'Nombre muy corto.' : '',
    em: v => !v.trim() ? 'Ingresa tu correo.' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Correo no válido.' : '',
    eq: v => !v ? 'Selecciona el tamaño del equipo.' : '',
  };

  function setErr(id, msg) {
    const el  = document.getElementById(id);
    const err = document.getElementById(id + 'Err');
    if (el)  el.classList.toggle('err', !!msg);
    if (err) err.textContent = msg || '';
  }

  function validate() {
    let ok = true;
    Object.entries(rules).forEach(([id, fn]) => {
      const input = document.getElementById(id);
      const msg   = fn(input ? input.value : '');
      setErr(id, msg);
      if (msg) ok = false;
    });
    return ok;
  }

  Object.keys(rules).forEach(id => {
    const input = document.getElementById(id);
    if (!input) return;
    input.addEventListener('blur',  () => setErr(id, rules[id](input.value)));
    input.addEventListener('input', () => {
      if (input.classList.contains('err')) setErr(id, rules[id](input.value));
    });
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!validate()) return;

    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    await new Promise(r => setTimeout(r, 1800));

    form.style.display = 'none';
    formOk.classList.add('visible');
  });

  /* ─── SCROLL PROGRESS INDICATOR ─────────── */
  const prog = document.createElement('div');
  prog.style.cssText = `
    position: fixed; top: 0; left: 0; right: 0; height: 1px; z-index: 600;
    background: linear-gradient(90deg, #7a9e8e, #c9a84c);
    transform-origin: left; transform: scaleX(0);
    transition: transform 0.1s linear;
  `;
  document.body.appendChild(prog);

  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const p = h.scrollTop / (h.scrollHeight - h.clientHeight);
    prog.style.transform = `scaleX(${p})`;
  }, { passive: true });

  /* ─── FEAT CARD TILT ─────────────────────── */
  document.querySelectorAll('.feat-card, .prob-card, .testi-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const x  = ((e.clientX - r.left) / r.width  - 0.5) * 6;
      const y  = ((e.clientY - r.top)  / r.height - 0.5) * 6;
      card.style.transform = `translateY(-3px) perspective(600px) rotateX(${-y}deg) rotateY(${x}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ─── CHIP HOVER GLOW ────────────────────── */
  document.querySelectorAll('.float-chip').forEach(chip => {
    chip.addEventListener('mouseenter', () => {
      chip.style.borderColor = 'rgba(122,158,142,0.4)';
      chip.style.boxShadow   = '0 16px 40px rgba(122,158,142,0.15)';
    });
    chip.addEventListener('mouseleave', () => {
      chip.style.borderColor = '';
      chip.style.boxShadow   = '';
    });
  });

  /* ─── AVATAR CSS VAR FIX ─────────────────── */
  document.querySelectorAll('.testi-av').forEach(el => {
    const bg = getComputedStyle(el).getPropertyValue('--bg').trim();
    if (bg) el.style.background = bg;
  });

  /* ─── ACTIVE NAV LINK ON SCROLL ──────────── */
  const secs = document.querySelectorAll('section[id]');
  const navAs = document.querySelectorAll('.nav-links a');
  new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        navAs.forEach(a => {
          a.style.color = a.href.endsWith('#' + en.target.id)
            ? 'rgba(232,230,225,1)'
            : 'rgba(232,230,225,0.45)';
        });
      }
    });
  }, { threshold: 0.45 }).observe && secs.forEach(s => {
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        navAs.forEach(a => {
          const active = a.getAttribute('href') === '#' + s.id;
          a.style.color = active ? 'rgba(232,230,225,1)' : 'rgba(232,230,225,0.45)';
        });
      }
    }, { threshold: 0.45 }).observe(s);
  });

});
