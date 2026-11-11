// Anima apertura/cierre de los acordeones (<details data-accordion>): altura + fundido del contenido.
// Sin JS, el <details> nativo sigue funcionando (mismo `name` = se abren de a uno).

const EASE = 'cubic-bezier(0.33, 1, 0.68, 1)'; // ease-out suave, sin frenazo brusco
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

type Controller = { open: () => void; close: () => void };
const controllers = new WeakMap<HTMLDetailsElement, Controller>();

function enhance(details: HTMLDetailsElement) {
  const summary = details.querySelector('summary');
  const content = details.querySelector<HTMLElement>('[data-accordion-content]');
  if (!summary || !content) return;

  const group = details.dataset.accordionGroup;
  // La exclusividad nativa de `name` cierra los hermanos de golpe; la manejamos aquí para animarla.
  details.removeAttribute('name');

  let expanded = details.open;
  let heightAnim: Animation | null = null;
  let contentAnim: Animation | null = null;

  const setExpanded = (value: boolean) => {
    expanded = value;
    details.toggleAttribute('data-expanded', value);
  };

  const closedHeight = () => summary.offsetHeight + (details.offsetHeight - details.clientHeight);

  const animate = (opening: boolean) => {
    setExpanded(opening);

    if (reducedMotion.matches) {
      heightAnim?.cancel();
      contentAnim?.cancel();
      details.open = opening;
      return;
    }

    // Partimos desde la altura actual (permite invertir una animación a mitad de camino).
    const from = details.offsetHeight;
    heightAnim?.cancel();
    contentAnim?.cancel();

    if (opening) details.open = true;
    const to = opening ? details.offsetHeight : closedHeight();
    const distance = Math.abs(to - from);
    const duration = Math.min(560, Math.max(320, distance * 2.2));

    heightAnim = details.animate(
      { height: [`${from}px`, `${to}px`] },
      { duration, easing: EASE, fill: 'forwards' },
    );

    contentAnim = opening
      ? content.animate(
          { opacity: [0, 1], transform: ['translateY(-8px)', 'translateY(0)'] },
          { duration: duration * 0.85, delay: duration * 0.15, easing: EASE, fill: 'backwards' },
        )
      : content.animate(
          { opacity: [1, 0], transform: ['translateY(0)', 'translateY(-6px)'] },
          { duration: duration * 0.55, easing: 'ease-in', fill: 'forwards' },
        );

    const current = heightAnim;
    current.onfinish = () => {
      if (heightAnim !== current) return;
      if (!opening) details.open = false;
      heightAnim?.cancel();
      contentAnim?.cancel();
      heightAnim = contentAnim = null;
    };
  };

  const controller: Controller = {
    open: () => !expanded && animate(true),
    close: () => expanded && animate(false),
  };
  controllers.set(details, controller);

  summary.addEventListener('click', (event) => {
    event.preventDefault();
    if (expanded) {
      controller.close();
      return;
    }
    document
      .querySelectorAll<HTMLDetailsElement>(`details[data-accordion-group="${group}"]`)
      .forEach((other) => {
        if (other !== details) controllers.get(other)?.close();
      });
    controller.open();
  });

  // Aperturas que no pasan por el clic (p. ej. buscar en la página con Ctrl+F).
  details.addEventListener('toggle', () => {
    if (!heightAnim && details.open !== expanded) setExpanded(details.open);
  });
}

document.querySelectorAll<HTMLDetailsElement>('details[data-accordion]').forEach(enhance);
