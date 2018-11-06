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

        const models = [];

        for (let model in predictions) {
            models.push(<div className='col-sm-2'>{ model }: { predictions[model] }</div>);
        }

        return (
            <div className='row'>
                { models }
            </div>
        );
    }
}

export default Predictions;
