[![Build Status](https://travis-ci.com/cine-estrenos/estrenos-api.svg?branch=master)](https://travis-ci.com/cine-estrenos/estrenos-api)

# Estrenos API built with Fastify

#

# Tests

# Pre-commit & pre-push
We are currently using [Husky](https://github.com/typicode/husky) for our pre-commit & pre-push scripts.

This tool should set 2 scripts:
  - pre-commit: This script runs right after you do a commit and it permits you to commit only if `npm run lint` passes
  - pre-push: This script runs right after you do a push and it permits you to push only if `npm run lint && npm run test` passes.

These scripts can be bypassed if you use the ` --no-verify` argument, for example:

```bash
git add .
git commit -m 'My hard drive is about to die, i need to commit this' --no-verify
git push origin some-branch --no-verify
```

Anyways, is not recommended to bypass the git hooks just because you can, they are here to protect us from non-intentional mistakes at pushing non-working code
