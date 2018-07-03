import Piece from './Piece';
import Color from './Color';
import Pawn from './Pawn';
import Rook from './Rook';
import Bishop from './Bishop';
import Knight from './Knight';
import Queen from './Queen';
import King from './King';

export function createPiece(name: string, moved: boolean, color: Color): Piece | undefined {
    switch (name) {
        case "Pawn": {
            return new Pawn(moved, color);
        }
        case "Rook": {
            return new Rook(moved, color);
        }
        case "Bishop": {
            return new Bishop(moved, color);
        }
        case "Knight": {
            return new Knight(moved, color);
        }
        case "Queen": {
            return new Queen(moved, color);
        }
        case "King": {
            return new King(moved, color);
        }
    }
}
