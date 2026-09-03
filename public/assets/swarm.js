(() => {
  'use strict';

  const canvas = document.getElementById('swarm-field');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const state = {
    width: 0,
    height: 0,
    dpr: 1,
    mode: 'attract',
    pointer: { x: 0, y: 0, active: false, pressure: 0 },
    particles: [],
    last: performance.now(),
    pulse: 0
  };

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const rand = (a, b) => a + Math.random() * (b - a);

  function particleCount() {
    if (reducedMotion) return clamp(Math.round((state.width * state.height) / 15000), 45, 90);
    const cores = navigator.hardwareConcurrency || 4;
    const density = cores >= 8 ? 3200 : cores >= 4 ? 4200 : 5600;
    return clamp(Math.round((state.width * state.height) / density), 150, cores >= 8 ? 460 : 330);
  }

  function makeParticle(index) {
    const team = index % 2;
    return {
      team,
      x: rand(0, state.width),
      y: rand(0, state.height),
      z: rand(.16, 1),
      vx: rand(-.35, .35),
      vy: rand(-.35, .35),
      vz: rand(-.002, .002),
      mass: rand(.72, 1.5),
      phase: rand(0, Math.PI * 2),
      drift: rand(.5, 1.35)
    };
  }

  function rebuild() {
    const count = particleCount();
    state.particles = Array.from({ length: count }, (_, i) => makeParticle(i));
  }

  function resize() {
    state.width = Math.max(1, window.innerWidth);
    state.height = Math.max(1, window.innerHeight);
    state.dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(state.width * state.dpr);
    canvas.height = Math.round(state.height * state.dpr);
    canvas.style.width = `${state.width}px`;
    canvas.style.height = `${state.height}px`;
    ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    rebuild();
    ctx.fillStyle = '#040a16';
    ctx.fillRect(0, 0, state.width, state.height);
  }

  function setPointer(event, active = state.pointer.active) {
    state.pointer.x = event.clientX;
    state.pointer.y = event.clientY;
    state.pointer.active = active;
    state.pointer.pressure = typeof event.pressure === 'number' ? event.pressure : 0;
  }

  window.addEventListener('pointerdown', (event) => setPointer(event, true), { passive: true });
  window.addEventListener('pointermove', (event) => setPointer(event), { passive: true });
  window.addEventListener('pointerup', (event) => setPointer(event, false), { passive: true });
  window.addEventListener('pointercancel', (event) => setPointer(event, false), { passive: true });
  window.addEventListener('blur', () => { state.pointer.active = false; });
  window.addEventListener('resize', resize, { passive: true });

  document.querySelectorAll('[data-field-mode]').forEach((button) => {
    button.addEventListener('click', () => {
      const mode = button.dataset.fieldMode;
      state.mode = mode;
      state.pulse = 1;
      document.querySelectorAll('[data-field-mode]').forEach((item) => {
        item.setAttribute('aria-pressed', item === button ? 'true' : 'false');
      });
    });
  });

  function externalPulse(mode = 'attract') {
    if (['attract', 'disperse', 'vortex', 'relax'].includes(mode)) state.mode = mode;
    state.pulse = 1;
  }

  window.MuzeField = { setMode: (mode) => externalPulse(mode), pulse: externalPulse };

  function updateParticle(p, dt, time) {
    const centerX = state.width * (.5 + (p.team === 0 ? -.055 : .055));
    const centerY = state.height * .52;
    let fx = (centerX - p.x) * .000085;
    let fy = (centerY - p.y) * .000085;

    const orbit = .0065 * p.drift;
    fx += Math.cos(time * .00022 * p.drift + p.phase) * orbit;
    fy += Math.sin(time * .00019 * p.drift + p.phase) * orbit;

    const midDx = p.x - state.width * .5;
    const midDy = p.y - state.height * .5;
    const midD = Math.hypot(midDx, midDy) + .001;
    const teamSpin = p.team === 0 ? 1 : -1;
    fx += (-midDy / midD) * .0018 * teamSpin;
    fy += (midDx / midD) * .0018 * teamSpin;

    if (state.pointer.active && state.mode !== 'relax') {
      const dx = state.pointer.x - p.x;
      const dy = state.pointer.y - p.y;
      const d = Math.hypot(dx, dy) + .01;
      const nx = dx / d;
      const ny = dy / d;
      const reach = Math.min(state.width, state.height) * .62;
      const falloff = clamp(1 - d / Math.max(240, reach), 0, 1);
      const depthGain = .45 + p.z * .75;
      const force = falloff * depthGain * (1 + state.pointer.pressure * .25);

      if (state.mode === 'attract') {
        fx += nx * .055 * force;
        fy += ny * .055 * force;
      } else if (state.mode === 'disperse') {
        fx -= nx * .068 * force;
        fy -= ny * .068 * force;
      } else if (state.mode === 'vortex') {
        const spin = p.team === 0 ? 1 : -1;
        fx += -ny * .082 * force * spin + nx * .008 * force;
        fy += nx * .082 * force * spin + ny * .008 * force;
      }

      p.vz += (p.team === 0 ? .0008 : -.00065) * falloff;
    }

    if (state.pulse > .001) {
      const dx = p.x - state.width * .5;
      const dy = p.y - state.height * .5;
      const d = Math.hypot(dx, dy) + .01;
      fx += (dx / d) * .018 * state.pulse * teamSpin;
      fy += (dy / d) * .018 * state.pulse * teamSpin;
    }

    p.vx += (fx / p.mass) * dt;
    p.vy += (fy / p.mass) * dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.z += p.vz * dt;

    const damping = Math.pow(.972, dt);
    p.vx *= damping;
    p.vy *= damping;
    p.vz *= Math.pow(.94, dt);

    if (p.x < -24) p.x = state.width + 24;
    if (p.x > state.width + 24) p.x = -24;
    if (p.y < -24) p.y = state.height + 24;
    if (p.y > state.height + 24) p.y = -24;
    if (p.z < .12) { p.z = .12; p.vz = Math.abs(p.vz) * .45; }
    if (p.z > 1.05) { p.z = 1.05; p.vz = -Math.abs(p.vz) * .45; }
  }

  function drawParticle(p) {
    const speed = Math.hypot(p.vx, p.vy);
    const radius = clamp(.75 + p.z * 2.55 + speed * .06, .9, 5.2);
    const alpha = clamp(.18 + p.z * .68, .18, .92);
    const color = p.team === 0 ? `rgba(89,222,255,${alpha})` : `rgba(190,125,255,${alpha})`;

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.shadowColor = p.team === 0 ? 'rgba(70,210,255,.55)' : 'rgba(174,92,255,.5)';
    ctx.shadowBlur = reducedMotion ? 0 : 4 + p.z * 8;
    ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
    ctx.fill();

    if (!reducedMotion && speed > 1.25 && p.z > .48) {
      ctx.beginPath();
      ctx.strokeStyle = p.team === 0 ? `rgba(89,222,255,${alpha * .18})` : `rgba(190,125,255,${alpha * .18})`;
      ctx.lineWidth = Math.max(.45, radius * .32);
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x - p.vx * 3, p.y - p.vy * 3);
      ctx.stroke();
    }
  }

  function drawPointer() {
    if (!state.pointer.active || reducedMotion) return;
    const colors = { attract: '#7df0bd', disperse: '#f6d67a', vortex: '#c58cff', relax: '#6ee7ff' };
    ctx.shadowBlur = 18;
    ctx.shadowColor = colors[state.mode];
    ctx.strokeStyle = colors[state.mode];
    ctx.globalAlpha = .58;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(state.pointer.x, state.pointer.y, 18 + state.pulse * 14, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  function frame(now) {
    const elapsed = Math.min(34, now - state.last);
    state.last = now;
    const dt = reducedMotion ? .35 : clamp(elapsed / 16.667, .4, 2.05);

    ctx.shadowBlur = 0;
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = reducedMotion ? 'rgba(4,10,22,.52)' : 'rgba(4,10,22,.19)';
    ctx.fillRect(0, 0, state.width, state.height);

    ctx.globalCompositeOperation = 'lighter';
    for (const p of state.particles) {
      updateParticle(p, dt, now);
      drawParticle(p);
    }

    ctx.globalCompositeOperation = 'source-over';
    drawPointer();
    state.pulse *= reducedMotion ? .86 : .93;
    requestAnimationFrame(frame);
  }

  resize();
  requestAnimationFrame(frame);
})();
