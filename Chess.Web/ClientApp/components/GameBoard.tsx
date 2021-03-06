import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import { Location, actionCreators, GameState } from '../store/Game';
import { isCastle, isEnPassant, isPromotion } from '../pieces/SpecialMoves';

type GameBoardProps = GameState & typeof actionCreators;

const blackSquareStyle = {
    background: "#769656"
}

class GameBoard extends React.Component<GameBoardProps, {}> {

    private handleMove(location: Location) {
        const { board, pendingMove, turn, EnPassant, Castle, PendingMove, Promotion, FinishMove, Outcome } = this.props;

        if (!board) return;

        if (!pendingMove && location.piece && location.piece.color == turn) {
            PendingMove(location);
        }
        else if (pendingMove) {
            if (isCastle(pendingMove, location, board.squares)) {
                Castle(location);
            }
            if (isPromotion(pendingMove, location, board.squares)) {
                Promotion(location);
            }
            if (isEnPassant(pendingMove, location, board.squares)) {
                EnPassant(location);
            }
            else if (location.piece && location.piece.color == turn) {
                PendingMove(location);
            }
            else {
                FinishMove(location);
            }
            Outcome();
        }
    }

    public render() {
        const { board, Outcome } = this.props;

        if (!board) {
            return (
                <div></div>
            );
        }

        return (
            <div style={{ borderStyle: "solid", display: "inline-block", float: "left" }}>
                { this.renderRanks(board.squares) }
            </div>
        );
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
            ranks.push(<div className="rank" key={rank}>{ row }</div>);
        }

        return ranks;
    }

    private renderSquare(location: Location) {
        const style = this.getStyle(location);

        return (
            <div className="square" style={style} onClick={() => this.handleMove(location)} key={location.file}>
                { location.piece ? <div><img src={require(`../pieces/images/${location.piece.getImageName()}.png`)} /></div> : <div/> }
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
