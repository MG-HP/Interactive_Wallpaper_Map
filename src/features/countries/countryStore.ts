import { useMemo, useState } from 'react';

const DEFAULT_VISITED = ['US', 'FR'];

export function useCountryStore() {
  const [visitedCountries, setVisitedCountries] = useState<string[]>(DEFAULT_VISITED);

  const api = useMemo(
    () => ({
      visitedCountries,
      toggleVisited: (countryCode: string) => {
        setVisitedCountries((prev) =>
          prev.includes(countryCode)
            ? prev.filter((code) => code !== countryCode)
            : [...prev, countryCode]
        );
      }
    }),
    [visitedCountries]
  );

  return api;
}
