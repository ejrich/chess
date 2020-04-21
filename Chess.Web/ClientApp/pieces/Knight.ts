import { Location } from '../store/Game';
import Piece from './Piece';
import Color from './Color';

class Knight implements Piece {
    color: Color;
    moves: number;

    constructor(moves: number, color: Color) {
        this.moves = moves;
        this.color = color;
    }

    isMoveLegal(current: Location, newLocation: Location, board: Location[][]) {
        if (newLocation.piece && newLocation.piece.color == this.color)
            return false;

        const fileChange = Math.abs(newLocation.file - current.file);
        const rankChange = Math.abs(newLocation.rank - current.rank);

        return fileChange == 2 && rankChange == 1 ||
                fileChange == 1 && rankChange == 2;
    };

    getImageName() {
        const image = this.color == Color.White ? "white_knight" : "black_knight";

        return image;
    }
}

export default Knight;
