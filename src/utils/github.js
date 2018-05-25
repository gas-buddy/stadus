// @flow
import octokit from '@octokit/rest';

const githubClient = octokit();
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

export async function getPullRequestsForRepo(repo: string) {
  return paginate(githubClient.pullRequests.getAll, { owner: 'gas-buddy', repo });
}

export async function getBranch(repo: string, branch: string) {
  return githubClient.repos.getBranch({ owner: 'gas-buddy', repo, branch }).then(response => response.data);
}