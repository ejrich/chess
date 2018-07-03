import { Location } from '../store/Game';
import Color from './Color';

interface Piece {
    moved: boolean;
    color: Color;
    // file: number;
    // rank: number;
    isMoveLegal(current: Location, newLocation: Location, board: Location[][]): boolean;
    getImageName(): string;
}

export default Piece;