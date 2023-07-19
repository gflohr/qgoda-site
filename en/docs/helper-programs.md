---
title: Helper Programs
name: helpers
section: introduction
view: docs.html
description: Helper programs perform auxiliary tasks in the background.
---
Qgoda's main task is to process source files into output files, normally HTML
files.  It cannot bundle ressources like stylesheets, JavaScript files,
fonts, or images, neither does it have a built-in web server.  All such tasks
are delegated to helper programs.

<qgoda-toc/>

## Configuration

Helpers are configured with the configuration variable `C:helpers`.  The value
of that variable is a <q-term>hash</q-term>.  The keys are arbitrary
identifiers that you can choose yourself, and the values are either plain
strings or an <q-term>array</q-term>.


```yaml
config:
  dev: "npm run watch"
  browser-sync: "npm run server
```

The above is equivalent to:

```yaml
  dev:
  - npm
	- run
	- watch
	browser-sync:
	- npm
	- run
	- server
```

The second form is easier to use, if arguments contain spaces or other special
characters that would have to be escaped from your command-line shell.

## Running Helpers

Helper programs are only executed in watch mode.  Most of the time, they will
be programs that never terminate but watch the file system for changes and
process them.  That is pretty much the same what Qgoda does in watch mode.

If you can configure which files these helpers should monitor for changes, it
is usually a good only look for changes on `P:_timestamp`.  This file is
modified, whenever Qgoda has re-built the site.  If a helper program watches
all source files, a lot of unnecessary re-processing may take place.

Note that building a site with `qgoda build` does not execute any helpers.
Rationale: Helper programs usually run forever.

## Limitations

### Windows

This platform does not allow terminating child processes.  If you interrupt
Qgoda with `CTRL-C` or by creating a `P:_stop` file, the background processes
will continue.  Qgoda will issue a warning that you have to close the window
in order terminate the helper programs.

### Qgoda Running in a Docker Container

A software container cannot execute files of the host system.  That means that
helper programs theoretically work, when Qgoda is running a docker.  But the
files are searched inside of the container.

If you really want to use that feature in a dockerized Qgoda, you have to
extend the Qgoda base image and install additional software in the container.
In general, it will be easier to just run the helper programs in a separate
environment.
