import { STATUS_OPTIONS } from '../core/statusConfig.js';

export class ControlPanel {
  constructor({ map, statusService }) {
    this.map = map;
    this.statusService = statusService;
    this.selectedCountry = null;

    this.countryLabel = document.getElementById('selected-country');
    this.searchInput = document.getElementById('country-search');
    this.searchButton = document.getElementById('search-button');
    this.countryList = document.getElementById('country-list');
    this.statusSelect = document.getElementById('status-select');
    this.saveButton = document.getElementById('save-status');
    this.clearButton = document.getElementById('clear-status');
    this.legendList = document.getElementById('legend-list');
  }

  init() {
    this.populateStatuses();
    this.populateCountrySearch();
    this.populateLegend();
    this.bindEvents();
  }

  bindEvents() {
    this.searchButton.addEventListener('click', () => this.handleSearch());
    this.searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.handleSearch();
      }
    });

    this.saveButton.addEventListener('click', () => {
      if (!this.selectedCountry || !this.statusSelect.value) return;
      this.statusService.setStatus(this.selectedCountry.id, this.statusSelect.value);
      this.map.refreshStyles();
    });

    this.clearButton.addEventListener('click', () => {
      if (!this.selectedCountry) return;
      this.statusService.clearStatus(this.selectedCountry.id);
      this.statusSelect.value = '';
      this.map.refreshStyles();
    });
  }

  setSelectedCountry(country) {
    this.selectedCountry = country;
    this.countryLabel.textContent = `Selected: ${country.name}`;
    this.statusSelect.disabled = false;
    this.saveButton.disabled = false;
    this.clearButton.disabled = false;
    this.statusSelect.value = this.statusService.getStatus(country.id);
  }

  handleSearch() {
    const ok = this.map.selectByName(this.searchInput.value);
    if (!ok) {
      this.countryLabel.textContent = `Country not found: "${this.searchInput.value}"`;
    }
  }

  populateStatuses() {
    STATUS_OPTIONS.forEach((status) => {
      const option = document.createElement('option');
      option.value = status.value;
      option.textContent = status.label;
      this.statusSelect.append(option);
    });
  }

  populateCountrySearch() {
    this.map.getCountryNames().forEach((countryName) => {
      const option = document.createElement('option');
      option.value = countryName;
      this.countryList.append(option);
    });
  }

  populateLegend() {
    STATUS_OPTIONS.forEach((status) => {
      const item = document.createElement('li');
      item.className = 'legend-item';
      item.innerHTML = `<span class="legend-swatch" style="background: ${status.color}"></span>${status.label}`;
      this.legendList.append(item);
    });
  }
}
