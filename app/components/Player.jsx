// @flow
import React, { Component, PropTypes } from 'react';
import Draggable from 'react-draggable';
import zangief from '../../resources/images/zangief.png';

const { BrowserWindow } = require('electron').remote;

const mainCharacter = {
  position: 'relative',
  backgroundImage: `url(${zangief})`,
  height: 200,
  width: '100%',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
};

const hud = {
  position: 'absolute',
  top: -20,
  left: 30,
};

class Player extends Component {
  static propTypes = {
    life: PropTypes.number.isRequired,
  };

  componentWillMount() {
    const position = BrowserWindow.getFocusedWindow().getSize();
    this.setState({
      position: {
        x: (position[0] / 2) - 50,
        y: (position[1] / 2) - 125,
      },
    });
  }
  render() {
    let life = '';
    for (let i = 1; i <= this.props.life; i += 1) {
      life += '<3 ';
    }

    return (
      <Draggable
        disabled
        position={this.state.position}
        grid={[25, 25]}
        zIndex={100}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}
      >
        <div style={mainCharacter}>
          <div style={hud}>
            {life}
          </div>
        </div>
      </Draggable>
    );
  }
}

export default Player;
