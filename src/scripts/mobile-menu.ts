// Menú móvil del Header: [data-menu-toggle] abre/cierra #mobile-menu; al elegir un enlace se cierra.
const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const menu = document.getElementById('mobile-menu');

const setOpen = (open: boolean) => {
  if (!toggle || !menu) return;
  menu.hidden = !open;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
};

toggle?.addEventListener('click', () => setOpen(Boolean(menu?.hidden)));
menu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
