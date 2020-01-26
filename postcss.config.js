const pkg = require('./package.json');

module.exports = ({ file, options, env }) => ({
  plugins: {
    autoprefixer: {
      Browserslist: pkg.browserslist
    },
    pixrem: {},
    'pleeease-filters': {},
    'postcss-advanced-variables': {},
    'postcss-calc': {},
    'postcss-color-function': {},
    'postcss-custom-media': {},
    'postcss-custom-properties': {},
    'postcss-custom-selectors': {},
    'postcss-extend': {},
    'postcss-flexbugs-fixes': {},
    'postcss-functions': {
      functions: {
        getLetterSpacing: (tracking, fontSize) => {
          return `${tracking / (fontSize * 16) * 1}em`;
        }
      }
    },
    'postcss-global-import': {},
    'postcss-hexrgba': {},
    'postcss-import': { root: file.dirname },
    'postcss-media-minmax': {},
    'postcss-mixins': {},
    'postcss-nesting': {},
    'postcss-nested': {},
    'postcss-percentage': {},
    'postcss-selector-matches': {},
    'postcss-selector-not': {},
    'postcss-simple-vars': {}
  }
});
