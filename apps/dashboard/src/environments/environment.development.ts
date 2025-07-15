import { IEnvironment } from '@bytebank-pro/types';

export const environment: IEnvironment = {
  production: false,
  apiUrl: 'http://localhost:3000/graphql',
  baseUrl: 'http://localhost:4201' // URL base do MFE dashboard
};
