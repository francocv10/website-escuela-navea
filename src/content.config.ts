import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Una ficha Markdown por licencia; el id (slug) sale del nombre del archivo.
const courses = defineCollection({
  loader: glob({ base: './src/content/courses', pattern: '**/*.md' }),
  schema: z.object({
    code: z.string(),
    name: z.string(),
    tag: z.string(),
    description: z.string(),
    duration: z.string(),
    price: z.number().int().positive(),
    order: z.number().int(),
    requirements: z.array(z.string()),
    documents: z.array(z.string()),
  }),
});

const faq = defineCollection({
  loader: file('src/content/faq.json'),
  schema: z.object({
    id: z.string(),
    question: z.string(),
    answer: z.string(),
  }),
});

const testimonials = defineCollection({
  loader: file('src/content/testimonials.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    course: z.string(),
    source: z.string(),
    text: z.string(),
  }),
});

// Servicios fuera de los cursos de licencia (clases adicionales, refuerzos, etc.).
const services = defineCollection({
  loader: file('src/content/services.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    kind: z.enum(['Práctica', 'Teórica']),
    sessions: z.number().int().positive(),
    price: z.number().int().positive(),
    order: z.number().int(),
  }),
});

export const collections = { courses, faq, testimonials, services };
