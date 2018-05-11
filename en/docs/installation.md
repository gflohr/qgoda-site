---
title: Installation
name: installation
section: introduction
order: 10
view: docs.html
description: How to install Qgoda and its dependencies on your local system
---
Qgoda has not yet been officially released.  The installation is therefore still a little bit awkward.

<qgoda-toc/>

## Installing Qgoda

### Using Docker

By far the easiest method of installing Qgoda is to use [Docker](https://www.docker.com/):

1. Install Docker.  On Linux/Unix systems, Docker will be available from
your package manager.  On Mac OS X you can install Docker with Mac Ports
or Homebrew.  On Windows, get a pre-compiled binary from
https://www.docker.com/get-docker.

2. Start Docker.  You may want to start the docker daemon automatically.
Check your vendor's documentation for that!

3. In a shell, run:

```bash
$ docker run --rm -it -v $(pwd):/data gflohr/qgoda
```

You may have to add the user that runs the command to the group "docker"
if you get an error like "permission denied".

4. You may want to create an alias, so that you do not have to type in
the Docker commands all the time.  Depending on your operating system,
you have to open `~/.bash_profile`, `~/.bashrc`, `~/.alias`, `~/.zshrc`
or similar and add this line:

```bash
alias qgoda='docker run --rm -it -v $(pwd):/data gflohr/qgoda'
```

### Installation From Github Sources

You first have to checkout the sources from github in a suitable directory.

```bash
$ git clone https://github.com/gflohr/qgoda.git
$ cd qgoda
```

Then try:

```bash
qgoda $ sudo cpanm .
--> Working on .
Configuring /path/to/sources/qgoda ... OK
...
```

If that command succeeds, you are done.  If you get something like "-cpanm: command not found", you have to install the conventional way:

```bash
qgdoa $ perl Makefile.PL
Warning: prerequisite Archive::Extract 0 not found.
Warning: prerequisite File::HomeDir 0 not found.
Warning: prerequisite File::Globstar 0.4 not found.
Warning: prerequisite Date::Parse 2.30 not found.
Warning: prerequisite Locale::TextDomain 1.24 not found.  We have 1.20.
Warning: prerequisite AnyEvent::Filesys::Notify 1.21 not found.
Warning: prerequisite AnyEvent::Open3::Simple 0.86 not found.
Warning: prerequisite HTML::TreeBuilder 5.03 not found.
Warning: prerequisite Text::Unidecode 1.27 not found.
Warning: prerequisite Text::Markdown::Hoedown 1.02 not found.
Warning: prerequisite Template 2.26 not found.
Warning: prerequisite Template::Plugin::Gettext 0.1 not found.
Warning: prerequisite Yaml::LibYAML 0.63 not found.
Generating a Unix-style Makefile
Writing Makefile for Qgoda
Writing MYMETA.yml and MYMETA.json
```

Note the lines starting with "Warning: prerequisite ...".  They are not warnings but errors because these missing dependencies will prevent Qgoda from working.  You can install them with:

```bash
qgoda $ sudo cpan install Archive::Extract File::HomeDir File::Globstar
```

Of course, you have to specify the modules that are missing on *your* system.
The "cpan" command will also install the dependencies of these prerequisites, possibly asking you for permission first.

Once all prerequistes have been installed, proceed with the installation:

```bash
qgoda $ perl Makefile.PL
qgoda $ make
qgoda $ sudo make install
```

### Installation Outside of `$PATH`

It is possible that you see the following warning:

```core
***
*** Warning! The qgoda executable will be installed in the directory
***
***    /opt/local/libexec/perl5.26/sitebin/qgoda
***
*** which is not in your search PATH for executables and will not be
*** found from the command-line.  The easiest way to fix this is to
*** re-run the command like this:
***
***    /opt/local/bin/perl5.26 Makefile.PL  INSTALLSITESCRIPT=/opt/local/bin
***
*** You can also install the package as usual, and try
*** the command  "perldoc Qgoda::Installation" for
*** more options to fix the problem.
```

If you see this warning, your best choice is to follow the advice and re-run the command as specified.  Another option is to fix the problem for all Perl programs.  You should add the following lines to your shell start-up script, normally `~/.bash_profile` (the tilde `~` stands for your home-directory):

```bash
# Make Perl programs executable in $PATH.
p5_vendorbin=`perl -MConfig -le 'print $Config{vendorbinexp}'`
if [ "x$p5_vendorbin" != "x" -a -e "$p5_vendorbin" ]; then
        PATH="$p5_vendorbin:$PATH"
        export PATH
fi
p5_sitebin=`perl -MConfig -le 'print $Config{sitebinexp}'`
if [ "x$p5_sitebin" != "x" -a -e "$p5_sitebin" ]; then
        PATH="$p5_sitebin:$PATH"
        export PATH
fi
```

You have to terminate your current shell in order to activate the change.
But the change is now persistent.  It will work for all future Perl versions.

Other options are to create an alias to the location of the script:

```core
alias qgoda=/opt/local/libexec/perl5.26/sitebin/qgoda
```

Or you can create a symbolic link:

```core
$ sudo ln -s /opt/local/libexec/perl5.26/sitebin/qgoda /usr/local/bin/qgoda
```

But that will no longer work if your Perl executable is upgraded.

## Installing Node.js

[Node.js](https://nodejs.org/en/) is an interpreter for JavaScript that runs outside of the browser.  It is not a strict requirement for Qgoda but most Qgoda sites will make use of it.

The [Node.js website](https://nodejs.org/en/) usually offers a download link for the software but if you are using a package manager, you should rather install Node.js with that.

### Yarn or NPM

[NPM](https://yarnpkg.com/en/) is the Node Package Manager and is used to install packages and their dependencies for Node.js.  [Yarn](https://yarnpkg.com/en/) is an alternative to NPM and does essentially the same.

The official Qgoda themes all use Yarn but you can easily change that.  First, exchange `yarn` with `npm` in the section `scripts` of the theme's `P:package.json` and then do the same for the configuration variable `C:helpers` in Qgoda's main configuration file `P:_config.yaml`.

#### Installing NPM

As `npm` ships with Node.js you normally don't have to install it.  If you have installed Node.js with your package manager, it is possible that you explicitely have to install `npm`.  An example for such a package manager is MacPorts.

#### Installing yarn

See https://yarnpkg.com/en/docs/install for instructions.
