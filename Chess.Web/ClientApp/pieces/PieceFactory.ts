import Piece from './Piece';
import Color from './Color';
import Pawn from './Pawn';
import Rook from './Rook';
import Bishop from './Bishop';
import Knight from './Knight';
import Queen from './Queen';
import King from './King';

export function createPiece(name: string, moves: number, color: Color): Piece | undefined {
    switch (name) {
        case "Pawn": {
            return new Pawn(moves, color);
        }
        case "Rook": {
            return new Rook(moves, color);
        }
        case "Bishop": {
            return new Bishop(moves, color);
        }
        case "Knight": {
            return new Knight(moves, color);
        }
        case "Queen": {
            return new Queen(moves, color);
        }
        case "King": {
            return new King(moves, color);
        }
    }
}
