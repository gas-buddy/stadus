// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'semantic-ui-react';
import './index.css';
import Dashboard from './components/dashboard';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render((
<Container>
  <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous" />
  <Dashboard/>
</Container>
), document.getElementById('root'));
registerServiceWorker();
