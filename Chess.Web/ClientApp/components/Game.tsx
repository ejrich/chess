import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import { GameState, actionCreators } from '../store/Game';
import GameBoard from './GameBoard';

type GameProps =
    GameState & typeof actionCreators
    & RouteComponentProps<{}>;

class Game extends React.Component<GameProps, {}> {

    public render() {
        const { board, InitializeGame } = this.props;

        return (
            <div>
                <h1>Chess Game</h1>
                <p>WIP</p>
                <button className="btn" onClick={InitializeGame}>New Game</button>
                <br/><br/>
                <GameBoard />
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.game,
    actionCreators
)(Game) as typeof Game;
