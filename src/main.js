import React from "react";
import ReactDOM from 'react-dom';

import App from './app.js'
import { AppContainer } from 'react-hot-loader';


ReactDOM.render(
    <App/>
    , document.getElementById('root')
)

if (module.hot) {
    module.hot.accept('./app.js', () => {
        const NextApp = require('./app.js').default;
        ReactDOM.render(
            <AppContainer>
                <NextApp />
            </AppContainer>
            , document.getElementById('root')
        )
    })
}
