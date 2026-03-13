/**
 * Centralised font-size scale.
 * Import these tokens instead of using raw numbers – keeps sizing consistent.
 */
export const fontSizes = {
  /** 10 — tiny labels, badges */
  xs: 10,
  /** 12 — captions, meta text */
  sm: 12,
  /** 14 — body / default */
  md: 14,
  /** 16 — subtitles, inputs */
  lg: 16,
  /** 18 — section headers */
  xl: 18,
  /** 20 — page titles */
  xxl: 20,
  /** 24 — large titles */
  xxxl: 24,
  /** 28 — hero / splash display */
  hero: 28,
} as const;

export type FontSizes = typeof fontSizes;
