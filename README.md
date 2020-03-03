<h1 align="center">Estrenos API</h1>

<div align="center">
  <img src="https://img.shields.io/travis/cine-estrenos/estrenos-api?style=for-the-badge">
  <img src="https://img.shields.io/david/cine-estrenos/estrenos-api?style=for-the-badge">
  <img src="https://img.shields.io/github/issues/cine-estrenos/estrenos-api?style=for-the-badge">
  <img src="https://img.shields.io/github/issues-pr/cine-estrenos/estrenos-api?style=for-the-badge">
</div>

## Local development

You will need [Docker](https://www.docker.com/products/docker-desktop) installed locally and afterwards simple run:

```
$ docker-compose up
```

That's it you can now go and use the following endpoints:

- GraphQL
  - [localhost:3000/graphql](localhost:3000/graphql)

* REST
  - [localhost:3000/cinemas](localhost:3000/cinemas)
  - [localhost:3000/movies](localhost:3000/movies)
  - [localhost:3000/movies/:movieId](localhost:3000/movies/:movieId)
  - [localhost:3000/shows/:movieId](localhost:3000/shows/:movieId)
  - [localhost:3000/shows/:movieId/:cinemaId](localhost:3000/shows/:movieId/:cinemaId)

## Environment variables

- `MOVIEDB_APIKEY`
  You can get it from https://api.themoviedb.org

* `SENTRY_DSN`
  Only needed in production

## Pre-commit & pre-push

We are currently using [Husky](https://github.com/typicode/husky) for our pre-commit & pre-push scripts.

This tool should set 2 scripts:

- pre-commit: This script runs right after you do a commit and it permits you to commit only if `npm run lint` passes
- pre-push: This script runs right after you do a push and it permits you to push only if `npm run lint && npm run test` passes.

These scripts can be bypassed if you use the `--no-verify` argument, for example:

```bash
git add .
git commit -m 'My hard drive is about to die, i need to commit this' --no-verify
git push origin some-branch --no-verify
```

Anyways, is not recommended to bypass the git hooks just because you can, they are here to protect us from non-intentional mistakes at pushing non-working code

## Diagrams

#### Flow

![flow](/docs/flow.png)

#### Database

![db](/docs/db.png)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://leonardogalante.com"><img src="https://avatars3.githubusercontent.com/u/2475912?v=4" width="100px;" alt=""/><br /><sub><b>Leonardo Galante</b></sub></a><br /><a href="https://github.com/lndgalante/estrenos-api/commits?author=lndgalante" title="Code">💻</a> <a href="#maintenance-lndgalante" title="Maintenance">🚧</a> <a href="https://github.com/lndgalante/estrenos-api/pulls?q=is%3Apr+reviewed-by%3Alndgalante" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://hugo.farji.me/"><img src="https://avatars0.githubusercontent.com/u/1130309?v=4" width="100px;" alt=""/><br /><sub><b>Hugo David Farji</b></sub></a><br /><a href="https://github.com/lndgalante/estrenos-api/commits?author=hdf1986" title="Code">💻</a> <a href="#maintenance-hdf1986" title="Maintenance">🚧</a> <a href="https://github.com/lndgalante/estrenos-api/pulls?q=is%3Apr+reviewed-by%3Ahdf1986" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="http://www.gonzalopozzo.com"><img src="https://avatars1.githubusercontent.com/u/6494462?v=4" width="100px;" alt=""/><br /><sub><b>Gonzalo Pozzo</b></sub></a><br /><a href="https://github.com/lndgalante/estrenos-api/commits?author=goncy" title="Code">💻</a> <a href="#maintenance-goncy" title="Maintenance">🚧</a> <a href="https://github.com/lndgalante/estrenos-api/pulls?q=is%3Apr+reviewed-by%3Agoncy" title="Reviewed Pull Requests">👀</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
