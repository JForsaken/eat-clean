import React, { Component, PropTypes } from 'react';

import Monster from './Monster';
import symbols from '../constants/symbols';

class MonsterFactory extends Component {
  static propTypes = {
    killMonster: PropTypes.func.isRequired,
    level: PropTypes.number.isRequired,
  };

  static getSpawnTime() {
    return Math.floor(Math.random() * ((11000 - 7000) + 7000)) + 1;
  }

  constructor(props) {
    super(props);

    this.state = {
      monsters: [],
    };
  }

  componentWillMount() {
    this.spawnNewMonsters();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.level !== this.props.level) {
      this.spawnNewMonsters();
    }
  }

  getRandom(min, max) {
    return Math.floor(Math.random() * ((max - min) + 1)) + min;
  }

  getSolution() {
    const solution = [];
    const amount = this.getRandom(1, 2);
    const symbolNames = Object.keys(symbols);

    while (solution.length < amount) {
      solution.push(symbolNames[this.getRandom(0, symbolNames.length - 1)]);
    }

    return solution;
  }

  spawnNewMonsters() {
    for (let i = 1; i <= Math.ceil(this.props.level * 1.5); i += 1) {
      setTimeout(() => {
        this.spawn();
      }, (1 / this.props.level) * MonsterFactory.getSpawnTime());
    }
  }

  spawn() {
    const { monsters } = this.state;
    monsters.push(
      <Monster
        key={`monster${monsters.length}`}
        killMonster={this.props.killMonster}
        monsterId={monsters.length}
        solution={this.getSolution()}
      />
    );

    this.setState({ monsters });
  }
  render() {
    return (
      <div>
        {this.state.monsters}
      </div>
    );
  }
}

export default MonsterFactory;
