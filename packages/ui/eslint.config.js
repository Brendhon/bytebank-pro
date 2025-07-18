// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import angular from '@bytebank-pro/eslint-config/angular';

export default [...angular, ...storybook.configs['flat/recommended']];
