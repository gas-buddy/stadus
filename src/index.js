// @flow
import assert from 'assert';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Dashboard from './components/dashboard';
import registerServiceWorker from './registerServiceWorker';

assert(process.env.REACT_APP_GITHUB_REPOS, 'REACT_APP_GITHUB_REPOS is required');
const repos = process.env.REACT_APP_GITHUB_REPOS.split(',');

ReactDOM.render(<Dashboard
  owner="gas-buddy"
  repoNames={repos}
  />, document.getElementById('root'));
registerServiceWorker();
