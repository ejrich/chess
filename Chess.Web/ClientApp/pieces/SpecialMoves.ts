import { Location } from '../store/Game';
import King from './King';
import Rook from './Rook';
import { isStraightMoveLegal } from './MoveHelper';
import Pawn from './Pawn';
import Color from './Color';

export function isCastle(current: Location, move: Location, board: Location[][]): boolean {
    if (!current.piece || !move.piece) {
        return false;
    }

    if (current.piece.moves || move.piece.moves) {
        return false;
    }

    return current.piece instanceof King && move.piece instanceof Rook && isStraightMoveLegal(current, move, board);
}

export function isEnPassant(current: Location, move: Location, board: Location[][]): boolean {
    if (!current.piece || !(current.piece instanceof Pawn) || move.piece) {
        return false;
    }

    const colorFactor = current.piece.color == Color.White ? 1 : -1;
    const pendingMoveRank = current.piece.color == Color.White ? 5 : 4;

    const fileChange = Math.abs(move.file - current.file);
    const rankChange = colorFactor * (move.rank - current.rank);

    if (rankChange != 1 || fileChange != 1 || current.rank != pendingMoveRank) {
        return false;
    }

    const capturedPiece = board[move.file - 1][move.rank - 1 - colorFactor].piece;

    return capturedPiece instanceof Pawn && capturedPiece.moves == 1;
}

export function isPromotion(current: Location, move: Location, board: Location[][]): boolean {
    if (!current.piece || !(current.piece instanceof Pawn)) {
        return false;
    }

    const endRank = current.piece.color == Color.White ? 8 : 1;

    return move.rank == endRank && current.piece.isMoveLegal(current, move, board);
}
