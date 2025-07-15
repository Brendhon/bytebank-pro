import { IEnvironment } from '@bytebank-pro/types';

export const environment: IEnvironment = {
  production: false,
  apiUrl: 'http://localhost:3000/graphql',
  baseUrl: 'http://localhost:4203' // URL base do MFE settings
};
