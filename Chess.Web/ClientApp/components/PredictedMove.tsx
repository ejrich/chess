import * as React from 'react';
import { Move } from '../store/Game';

type PredictionsProps = {
    predictedMove: Move | undefined,
    action: () => void
}

class PredictedMove extends React.Component<PredictionsProps, {}> {
    public render() {
        const { predictedMove, action } = this.props;

        let move = null;

        if (predictedMove) {
            move = <div>{ String.fromCharCode(97 + predictedMove.file) }{ predictedMove.rank + 1 } to { String.fromCharCode(97 + predictedMove.moveFile) }{ predictedMove.moveRank + 1 }</div>;
        }

        return (
            <div>
                <button className="btn" onClick={action}>Predict</button>
                { move }
            </div>
        );
    }
}

export default PredictedMove;
