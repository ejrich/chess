import * as React from 'react';
import { Board, Location, actionCreators } from '../store/Game';

type GameBoardProps = Board;

class GameBoard extends React.Component<GameBoardProps, {}> {

    public render() {
        const { squares } = this.props;

        return (
            <div>
                {
                    squares.map(_ => <div>Hello world</div>)
                }
            </div>
        );
    }
}

export default GameBoard;