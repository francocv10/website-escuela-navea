// Datos de contacto y negocio usados en header, footer, contacto, WhatsApp y SEO.
// TODO: confirmar con el cliente los valores marcados como provisorios.
export const site = {
  name: 'NAVEA Escuela de Conductores',
  shortName: 'NAVEA',
  description:
    'Escuela de conductores en Quilpué. Cursos Clase B y licencias profesionales con instructores certificados y autos con doble comando.',
  address: {
    street: 'Calle Irarrásaval 656',
    city: 'Quilpué',
    region: 'Región de Valparaíso',
    country: 'CL',
  },
  phone: '+56 9 0000 0000', // provisorio
  whatsapp: '56900000000', // provisorio, formato internacional sin "+"
  whatsappMessage: 'Hola, quiero información sobre los cursos de NAVEA.',
  hours: ['Lun a Vie 9:00–20:00', 'Sáb 9:00–14:00'],
  googleRating: '4,9',
  googleReviewsUrl: '#', // provisorio
  social: {
    instagram: '#', // provisorio
    facebook: '#', // provisorio
    tiktok: '#', // provisorio
  },
  mapEmbedUrl:
    'https://maps.google.com/maps?q=Calle%20Irarr%C3%A1saval%20656%2C%20Quilpu%C3%A9%2C%20Valpara%C3%ADso%2C%20Chile&z=16&output=embed',
} as const;

export const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`;

export const formatCLP = (value: number) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(value);
