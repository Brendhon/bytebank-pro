import { IMfeRegistry } from './mfe';

export interface IPublicLinks {
  github: string;
  figma: string;
}

export interface IEnvironment {
  production: boolean;
  apiUrl: string;
  mfeRegistry?: IMfeRegistry;
  publicLinks?: IPublicLinks;
}
