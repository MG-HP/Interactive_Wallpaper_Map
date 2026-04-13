import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7/+esm';
import { STATUS_BY_VALUE } from '../core/statusConfig.js';

const WORLD_GEOJSON_URL = 'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json';

export class WorldMap {
  constructor({ containerId, onCountrySelected, statusService }) {
    this.container = document.getElementById(containerId);
    this.onCountrySelected = onCountrySelected;
    this.statusService = statusService;
    this.countryById = new Map();
    this.countryByName = new Map();
    this.selectedId = null;
  }

  async init() {
    const geoJson = await fetch(WORLD_GEOJSON_URL).then((response) => response.json());
    this.features = geoJson.features.map((feature) => {
      const id = feature.id || feature.properties?.iso_a3 || feature.properties?.name;
      const name = feature.properties?.name || id;
      const country = { ...feature, __id: id, __name: name };
      this.countryById.set(id, country);
      this.countryByName.set(name.toLowerCase(), country);
      return country;
    });

    this.render();
  }

  render() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    const svg = d3.select(this.container).append('svg').attr('viewBox', `0 0 ${width} ${height}`);
    const projection = d3.geoNaturalEarth1().fitSize([width, height], {
      type: 'FeatureCollection',
      features: this.features
    });

    const path = d3.geoPath(projection);
    this.countryPaths = svg
      .append('g')
      .selectAll('path')
      .data(this.features)
      .join('path')
      .attr('class', 'country')
      .attr('d', path)
      .attr('data-country-id', (d) => d.__id)
      .on('click', (_, country) => this.selectCountry(country.__id, true));

    this.refreshStyles();
  }

  refreshStyles() {
    this.countryPaths.each((feature, index, nodes) => {
      const id = feature.__id;
      const status = this.statusService.getStatus(id);
      const path = nodes[index];
      const statusConfig = status ? STATUS_BY_VALUE[status] : null;

      path.style.fill = statusConfig?.color ?? '#2a334f';
      path.style.opacity = statusConfig?.value === 'visited' ? '0.95' : statusConfig ? '0.72' : '1';
      path.classList.toggle('is-selected', this.selectedId === id);
    });
  }

  getCountryNames() {
    return [...this.countryByName.keys()].map((name) => this.countryByName.get(name).__name).sort();
  }

  selectByName(countryName) {
    const country = this.countryByName.get(countryName.trim().toLowerCase());
    if (!country) return false;
    this.selectCountry(country.__id, true);
    return true;
  }

  selectCountry(countryId, notify = false) {
    const country = this.countryById.get(countryId);
    if (!country) return;

    this.selectedId = countryId;
    this.refreshStyles();

    if (notify) {
      this.onCountrySelected({ id: country.__id, name: country.__name });
    }
  }
}
