export const countryEntries = [
  { code: 'US', name: 'United States', updatedAt: '2026-04-10' },
  { code: 'BR', name: 'Brazil', updatedAt: '2026-04-09' },
  { code: 'JP', name: 'Japan', updatedAt: '2026-04-11' },
  { code: 'ZA', name: 'South Africa', updatedAt: '2026-04-08' },
  { code: 'DE', name: 'Germany', updatedAt: '2026-04-12' },
];

export function getLatestUpdateDate(entries) {
  const latest = entries.reduce((max, entry) => {
    const entryDate = new Date(entry.updatedAt);
    return entryDate > max ? entryDate : max;
  }, new Date(0));

  return latest;
}
