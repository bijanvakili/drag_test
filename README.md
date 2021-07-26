# Drag Test

Drag and Drop Experiment

## Minimal Requirements

- [Node.js](https://nodejs.org/)
- [yarn](https://yarnpkg.com/)
- [drag_test_server](https://github.com/bijanvakili/drag_test_server) in a separate folder

## Setup

Install all the required Javascript packages.

    yarn set version berry
    yarn install

Set up for VSCode

    yarn dlx @yarnpkg/pnpify --sdk vscode

Build the vendor packages:

    yarn run build:vendor

Build the application source:

    yarn run build:app

## Running

1. Configure `drag_test_server` configuration to point to this path (`webappAssetsPath`)
2. Run the `drag_test_server`
3. Open the SPA in a web browser

   open localhost:[port]

## Executing through Development Server

To run in hot module reloading mode:

    yarn run start

To create a production build:

    yarn run clean
    yarn run build:prod

## git hooks

Set up the git pre-commit hook as follows:

    ln -s ../../scripts/pre-commit-lint.sh .git/hooks/pre-commit
