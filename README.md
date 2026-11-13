# Sitio web Escuela de Conductores Navea

Escuela de Conductores Navea es una empresa del sector de servicios de capacitación y formación para el transporte, dentro del rubro de la enseñanza y educación no formal.

## Problema

Actualmente, la escuela se da a conocer principalmente a través de Instagram y de su presencia en las búsquedas de Google. Al no contar con un sitio web propio, tiene menos visibilidad frente a la competencia, especialmente frente a escuelas que sí tienen una página donde muestran sus cursos, precios y datos de contacto.

Esto genera las siguientes limitaciones:

- **Información dispersa:** cursos, requisitos y horarios quedan repartidos entre publicaciones e historias, lo que dificulta que un potencial alumno encuentre lo que busca.
- **Menor posicionamiento en búsquedas locales:** sin un sitio web, es más difícil aparecer cuando alguien busca "escuela de conducción" en su comuna.
- **Dependencia de una sola plataforma:** la comunicación queda sujeta al alcance y a los cambios de algoritmo de Instagram.
- **Consultas repetitivas:** muchas preguntas frecuentes (requisitos, documentos, precios) se responden una y otra vez por mensaje directo.

## Solución

Se propone desarrollar una landing page que centralice toda la información de la escuela en un solo lugar, mejore su posicionamiento en búsquedas locales y facilite que los interesados se inscriban o la contacten vía WhatsApp o formulario.

### Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| Framework | Astro |
| Estilo | Tailwind CSS |
| Contenido | Astro Content Collections (Markdown / JSON) |
| Imágenes | `astro:assets` |
| Formularios | Web3Forms |
| Hosting | GitHub Pages (vía GitHub Actions) |

### Estructura del proyecto

La siguiente estructura del proyecto corresponde a una arquitectura **Jamstack**, generada estáticamente con **Astro** (SSG + Islands Architecture) y con el contenido gestionado en **Content Collections**.

Se organiza de la siguiente forma:

```text
src/
├── assets/logo-navea.png  → logo (optimizado con astro:assets)
├── components/
│   ├── ui/            → Button, Card, Badge, Accordion, SectionHeading,
│   │                    PhotoPlaceholder, LeadForm (Web3Forms)
│   ├── sections/      → Hero, Stats, Courses, OtherServices, Benefits,
│   │                    HowItWorks, Fleet, Instructors, Testimonials, FAQ,
│   │                    CTA, Contact
│   └── layout/        → Header, Footer, WhatsAppButton, CookieBanner
├── config/site.ts     → dirección, teléfono, WhatsApp, horarios y redes
├── content.config.ts  → esquemas de las Content Collections
├── content/
│   ├── courses/        → clase-b.md, a2.md, a4.md, clase-c.md (una ficha por licencia)
│   ├── services.json   → clases adicionales y refuerzos
│   ├── faq.json
│   └── testimonials.json → reseñas de Google
├── layouts/
│   └── BaseLayout.astro  → <head>, SEO, fuentes, analítica
├── pages/
│   ├── index.astro         → la landing
│   ├── cursos/[slug].astro → detalle de curso generado desde content/
│   ├── us.astro
│   ├── registration.astro
│   ├── thank_you.astro       → confirmación (sirve también para medir conversiones)
│   ├── terms.astro / privacy.astro / cookies.astro → páginas legales
│   └── 404.astro
├── scripts/            → interactividad (menú móvil, acordeón, formulario, cookies)
├── utils/url.ts        → withBase(): antepone el base path a las rutas internas
└── styles/global.css   → tokens de color y tipografía
```

## Instalación y uso

```bash
npm install      # Instalar dependencias
npm run dev      # Servidor de desarrollo en http://localhost:4321/escuela-conduccion-navea/
npm run build    # Generar el sitio en /dist
npm run preview  # Previsualizar el sitio generado
npm run check    # Chequeo de tipos
```

Requiere Node.js 22.23.4 o superior.

### Variables de entorno

Copia `.env.example` a `.env` y completa:

| Variable | Descripción |
|----------|-------------|
| `PUBLIC_WEB3FORMS_KEY` | Access key de [Web3Forms](https://web3forms.com) para el formulario de inscripción/contacto. Se obtiene gratis ingresando el correo donde deben llegar los mensajes. Sin ella el formulario no envía. |

## Deploy

El sitio se publica en **GitHub Pages**: https://fzco-var.github.io/escuela-conduccion-navea/

Cada push a `main` ejecuta el workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), que instala dependencias, genera el sitio con `npm run build` y publica la carpeta `dist/`.

Configuración necesaria en el repositorio:

1. **Settings → Pages → Source:** `GitHub Actions`. Si queda en "Deploy from a branch", GitHub intenta compilar el repo con Jekyll y el build falla.
2. **Settings → Secrets and variables → Actions:** crear el secret `PUBLIC_WEB3FORMS_KEY` (ver [Variables de entorno](#variables-de-entorno)).

### Base path

Como GitHub Pages sirve el sitio bajo `/escuela-conduccion-navea/`, `astro.config.mjs` define:

```js
site: 'https://fzco-var.github.io',
base: '/escuela-conduccion-navea',
```

Por eso los enlaces internos se escriben con `withBase()` (`src/utils/url.ts`) en lugar de rutas absolutas:

```astro
<a href={withBase('/registration')}>Inscríbete</a>
```

Si más adelante el sitio se mueve a un dominio propio, Cloudflare o Netlify, basta con actualizar `site` y eliminar `base`.
