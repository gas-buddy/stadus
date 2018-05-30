// @flow
import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import PT from 'prop-types';
import Style from './style.css';
import { Repository } from '../repository';

export default class TeamPanel extends Component {
  render() {
    return (
      <Segment className={Style.teamPanel}>
        <Header className={Style.name}>{this.props.name}</Header>
        <Segment> {
          this.props.repoNames.map(repoName => (
            <Repository
              key={repoName}
              owner={this.props.owner}
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
