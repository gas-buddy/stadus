// @flow
import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import Style from './style.css';
import PT from 'prop-types';

type Props = {
  reviewers: [],
}

export class Reviewers extends Component<Props> {
  state: { reviewers: [] };
  constructor(props: Props) {
    super(props);
    this.state = { reviewers: props.reviewers };
  }

  render() {
    return (
      <Segment style={{ display: 'inline-block' }}>
        {
          this.state.reviewers.map((reviewer) => 
            <img src={reviewer.avatar_url} height="32px"/>
          )
        }
      </Segment>
    );
  }
}

Reviewers.propTypes = {
  reviewers: PT.array.isRequired,
};
