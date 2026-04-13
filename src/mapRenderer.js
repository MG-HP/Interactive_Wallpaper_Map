const CONTINENT_SHAPES = [
  [
    [0.10, 0.20], [0.20, 0.15], [0.28, 0.20], [0.30, 0.32], [0.24, 0.45],
    [0.16, 0.42], [0.10, 0.30],
  ],
  [
    [0.32, 0.50], [0.40, 0.46], [0.45, 0.58], [0.42, 0.72], [0.36, 0.78],
    [0.30, 0.70],
  ],
  [
    [0.44, 0.20], [0.56, 0.16], [0.70, 0.20], [0.76, 0.30], [0.72, 0.40],
    [0.60, 0.44], [0.48, 0.34],
  ],
  [
    [0.57, 0.46], [0.64, 0.50], [0.62, 0.68], [0.56, 0.76], [0.50, 0.66],
    [0.52, 0.56],
  ],
  [
    [0.76, 0.62], [0.84, 0.60], [0.88, 0.70], [0.82, 0.78], [0.74, 0.72],
  ],
];

function drawBackground(ctx, width, height, theme) {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, theme.background.start);
  gradient.addColorStop(1, theme.background.end);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.globalAlpha = 0.1;
  ctx.strokeStyle = theme.grid;
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += width / 12) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += height / 8) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

function drawContinent(ctx, points, width, height, theme) {
  ctx.beginPath();
  points.forEach(([x, y], i) => {
    const px = x * width;
    const py = y * height;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  });
  ctx.closePath();

  const fillGradient = ctx.createLinearGradient(0, 0, width, height);
  fillGradient.addColorStop(0, theme.land.start);
  fillGradient.addColorStop(1, theme.land.end);
  ctx.fillStyle = fillGradient;
  ctx.fill();

  ctx.strokeStyle = theme.land.stroke;
  ctx.lineWidth = Math.max(1, width / 1366);
  ctx.stroke();
}

function drawPins(ctx, width, height, theme) {
  const pins = [
    [0.22, 0.27],
    [0.35, 0.62],
    [0.59, 0.28],
    [0.66, 0.58],
    [0.80, 0.69],
  ];

  pins.forEach(([x, y]) => {
    const px = x * width;
    const py = y * height;
    const r = Math.max(4, width * 0.004);

    ctx.beginPath();
    ctx.arc(px, py, r, 0, Math.PI * 2);
    ctx.fillStyle = theme.pin.fill;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(px, py, r * 2.2, 0, Math.PI * 2);
    ctx.strokeStyle = theme.pin.ring;
    ctx.lineWidth = Math.max(1, width * 0.0013);
    ctx.stroke();
  });
}

export function renderStyledMap(ctx, width, height, theme) {
  drawBackground(ctx, width, height, theme);
  CONTINENT_SHAPES.forEach((shape) => drawContinent(ctx, shape, width, height, theme));
  drawPins(ctx, width, height, theme);
}
