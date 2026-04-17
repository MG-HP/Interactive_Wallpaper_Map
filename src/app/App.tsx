import { Shell } from '../shared/components/Shell';
import { WorldMapCanvas } from '../features/map/WorldMapCanvas';
import { CountryPanel } from '../features/countries/CountryPanel';
import { ExportPanel } from '../features/export/ExportPanel';
import { WallpaperPanel } from '../features/wallpaper/WallpaperPanel';
import { useCountryStore } from '../features/countries/countryStore';

export function App() {
  const { visitedCountries, toggleVisited } = useCountryStore();

  return (
    <Shell>
      <section>
        <h2>Map Preview</h2>
        <p>Foundation placeholder: this box becomes the interactive SVG world map.</p>
        <WorldMapCanvas
          selectedCount={visitedCountries.length}
          onToggleSampleCountry={() => toggleVisited('JP')}
        />
      </section>

      <section>
        <CountryPanel visitedCountries={visitedCountries} />
      </section>

      <section>
        <ExportPanel />
      </section>

      <section>
        <WallpaperPanel />
      </section>
    </Shell>
  );
}
