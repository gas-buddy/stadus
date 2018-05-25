// @flow
import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import PT from 'prop-types';
import * as github from '../../../utils/github';
import Style from './style.css';
import { PullRequest } from '../pull-request';

type Props = {
  id: number,
  name: string,
}

export class Repository extends Component<Props> {
  state: { id: number, collapsed: boolean, loading: boolean, name: string, latestBranch: string, prs: Object[] };
  name: string;

  constructor(props: any) {
    super(props);

    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.load = this.load.bind(this);
    this.name = props.name;
    this.state = {
      id: props.id,
      collapsed: false,
      loading: true,
      name: props.name,
      latestBranch: '',
      prs: [],
    };
  }

  load() {
    this.setState({
      loading: true,
    });
    Promise.all([
      github.getBranch(this.name, 'master'),
      github.getPullRequestsForRepo(this.name),
    ]).then(([branch, pullRequests]) => {
      console.log('Latest branch', branch);
      this.setState({
        loading: false,
        prs: pullRequests,
        latestBranch: branch.commit.commit.message.split('\n')[0],
      });
    });
  }

  componentDidMount() {
    this.load();
    setInterval(this.load, 60000);
  }

  toggleCollapse() {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed,
    }));
  }

  render() {
    let pullRequestElements = <Segment className={Style.empty}>(none)</Segment>;
    if (this.state.prs.length) {
      pullRequestElements = this.state.prs.map(pullRequest => (
        <PullRequest
          key={pullRequest.id}
          data={pullRequest}
        />
      ));
    }
    return (
      <Segment id={this.state.id} className={Style.repository} loading={this.state.loading} inverted={this.state.collapsed}>
        <Header className={Style.name} onClick={this.toggleCollapse}>
          ▪▪▪ {this.state.name} ▪▪▪
        </Header>
        <Segment className={Style.status}>{this.state.latestBranch}</Segment>
        <Segment>
          {pullRequestElements}
        </Segment>
      </Segment>
    );
  }
}

Repository.propTypes = {
  id: PT.number.isRequired,
  name: PT.string.isRequired,
};
