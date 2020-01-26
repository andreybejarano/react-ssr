import React from 'react';

import styles from './Home.css';

class Home extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.title}>
          Home
        </div>
      </div>
    );
  }
}

export default Home;
