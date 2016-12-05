import React, { Component, PropTypes } from 'react';

import Monster from './Monster';

class MonsterFactory extends Component {
  static propTypes = {
    killMonster: PropTypes.func.isRequired,
  };

  render() {
    const monsters = [];
    for (let i = 1; i <= 1; i += 1) {
      monsters.push(
        <Monster key={`monster${i}`} killMonster={this.props.killMonster} monsterId={i} />
      );
    }
    return (
      <div>
        {monsters}
      </div>
    );
  }
}

export default MonsterFactory;
