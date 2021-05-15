#!/bin/sh

set -e

git diff --name-only --cached --relative --diff-filter=ACM | xargs yarn run lint-prettier
git diff --name-only --cached --relative --diff-filter=ACM | grep '\.tsx\?$' | xargs yarn run lint-ts
git diff --name-only --cached --relative --diff-filter=ACM | grep '\.md$' | xargs yarn run lint-md
