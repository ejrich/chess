import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface Board {
    squares: Location[][];
}

export interface Location {
    file: number;
    rank: number;
    piece?: Piece;
}

export interface Piece {
    name: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

const InitializeGameAction = 'INITIALIZE_GAME';
const GameInitializedAction = 'GAME_INITIALIZED';

interface InitializeGame {
    type: 'INITIALIZE_GAME';
}

interface GameInitialized {
    type: 'GAME_INITIALIZED';
    board: Board; 
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = InitializeGame | GameInitialized;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    InitializeGame: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch(`api/game`)
            .then(response => response.json() as Promise<Board>)
            .then(data => {
                dispatch({ type: GameInitializedAction, board: data });
            });

        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        dispatch({ type: InitializeGameAction });
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

let squares = Array(8);
for (let i in squares) {
    squares[i] = Array(8)
}
const unloadedState: Board = { squares };

export const reducer: Reducer<Board> = (state: Board, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case InitializeGameAction:
            return unloadedState;
        case GameInitializedAction:
            return action.board;
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
