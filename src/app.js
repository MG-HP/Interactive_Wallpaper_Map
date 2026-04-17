<<<<<<< codex/refine-app-ui-and-structure-for-elegance
const root = document.documentElement;

// Basic future-ready hook for theme switching and persisted user style.
const preferredTheme = localStorage.getItem("iwm-theme");
if (preferredTheme) {
  root.setAttribute("data-theme", preferredTheme);
}
=======
import { countryEntries, getLatestUpdateDate } from './data.js';
import { exportWallpaper, renderWallpaper } from './export/pipeline.js';

const previewCanvas = document.getElementById('mapPreviewCanvas');
const formatSelect = document.getElementById('format');
const presetSelect = document.getElementById('resolutionPreset');
const customInputs = document.getElementById('customResolutionInputs');
const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');
const exportBtn = document.getElementById('exportBtn');
const countryList = document.getElementById('countryList');

const latestDate = getLatestUpdateDate(countryEntries);

function parseResolution(presetValue) {
  if (presetValue === 'custom') {
    return {
      width: Number(widthInput.value),
      height: Number(heightInput.value),
    };
  }

  const [width, height] = presetValue.split('x').map(Number);
  return { width, height };
}

function validateResolution({ width, height }) {
  const valid = Number.isInteger(width)
    && Number.isInteger(height)
    && width >= 640 && height >= 360
    && width <= 7680 && height <= 4320;

  if (!valid) {
    throw new Error('Resolution must be between 640x360 and 7680x4320.');
  }
}

function renderPreview() {
  const ctx = previewCanvas.getContext('2d');
  renderWallpaper(ctx, previewCanvas.width, previewCanvas.height, latestDate);
}

function renderCountryList() {
  countryList.innerHTML = '';
  countryEntries
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .forEach((entry) => {
      const li = document.createElement('li');
      li.textContent = `${entry.name} — updated ${new Date(entry.updatedAt).toLocaleDateString('en-US')}`;
      countryList.appendChild(li);
    });
}

function downloadDataUrl(dataUrl, filename) {
  const anchor = document.createElement('a');
  anchor.href = dataUrl;
  anchor.download = filename;
  anchor.click();
}

presetSelect.addEventListener('change', () => {
  const isCustom = presetSelect.value === 'custom';
  customInputs.hidden = !isCustom;
});

exportBtn.addEventListener('click', () => {
  try {
    const { width, height } = parseResolution(presetSelect.value);
    validateResolution({ width, height });

    const format = formatSelect.value;
    const dataUrl = exportWallpaper({
      width,
      height,
      format,
      latestDate,
    });

    const ext = format === 'image/jpeg' ? 'jpg' : 'png';
    const filename = `interactive-wallpaper-map-${width}x${height}.${ext}`;
    downloadDataUrl(dataUrl, filename);
  } catch (error) {
    // eslint-disable-next-line no-alert
    alert(error.message);
  }
});

renderCountryList();
renderPreview();
>>>>>>> main
