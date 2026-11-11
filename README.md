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
| Hosting | Cloudflare / Netlify |

### Estructura del proyecto

La siguiente estructura del proyecto corresponde a una arquitectura **Jamstack**, generada estáticamente con **Astro** (SSG + Islands Architecture) y con el contenido gestionado en **Content Collections**.

Se organiza de la siguiente forma:

```text
src/
├── assets/logo-navea.png  → logo (optimizado con astro:assets)
├── components/
│   ├── ui/            → Button, Card, Badge, Accordion, SectionHeading,
│   │                    PhotoPlaceholder, LeadForm (Web3Forms)
│   ├── sections/      → Hero, Stats, Courses, Benefits, HowItWorks,
│   │                    Fleet, Instructors, Testimonials, FAQ, CTA, Contact
│   └── layout/        → Header, Footer, WhatsAppButton
├── config/site.ts     → dirección, teléfono, WhatsApp, horarios y redes
├── content.config.ts  → esquemas de las Content Collections
├── content/
│   ├── courses/        → clase-b.md, a2.md, a4.md, clase-c.md (una ficha por licencia)
│   ├── faq.json
│   └── testimonials.json
├── layouts/
│   └── BaseLayout.astro  → <head>, SEO, fuentes, analítica
├── pages/
│   ├── index.astro         → la landing
│   ├── cursos/[slug].astro → detalle de curso generado desde content/
│   ├── us.astro
│   ├── registration.astro
│   ├── thank_you.astro       → confirmación (sirve también para medir conversiones)
│   └── 404.astro
└── styles/global.css       → tokens de color y tipografía
```

## Instalación y uso

```bash
npm install      # Instalar dependencias
npm run dev      # Servidor de desarrollo en http://localhost:4321
npm run build    # Generar el sitio en /dist
npm run preview  # Previsualizar el sitio generado
```
