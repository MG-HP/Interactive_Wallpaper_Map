import { CountryStore } from './data/countryStore.js';
import { CountryStatusService } from './core/countryStatusService.js';
import { WorldMap } from './map/worldMap.js';
import { ControlPanel } from './ui/controlPanel.js';

async function bootstrap() {
  const statusService = new CountryStatusService(new CountryStore());

  const map = new WorldMap({
    containerId: 'map',
    statusService,
    onCountrySelected: (country) => controls.setSelectedCountry(country)
  });

  await map.init();

  const controls = new ControlPanel({ map, statusService });
  controls.init();
}

bootstrap().catch((error) => {
  console.error('Failed to load map MVP:', error);
  const label = document.getElementById('selected-country');
  if (label) {
    label.textContent = 'Failed to load world map data. Check network access and refresh.';
  }
});
