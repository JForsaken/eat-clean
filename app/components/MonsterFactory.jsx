import React, { Component, PropTypes } from 'react';

import Monster from './Monster';

class MonsterFactory extends Component {
  static propTypes = {
    killMonster: PropTypes.func.isRequired,
  };

  render() {
    return <Monster killMonster={this.props.killMonster} monsterId={1} />;
  }
}

export default MonsterFactory;
