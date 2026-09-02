# Yes Muppets

no meeting starts before the muppets

https://yesmuppets.net/

A fork of [nohello.net](https://nohello.net/) ([source](https://github.com/nohello-net/site)),
with the same design, font, and layout - deadpan about a different rule: **you cannot start a
meeting until you've shown a picture of art you made featuring the Muppets.** The meeting cannot
go on without the muppets.

Not affiliated with Disney, The Muppets Studio, or nohello.net.

## Programmers

This project is a [Eleventy](https://www.11ty.dev/) site. If you've used a static site generator
before, you're pretty much good to go. If not, take a look through the
[Eleventy documentation](https://www.11ty.dev/docs/) to get up to speed.

### Getting Started

It's a JavaScript site, so you'll need `node` installed. Using [nvm](https://github.com/nvm-sh/nvm)
will make sure you're using the right version.

```sh
# git clone, etc
yarn        # install dependencies
yarn serve  # run development server
```

Then open [localhost:8123](http://localhost:8123/) in your browser, and you should be ready to disco.

### Making Changes

Unit tests are via Mocha. Nothing too fancy there.

We use UI tests via [Playwright](https://playwright.dev/). To ensure consistency, the snapshots are
taken with a Linux container. To run this locally for convenience, you'll need two things installed:
[Docker](https://docs.docker.com/desktop/mac/install/) and [act](https://github.com/nektos/act).

Available commands:

```sh
yarn check-snapshots  # do your snapshots match?
yarn update-snapshots # if not, update your snapshots!
```

### Language support

1.0 is English-only. The original [nohello.net](https://github.com/nohello-net/site) has
multi-language support if you're looking for a reference on how to add it back.

### Deployment

The site builds to static HTML in `build/` and is deployed to GitHub Pages by
`.github/workflows/deploy.yml` on every push to `main`. The custom domain (`yesmuppets.net`) is
configured via `src/CNAME` and pointed at GitHub Pages through Cloudflare DNS (a `CNAME`/`ALIAS`
record at the apex, or `www` + apex redirect, both proxied or DNS-only per GitHub's
[custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)).
