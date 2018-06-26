import * as React from 'react';
import { connect } from 'react-redux';
import { Location } from '../store/Game';

interface SquareProps {
    location: Location;
}

const blackSquareStyle = {
    background: "black"
}

class Square extends React.Component<SquareProps, {}> {

    private getStyle(location: Location) {
        return Math.abs(location.file - location.rank) % 2 == 0 ? blackSquareStyle : {};
    }

    public render() {
        const { location } = this.props;

        const style = this.getStyle(location);

        return (
            <div className="square" style={style}>
                { location.file }, { location.rank }
                { location.piece ? location.piece.name : "" }
            </div>
        );
    }
}

export default Square;
