export const STATUS_OPTIONS = [
  { value: 'visited', label: 'Visited', color: '#f5b641', weight: 1 },
  { value: 'want_to_visit', label: 'Want to visit', color: '#7bb6ff', weight: 2 },
  { value: 'lived_in', label: 'Lived in', color: '#a593ff', weight: 2 },
  { value: 'transited_through', label: 'Transited through', color: '#6dd0ba', weight: 2 }
];

export const STATUS_BY_VALUE = Object.fromEntries(
  STATUS_OPTIONS.map((status) => [status.value, status])
);
