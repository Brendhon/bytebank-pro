/**
 * Defines the possible size variants for the Image component.
 */
export const sizes = [
  'xs',
  'xsl',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  'full'
] as const;
export type ImgSize = (typeof sizes)[number];
