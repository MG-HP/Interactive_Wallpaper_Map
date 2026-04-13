type CountryPanelProps = {
  visitedCountries: string[];
};

export function CountryPanel({ visitedCountries }: CountryPanelProps) {
  return (
    <div className="panel">
      <h3>Visited Countries</h3>
      <p>Initial state model for tracked countries.</p>
      <ul>
        {visitedCountries.map((code) => (
          <li key={code}>{code}</li>
        ))}
      </ul>
    </div>
  );
}
