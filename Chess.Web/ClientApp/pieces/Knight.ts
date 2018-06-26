import { Location } from '../store/Game';
import IPiece from './IPiece';
import Color from './Color';

class Knight implements IPiece {
    moved: boolean;
    color: Color;

    constructor(moved: boolean, color: Color) {
        this.moved = moved;
        this.color = color;
    }

    isMoveLegal(current: Location, newLocation: Location, board: Location[][]) {
        return true;
    };
}

export default Knight;
