(function () {
  const canvas = document.getElementById("neural-field");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pointer = { x: 0, y: 0, on: false };
  let somas = [];
  let wires = [];
  let spikes = [];
  let raf = 0;
  let last = performance.now();

  function bezier(p0, p1, p2, t) {
    const u = 1 - t;
    return {
      x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x,
      y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y,
    };
  }

  function layout() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.max(36, Math.min(80, Math.round((w * h) / 14000)));
    somas = [];
    for (let i = 0; i < count; i++) {
      const x = 40 + Math.random() * (w - 80);
      const y = 40 + Math.random() * (h - 80);
      somas.push({ x, y, vx: 0, vy: 0, r: 1.4 + Math.random() * 2.4, rest: { x, y } });
    }

    wires = [];
    const maxDist = Math.min(220, Math.max(140, w * 0.16));
    for (let i = 0; i < somas.length; i++) {
      const near = [];
      for (let j = i + 1; j < somas.length; j++) {
        const d = Math.hypot(somas[i].x - somas[j].x, somas[i].y - somas[j].y);
        if (d < maxDist) near.push({ j, d });
      }
      near.sort((a, b) => a.d - b.d);
      for (const n of near.slice(0, 3)) {
        const a = somas[i];
        const b = somas[n.j];
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        const nx = -(b.y - a.y);
        const ny = b.x - a.x;
        const nl = Math.hypot(nx, ny) || 1;
        const bow = (Math.random() - 0.5) * 48;
        wires.push({
          a: i,
          b: n.j,
          ctrl: { x: mx + (nx / nl) * bow, y: my + (ny / nl) * bow },
        });
      }
    }

    spikes = [];
    const spikeN = reduced ? 0 : Math.min(28, Math.round(wires.length * 0.22));
    for (let i = 0; i < spikeN; i++) {
      spikes.push({
        w: Math.floor(Math.random() * wires.length),
        t: Math.random(),
        speed: 0.08 + Math.random() * 0.16,
      });
    }
  }

  function draw(now) {
    const dt = Math.min(0.033, (now - last) / 1000);
    last = now;
    const w = window.innerWidth;
    const h = window.innerHeight;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#070b14";
    ctx.fillRect(0, 0, w, h);

    const g = ctx.createRadialGradient(w * 0.5, h * 0.15, 40, w * 0.5, h * 0.4, Math.max(w, h) * 0.7);
    g.addColorStop(0, "rgba(139, 108, 255, 0.1)");
    g.addColorStop(0.45, "rgba(34, 211, 238, 0.05)");
    g.addColorStop(1, "rgba(7, 11, 20, 0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    if (!reduced) {
      for (const s of somas) {
        if (pointer.on) {
          const dx = pointer.x - s.x;
          const dy = pointer.y - s.y;
          const d = Math.hypot(dx, dy) || 1;
          if (d < 180) {
            s.vx += (dx / d) * 8 * dt;
            s.vy += (dy / d) * 8 * dt;
          }
        }
        s.vx += (s.rest.x - s.x) * 0.35 * dt;
        s.vy += (s.rest.y - s.y) * 0.35 * dt;
        s.vx *= 0.96;
        s.vy *= 0.96;
        s.x += s.vx;
        s.y += s.vy;
      }
    }

    ctx.lineCap = "round";
    for (const wire of wires) {
      const a = somas[wire.a];
      const b = somas[wire.b];
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.quadraticCurveTo(wire.ctrl.x, wire.ctrl.y, b.x, b.y);
      ctx.strokeStyle = "rgba(180, 200, 255, 0.14)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    ctx.strokeStyle = "rgba(103, 232, 249, 0.18)";
    ctx.lineWidth = 0.8;
    for (let i = 0; i < somas.length; i += 2) {
      const s = somas[i];
      for (let k = 0; k < 3; k++) {
        const ang = (i * 1.7 + k * 2.1) % (Math.PI * 2);
        const len = 10 + (i % 7) * 2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.quadraticCurveTo(
          s.x + Math.cos(ang) * len * 0.5,
          s.y + Math.sin(ang) * len * 0.5,
          s.x + Math.cos(ang) * len,
          s.y + Math.sin(ang) * len
        );
        ctx.stroke();
      }
    }

    if (!reduced) {
      for (const spike of spikes) {
        spike.t += spike.speed * dt;
        if (spike.t > 1) {
          spike.t = 0;
          spike.w = Math.floor(Math.random() * wires.length);
          spike.speed = 0.08 + Math.random() * 0.18;
        }
        const wire = wires[spike.w];
        if (!wire) continue;
        const a = somas[wire.a];
        const b = somas[wire.b];
        const p = bezier(a, wire.ctrl, b, spike.t);
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 10);
        glow.addColorStop(0, "rgba(255, 255, 255, 0.95)");
        glow.addColorStop(0.35, "rgba(103, 232, 249, 0.55)");
        glow.addColorStop(1, "rgba(139, 108, 255, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#f8feff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (const s of somas) {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r + 4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(139, 108, 255, 0.12)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(232, 238, 252, 0.7)";
      ctx.fill();
    }

    raf = requestAnimationFrame(draw);
  }

  layout();
  last = performance.now();
  raf = requestAnimationFrame(draw);

  window.addEventListener(
    "pointermove",
    function (e) {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.on = true;
    },
    { passive: true }
  );
  window.addEventListener("pointerleave", function () {
    pointer.on = false;
  });
  window.addEventListener("resize", layout);
})();
