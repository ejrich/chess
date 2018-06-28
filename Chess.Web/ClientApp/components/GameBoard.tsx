import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import { Board, Location, actionCreators, GameState } from '../store/Game';

type GameBoardProps = GameState & typeof actionCreators;

const blackSquareStyle = {
    background: "black"
}

class GameBoard extends React.Component<GameBoardProps, {}> {

    private handleMove(location: Location) {
        if (!this.props.pendingMove) {
            this.props.PendingMove(location);
        }
        else {
            this.props.FinishMove(location);
        }
    }

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
        const ranks = [];

        const startRank = 8;
        const endRank = 1;
        const startFile = 1;
        const endFile = 8;

        for (let rank = startRank; rank >= endRank; rank--) {
            const row = [];
            for (let file = startFile; file <= endFile; file++) {
               const square = this.renderSquare(squares[file - 1][rank - 1]);
               row.push(square);
            }
            ranks.push(<div key={rank}>{ row }</div>);
        }

        return ranks;
    }

    private renderSquare(location: Location) {
        const style = this.getStyle(location);

        return (
            <div className="square" style={style} onClick={() => this.handleMove(location)} key={location.file}>
                { location.file }, { location.rank }
                { location.piece ? location.piece.constructor.name : "" }
            </div>
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
