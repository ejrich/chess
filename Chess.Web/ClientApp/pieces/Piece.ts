import { Location } from '../store/Game';
import Color from './Color';

interface Piece {
    color: Color;
    moves: number;
    // file: number;
    // rank: number;
    isMoveLegal(current: Location, newLocation: Location, board: Location[][]): boolean;
    getImageName(): string;
}

export default Piece;