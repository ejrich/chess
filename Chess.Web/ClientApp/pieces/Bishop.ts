import { Location } from '../store/Game';
import IPiece from './IPiece';
import Color from './Color';
import { isDiagonalMoveLegal } from './MoveHelper';

class Bishop implements IPiece {
    moved: boolean;
    color: Color;

    constructor(moved: boolean, color: Color) {
        this.moved = moved;
        this.color = color;
    }

    isMoveLegal(current: Location, newLocation: Location, board: Location[][]) {
        const legal = isDiagonalMoveLegal(this.color, current, newLocation, board);

        return legal;
    };

    getImageName() {
        const image = this.color == Color.White ? "white_bishop" : "black_bishop";

        return image;
    }
}

export default Bishop;
