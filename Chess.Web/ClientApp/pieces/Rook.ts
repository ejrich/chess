import { Location } from '../store/Game';
import IPiece from './IPiece';
import Color from './Color';
import { isStraightMoveLegal } from './MoveHelper';

class Rook implements IPiece {
    moved: boolean;
    color: Color;

    constructor(moved: boolean, color: Color) {
        this.moved = moved;
        this.color = color;
    }

    isMoveLegal(current: Location, newLocation: Location, board: Location[][]) {
        const legal = isStraightMoveLegal(this.color, current, newLocation, board);

        return legal;
    };

    getImageName() {
        const image = this.color == Color.White ? "white_rook" : "black_rook";

        return image;
    }
}

export default Rook;
