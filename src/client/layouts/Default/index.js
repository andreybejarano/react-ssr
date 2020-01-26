import React from 'react';

import styles from './Default.css';

class Default extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        {this.props.children}
      </div>
    );
  }
}

export default Default;
