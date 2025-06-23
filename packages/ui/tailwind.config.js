
import { tailwindColors, tailwindTypography } from '@bytebank-pro/shared-design-tokens';

/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{html,ts}",
];
export const theme = {
  extend: {
    colors: tailwindColors,
    typography: tailwindTypography,
  },
};
export const plugins = [];
