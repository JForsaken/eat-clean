// @flow
import React, { Component } from 'react';
import zangief from '../../resources/images/zangief.png';

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

class Player extends Component {
  render() {
    return (
      <div style={mainCharacter} />
    );
  }
}

export default Player;
