### Manual release Guide

### Pre-release

#### Setup

- Login to npm using `npm login`
- Setup `GITHUB_TOKEN` on your local environment. Verify it using
  `echo $GITHUB_TOKEN`

Run the following to conduct a release

- `yarn run release` (installs and bundles all the required files)
- Select a version to release
- Answer all the prompts, and select publish to npm as well as GitHub
