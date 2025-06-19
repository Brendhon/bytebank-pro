// packages/shared-design-tokens/tailwind.tokens.ts
import { colors } from './colors';
import { fontFamilies, fontSizes, fontWeights, lineHeights } from './typography';

export const tailwindColors = {
  // This will create tokens like 'bytebank-blue', 'bytebank-orange', etc.
  ...colors,
  // Example of how to use colors with shades, if you had them (e.g., 'blue-500')
  // 'bytebank-blue': {
  //    DEFAULT: colors['bytebank-blue'],
  //    500: colors['bytebank-blue'], // Example
  // }
};

export const tailwindTypography = {
  fontFamily: {
    inter: fontFamilies.inter,
  },
  fontSize: {
    // This creates classes like 'text-14px', 'text-16px'
    ...fontSizes,
  },
  fontWeight: {
    // This creates classes like 'font-regular', 'font-semi-bold', 'font-bold'
    'regular': fontWeights.regular.toString(), // Tailwind expects fontWeight as string
    'semi-bold': fontWeights['semi-bold'].toString(),
    'bold': fontWeights.bold.toString(),
  },
  lineHeight: {
    // This creates classes like 'leading-120', 'leading-auto'
    '120': lineHeights['120'],
    'auto': lineHeights.auto,
  },
  // Here you can add other typography properties for Tailwind
  // For example, for a specific H1:
  // h1: {
  //   fontSize: fontSizes['24px'],
  //   fontWeight: fontWeights.bold,
  //   lineHeight: lineHeights['120'],
  // },
};

// You can export more things if needed for other sections of tailwind.config.js
// For example, for spacing, borderRadius, etc.