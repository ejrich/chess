import { Location } from '../store/Game';
import Piece from './Piece';
import Color from './Color';
import { isDiagonalMoveLegal } from './MoveHelper';

class Bishop implements Piece {
    color: Color;
    moves: number;

    constructor(moves: number, color: Color) {
        this.moves = moves;
        this.color = color;
    }

    isMoveLegal(current: Location, newLocation: Location, board: Location[][]) {
        if (newLocation.piece && newLocation.piece.color == this.color)
            return false;

        const legal = isDiagonalMoveLegal(current, newLocation, board);

        return legal;
    };

    getImageName() {
        const image = this.color == Color.White ? "white_bishop" : "black_bishop";

        return image;
    }
}

export default Bishop;
