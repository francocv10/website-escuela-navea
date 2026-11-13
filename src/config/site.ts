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
  phone: '+56 9 6857 2157',
  whatsapp: '56968572157',
  whatsappMessage: 'Hola, quiero información sobre los cursos de NAVEA.',
  hours: ['Lunes a Viernes 9:00–18:30', 'Sábado 9:00–14:00'],
  // Ficha de Google Business Profile. El Place ID se obtiene en
  // https://developers.google.com/maps/documentation/places/web-service/place-id
  // Nota y cantidad se copian a mano desde la ficha; actualizarlas de vez en cuando.
  google: {
    placeId: 'ChIJl5NKrZPZiZYRQhRnYA0JPwg',
    rating: 4.7, // actualizado 2026-11-12
    reviewCount: 70, // actualizado 2026-11-12; 0 = no se muestra la cantidad
  },
  social: {
    instagram: 'https://www.instagram.com/escuela.navea/?hl=es',
    facebook: 'https://www.facebook.com/escuelaconductores.vbf/?locale=es_LA',
  },
  mapEmbedUrl:
    'https://maps.google.com/maps?q=Calle%20Irarr%C3%A1saval%20656%2C%20Quilpu%C3%A9%2C%20Valpara%C3%ADso%2C%20Chile&z=16&output=embed',
} as const;

export const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`;

// Links a la ficha de Google: ver reseñas y dejar una. Son null mientras no haya Place ID.
const { placeId } = site.google as { placeId: string };
export const googleReviewsUrl = placeId ? `https://search.google.com/local/reviews?placeid=${placeId}` : null;
export const googleWriteReviewUrl = placeId ? `https://search.google.com/local/writereview?placeid=${placeId}` : null;

// 4.9 → "4,9"
export const googleRatingLabel = site.google.rating.toLocaleString('es-CL', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export const formatCLP = (value: number) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(value);
