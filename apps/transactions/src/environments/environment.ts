import { IEnvironment } from '@bytebank-pro/types';

export const environment: IEnvironment = {
  production: true,
  apiUrl: 'https://bytebank-api.onrender.com/graphql',
  baseUrl: 'https://bytebank-pro-transactions.vercel.app' // URL base do MFE transactions
};
