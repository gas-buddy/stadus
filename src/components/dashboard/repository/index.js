// @flow
import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import PT from 'prop-types';
import Style from './style.css';
import { PullRequest } from '../pull-request';


export class Repository extends Component {
  constructor(props: any) {
    super(props);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.load = this.load.bind(this);
    this.state = {
      id: props.id,
      collapsed: false,
      loading: true,
      repo: {
        name: 'business-pages-serv',
        latestBranch: 'Applied latest patch #170',
      },
      prs: [],
    };
  }

  load() {
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.setState({
        loading: false,
        repo: {
          name: 'business-pages-serv',
          latestBranch: 'Applied latest patch #170',
          id: Math.floor(Math.random() * 10000),
        },
        prs: Array.from(new Array(Math.floor(Math.random() * 7)), (a, i) => ({
          id: i + 1,
          age: Math.floor(Math.random() * 20),
        })),
      });
    }, 1300);
  }

  componentDidMount() {
    console.log('loading');
    this.load();
    // setInterval(this.load, Math.floor(Math.random() * 8000) + 5000);
  }

  toggleCollapse() {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }));
  }

  render() {
    return (
      <Segment id={this.state.id} className={Style.repository} loading={this.state.loading} inverted={this.state.collapsed}>
        <Header className={Style.name} onClick={this.toggleCollapse}>
          ▪▪▪ {this.state.repo.name}▪▪▪ 
        </Header>
        <Segment className={Style.status}>{this.state.repo.latestBranch}</Segment>
        <Segment> {
          this.state.prs.map(pullRequest => (
            <PullRequest
              key={pullRequest.id}
              id={pullRequest.id}
            />
          ))
        } </Segment>
      </Segment>
    );
  }
}

Repository.propTypes = {
  id: PT.number.isRequired,
};
