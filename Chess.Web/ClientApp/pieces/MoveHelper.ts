import { Location } from '../store/Game';
import Color from './Color';

const same = (num: number) => num;
const decrement = (num: number) => num - 1;
const decrementTwice = (num: number) => num - 2;

export function isStraightMoveLegal(color: Color, current: Location, newLocation: Location, board: Location[][]): boolean {
    if (newLocation.piece && newLocation.piece.color == color)
        return false;

    const fileChange = Math.abs(newLocation.file - current.file);
    const rankChange = Math.abs(newLocation.rank - current.rank);

    if (fileChange > 0 && rankChange > 0)
        return false;

    if (fileChange > 0)
    {
        if (newLocation.file > current.file)
        {
            return moveIterator(current, newLocation, board, same, decrement);
        }
        else
        {
            return moveIterator(current, newLocation, board, decrementTwice, decrement);
        }
    }
    else
    {
        if (newLocation.rank > current.rank)
        {
            return moveIterator(current, newLocation, board, decrement, same);
        }
        else
        {
            return moveIterator(current, newLocation, board, decrement, decrementTwice);
        }
    }
}

export function isDiagonalMoveLegal(color: Color, current: Location, newLocation: Location, board: Location[][]): boolean {
    if (newLocation.piece && newLocation.piece.color == color)
        return false;

    const fileChange = Math.abs(newLocation.file - current.file);
    const rankChange = Math.abs(newLocation.rank - current.rank);

    if (fileChange != rankChange)
        return false;

    if (newLocation.rank > current.rank)
    {
        if (newLocation.file > current.file)
        {
            return moveIterator(current, newLocation, board, same, same);
        }
        else
        {
            return moveIterator(current, newLocation, board, decrementTwice, same);
        }
    }
    else
    {
        if (newLocation.file > current.file)
        {
            return moveIterator(current, newLocation, board, same, decrementTwice);
        }
        else
        {
            return moveIterator(current, newLocation, board, decrementTwice, decrementTwice);
        }
    }
}

function moveIterator(current: Location, newLocation: Location, board: Location[][], fileChange: Function, rankChange: Function): boolean {
    var legal = true;

    var location = board[fileChange(current.file)][rankChange(current.rank)];
    while (location != newLocation && legal)
    {
        if (location.piece)
            legal = false;
        else
            location = board[fileChange(location.file)][rankChange(location.rank)];
    }

    return legal;
}
