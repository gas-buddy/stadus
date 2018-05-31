// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'semantic-ui-react';
import './index.css';
import Dashboard from './components/dashboard';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render((
<Container>
  <Dashboard/>
</Container>
), document.getElementById('root'));
registerServiceWorker();
