import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import { Board, actionCreators } from '../store/Game';
import GameBoard from './GameBoard';

type GameProps =
    Board & typeof actionCreators
    & RouteComponentProps<{ startDateIndex: string }>;

class Game extends React.Component<GameProps, {}> {

    public render() {
        const { squares } = this.props;

        return (
            <div>
                <h1>Chess Game</h1>
                <p>WIP</p>
                <GameBoard squares={squares} />
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.game,
    actionCreators
)(Game) as typeof Game;
