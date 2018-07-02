import { Location } from '../store/Game';

const same = (num: number) => num;
const decrement = (num: number) => num - 1;
const decrementTwice = (num: number) => num - 2;

export function isStraightMoveLegal(current: Location, newLocation: Location, board: Location[][]): boolean {
    const fileChange = Math.abs(newLocation.file - current.file);
    const rankChange = Math.abs(newLocation.rank - current.rank);

    if (fileChange > 0 && rankChange > 0)
        return false;

    const fileMove = fileChange > 0 ? newLocation.file > current.file ? same : decrementTwice : decrement;
    const rankMove = rankChange > 0 ? newLocation.rank > current.rank ? same : decrementTwice : decrement;

    return moveIterator(current, newLocation, board, fileMove, rankMove);
}

export function isDiagonalMoveLegal(current: Location, newLocation: Location, board: Location[][]): boolean {
    const fileChange = Math.abs(newLocation.file - current.file);
    const rankChange = Math.abs(newLocation.rank - current.rank);

    if (fileChange != rankChange)
        return false;

    const fileMove = newLocation.file > current.file ? same : decrementTwice;
    const rankMove = newLocation.rank > current.rank ? same : decrementTwice;

    return moveIterator(current, newLocation, board, fileMove, rankMove);
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
