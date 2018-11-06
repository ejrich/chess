import * as React from 'react';

type PredictionsProps = {
    predictions: { [id: string]: number } | undefined
}

class Predictions extends React.Component<PredictionsProps, {}> {
    public render() {
        const { predictions } = this.props;

        if (!predictions) {
            return <div></div>;
        }

        return (
            <div>
                {
                    Object.keys(predictions).sort().map(model =>
                        <div key={ model }><h3>{ model }:</h3><div>{ predictions[model] }</div></div>
                    )
                }
            </div>
        );
    }
}

export default Predictions;
