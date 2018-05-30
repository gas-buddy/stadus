// @flow
import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import PT from 'prop-types';
import Config from './config';
import TeamPanel from './team-panel';

type Props = { owner: string, repoNames: string[] };

export default class Dashboard extends Component<Props> {
  props: Props;

  constructor(props: Props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <Container>
        <TeamPanel
          name="Business Pages"
          owner={this.props.owner}
          repoNames={this.props.repoNames}
          icon="https://dl1.cbsistatic.com/i/2017/09/13/d87068fc-2dc3-4234-8684-6bb330a45f31/9ea1629d139e0b5666890eeb995c87d6/imgingest-5267403705378669572.png"
        />
        <Config onChange={this.configChanged} />
      </Container>
    );
  }
}

Dashboard.propTypes = {
  owner: PT.string.isRequired,
  repoNames: PT.array.isRequired,
};
