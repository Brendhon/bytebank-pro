import { IMfeRegistry } from "./mfe";

export interface IEnvironment {
  production: boolean;
  apiUrl: string;
  mfeRegistry: IMfeRegistry;
}