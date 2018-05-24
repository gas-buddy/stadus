// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Dashboard from './components/dashboard';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Dashboard />, document.getElementById('root'));
registerServiceWorker();
