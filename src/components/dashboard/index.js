// @flow
import _ from 'lodash';
import React, { Component } from 'react';
import { Container, Rail } from 'semantic-ui-react';
import backgroundImage from './bg.jpg';
import Config from './config';
import TeamPanel from './team-panel';
import Style from './style.css';

type Props = { owner: string, repoNames: string[] };

export default class Dashboard extends Component<Props> {
  state: ?Props;

  constructor(props) {
    super(props);
    this.configChanged = this.configChanged.bind(this);

    this.state = undefined;
  }

  configChanged(newConfig: { owner: string, repos: string }) {
    this.setState({
      owner: newConfig.owner,
      repoNames: _(newConfig.repos.split(',')).filter(name => name).map(name => name.trim()).value(),
    }, this.forceUpdate);
  }

  componentWillMount() {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    document.body.style.backgroundPosition = 'center 25%';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = '100%';
    document.body.style.backgroundColor = '#FFFFFF';
  }

  render() {
    return (
      <Container className={Style.dashboard}>
        <Config onChange={this.configChanged}/>
        {this.state ? 
          <TeamPanel
            owner={this.state.owner}
            repoNames={this.state.repoNames}
            icon="https://dl1.cbsistatic.com/i/2017/09/13/d87068fc-2dc3-4234-8684-6bb330a45f31/9ea1629d139e0b5666890eeb995c87d6/imgingest-5267403705378669572.png"
          />
        : null}
      </Container>
    );
  }
}
