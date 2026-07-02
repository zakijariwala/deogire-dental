import tokens from '../../config/tokens.json';
import blocks from '../../config/blocks.json';
import compliance from '../../config/compliance.json';
import demo from '../../config/demo.json';

export type Provenance = 'web' | 'client' | 'missing' | 'draft';

export interface ClinicData {
  block_id: string;
  slug: string;
  demo_token: string;
  prospect_status: string;
  data_status: Record<string, Provenance>;
  [key: string]: unknown;
}

export interface Palette {
  primary: string;
  accent: string;
  accent_text_safe: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  fonts: { heading: string; body: string };
}

export const BLOCK_IDS = ['dental', 'vet', 'ent', 'ophthalmology', 'derm-aesthetic', 'plastic-surgery'] as const;

/** Blocks whose template exists. Grows as Phase 4 lands. */
export const BUILT_BLOCKS = ['derm-aesthetic'] as const;

export const HQ_SECRET: string = import.meta.env.HQ_SECRET ?? (demo as { hq_secret: string }).hq_secret;
export const hqBase = `/hq-${HQ_SECRET}`;

export function paletteFor(blockId: string): Palette {
  const t = (tokens as Record<string, unknown>)[blockId];
  if (!t) throw new Error(`No token set for block '${blockId}' in config/tokens.json`);
  return t as Palette;
}

export function blockMeta(blockId: string): { specialty: string; schema_org_type: string; sections: unknown[] } {
  const b = (blocks as Record<string, unknown>)[blockId];
  if (!b) throw new Error(`No block entry for '${blockId}' in config/blocks.json`);
  return b as { specialty: string; schema_org_type: string; sections: unknown[] };
}

export function demoPath(clinic: Pick<ClinicData, 'block_id' | 'slug' | 'demo_token'>): string {
  return `/demo/${clinic.block_id}/${clinic.slug}-${clinic.demo_token}/`;
}

/** A field counts as present only when it has a value AND non-missing provenance (rule 1). */
export function has(clinic: ClinicData, field: string): boolean {
  const v = clinic[field];
  if (v === undefined || v === null || (Array.isArray(v) && v.length === 0)) return false;
  return clinic.data_status[field] !== 'missing' && clinic.data_status[field] !== undefined;
}

export function missing(clinic: ClinicData, field: string): boolean {
  return !has(clinic, field);
}

export function hasContactMethod(clinic: ClinicData): boolean {
  return has(clinic, 'phone_e164') || has(clinic, 'whatsapp') || has(clinic, 'email');
}

/**
 * Compliance gate (rule 3): renders only when BOTH the block's allowed_content
 * flag AND the operator-set compliance.json flag are explicitly true.
 * compliance.json ships with nulls until the operator verifies live guidance.
 */
export function complianceAllows(clinic: ClinicData, flag: 'testimonials' | 'before_after' | 'superiority_claims'): boolean {
  const blockIntent = (clinic.allowed_content as Record<string, boolean> | undefined)?.[flag] === true;
  const c = (compliance as Record<string, unknown>)[clinic.block_id] as Record<string, unknown> | undefined;
  const operatorFlag = c?.[flag] === true;
  return blockIntent && operatorFlag;
}
