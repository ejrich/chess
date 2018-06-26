import { Location } from '../store/Game';
import Color from './Color';

interface IPiece {
    moved: boolean;
    color: Color;
    isMoveLegal(current: Location, newLocation: Location, board: Location[][]): boolean;
}

export default IPiece;