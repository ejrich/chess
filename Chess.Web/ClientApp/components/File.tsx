import * as React from 'react';
import { Location } from '../store/Game';
import Square from './Square';

interface FileProps {
    squares: Location[];
    file: number;
}

class File extends React.Component<FileProps, {}> {

    public render() {
        const { squares, file } = this.props;

        return (
            <div>
                { squares.map(location => <Square location={location} />) }
            </div>
        );
    }
}

export default File;