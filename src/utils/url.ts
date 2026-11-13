// Antepone el `base` de Astro (p. ej. /escuela-conduccion-navea en GitHub Pages)
// a una ruta interna. En local, con base '/', devuelve la ruta tal cual.
export function withBase(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
