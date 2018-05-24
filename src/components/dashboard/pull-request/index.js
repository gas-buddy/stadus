// @flow
import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import PT from 'prop-types';
import Style from './style.css';


export class PullRequest extends Component {
  render() {
    const name = 'Implemented XYZ [BP-123] [BP-456]';
    const branchName = 'am/implement-the-thing';
    const commentCount = Math.floor(Math.random() * 3);

    const age = Math.floor(Math.random() * 14);
    const decayRatio = Math.min(1.0, age / 10);

    const ageColor = decayRatio > 0.8 ?
        '#E0EEEE'
      : decayRatio > 0.4 ?
        '#A0AAAA'
      : '#606666';

    const randomStatus = Math.random();
    const status = randomStatus > 0.8 ? 'fail' : randomStatus > 0.3 ? 'success' : 'pending';
    const Status =
      status === 'fail' ? <span className={[Style.branchStatus, Style.fail].join(' ')}>✘</span>
      : status === 'success' ? <span className={[Style.branchStatus, Style.success].join(' ')}>✓</span>
      : <span className={[Style.branchStatus, Style.pending].join(' ')}>...</span>;
    const jiraIssueNumbers = [ name.match(/\[([A-Z]+-[0-9]+)\]/)[1] ];

    const displayName = name.replace(/\[[A-Z]+-[0-9]+\]/g, '');

    return (
      <Segment className={[Style.pr, Style[status]].join(' ')}>
        <Header className={Style.title}>
          <Segment>
            <a className={Style.name} target="_blank" href={`https://github.com/gas-buddy/business-pages-serv/pull/431`}>{displayName}</a>
            <a className={Style.jiraLink} target="_blank" href={`https://gasbuddy.atlassian.net/browse/${jiraIssueNumbers[0]}`}>{jiraIssueNumbers[0]}</a>
          </Segment>
        </Header>
        <Segment>
          {Status}
          <a className={Style.grey} target="_blank" href={`https://github.com/gas-buddy/business-pages-serv/tree/${branchName}`}>{branchName}</a>
        </Segment>
        <Segment className={Style.darkgrey}>
          <span style={{
            display: 'inline-block',
            backgroundColor: ageColor,
            height: '2px',
            verticalAlign: 'middle',
            width: `${Math.max(10, decayRatio * 100)}px`,
            marginRight: '10px',
          }}></span>
          <span style={{
            display: 'inline-block',
            verticalAlign: 'middle',
          }}>
            {age} days
          </span>
        </Segment>
        {
          commentCount > 0 ?
            (<Segment className={Style.comments}>
              <a target="_blank" href={`https://github.com/gas-buddy/business-pages-serv/pull/431#pullrequestreview-117098311`}>
                💬{commentCount}
              </a>
            </Segment>) : null
        }
      </Segment>
    );
  }
}


PullRequest.propTypes = {
  id: PT.number.isRequired,
};
