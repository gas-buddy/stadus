// @flow
import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import TeamPanel from './team-panel';

const generateRepo = () => ({
  id: Math.floor(Math.random() * 1000),
});


const mockRepos = Array.from(Array(3), generateRepo).sort(({ id: a }, { id: b }) => a - b);

export default class Dashboard extends Component {
  state = {
    repos: [],
  }

  componentDidMount() {
    setTimeout(repos => this.setState({ repos }), 1000, mockRepos);
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
