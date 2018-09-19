// @flow
import _ from 'lodash';
import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import PT from 'prop-types';

type Props = {
  reviewers: [],
  assignees: [],
}

export class Avatars extends Component<Props> {
  state: { reviewers: [], assignees: [] };
  constructor(props: Props) {
    super(props);
    this.state = {
      reviewers: props.reviewers,
      assignees: props.assignees,
    };
  }

  render() {
    const uniqueAvatarUrls =
      _.uniq(
        _.concat(
          this.state.reviewers.map(r => r.avatar_url),
          this.state.assignees.map(a => a.avatar_url),
        )
      );
    return (
      <Segment style={{ display: 'inline-block' }}>
        {
          uniqueAvatarUrls.map((avatarUrl, index) => 
            <img src={avatarUrl} height="32px" alt="" key={index}/>
          )
        }
      </Segment>
    );
  }
}

Avatars.propTypes = {
  reviewers: PT.array.isRequired,
  assignees: PT.array.isRequired,
};
