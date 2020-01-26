const isDebug = process.env.NODE_ENV !== 'production';

const path = require('path');
const cssModulesHook = require('css-modules-require-hook');

cssModulesHook({
  extensions: ['.css'],
  camelCase: 'dashes',
  rootDir: path.resolve(__dirname, '../../client/'),
  generateScopedName: isDebug ? '[name]-[local]-[hash:base64:5]' : '[hash:base64:5]'
});

const React = require('react');
const { Provider } = require('react-redux');
const { StaticRouter } = require('react-router');
const { renderToStaticMarkup, renderToString } = require('react-dom/server');

const configureStore = require('../../client/store/configStore').default;

const Html = require('../../client/Html').default;

const Pages = require('../../client/Pages').default;

const assets = require('../../../dist/assets.json');

class ServerSideRender {
  static render(req, res) {
    const store = configureStore({});
    const context = { store };
    const createElement = React.createElement;
    const state = store.getState();
    const data = {
      state,
      styles: [assets.client.css],
      scripts: [assets.client.js],
      children: renderToString(
        createElement(
          Provider,
          { store },
          createElement(
            StaticRouter,
            { location: req.originalUrl, context },
            createElement(Pages, {})
          )
        )
      )
    };

    const html = renderToStaticMarkup(createElement(Html, data));

    res.send(`<!doctype html>${html}`);
  }
}

module.exports = ServerSideRender;
