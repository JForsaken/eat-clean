// @flow
import React, { Component, PropTypes } from 'react';
import R from 'ramda';

import styles from './Game.css';

class Hud extends Component {
  static propTypes = {
    killedMonster: PropTypes.object.isRequired,
    lastPattern: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      score: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!R.equals(this.props.killedMonster, nextProps.killedMonster)) {
      if (!nextProps.killedMonster.attacked) {
        this.setState({ score: this.state.score + 1 });
      }
    }
  }

  render() {
    return (
      <div>
        <div className={`lastPattern ${styles.lastPattern}`}>
          {this.props.lastPattern}
        </div>
        <div className={`score ${styles.score}`}>
          {`Score: ${this.state.score}`}
        </div>
      </div>
    );
  }
}

export default Hud;
