// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Game from '../components/Game';
import * as MonsterActions from '../actions/monster';
import * as PlayerActions from '../actions/player';

function mapStateToProps(state) {
  return {
    monster: state.monster,
    player: state.player,
  };
}

function mapDispatchToProps(dispatch) {
  const m = bindActionCreators(MonsterActions, dispatch);
  const p = bindActionCreators(PlayerActions, dispatch);

  return {
    ...m,
    ...p,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
