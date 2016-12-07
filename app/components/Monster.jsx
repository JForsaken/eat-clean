import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import { equals, reduce } from 'ramda';

import icons from '../constants/symbols';

import monsterSprite from '../../resources/images/monster.gif';

const { BrowserWindow } = require('electron').remote;

const monster = {
  position: 'absolute',
  backgroundImage: `url(${monsterSprite})`,
  height: 125,
  width: '100%',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
};

const symbols = {
  position: 'absolute',
  top: -20,
  left: 30,
};

class Monster extends Component {
  static propTypes = {
    killMonster: PropTypes.func.isRequired,
    monsterId: PropTypes.number.isRequired,
    killedMonsterId: PropTypes.number,
    patterns: PropTypes.arrayOf(PropTypes.string),
    solution: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  constructor(props) {
    super(props);
    this.move = this.move.bind(this);
    this.orientation = {
      x: 'LEFT',
      y: 'UP',
    };
  }

  componentWillMount() {
    const position = BrowserWindow.getFocusedWindow().getSize();
    const offset = 0;
    this.orientation.x = Math.floor(Math.random() * ((1 - 0) + 1)) + 0 === 0 ? 'LEFT' : 'RIGHT';
    this.orientation.y = Math.floor(Math.random() * ((1 - 0) + 1)) + 0 === 0 ? 'UP' : 'DOWN';

    const y = Math.floor(Math.random() * ((position[1] - 0) + position[1])) + 0;
    this.orientation.y = y >= position[1] / 2 ? 'DOWN' : 'UP';

    const id = setInterval(() => this.move(), 50);

    this.setState({
      position: {
        x: this.orientation.x === 'LEFT' ? -offset : position[0] + offset,
        y,
      },
      visible: true,
      intervalId: id,
    });
  }

  componentWillReceiveProps(nextProps) {
    // new pattern done
    if (!equals(nextProps.patterns, this.props.patterns)) {
      if (this.isDead(nextProps.patterns)) {
        this.props.killMonster(this.props.monsterId, false);
      }
    }

    // new monster death
    if (nextProps.killedMonsterId !== this.props.killedMonsterId) {
      // if current monster died
      if (nextProps.killedMonsterId === this.props.monsterId) {
        clearInterval(this.state.intervalId);
        this.setState({ visible: false });
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  getSolutionString(solution) {
    return reduce((str, symbol) => `${str} ${icons[symbol]} `, '', solution);
  }

  isDead(patterns) {
    const { solution } = this.props;

    return patterns && patterns.length >= solution.length &&
            equals(patterns.slice(patterns.length - solution.length, patterns.length), solution);
  }

  move() {
    const { position } = this.state;
    const speed = 5;
    const screenSize = BrowserWindow.getFocusedWindow().getSize();
    const middle = {
      x: (screenSize[0] / 2) - 40,
      y: (screenSize[1] / 2) - 40,
    };
    const rotation = Math.atan2(middle.y - position.y, middle.x - position.x);

    if (Math.abs(position.x - middle.x) < 5 && Math.abs(position.y - middle.y) < 5) {
      this.props.killMonster(this.props.monsterId, true);
    }

    this.setState({
      position: {
        x: (position.x + (Math.cos(rotation) * speed)),
        y: (position.y + (Math.sin(rotation) * speed)),
      },
    });
  }

  render() {
    if (!this.state.visible) {
      return null;
    }

    return (
      <div style={{ position: 'relative' }}>
        <Draggable
          disabled
          position={this.state.position}
          zIndex={220}
          onStart={this.handleStart}
          onDrag={this.handleDrag}
          onStop={this.handleStop}
          handle={`.monster${this.props.monsterId}handle`}
        >
          <div style={monster}>
            <div style={symbols}>
              {this.getSolutionString(this.props.solution)}
            </div>
          </div>
        </Draggable>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  patterns: state.player.drawnPatterns,
  killedMonsterId: state.monster.id,
});

export default connect(mapStateToProps)(Monster);
