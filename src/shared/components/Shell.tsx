import type { PropsWithChildren } from 'react';

export function Shell({ children }: PropsWithChildren) {
  return (
    <main className="shell">
      <header className="shell__header">
        <h1>Interactive Wallpaper Map</h1>
        <p>Windows-first desktop foundation built with Tauri + React + TypeScript.</p>
      </header>
      <div className="shell__grid">{children}</div>
    </main>
  );
}
