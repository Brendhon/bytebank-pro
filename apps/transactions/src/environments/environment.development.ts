import { IEnvironment } from '@bytebank-pro/types';

export const environment: IEnvironment = {
  production: false,
  apiUrl: 'http://localhost:3000/graphql',
  baseUrl: 'https://bytebank-pro-transactions.vercel.app' // URL base do MFE transactions
};
