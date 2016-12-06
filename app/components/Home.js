// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';

import styles from './Home.css';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className={styles.container}>
          <h2>Eat clean</h2>
          <Link to="/play">Play Game</Link>
        </div>
      </div>
    );
  }
}
