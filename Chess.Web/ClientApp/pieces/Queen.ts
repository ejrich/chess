import { Location } from '../store/Game';
import IPiece from './IPiece';
import Color from './Color';
import { isDiagonalMoveLegal, isStraightMoveLegal } from './MoveHelper';

class Queen implements IPiece {
    moved: boolean;
    color: Color;

    constructor(moved: boolean, color: Color) {
        this.moved = moved;
        this.color = color;
    }

    isMoveLegal(current: Location, newLocation: Location, board: Location[][]) {
        if (newLocation.piece && newLocation.piece.color == this.color)
            return false;

        const legal = isDiagonalMoveLegal(current, newLocation, board) || 
            isStraightMoveLegal(current, newLocation, board);

        return legal;
    };

    getImageName() {
        const image = this.color == Color.White ? "white_queen" : "black_queen";

        return image;
    }
}

export default Queen;
