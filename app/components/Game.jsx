import React, { Component, PropTypes } from 'react';
import R from 'ramda';
import { Link } from 'react-router';

import Player from './Player';
import MonsterFactory from './MonsterFactory';
import styles from './Game.css';
import ShapeDetector from '../utils/shapeDetector';

const detector = new ShapeDetector(ShapeDetector.defaultShapes);

class Counter extends Component {
  static propTypes = {
    killMonster: PropTypes.func.isRequired,
    updateLife: PropTypes.func.isRequired,
    monster: PropTypes.object.isRequired,
    player: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isMouseDown: false,
      strokes: [],
      pattern: '',
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
    this.setState({ isMouseDown: true });
  }

  mouseUp() {
    if (this.state.strokes) {
      this.setState({ pattern: detector.spot(this.state.strokes).pattern });
      console.log(this.state.strokes);
      console.log(detector.spot(this.state.strokes));
    }
    this.setState({
      isMouseDown: false,
      strokes: [],
    });
  }

  mouseMove(e) {
    const { strokes, isMouseDown } = this.state;

    if (isMouseDown) {
      strokes.push({ x: e.clientX, y: e.clientY });
      this.setState({ strokes });
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
        <div className={`counter ${styles.counter}`}>
          {this.state.pattern}
        </div>
        <Player life={this.props.player.life} />
        <MonsterFactory killMonster={killMonster} />
      </div>
    );
  }
}

export default Counter;
