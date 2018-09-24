![](https://i.imgur.com/0MnJOav.jpg)

# Setup
1. Create a GitHub [Personal Access Token](https://github.com/settings/tokens)
    1. Click `Generate new token`
    1. Give it a description, like "Stadus Token"
    1. Check off the top-level `repo` permission
    1. Click `Generate token` and copy the token
1. Create a `.env.local` file
1. Populate `.env.local` with the following values:
```
REACT_APP_GITHUB_API_TOKEN={token}
REACT_APP_GITHUB_BASE_URL={your github baseurl - optional, eg: https://api.github.com}
```

## Running the project

1. `npm install`
1. `npm start`
1. http://localhost:3000
1. Click on Config and enter the `github owner` (eg: `gas-buddy`) and comma-separated names of the repos you want to monitor (eg: `business-pages-serv, business-pages-web, poi-serv`)
1. Click the config gear to dismiss the dialog, and you should see the available Pull Requests
