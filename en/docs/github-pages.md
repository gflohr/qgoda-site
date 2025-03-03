---
title: GitHub Pages
name: github-pages
section: deployment
description: >
    GitHub pages provide a simple and free-of-charge way to publish a site
    generate by Qgoda to a website.
---
[% USE Highlight %]
The [custom GitHub action
`gflohr/qgoda-action`](https://github.com/gflohr/qgoda-action) can automate
the process of publishing your documents to [GitHub
Pages](https://pages.github.com/). The following document describes the
process step by step.

<qgoda-toc/>

## Overview of GitHub Pages

[GitHub Pages](https://pages.github.com/) is a free hosting service for static
websites. Its main purpose is to host software documentation for projects
hosts on [GitHub](https://github.com/) but nobody can stop you from using it
for your blog or landing page.

Each user has one dedicated hostname available to host GitHub Pages. Assuming
your username on GitHub is `my-self`, this hostname would be
`my-self.github.io`. If your repository is called `my-project` - that means
that the homepage of the project would be https://github.com/my-self/my-project,
the URL for the GitHub Pages site would be https://my-self.github.io/my-project.

### GitHub Pages and Jekyll

The original idea of GitHub Pages was to just commit Markdown pages to the
repository and generate the site with [Jekyll](https://jekyllrb.com/). In
fact, that was probably the reason for the popularity of Jekyll.

Fortunately, you have the option to use a more powerful static site
generator like Qgoda.  One possibility is to create the HTML pages on your
local machine and then push them to the GitHub repository. But you can also let
GitHub create the pages automatically, stay tuned!

### Source

The way your site gets created is not verfy flexible. Most people use a
dedicated branch `gh-pages` and deploy the files from the root folder.  In
other words, the URL https://my-self.github.io/my-project/index.html points
to the file `index.html` in the top-level directory of your repository.

Another possibility is to put the HTML files into a directory `/docs`.

The branch can be freely selected, including your main branch.

## Create a GitHub Repository

In order to use GitHub Pages, you must host your source files in a GitHub
repository.  For the following, we assume that you have created a repository
`my-project` and the sources for the documentation are in the subdirectory
`packages/docs`. This is a typical scenario for software documentation
If your repository only contains sources for Qgoda, you
will probably keep them in the top-level directory. The process is always the
same.

## Create Branch `gh-pages`

In that repository, create a branch `gh-pages`. This is the common convdention
but you can also create another branch if you want to.

## Qgoda Configuration

You will normally have to do slight modifications to the `_qgoda.yaml` file.
A typical configuration will look like this:

[% FILTER $Highlight "language-yaml" "line-numbers" %]
permalink: /my-project{significant-path}
paths:
  site: _site/my-project
helpers:
  webpack: npm run start
  browser-sync: npm run server
pre-build:
  - name: webpack
    run: npm run build
post-build:
  - name: disable-jekyll
    run: touch _site/my-project/.nojekyll
[% END %]

In line 1, we change the configuration variable `C:paths.site` from the default
value `_site` to `_site/my-project`. The reason is that we hav to emulate
the URL structure of `github.io` where the name of the repository is an
additional directory level. If you render the pages into `_site/my-project`,
the document root of your development web server will still be `_site` and
you will point your browser to `http://localhost:3000/my-project/`.

Lines 5 and 6 are just example for a typical setup. Qgoda will start two
helpers `npm run start` and `npm run server`. Your mileage may vary.

The problem is that these helpers typically run for an infinite time. But
for an automatic deployment, they have to run just once and then terminate.
This is achieved by lines 7-9. We add a `C:pre-build` task `webpack` that
executes the command `npm run build`. It is assumed that this command bundles
your assets in your repository. After that Qgoda renders the pages.

Lines 10-12 are not strictly necessary. If you put a file `.nojekyll` into
the root of the HTML pages, the normal GitHub workflow that invokes
Jekyll is bypassed. In fact, the GitHub workflow described below will also
create that file for the same reason. But if we create it one step earlier,
it fixes an ugly warning. See https://github.com/peaceiris/actions-gh-pages/issues/892
for more information.

## Configure Source

Go to the Settings tab of your repository and select `Pages` from the menu on
the left. Under `Build and Deployment` select `Deploy from a branch`. Select
the newly created branch `gh-pages`, leave the "folder" as `/ (root)` and
hit `Save`.

## GitHub Workflow

[GitHub workflows](https://docs.github.com/en/actions/writing-workflows) also
known as GitHub Actions are tasks, sometimes called pipelines, that are
automatically executed when certain events happen. Typical events are
code pushes or releases.

Workflows reside in a directory `.github/workflows`.
Create now a workflow `.github/workflows/qgoda.yaml` in your repository
that will automatically build your site with Qgoda:

[% FILTER $Highlight "language-yaml" "line-numbers" %]
name: Build and Deploy Docs with Qgoda

on:
  push:
    branches:
      - '**'

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Build with Qgoda
        uses: gflohr/qgoda-action@v1
        with:
          qgoda-version: latest-node
          qgoda-srcdir: packages/docs
          qgoda-command: --verbose build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v4
        if: github.ref == 'refs/heads/main'
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./packages/docs/_site/my-repo
[% END %]

Lines 3-6 define the trigger for your workflow. In this case, the workflow
will be executed, whenever a push happens, regardless of the branch.

Lines 8 and 9 enable write permissions for the workflow. This is necessary
because the workflow is supposed to commit files to the branch `gh-pages`.

After line 14, the individual steps of the workflow are defined.

The first step in line 15 checks out the repository. It uses the custom
action [`actions/checkout`](https://github.com/actions/checkout) version 4.

Lines 18-23 build the site with the custom action
[`gflohr/qgoda-action`](https://github.com/gflohr/qgoda-action) version 1.
What this worfklow does is essentially start
a docker container running Qgoda inside the pipeline. It mounts the
Qgoda source directory (`packages/docs`) into the container and then runs the
command `qgoda` with the arguments `--verbose build`.  If you omit the input
variable `qgoda-command` it will run the default command `qgoda build`
instead. Please see the [README for `gflohr/qgoda-action`](https://github.com/gflohr/qgoda-action)
for all available input variables and their defaults.

Line 25-30 finally deploys the pages with the custom action
[peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)
version 4. Deployment means that the rendered pages in
`_site/packages/docs/my-repo` are committed and pushed to the branch `gh-pages`
which is what we want.

But remember (line 6) that the workflow is executed for each push. This is
good because you will always automatically check that the documentation can
be built correctly. But in most cases you will only want to re-publish the
documentation, when a push to the `main` branch happens. This is achieved with
the `if` condition in line 28.

Line 29 may suggest that you need to retrieve an authentication token. This is
not the case. Each GitHub workflow automatically has a token called
`secrets.GITHUB_TOKEN` and this token is used here. You have little reason to
change that.

Line 30, finally, defines the source directory for the HTML files and other
assets. In this case it is `packages/docs/_site/my-repo`.

## Test

When you perform a push to the main branch, the action will be automatically
triggered. You can see that in the tab `Actions` of your repository. A click
on the running action reveals the details of that workflow run.
