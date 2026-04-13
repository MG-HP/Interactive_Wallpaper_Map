import { renderStyledMap } from '../mapRenderer.js';
import { defaultExportTheme } from './theme.js';

function drawLatestDateBadge(ctx, width, height, latestDate, theme) {
  const padX = Math.round(width * 0.018);
  const padY = Math.round(height * 0.03);
  const text = `Latest country update: ${latestDate.toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })}`;

  const fontSize = Math.max(14, Math.round(width * 0.014));
  ctx.font = `600 ${fontSize}px ${theme.dateBadge.fontFamily}`;
  const textWidth = ctx.measureText(text).width;
  const badgeHeight = Math.round(fontSize * 2.0);
  const badgeWidth = Math.round(textWidth + fontSize * 1.8);
  const x = width - badgeWidth - padX;
  const y = padY;

  ctx.fillStyle = theme.dateBadge.background;
  roundRect(ctx, x, y, badgeWidth, badgeHeight, Math.round(fontSize * 0.4));
  ctx.fill();

  ctx.strokeStyle = theme.dateBadge.border;
  ctx.lineWidth = Math.max(1, width * 0.0011);
  roundRect(ctx, x, y, badgeWidth, badgeHeight, Math.round(fontSize * 0.4));
  ctx.stroke();

  ctx.fillStyle = theme.dateBadge.text;
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x + fontSize * 0.9, y + badgeHeight / 2);
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

export function renderWallpaper(ctx, width, height, latestDate, theme = defaultExportTheme) {
  renderStyledMap(ctx, width, height, theme);
  drawLatestDateBadge(ctx, width, height, latestDate, theme);
}

export function exportWallpaper({ width, height, format, latestDate, theme = defaultExportTheme }) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  renderWallpaper(ctx, width, height, latestDate, theme);

  const quality = format === 'image/jpeg' ? 0.92 : undefined;
  return canvas.toDataURL(format, quality);
}
