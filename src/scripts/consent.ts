// Consentimiento de cookies: guarda la elección en una cookie propia y activa los scripts que la requieren.
//
// Para cargar un script solo con consentimiento (p. ej. la analítica, cuando se defina), declararlo como:
//   <script type="text/plain" data-consent="analytics" src="https://..."></script>
//   <script type="text/plain" data-consent="analytics">/* código en línea */</script>
// Se ejecuta recién cuando el usuario acepta esa categoría. También se emite el evento
// `navea:consent` (detail: Consent) en `document` cada vez que se guarda una elección.

export type ConsentCategory = 'analytics' | 'marketing';
export type Consent = Record<ConsentCategory, boolean> & { v: number; date: string };

const COOKIE_NAME = 'navea_consent';
// Subir la versión obliga a pedir el consentimiento de nuevo (p. ej. si se agregan categorías o proveedores).
const VERSION = 1;
const MAX_AGE = 60 * 60 * 24 * 180; // 180 días

export function readConsent(): Consent | null {
  const raw = document.cookie
    .split('; ')
    .find((c) => c.startsWith(`${COOKIE_NAME}=`))
    ?.slice(COOKIE_NAME.length + 1);
  if (!raw) return null;
  try {
    const consent = JSON.parse(decodeURIComponent(raw)) as Consent;
    return consent.v === VERSION ? consent : null;
  } catch {
    return null;
  }
}

export function saveConsent(choice: Record<ConsentCategory, boolean>): Consent {
  const previous = readConsent();
  const consent: Consent = { ...choice, v: VERSION, date: new Date().toISOString() };
  const secure = location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(consent))}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;

  // Un script ya ejecutado no se puede "descargar": si se retira un permiso, recargamos la página.
  const revoked = previous && (Object.keys(choice) as ConsentCategory[]).some((k) => previous[k] && !choice[k]);
  if (revoked) {
    location.reload();
    return consent;
  }

  activateScripts(consent);
  document.dispatchEvent(new CustomEvent<Consent>('navea:consent', { detail: consent }));
  return consent;
}

export function activateScripts(consent: Consent) {
  document.querySelectorAll<HTMLScriptElement>('script[type="text/plain"][data-consent]').forEach((placeholder) => {
    if (!consent[placeholder.dataset.consent as ConsentCategory]) return;
    const script = document.createElement('script');
    for (const { name, value } of Array.from(placeholder.attributes)) {
      if (name !== 'type' && name !== 'data-consent') script.setAttribute(name, value);
    }
    script.text = placeholder.text;
    placeholder.replaceWith(script);
  });
}
