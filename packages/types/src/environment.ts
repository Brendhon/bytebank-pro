import { IMfeRegistry } from './mfe';

export interface IPublicLinks {
  github: string;
  figma: string;
}

export interface IEnvironment {
  production: boolean;
  apiUrl: string;
  baseUrl?: string; // URL base para assets do MFE
  mfeRegistry?: IMfeRegistry;
  publicLinks?: IPublicLinks;
}
