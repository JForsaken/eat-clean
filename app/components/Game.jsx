// @flow
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './Game.css';
import zangief from '../../resources/images/zangief.png';
import shapeDetector from '../utils/shapeDetector';

const detector = new shapeDetector(shapeDetector.defaultShapes);

const mainCharacter = {
  position: 'absolute',
  top: '32%',
  backgroundImage: `url(${zangief})`,
  overflow: 'hidden',
  display: 'inline-block',
  height: 200,
  width: '100%',
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

class Counter extends Component {
  static propTypes = {
    increment: PropTypes.func.isRequired,
    incrementIfOdd: PropTypes.func.isRequired,
    incrementAsync: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    counter: PropTypes.number.isRequired,
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
      strokes.push({x: e.clientX, y: e.clientY });
      this.setState({ strokes });
    }
  }

  render() {
    const { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;
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
        <div style={mainCharacter} />
      </div>
    );
  }
}

export default Counter;
