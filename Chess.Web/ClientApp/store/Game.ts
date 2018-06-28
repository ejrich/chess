import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import IPiece from '../pieces/IPiece';
import { createPiece } from '../pieces/PieceFactory';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface GameState {
    board?: Board;
    pendingMove?: Location;
    // TODO add players
}

export interface Board {
    squares: Location[][];
}

export interface Location {
    file: number;
    rank: number;
    piece?: IPiece;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

const InitializeGameAction = 'INITIALIZE_GAME';
const GameInitializedAction = 'GAME_INITIALIZED';
const BeginMoveAction = 'BEGIN_MOVE';
const CompleteMoveAction = 'COMPLETE_MOVE';

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

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = InitializeGame | GameInitialized | BeginMove | CompleteMove;

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

    FinishMove: (location: Location) => <CompleteMove>{ type: CompleteMoveAction, location }
};

function createBoard(data: any): Board {
    const squares = (<any[][]>data.squares).map(file => {
        return file.map(square => {
            const piece = square.piece ? createPiece(square.piece.name, square.piece.moved, square.piece.color) : undefined;

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
    board: undefined
};

export const reducer: Reducer<GameState> = (state: GameState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case InitializeGameAction:
            return unloadedState;
        case GameInitializedAction:
            return {
                ...state,
                board: action.board
            };
        case BeginMoveAction:
            return {
                ...state,
                pendingMove: action.location
            };
        case CompleteMoveAction:
            return {
                ...state,
                move: action.location
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
