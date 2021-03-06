import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import Piece from '../pieces/Piece';
import { createPiece } from '../pieces/PieceFactory';
import Color from '../pieces/Color';
import Queen from '../pieces/Queen';
import { createOutcomeRequest } from '../pieces/OutcomePredictor'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface GameState {
    board?: Board;
    pendingMove?: Location;
    turn: Color,
    predictions?: { [id: string]: number },
    predictedMove?: Move,
    models: { [model: string]: string },
    // TODO add players
}

export interface Board {
    squares: Location[][];
}

export interface Location {
    file: number;
    rank: number;
    piece?: Piece;
}

export interface Move {
    rank: number;
    file: number;
    moveRank: number;
    moveFile: number;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

const InitializeGameAction = 'INITIALIZE_GAME';
const GameInitializedAction = 'GAME_INITIALIZED';
const BeginMoveAction = 'BEGIN_MOVE';
const CompleteMoveAction = 'COMPLETE_MOVE';
const CastleAction = 'CASTLE';
const PromotionAction = 'PROMOTION';
const EnPassantAction = 'EN_PASSANT';
const OutcomeFetch = 'OUTCOME_FETCH';
const OutcomeAction = 'OUTCOME';
const PredictionFetch = 'PREDICTION_FETCH';
const PredictionAction = 'PREDICTION';
const SetModelAction = 'SET_MODEL';

interface InitializeGame {
    type: 'INITIALIZE_GAME';
}

interface GameInitialized {
    type: 'GAME_INITIALIZED';
    board: Board; 
}

interface BeginMove {
    type: 'BEGIN_MOVE';
    location: Location; 
}

interface CompleteMove {
    type: 'COMPLETE_MOVE';
    location: Location; 
}

interface Castle {
    type: 'CASTLE';
    location: Location; 
}

interface Promotion {
    type: 'PROMOTION';
    location: Location; 
}

interface EnPassant {
    type: 'EN_PASSANT';
    location: Location; 
}

interface OutcomeFetch {
    type: 'OUTCOME_FETCH'
}

interface Outcome {
    type: 'OUTCOME';
    model: string;
    prediction: number;
}

interface PredictionFetch {
    type: 'PREDICTION_FETCH'
}

interface Prediction {
    type: 'PREDICTION',
    rank: number,
    file: number,
    moveRank: number,
    moveFile: number
}

interface SetModel {
    type: 'SET_MODEL',
    model: string,
    endpoint: string
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = InitializeGame | GameInitialized | BeginMove | CompleteMove | Castle | Promotion | EnPassant | OutcomeFetch | Outcome | PredictionFetch | Prediction | SetModel;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    InitializeGame: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch(`api/game`)
            .then(response => response.json() as Promise<any>)
            .then(data => {
                const board = createBoard(data);
                dispatch({ type: GameInitializedAction, board });
            });

        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        dispatch({ type: InitializeGameAction });
    },

    PendingMove: (location: Location) => <BeginMove>{ type: BeginMoveAction, location },

    FinishMove: (location: Location) => <CompleteMove>{ type: CompleteMoveAction, location },

    Castle: (location: Location) => <Castle>{ type: CastleAction, location },

    Promotion: (location: Location) => <Promotion>{ type: PromotionAction, location },

    EnPassant: (location: Location) => <EnPassant>{ type: EnPassantAction, location },

    Outcome: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const board = getState().game.board;

        if (!board) return;

        const boardRequest = createOutcomeRequest(board);

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(boardRequest)
        };

        const models = getState().game.models;
        for (let model in models) {
            let fetchTask = fetch(`http://localhost:5000/prediction/${models[model]}`, options)
                .then(response => response.json() as Promise<any>)
                .then(data => {
                    dispatch({ type: OutcomeAction, model, prediction: data.prediction });
                });

            addTask(fetchTask);
        }

        dispatch({ type: OutcomeFetch });
    },

    Prediction: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const board = getState().game.board;

        if (!board) return;

        const boardRequest = createOutcomeRequest(board);

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(boardRequest)
        };

        let moveTask = fetch(`http://localhost:5000/prediction/move`, options)
            .then(response => response.json() as Promise<any>)
            .then(data => {
                dispatch({ type: PredictionAction, rank: data.rank, file: data.file, moveRank: data.moveRank, moveFile: data.moveFile });
            });

        addTask(moveTask);
        dispatch({ type: PredictionFetch });
    },

    SetModel: (model: string, endpoint: string) => <SetModel>{ type: SetModelAction, model, endpoint }
};

function createBoard(data: any): Board {
    const squares = (<any[][]>data.squares).map(file => {
        return file.map(square => {
            const piece = square.piece ? createPiece(square.piece.name, square.piece.moves, square.piece.color) : undefined;

            return <Location>{
                file: square.file,
                rank: square.rank,
                piece
            }
        });
    });

    const board = {
        squares
    }

    return board;
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: GameState = { 
    board: undefined,
    turn: Color.White,
    models: {}
};

export const reducer: Reducer<GameState> = (state: GameState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case InitializeGameAction:
            return unloadedState;
        case GameInitializedAction:
            return {
                ...state,
                board: action.board,
                turn: Color.White
            };
        case BeginMoveAction:
            return {
                ...state,
                pendingMove: action.location
            };
        case SetModelAction:
            if (state.models[action.model]) {
                const models = {
                    ...state.models
                }
                delete models[action.model]

                return {
                    ...state,
                    models
                };
            }
            else
                return {
                    ...state,
                    models: {
                        ...state.models,
                        [action.model]: action.endpoint
                    }
                };
        case OutcomeFetch:
            console.log('Fetching...');
            return {
                ...state,
                predictions: {}
            };
        case OutcomeAction:
            console.log('Received...');
            return {
                ...state,
                predictions: {
                    ...state.predictions,
                    [action.model]: action.prediction
                }
            }
        case PredictionFetch:
            console.log('Fetching...');
            return {
                ...state,
                predictedMove: undefined
            };
        case PredictionAction:
            console.log('Received...');
            return {
                ...state,
                predictedMove: {
                    rank: action.rank,
                    file: action.file,
                    moveRank: action.moveRank,
                    moveFile: action.moveFile,
                }
            }
        case CompleteMoveAction:
            var { board, pendingMove, turn } = state;
            if (board && pendingMove && pendingMove.piece) {
                const { squares } = board;

                const legal = pendingMove.piece.isMoveLegal(pendingMove, action.location, squares);

                if (legal) {
                    pendingMove.piece.moves++;
                    squares[action.location.file - 1][action.location.rank - 1].piece = pendingMove.piece;
                    squares[pendingMove.file - 1][pendingMove.rank - 1].piece = undefined;
                    turn = turn == Color.White ? Color.Black : Color.White;
                }
                return {
                    ...state,
                    board: {
                        squares
                    },
                    turn
                }
            }
            break;
        case CastleAction:
            var { board, pendingMove, turn } = state;
            if (board && pendingMove && pendingMove.piece && action.location.piece) {
                const { squares } = board;

                pendingMove.piece.moves++;
                action.location.piece.moves++;

                const fileChange = action.location.file - pendingMove.file;

                const { piece } = action.location;
                if (fileChange > 0) {
                    squares[6][pendingMove.rank - 1].piece = pendingMove.piece;
                    squares[5][pendingMove.rank - 1].piece = piece;
                }
                else {
                    squares[2][pendingMove.rank - 1].piece = pendingMove.piece;
                    squares[3][pendingMove.rank - 1].piece = piece;
                }
                squares[pendingMove.file - 1][pendingMove.rank - 1].piece = undefined;
                squares[action.location.file - 1][action.location.rank - 1].piece = undefined;

                turn = turn == Color.White ? Color.Black : Color.White;

                return {
                    ...state,
                    board: {
                        squares
                    },
                    turn
                }
            }
            break;
        case PromotionAction:
            var { board, pendingMove, turn } = state;
            if (board && pendingMove && pendingMove.piece) {
                const { squares } = board;

                const legal = pendingMove.piece.isMoveLegal(pendingMove, action.location, squares);

                if (legal) {
                    pendingMove.piece.moves++;
                    squares[action.location.file - 1][action.location.rank - 1].piece = new Queen(pendingMove.piece.moves, turn);
                    squares[pendingMove.file - 1][pendingMove.rank - 1].piece = undefined;
                    turn = turn == Color.White ? Color.Black : Color.White;
                }
                return {
                    ...state,
                    board: {
                        squares
                    },
                    turn
                }
            }
            break;
        case EnPassantAction:
            var { board, pendingMove, turn } = state;
            if (board && pendingMove && pendingMove.piece) {
                const { squares } = board;

                pendingMove.piece.moves++;
                squares[action.location.file - 1][action.location.rank - 1].piece = pendingMove.piece;
                squares[pendingMove.file - 1][pendingMove.rank - 1].piece = undefined;

                const colorFactor = turn == Color.White ? 1 : -1;
                squares[action.location.file - 1][action.location.rank - 1 - colorFactor].piece = undefined;
                turn = turn == Color.White ? Color.Black : Color.White;

                return {
                    ...state,
                    board: {
                        squares
                    },
                    turn
                }
            }
            break;
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
