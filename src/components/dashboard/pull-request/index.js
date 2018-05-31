// @flow
import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import PT from 'prop-types';
import moment from 'moment';
import * as github from '../../../utils/github';
import Style from './style.css';

type Props = {
  owner: string,
  repo: string,
  number: number,
}

export class PullRequest extends Component<Props> {
  state: { owner: string, repo: string, number: number, pr: any, commitStatuses: any[] }

  constructor(props: Props) {
    super(props);
    this.props = props;
    this.state = {
      owner: props.owner,
      repo: props.repo,
      number: props.number,
    };
  }

  componentDidMount() {
    github.getPullRequest(this.state.owner, this.state.repo, this.state.number)
      .then((pr) => {
        Promise.all([
          github.getCommitStatuses(this.state.owner, this.state.repo, pr.head.sha),
          github.getPullRequestComments(this.state.owner, this.state.repo, this.state.number, pr.created_at),
        ]).then(([statuses, comments]) => {
          this.setState({ pr, statuses, comments });
        });
      });
  }

  render() {
    console.log('PullRequest', this.state);
    if (!this.state.pr) {
      return null;
    }

    const name = this.state.pr.title || '';
    // This is gross, put this in state
    const branchName = this.state.pr.head.ref;
    const commentCount = this.state.comments.length;

    const age = moment().diff(moment(this.state.pr.created_at), 'days');
    const decayRatio = Math.min(1.0, age / 10);

    const ageColor = decayRatio > 0.8 ?
        '#FF1919'
      : decayRatio > 0.4 ?
        '#FFCB00'
      : '#0B77C3';

    let mergeState;
    switch (this.state.pr.mergeable_state) {
      case 'behind': mergeState = 'behind'; break;
      default: mergeState = 'blocked';
    }

    const status = 'success'; // randomStatus > 0.8 ? 'fail' : randomStatus > 0.3 ? 'success' : 'pending';
    const Status =
      status === 'fail' ? <span className={[Style.branchStatus, Style.fail].join(' ')}>✘</span>
      : status === 'success' ? <span className={[Style.branchStatus, Style.success].join(' ')}>✓</span>
      : <span className={[Style.branchStatus, Style.pending].join(' ')}>...</span>;
    const jiraParse = name.match(/\[([A-Z]+-[0-9]+)\]/) || [];
    jiraParse.shift();
    const jiraIssueNumbers = jiraParse;

    const displayName = name.replace(/\[[A-Z]+-[0-9]+\]/g, '');

    return (
      <Segment className={[Style.pr, Style[mergeState]].join(' ')}>
         <Header className={Style.title}>
           <Segment>
             <a className={Style.name} target="_blank" href={this.state.pr.html_url}>#{this.props.number} - {displayName}</a>
             {jiraIssueNumbers.map(issueNumber => (
              <a key={issueNumber} className={Style.jiraLink} target="_blank" href={`https://gasbuddy.atlassian.net/browse/${issueNumber}`}>{issueNumber}</a>
            ))}
          </Segment>
        </Header>
        <Segment>
          {Status}
          <a className={Style.grey} target="_blank" href={`${this.state.pr.base.repo.html_url}/tree/${branchName}`}>{branchName}</a>
        </Segment>
        <Segment className={Style.darkgrey}>
          <span style={{
            display: 'inline-block',
            backgroundColor: ageColor,
            height: '2px',
            verticalAlign: 'middle',
            minWidth: '15px',
            width: `${Math.max(2, decayRatio * 70)}%`,
            marginRight: '10px',
          }}></span>
          <span  style={{
            display: 'inline-block',
            verticalAlign: 'middle',
          }}>
            {age} {age === 1 ? 'day' : 'days'}
          </span>
        </Segment>
        {
          commentCount ?
            (<Segment className={Style.comments}>
              <a target="_blank" href={this.state.pr.html_url}>
                💬{commentCount}
              </a>
            </Segment>) : null
        }
      </Segment>
    );
  }
}


PullRequest.propTypes = {
  owner: PT.string.isRequired,
  repo: PT.string.isRequired,
  number: PT.number.isRequired,
};
