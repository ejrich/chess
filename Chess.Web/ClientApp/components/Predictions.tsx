import * as React from 'react';
import * as ReactModal from 'react-modal';

type PredictionsProps = {
    predictions: { [id: string]: number } | undefined,
    setModel: (model: string, endpoint: string) => void,
    models: { [model: string]: string }
}

const knownModels: { [ model: string ]: string } = {
    'Linear Regression': 'linear',
    'Logistic Regression': 'logistic',
    'Random Forest Regression': 'random_forest',
    'Deep Learning Linear Regression': 'dl_linear',
    'Deep Learning Convolution': 'convolution'
}

ReactModal.setAppElement('#selector');

class Predictions extends React.Component<PredictionsProps, { showModels: boolean }> {
    constructor() {
        super();
        this.state = {
            showModels: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal () {
        this.setState({ showModels: true });
    }

    handleCloseModal () {
        this.setState({ showModels: false });
    }

    public render() {
        const { predictions, setModel, models } = this.props;

        const modelSelector = (
            <div id='selector'>
                <button className="btn" onClick={this.handleOpenModal}>Select Models</button>
                <ReactModal isOpen={this.state.showModels}>
                    <button className="btn" onClick={this.handleCloseModal}>Close</button>
                    {
                        Object.keys(knownModels).map(model =>
                            <p key={model}>
                                <label>
                                    <input className='form-check-input' type='checkbox' checked={model in models} onChange={() => setModel(model, knownModels[model])} />
                                    { model }
                                </label>
                            </p>
                        )
                    }
                </ReactModal>
            </div>
        );

        if (!predictions) {
            return modelSelector;
        }

        return (
            <div>
                { modelSelector }
                <br/>
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
