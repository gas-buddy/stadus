// @flow
import assert from 'assert';
import _ from 'lodash';
import octokit from '@octokit/rest';

const githubClient = octokit();
assert(process.env.REACT_APP_GITHUB_API_KEY, 'REACT_APP_GITHUB_API_KEY is required');
githubClient.authenticate({
  type: 'token',
  token: process.env.REACT_APP_GITHUB_API_KEY,
});

async function paginate(method, opts) {
  let response = await method({ ...opts, per_page: 100})
  let {data} = response
  while (githubClient.hasNextPage(response)) {
    response = await githubClient.getNextPage(response)
    data = data.concat(response.data)
  }
  return data;
}

export async function getAllRepos() {
  return paginate(githubClient.repos.getForOrg, { org: 'gas-buddy', type: 'private' });
}

export async function getPullRequestsForRepo(owner: string, repo: string) {
  return paginate(githubClient.pullRequests.getAll, { owner, repo });
}

export async function getBranch(owner: string, repo: string, branch: string) {
  return githubClient.repos.getBranch({ owner, repo, branch }).then(response => response.data);
}

export async function getPullRequest(owner: string, repo: string, number: number) {
  return githubClient.pullRequests.get({ owner, repo, number }).then(response => response.data);
}

export async function getCommitStatuses(owner: string, repo: string, sha: string) {
  return githubClient.repos.getStatuses({ owner, repo, ref: sha }).then(response =>response.data);
}

export async function getPullRequestComments(owner: string, repo: string, number: number, since: ?string) {
  return Promise.all([
    githubClient.pullRequests.getComments({ owner, repo, number, since }).then(response => response.data),
    githubClient.issues.getComments({ owner, repo, number, since }).then(response => response.data),
  ]).then(([prComments, issueComments]) => _.concat(prComments, issueComments));
}
