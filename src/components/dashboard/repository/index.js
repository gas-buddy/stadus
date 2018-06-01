// @flow
import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import PT from 'prop-types';
import * as github from '../../../utils/github';
import Style from './style.css';
import { PullRequest } from '../pull-request';

type Props = {
  owner: string,
  name: string,
}

export class Repository extends Component<Props> {
  props: Props;
  state: { owner: string, id: number, collapsed: boolean, loading: boolean, name: string, latestBranch: string, prs: Object[] };

  constructor(props: Props) {
    super(props);
    this.props = props;

    this.load = this.load.bind(this);
    this.state = {
      owner: props.owner,
      name: props.name,
      latestBranch: '',
      prNumbers: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState((prevState) => {
      prevState.owner = nextProps.owner;
      prevState.name = nextProps.name;
      return prevState;
    }, this.load);
  }

  load() {
    Promise.all([
      github.getBranch(this.state.owner, this.state.name, 'master'),
      github.getPullRequestsForRepo(this.state.owner, this.state.name),
    ]).then(([branch, pullRequests]) => {
      this.setState({
        latestBranch: branch.commit.commit.message.split('\n')[0],
        prNumbers: pullRequests.map(pr => pr.number),
      });
    }).catch(() => {
      this.setState((prevState) => {
        prevState.latestBranch = '';
        prevState.prNumbers = [];
        return prevState;
      });
    });
  }

  componentDidMount() {
    this.load();
    setInterval(this.load, 60000);
  }

  render() {
    let pullRequestElements = <Segment className={Style.empty}>(none)</Segment>;
    if (this.state.prNumbers.length) {
      pullRequestElements = this.state.prNumbers.map(prNumber => (
        <PullRequest
          key={prNumber}
          owner={this.props.owner}
          repo={this.props.name}
          number={prNumber}
        />
      ));
    }
    return (
      <Segment className={Style.repository}>
        <Header className={Style.name}>
          ▪▪▪ {this.props.name} ▪▪▪
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
  owner: PT.string.isRequired,
  name: PT.string.isRequired,
};
