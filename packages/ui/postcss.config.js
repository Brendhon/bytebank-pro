const postcssNestingPlugin = 'postcss-nesting';

/** @type {import('postcss').Config} */
export default {
  plugins: {
    'postcss-import': {
      resolve: (id, basedir) => {
        // Handle @styles/* paths
        if (id.startsWith('@styles/')) {
          return id.replace('@styles/', './styles/');
        }
        return id;
      }
    },
    '@tailwindcss/nesting': require(postcssNestingPlugin),
    tailwindcss: {},
    autoprefixer: {}
  }
};
