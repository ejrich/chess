import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import { Board, Location, actionCreators, GameState } from '../store/Game';
import File from './File'

type GameBoardProps = GameState & typeof actionCreators;

const blackSquareStyle = {
    background: "black"
}

class GameBoard extends React.Component<GameBoardProps, {}> {

    public render() {
        const { board } = this.props;

        if (!board) {
            return (
                <div></div>
            );
        }

        else {
            return (
                <div style={{ borderStyle: "solid", display: "inline-block" }}>
                    { this.renderRanks(board.squares) }
                </div>
            );
        }
    }

    private renderRanks(squares: Location[][]) {
        return (
            squares.map((file, i) => <File squares={file} file={i} />)
        );
    }

    private getStyle(location: Location) {
        return Math.abs(location.file - location.rank) % 2 == 0 ? blackSquareStyle : {};
    }
}

export default connect(
    (state: ApplicationState) => state.game,
    actionCreators
)(GameBoard);
