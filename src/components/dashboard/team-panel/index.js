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
        <Header>{this.props.name}</Header>
        <Segment> {
          this.props.repos.map(repo => (
            <Repository
              key={repo.id}
              id={repo.id}
              name={repo.name}
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
  repos: PT.array.isRequired,
};
