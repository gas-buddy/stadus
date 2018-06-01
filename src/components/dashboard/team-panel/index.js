// @flow
import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import PT from 'prop-types';
import Style from './style.css';
import { Repository } from '../repository';

type Props = {
  name: string,
  icon: string,
  owner: string,
  repoNames: string[],
};

export default class TeamPanel extends Component<Props> {
  state: Props;

  constructor(props: Props) {
    super(props);
    this.state = props;
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  render() {
    return (
      <Segment className={Style.teamPanel}>
        <Header className={Style.name}>{this.state.name}</Header>
        <Segment> {
          this.state.repoNames.map(repoName => (
            <Repository
              key={repoName}
              owner={this.state.owner}
              name={repoName}
            />
          ))
        } </Segment>
      </Segment>
    );
  }
}

TeamPanel.propTypes = {
  name: PT.string.isRequired,
  icon: PT.string.isRequired,
  owner: PT.string.isRequired,
  repoNames: PT.array.isRequired,
};
