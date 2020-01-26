import React from 'react';

import Default from './Default';

class Layout extends React.Component {
  resolver() {
    const { history, children, routes } = this.props;
    const path = `/${history.location.pathname.split('/')[1]}`;
    const routesLayouts = routes.reduce((colector, current) => {
      const routePath = current.path.split('/:')[0];
      return {
        ...colector,
        [routePath]: current.layout
      };
    }, {});
    const layouts = {
      default: (<Default history={history}>{children}</Default>)
    };
    const layout = routesLayouts[path];
    return layouts[layout] ? layouts[layout] : layouts.default;
  };

  render() {
    const Layout = this.resolver();
    return (
      <React.Fragment>
        {
          Layout
        }
      </React.Fragment>
    );
  };
}

export default Layout;
