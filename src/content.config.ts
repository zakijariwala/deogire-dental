import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Loose zod mirror of /config/schema.json — the JSON Schema is the
// authoritative contract (CLAUDE.md rule 4); this only types what templates
// read. Phase 5 ingestion validates against schema.json itself.
const service = z.object({ name: z.string(), description: z.string().optional() });

const clinics = defineCollection({
  loader: glob({ pattern: ['*.json', '!_*'], base: './data/clinics' }),
  schema: z
    .object({
      block_id: z.enum(['dental', 'vet', 'ent', 'ophthalmology', 'derm-aesthetic', 'plastic-surgery']),
      specialty: z.string().optional(),
      schema_org_type: z.string().optional(),
      palette_ref: z.string().optional(),
      allowed_content: z
        .object({
          testimonials: z.boolean().default(false),
          before_after: z.boolean().default(false),
          superiority_claims: z.boolean().default(false),
        })
        .partial()
        .optional(),

      slug: z.string(),
      demo_token: z.string(),
      prospect_status: z.enum(['prospect', 'contacted', 'demo-sent', 'negotiating', 'signed', 'declined']),

      display_name: z.string().optional(),
      doctor_name: z.string().optional(),
      qualifications: z.string().optional(),
      council_reg_no: z.string().optional(),
      years_experience: z.number().optional(),
      bio: z.string().optional(),
      services: z.array(service).optional(),
      fees: z.array(z.object({ service: z.string(), amount: z.string() })).optional(),

      address_full: z.string().optional(),
      sector: z.string().optional(),
      city: z.string().optional(),
      pincode: z.string().optional(),
      lat: z.number().optional(),
      lng: z.number().optional(),
      place_id: z.string().optional(),
      maps_embed_url: z.string().optional(),

      phone_e164: z.string().optional(),
      whatsapp: z.string().optional(),
      email: z.string().optional(),
      hours: z.record(z.string()).optional(),
      languages: z.array(z.string()).optional(),

      existing_url: z.string().optional(),
      existing_url_status: z.enum(['none', 'thin', 'functional', 'unknown']).optional(),
      gbp_url: z.string().optional(),

      rating: z
        .object({ value: z.number(), count: z.number(), source_url: z.string(), pulled_on: z.string() })
        .optional(),
      reviews: z
        .array(
          z.object({
            text: z.string(),
            author: z.string(),
            source: z.string(),
            pulled_on: z.string(),
            compliance_checked: z.boolean(),
          })
        )
        .optional(),

      primary_keyword: z.string().optional(),
      secondary_keywords: z.array(z.string()).optional(),
      meta_title: z.string().optional(),
      meta_description: z.string().optional(),
      usp: z.string().optional(),

      logo: z.string().optional(),
      headshot: z.string().optional(),
      interior_photos: z.array(z.string()).optional(),

      data_status: z.record(z.enum(['web', 'client', 'missing', 'draft'])),
      sources: z.record(z.string()).optional(),
    })
    .passthrough(),
});

export const collections = { clinics };
