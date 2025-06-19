// packages/shared-design-tokens/typography.ts

export const fontFamilies = {
  inter: ['Inter', 'sans-serif'], // Based on the examples from the image
};

export const fontSizes = {
  '14px': '14px',
  '16px': '16px',
  '18px': '18px', // For Header (18px Semibold)
  '20px': '20px',
  '24px': '24px',
};

export const fontWeights = {
  regular: 400, // Not explicitly stated, but a standard weight for 'Regular'
  'semi-bold': 600, // 'Semi Bold' in the image
  bold: 700,      // 'Bold' in the image
};

export const lineHeights = {
  // Based on 120% for 14px, 16px, 20px, 24px
  '120': '120%',
  // For '18px Semibold (Header)', which is 'auto' in the image, can be normal or a fixed value if preferred.
  'auto': 'normal',
};

export const letterSpacings = {
  '0.5px': '0.5px', // Based on the example of '14px Regular'
  '1px': '1px',     // Based on the example of '16px Regular'
  '2px': '2px',     // Based on the example of '18px Semibold (Header)'
  '3px': '3px',     // Based on the example of '20px Bold'
  '4px': '4px',     // Based on the example of '24px Bold'
};