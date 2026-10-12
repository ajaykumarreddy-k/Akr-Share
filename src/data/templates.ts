/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CodeTemplate {
  id: string;
  name: string;
  description: string;
  badge: string;
  code: string;
}

export const CODE_TEMPLATES: CodeTemplate[] = [
  {
    id: 'swiss-poster',
    name: 'Swiss Editorial Card',
    description: 'Animated electric blue Swiss poster card with typography & interactive hover',
    badge: 'Design Art',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AKR Swiss Poster</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #FFFFFF;
      color: #007AFF;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 40px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: -0.01em;
    }
    .main-title {
      font-size: clamp(48px, 10vw, 110px);
      font-weight: 700;
      line-height: 0.88;
      letter-spacing: -0.04em;
      margin: 40px 0;
      text-transform: lowercase;
    }
    .art-v {
      font-size: 0.32em;
      font-weight: 500;
      letter-spacing: -0.02em;
      margin-left: 12px;
    }
    .footer-grid {
      display: grid;
      grid-template-columns: 1fr 1fr auto;
      gap: 32px;
      font-size: 13px;
      line-height: 1.45;
      max-width: 900px;
      align-items: end;
    }
    .badge-btn {
      border: 1.5px solid #007AFF;
      border-radius: 999px;
      padding: 8px 24px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      font-weight: 600;
      font-size: 14px;
      background: transparent;
      color: #007AFF;
      transition: all 0.2s ease;
    }
    .badge-btn:hover {
      background: #007AFF;
      color: #FFFFFF;
    }
  </style>
</head>
<body>
  <div class="header">
    <div>2026.10.12</div>
    <div>@AKR-PASTE</div>
  </div>

  <div class="main-title">
    <div>akr-paste</div>
    <div>share<span class="art-v">rendered v.</span></div>
  </div>

  <div class="footer-grid">
    <div>
      single-file html/css/js live rendered instantly inside isolated sandboxes. zero configuration, instant permalinks.
    </div>
    <div>
      pure web standards. open source under the mit license. paste and share your creative code in seconds.
    </div>
    <div>
      <button class="badge-btn" onclick="alert('AKR-paste live render active!')">
        run &rarr;
      </button>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'interactive-canvas',
    name: 'Interactive Sky Particles',
    description: 'Generative electric blue particle system with mouse repulsion',
    badge: 'Canvas 2D',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sky Particles</title>
  <style>
    body {
      margin: 0;
      overflow: hidden;
      background: #FFFFFF;
      font-family: sans-serif;
    }
    canvas {
      display: block;
      width: 100vw;
      height: 100vh;
    }
    .overlay {
      position: absolute;
      top: 24px;
      left: 24px;
      color: #007AFF;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: -0.02em;
      pointer-events: none;
    }
  </style>
</head>
<body>
  <div class="overlay">akr-paste // interactive canvas (move mouse)</div>
  <canvas id="c"></canvas>
  <script>
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = 90;
    const mouse = { x: -1000, y: -1000 };

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: Math.random() * 3 + 2
      });
    }

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Connecting lines
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 130) {
            ctx.strokeStyle = \`rgba(0, 122, 255, \${1 - dist / 130})\`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Particles
      particles.forEach(p => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 100) {
          p.x += (dx / dist) * 2;
          p.y += (dy / dist) * 2;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = '#007AFF';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }
    draw();
  </script>
</body>
</html>`
  },
  {
    id: 'counter-component',
    name: 'Interactive Counter Widget',
    description: 'Clean reactive HTML component with state and electric blue aesthetics',
    badge: 'Widget',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>AKR Counter</title>
  <style>
    body {
      background: #FFFFFF;
      color: #007AFF;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
    }
    .card {
      border: 1.5px solid #007AFF;
      border-radius: 24px;
      padding: 36px 44px;
      text-align: center;
      width: 320px;
    }
    .label {
      font-size: 13px;
      font-weight: 600;
      letter-spacing: -0.01em;
      margin-bottom: 8px;
    }
    .value {
      font-size: 72px;
      font-weight: 700;
      line-height: 1;
      letter-spacing: -0.04em;
      margin: 20px 0;
    }
    .btn-group {
      display: flex;
      gap: 12px;
      justify-content: center;
    }
    button {
      background: #FFFFFF;
      color: #007AFF;
      border: 1.5px solid #007AFF;
      border-radius: 12px;
      font-size: 18px;
      font-weight: 600;
      width: 48px;
      height: 48px;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    button:hover {
      background: #007AFF;
      color: #FFFFFF;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="label">live state test</div>
    <div class="value" id="count">0</div>
    <div class="btn-group">
      <button onclick="decrement()">-</button>
      <button onclick="increment()">+</button>
    </div>
  </div>
  <script>
    let val = 0;
    const countEl = document.getElementById('count');
    function increment() {
      val++;
      countEl.innerText = val;
    }
    function decrement() {
      val--;
      countEl.innerText = val;
    }
  </script>
</body>
</html>`
  }
];
