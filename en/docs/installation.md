---
title: Installation
name: installation
section: introduction
order: 10
view: docs.html
description: How to install Qgoda and its dependencies on your local system
---
You can install and run Qgoda in a couple of ways.

<qgoda-toc/>

## macOS (Homebrew)

### Installation

Install [Homebrew](https://brew.sh/) and tap the 
[`gflohr-homebrew`](https://github.com/gflohr/homebrew-homebrew) formula
repository before you install the formular `qgoda`:

<!--qgoda-no-xgettext-->
```bash
$ brew tap gflohr/homebrew
$ brew install qgoda
```
<!--/qgoda-no-xgettext-->

### Update

You can update with:

<!--qgoda-no-xgettext-->
```bash
$ brew update
$ brew upgrade qgoda
```
<!--/qgoda-no-xgettext-->

### Uninstall Qgoda

<!--qgoda-no-xgettext-->
```bash
$ brew uninstall qgoda
$ brew untap gflohr/homebrew
```
<!--/qgoda-no-xgettext-->

## All Other Platforms

Please check the section [Pre-Requisites](#pre-requisites) below for additional
software necessary to run Qgoda on your system.

### Installing from CPAN

The Qgoda version on CPAN is currently outdated and should not be used!

If you are happy with version 0.9.8, then you can:

<!--qgoda-no-xgettext-->
```bash
$ cpanm Qgoda
```
<!--/qgoda-no-xgettext-->

### Installing From Git

Clone the [Qgoda git repository](https://github.com/gflohr/qgoda) and follow
the usual way of installing Perl modules:

<!--qgoda-no-xgettext-->
```bash
$ git clone https://github.com/gflohr/qgoda.git
$ cd qgoda
$ cpanm .
```
<!--/qgoda-no-xgettext-->

### Pre-Requisites

#### Installing Node.js

[Node.js](https://nodejs.org/en/) is an interpreter for JavaScript that runs outside of the browser.  It is not a strict requirement for Qgoda but most Qgoda sites will make use of it.

The [Node.js website](https://nodejs.org/en/) usually offers a download link for the software but if you are using a package manager, you should rather install Node.js with that.

#### Yarn or NPM

[NPM](https://yarnpkg.com/en/) is the Node Package Manager and is used to install packages and their dependencies for Node.js.  [Yarn](https://yarnpkg.com/en/) is an alternative to NPM and does essentially the same.

The official Qgoda themes all use Yarn but you can easily change that.  First, exchange `yarn` with `npm` in the section `scripts` of the theme's `P:package.json` and then do the same for the configuration variable `C:helpers` in Qgoda's main configuration file `P:_config.yaml`.

##### Installing NPM

As `npm` ships with Node.js you normally don't have to install it.  If you have installed Node.js with your package manager, it is possible that you explicitely have to install `npm`.  An example for such a package manager is MacPorts.

##### Installing yarn

See https://yarnpkg.com/en/docs/install for instructions.

## Using Docker

An easy method of installing Qgoda is to use [Docker](https://www.docker.com/):

1. Install Docker.  On Linux/Unix systems, Docker will be available from
your package manager.  On Mac OS X you can install Docker with Mac Ports
or Homebrew, or - like on Windows - get a pre-compiled binary from
https://www.docker.com/products/docker-desktop/.

1. Start Docker.  You may want to start the docker daemon automatically.
Check your vendor's documentation for that!

1. In a [shell](http://www.guido-flohr.net/en/command-line/), run
the command `$ docker run --name qgoda -p 3000:3000 --rm -it -v $(pwd):/data gflohr/qgoda watch`.
You may have to add the user that runs the command to the group "docker"
if you get an error like "permission denied".

1. You can create an alias, so that you do not have to type in
the Docker command-line options all the time.  Depending on your operating system,
you have to open `~/.bash_profile`, `~/.bashrc`, `~/.alias`, `~/.zshrc`
or similar and add this line:

<!--qgoda-no-xgettext-->
```bash
alias qgoda='docker run --name qgoda -p 3000:3000 --rm -it -v $(pwd):/data gflohr/qgoda'
```
<!--/qgoda-no-xgettext-->

With this alias, you can now run all qgoda commands like the native version
described in this documentation.
