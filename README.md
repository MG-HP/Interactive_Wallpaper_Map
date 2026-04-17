# Interactive Wallpaper Map

A polished MVP shell for an interactive wallpaper map builder.

## Start here (important)

Run local commands from this folder:

```bash
cd /workspace/Interactive_Wallpaper_Map
```

## Structure

```text
.
├── index.html
└── src
    ├── app.js
    └── styles
        ├── tokens.css      # design tokens / theming values
        ├── base.css        # reset + typography + element defaults
        ├── layout.css      # page/grid layout and breakpoints
        └── components.css  # reusable UI component classes
```

## Styling approach

The UI is intentionally split into 4 style layers so future changes are easy:

1. **Tokens (`tokens.css`)**
   - Centralized colors, radii, spacing, shadows, font family.
   - Includes a `:root[data-theme="light"]` override so user-selectable themes can expand later with minimal rewiring.
2. **Base (`base.css`)**
   - Shared global defaults and typography.
3. **Layout (`layout.css`)**
   - Top-level app shell and responsive panel arrangement.
4. **Components (`components.css`)**
   - Reusable panel/button/chip/field primitives and map workspace pieces.

## Future-ready notes

Current UI keeps MVP simple while preparing for:

- user-selectable themes (token overrides)
- map theme presets (segmented control in map toolbar)
- dual-monitor and alternate layout presets (resolution chips + responsive grid structure)
- print/poster mode (export group and control placeholders)

## Quick local preview

```bash
python3 -m http.server 4173
```

Then open <http://localhost:4173>.
