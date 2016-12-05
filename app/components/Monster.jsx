import React, { Component } from 'react';

import Draggable from 'react-draggable';
import monsterSprite from '../../resources/images/monster.gif';

const monster = {
  position: 'relative',
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
  render() {
    return (
      <Draggable
        disabled
        position={{ x: 300, y: 600 }}
        grid={[25, 25]}
        zIndex={100}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}
      >
        <div style={monster}>
          <div style={symbols}>
            □○
          </div>
        </div>
      </Draggable>
    );
  }
}

export default Monster;
