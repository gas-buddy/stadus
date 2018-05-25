// @flow
import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import _ from 'lodash';
import * as github from '../../utils/github';
import TeamPanel from './team-panel';


export default class Dashboard extends Component {
  targetRepos = ['business-pages-serv', 'business-pages-api', 'business-pages-jobs-serv', 'business-pages-web', 'business-pages-admin-web'];
  state = {
    repos: [],
  }


  componentDidMount() {
    github.getAllRepos().then((repos) => {
      const subscribedRepos = _.intersectionBy(repos, this.targetRepos, r => r.name || r);
      console.log(subscribedRepos);
      this.setState({ repos: subscribedRepos });
    });
  }

  render() {
    return (
      <Container>
        <TeamPanel
          repos={this.state.repos}
          name="Business Pages"
          icon="https://dl1.cbsistatic.com/i/2017/09/13/d87068fc-2dc3-4234-8684-6bb330a45f31/9ea1629d139e0b5666890eeb995c87d6/imgingest-5267403705378669572.png"
        />
      </Container>
    );
  }
}
