const root = document.documentElement;

// Basic future-ready hook for theme switching and persisted user style.
const preferredTheme = localStorage.getItem("iwm-theme");
if (preferredTheme) {
  root.setAttribute("data-theme", preferredTheme);
}
