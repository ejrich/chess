import { Location } from '../store/Game';
import IPiece from './IPiece';
import Color from './Color';

class Pawn implements IPiece {
    private colorMultiplier: number;
    moved: boolean;
    color: Color;

    constructor(moved: boolean, color: Color) {
        this.moved = moved;
        this.color = color;
        this.colorMultiplier = color == Color.White ? 1 : -1;
    }

    isMoveLegal(current: Location, newLocation: Location, board: Location[][]) {
        if (newLocation.piece && newLocation.piece.color == this.color)
            return false;

        const fileChange = Math.abs(newLocation.file - current.file);
        const rankChange = this.colorMultiplier * (newLocation.rank - current.rank);

        if (fileChange > 1 || rankChange > 2 || rankChange < 0)
            return false;

        let legal = false;

        if (fileChange == 0)
        {
            var location = this.color == Color.White ? board[current.file - 1][current.rank] : board[current.file - 1][current.rank - 2];
            legal = !location.piece;

            if (rankChange == 2)
            {
                location = this.color == Color.White ? board[current.file - 1][current.rank] : board[current.file - 1][current.rank - 2];
                legal = !this.moved && !location.piece;
            }
        }
        else if (fileChange == 1)
        {
            if (rankChange == 1)
            {
                if (this.color == Color.White && newLocation.rank > current.rank ||
                    this.color == Color.Black && newLocation.rank < current.rank)
                {
                    legal = !!newLocation.piece && newLocation.piece.color != this.color;
                }
            }
            // TODO Add en passant
        }

        return legal;
    };

    getImageName() {
        const image = this.color == Color.White ? "white_pawn" : "black_pawn";

        return image;
    }
}

export default Pawn;
