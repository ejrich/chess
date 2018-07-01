import { Location } from '../store/Game';
import Color from './Color';

interface IPiece {
    moved: boolean;
    color: Color;
    // file: number;
    // rank: number;
    isMoveLegal(current: Location, newLocation: Location, board: Location[][]): boolean;
    getImageName(): string;
}

export default IPiece;