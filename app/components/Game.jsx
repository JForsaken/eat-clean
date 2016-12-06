import React, { Component, PropTypes } from 'react';
import R from 'ramda';
import { Link } from 'react-router';

import Player from './Player';
import Hud from './Hud';
import MonsterFactory from './MonsterFactory';
import styles from './Game.css';
import ShapeDetector from '../utils/shapeDetector';

const detector = new ShapeDetector(ShapeDetector.defaultShapes);

class Game extends Component {
  static propTypes = {
    addPattern: PropTypes.func.isRequired,
    killMonster: PropTypes.func.isRequired,
    updateLife: PropTypes.func.isRequired,
    monster: PropTypes.object.isRequired,
    player: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.isMouseDown = false;
    this.strokes = [];

    this.state = {
      lastPattern: '',
    };

    this.mouseUp = this.mouseUp.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.mouseDown, false);
    window.addEventListener('mouseup', this.mouseUp, false);
    window.addEventListener('mousemove', this.mouseMove, false);
  }

  componentWillReceiveProps(nextProps) {
    if (!R.equals(this.props.monster, nextProps.monster)) {
      if (nextProps.monster.attacked) {
        this.props.updateLife(this.props.player.life - 1);
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.mouseDown, false);
    window.removeEventListener('mouseup', this.mouseUp, false);
    window.addEventListener('mousemove', this.mouseMove, false);
  }

  mouseDown() {
    this.isMouseDown = true;
  }

  mouseUp() {
    if (!R.isEmpty(this.strokes)) {
      const detectedPattern = detector.spot(this.strokes);

      // pattern must be almost certain to be true
      if (detectedPattern.score >= 0.8) {
        this.setState({ lastPattern: detectedPattern.pattern });
        this.props.addPattern(detector.spot(this.strokes).pattern);
      }
    }

    this.isMouseDown = false;
    this.strokes = [];
  }

  mouseMove(e) {
    if (this.isMouseDown) {
      this.strokes.push({ x: e.clientX, y: e.clientY });
    }
  }

  render() {
    const { killMonster } = this.props;
    return (
      <div>
        <div className={styles.backButton}>
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>

        <Hud killedMonster={this.props.monster} lastPattern={this.state.lastPattern} />

        <Player life={this.props.player.life} />
        <MonsterFactory killMonster={killMonster} level={this.props.player.level} />
      </div>
    );
  }
}

export default Game;
