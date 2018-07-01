import { Location } from '../store/Game';
import IPiece from './IPiece';
import Color from './Color';

class King implements IPiece {
    moved: boolean;
    color: Color;

    constructor(moved: boolean, color: Color) {
        this.moved = moved;
        this.color = color;
    }

    isMoveLegal(current: Location, newLocation: Location, board: Location[][]) {
        if (newLocation.piece && newLocation.piece.color == this.color)
            return false;

        const fileChange = Math.abs(newLocation.file - current.file);
        const rankChange = Math.abs(newLocation.rank - current.rank);

        return fileChange <= 1 && rankChange <= 1;
    };

    getImageName() {
        const image = this.color == Color.White ? "white_king" : "black_king";

        return image;
    }
}

export default King;
