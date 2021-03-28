import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    render() {
        return <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Hello World</div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App/>, document.getElementById('root'));
}
