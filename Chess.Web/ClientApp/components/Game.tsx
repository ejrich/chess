import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import { GameState, actionCreators } from '../store/Game';
import GameBoard from './GameBoard';
import Predictions from './Predictions';
import PredictedMove from './PredictedMove';
import Color from '../pieces/Color';

type GameProps =
    GameState & typeof actionCreators
    & RouteComponentProps<{}>;

class Game extends React.Component<GameProps, {}> {

    public render() {
        const { board, models, turn, predictions, predictedMove, InitializeGame, Prediction, SetModel } = this.props;

        return (
            <div>
                <br/>
                <button className="btn" onClick={InitializeGame}>New Game</button>
                <br/>
                {   
                    board ? <p>{ turn == Color.White ? "White" : "Black" }'s Turn</p> : <br/>
                }
                <PredictedMove predictedMove={predictedMove} action={Prediction} />
                <br/>
                <GameBoard />
                <Predictions predictions={predictions} setModel={SetModel} models={models} />
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.game,
    actionCreators
)(Game) as typeof Game;
