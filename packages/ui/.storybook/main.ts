import type { StorybookConfig } from '@storybook/angular';

import { join, dirname } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [getAbsolutePath('@storybook/addon-docs')],
  framework: {
    name: getAbsolutePath('@storybook/angular'),
    options: {}
  },
  webpackFinal: async (config: any) => {
    // Remove conflicting DefinePlugin definitions
    config.plugins = config.plugins.filter((plugin: any) => {
      if (plugin.constructor.name === 'DefinePlugin') {
        // Remove duplicate NODE_ENV definitions
        delete plugin.definitions['process.env.NODE_ENV'];
      }
      return true;
    });

    return config;
  }
};
export default config;
