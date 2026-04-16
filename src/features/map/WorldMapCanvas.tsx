type WorldMapCanvasProps = {
  selectedCount: number;
  onToggleSampleCountry: () => void;
};

export function WorldMapCanvas({ selectedCount, onToggleSampleCountry }: WorldMapCanvasProps) {
  return (
    <div className="panel map-panel">
      <div className="map-panel__placeholder">
        <p>World map renderer placeholder</p>
        <p>{selectedCount} countries marked visited</p>
      </div>
      <button onClick={onToggleSampleCountry}>Toggle sample country (JP)</button>
    </div>
  );
}
