import { Location } from '../store/Game';
import King from './King';
import Rook from './Rook';
import { isStraightMoveLegal } from './MoveHelper';

export function isCastle(current: Location, move: Location, board: Location[][]): boolean {
    if (!current.piece || !move.piece) {
        return false;
    }

    if (current.piece.moved || move.piece.moved) {
        return false;
    }

    return current.piece instanceof King && move.piece instanceof Rook && isStraightMoveLegal(current, move, board);
}
