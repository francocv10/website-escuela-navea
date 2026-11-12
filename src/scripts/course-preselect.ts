// Preselecciona el curso cuando se llega desde /cursos/[slug] (?curso=clase-b).
const slug = new URLSearchParams(location.search).get('curso');
const select = document.querySelector<HTMLSelectElement>('select[name="curso"]');
const option = slug && select ? select.querySelector<HTMLOptionElement>(`option[data-slug="${CSS.escape(slug)}"]`) : null;
if (option) option.selected = true;
