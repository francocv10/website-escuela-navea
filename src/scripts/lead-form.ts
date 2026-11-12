// Formularios [data-lead-form] (LeadForm.astro) enviados a Web3Forms.

// Web3Forms necesita una URL absoluta para redirigir.
document.querySelectorAll<HTMLInputElement>('[data-lead-form] [data-redirect]').forEach((input) => {
  input.value = new URL('/thank_you', location.origin).href;
});

// Feedback de envío: el botón confirma la acción y evita dobles envíos.
const forms = document.querySelectorAll<HTMLFormElement>('[data-lead-form]');

const setSending = (form: HTMLFormElement, sending: boolean) => {
  const button = form.querySelector<HTMLButtonElement>('[data-submit]');
  const label = form.querySelector<HTMLElement>('[data-submit-label]');
  if (!button || !label) return;
  label.dataset.idle ??= label.textContent ?? '';
  if (sending) button.setAttribute('aria-busy', 'true');
  else button.removeAttribute('aria-busy');
  label.textContent = sending ? 'Enviando…' : label.dataset.idle;
};

forms.forEach((form) => {
  form.addEventListener('submit', (event) => {
    const button = form.querySelector('[data-submit]');
    if (button?.hasAttribute('aria-busy')) {
      event.preventDefault();
      return;
    }
    setSending(form, true);
  });
});

// Al volver con el botón "atrás" (bfcache), el formulario queda listo de nuevo.
window.addEventListener('pageshow', (event) => {
  if (event.persisted) forms.forEach((form) => setSending(form, false));
});
