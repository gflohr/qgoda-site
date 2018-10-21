---
title: Command Line Interface
name: command-line-interface
section: introduction
view: docs.html
description: Qgoda options, commands and command options
---
Qgoda is a [command-line](http://www.guido-flohr.net/command-line/) program.
<qgoda-toc/>

## General Usage

The general usage pattern for qgoda is:

```bash
$ qgoda [GLOBAL_OPTIONS] [COMMAND, [OPTIONS]]
```

For example:

```bash
$ qgoda --verbose build --drafts --future
```

That sets the global option `--verbose` to true and selects the qgoda command `build` with the options `--drafts` and `--future`.

## Global Options

Qgoda currently supports the following global options.

<dl>
  <dt><strong>-q, --quiet</strong></dt>
  <dd>Activates quiet mode.  In quiet mode, only errors and fatal errors are displayed.</dd>

  <dt><strong>-v, --verbose</strong></dt>
  <dd>Enables verbose logging.  A lot more details are displayed.  You will normally select verbose mode only, when tracking down errors.</dd>

  <dt><strong>--log-stderr</strong></dt>
  <dd>Causes qgoda to log to standard error instead of standard output.</dd>

  <dt><strong>-h, --help</strong></dt>
  <dd>Causes qgoda to display usage information and exit immediately.  All other options and commands are ignored.</dd>

  <dt><strong>-V, --verbose</strong></dt>
  <dd>Causes qgoda to display version information and exit immediately.  All other options and commands are ignored.</dd>
</dl>

## Commands

The next token on the command-line must be one of the supported commands, currently `build`, `watch`, `config`, `init`, `dump`, `markdown`, `xgettext`, and `po`.

### Command Options and Arguments

The rest of the command-line are options specific to the selected command.  Try `qgoda COMMAND --help` for help for the specific command (replace `COMMAND` with one of the supported commands.  The option `-h` or `--help` is supported by all qgoda commands.

The command help is displayed using the system pager.  Hit the letter `q` to leave the pager.  `SPACE` scrolls one page down, cursor-down or `j` scrolls one line down, cursor-up or `k` scrolls one line up, `h` shows more help.

### Availabe Commands

<!--QGODA-NO-XGETTEXT-->
#### build
<!--/QGODA-NO-XGETTEXT-->

The commands `build` instructs qgoda to build the site and exit.  Helper programs are *not* executed!

<!--QGODA-NO-XGETTEXT-->
#### watch
<!--/QGODA-NO-XGETTEXT-->

Same as `build` above but instead of terminating, qgoda watches the file system for changes and triggers a re-build after a source file has changed.

Helper applications are started in parallel.

<!--QGODA-NO-XGETTEXT-->
#### config
<!--/QGODA-NO-XGETTEXT-->

Dumps the current configuration as <q-term>yaml:YAML</q-term> and exits.  The configuration printed is the result of merging the default configuration with the files `P:_config.yaml` and `P:_localconfig.yaml`.

<!--QGODA-NO-XGETTEXT-->
#### init
<!--/QGODA-NO-XGETTEXT-->

Initializes a new qgoda site.

<!--QGODA-NO-XGETTEXT-->
#### dump
<!--/QGODA-NO-XGETTEXT-->

Dumps the content of the entire site.  The output is suitable for pumping it into external programs (for example full-text search engines like [elasticsearch](https://www.elastic.co/).

<!--QGODA-NO-XGETTEXT-->
#### markdown
<!--/QGODA-NO-XGETTEXT-->

Generates <q-term>html</q-term> from a <q-term>markdown</q-term> file.  This is meant for debugging problems with markdown rendering.

<!--QGODA-NO-XGETTEXT-->
#### po
<!--/QGODA-NO-XGETTEXT-->

Various commands needed for multi-language sites.  See [% q.lanchor('mulit-language-overview') %] for details.

<!--QGODA-NO-XGETTEXT-->
#### xgettext
<!--/QGODA-NO-XGETTEXT-->

Extracts translatable snippets from the site's markdown source files into `.po`. files.  This command is invoked implicitely by `qgoda po pot` (see above), and you normally don't have to use `qgoda xgettext` directly.  See [% q.lanchor('mulit-language-overview') %] for more information.
