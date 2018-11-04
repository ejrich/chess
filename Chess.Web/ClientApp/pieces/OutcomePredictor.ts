import { Board, Location } from '../store/Game'
import Color from './Color';

const pieceNotations: { [ piece: string ]: string } = {
    'Pawn': 'P',
    'Rook': 'R',
    'Bishop': 'B',
    'Knight': 'N',
    'Queen': 'Q',
    'King': 'K',
}

export const createOutcomeRequest = (board: Board) => {
    let whitePieces: { [piece: string] : number } = { 'Pawn': 0, 'Rook': 0, 'Bishop': 0, 'Knight': 0, 'Queen': 0, 'King': 0 }
    let blackPieces: { [piece: string] : number } = { 'Pawn': 0, 'Rook': 0, 'Bishop': 0, 'Knight': 0, 'Queen': 0, 'King': 0 }

    let request: { [id: string]: any } = {}

    for (let file of board.squares) {
        for (let square of file) {
            const id = String.fromCharCode(96 + square.file) + square.rank + '_';

            if (square.piece) {
                const piece = square.piece.constructor.name;
                let pieces = square.piece.color == Color.White ? whitePieces : blackPieces;

                pieces[piece]++;

                request[id + 'color'] = square.piece.color == Color.White ? 1 : 2;
                request[id + 'piece'] = pieceNotations[piece];
            }
            else {
                request[id + 'color'] = null;
                request[id + 'piece'] = null;
            }
        }
    }

    request['WhitePawns'] = whitePieces['Pawn'];
    request['WhiteRooks'] = whitePieces['Rook'];
    request['WhiteBishops'] = whitePieces['Bishop'];
    request['WhiteKnights'] = whitePieces['Knight'];
    request['WhiteQueen'] = whitePieces['Queen'];
    request['WhiteKing'] = whitePieces['King'];
    request['WhiteTotal'] = whitePieces['Pawn'] + whitePieces['Rook'] + whitePieces['Bishop'] + whitePieces['Knight'] + whitePieces['Queen'] + whitePieces['King'];

    request['BlackPawns'] = blackPieces['Pawn'];
    request['BlackRooks'] = blackPieces['Rook'];
    request['BlackBishops'] = blackPieces['Bishop'];
    request['BlackKnights'] = blackPieces['Knight'];
    request['BlackQueen'] = blackPieces['Queen'];
    request['BlackKing'] = blackPieces['King'];
    request['BlackTotal'] = blackPieces['Pawn'] + blackPieces['Rook'] + blackPieces['Bishop'] + blackPieces['Knight'] + blackPieces['Queen'] + blackPieces['King'];

    return request
}
