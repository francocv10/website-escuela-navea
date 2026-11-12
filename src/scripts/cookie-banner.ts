// Aviso de cookies (#cookie-banner) + panel de preferencias (#cookie-settings), ver CookieBanner.astro.
// Cualquier elemento con [data-cookie-settings] reabre el panel; [data-cookie-action] = accept | reject | save.
import { activateScripts, readConsent, saveConsent, type ConsentCategory } from './consent';

const banner = document.getElementById('cookie-banner') as HTMLElement;
const dialog = document.getElementById('cookie-settings') as HTMLDialogElement;
const toggles = dialog.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:not(:disabled)');

const existing = readConsent();
if (existing) activateScripts(existing);
else banner.hidden = false;

function decide(choice: Record<ConsentCategory, boolean>) {
  saveConsent(choice);
  banner.hidden = true;
  if (dialog.open) dialog.close();
}

function selection() {
  const choice = { analytics: false, marketing: false };
  toggles.forEach((t) => (choice[t.name as ConsentCategory] = t.checked));
  return choice;
}

document.addEventListener('click', (event) => {
  const target = event.target as Element;

  if (target.closest('[data-cookie-settings]')) {
    event.preventDefault();
    const current = readConsent();
    toggles.forEach((t) => (t.checked = current?.[t.name as ConsentCategory] ?? false));
    dialog.showModal();
    return;
  }

  const action = target.closest<HTMLElement>('[data-cookie-action]')?.dataset.cookieAction;
  if (!action) return;
  event.preventDefault();
  if (action === 'accept') decide({ analytics: true, marketing: true });
  else if (action === 'reject') decide({ analytics: false, marketing: false });
  else if (action === 'save') decide(selection());
});
