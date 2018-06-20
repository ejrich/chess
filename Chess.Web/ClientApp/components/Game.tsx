import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import { Board, actionCreators } from '../store/Game';

type GameProps =
    Board & typeof actionCreators
    & RouteComponentProps<{ startDateIndex: string }>;

class Game extends React.Component<GameProps, {}> {

    public render() {
        return <div>
            <h1>Chess Game</h1>
            <p>WIP</p>
            { this.renderBoard() }
        </div>;
    }

    private renderBoard() {
        return (
            <div className="row">
                {  }
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.game,
    actionCreators
)(Game) as typeof Game;
