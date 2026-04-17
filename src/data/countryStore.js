const STORAGE_KEY = 'iwm-country-status-v1';

export class CountryStore {
  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  save(countryStatuses) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(countryStatuses));
  }
}
