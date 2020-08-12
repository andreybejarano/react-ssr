import React from 'react';

import styles from './Home.css';
import { Typography } from '@material-ui/core';

class Home extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <Typography variant="h1">Home</Typography>
      </div>
    );
  }
}

export default Home;
