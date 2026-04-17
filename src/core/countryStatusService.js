import { STATUS_BY_VALUE } from './statusConfig.js';

export class CountryStatusService {
  constructor(store) {
    this.store = store;
    this.statuses = store.load();
  }

  getAll() {
    return { ...this.statuses };
  }

  getStatus(countryId) {
    return this.statuses[countryId] || '';
  }

  setStatus(countryId, status) {
    if (!STATUS_BY_VALUE[status]) {
      throw new Error(`Unsupported status: ${status}`);
    }
    this.statuses[countryId] = status;
    this.store.save(this.statuses);
  }

  clearStatus(countryId) {
    delete this.statuses[countryId];
    this.store.save(this.statuses);
  }
}
