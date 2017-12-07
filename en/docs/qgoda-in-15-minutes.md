---
title: Qgoda in 15 Minutes
name: qgoda-in-15-minutes
doc-section: Introduction
order: 15
view: docs.html
description: Learn the basic concepts of Qgoda in 15 minutes by building an ugly but simple site from scratch. 
---
[% USE q = Qgoda %]
Qgoda is a [command-line tool](http://www.guido-flohr.net/en/command-line/) tool. Create an empty directory somewhere (what about `qgoda-quickstart`?) and open a command-line window in it. Well-behaving command-line tools do not do anything destructive, when invoked without arguments.  Let's try whether qgoda is well-behaving:

<!--TOC-->

## The Command-Line Interface

```bash
qgoda-quickstart $ qgoda
/opt/local/libexec/perl5.24/sitebin/qgoda: no command given!
Usage: /opt/local/libexec/perl5.24/sitebin/qgoda COMMAND [OPTIONS]
Try '/opt/local/libexec/perl5.24/sitebin/qgoda --help' for more information!
```

Okay, do as you were told and try `qgoda --help`.  That will print out an overview of the things you can do with the program.  The command "build" looks promising.   Before you try it out, you can also get help for that specific command with `qgoda build --help`.  That will display a description of the command run through your system's pager.  Type `q` to close the page, because we will try it with learning by doing now.

```bash
qgoda-quickstart $ qgoda build
[Wed Dec 06 20:12:06.89951 2017][warning][config] config file '_config.yaml' not found, proceeding with defaults.
[Wed Dec 06 20:12:06.90099 2017][info][plugin-loader] initializing plug-ins.
[Wed Dec 06 20:12:06.90112 2017][info] start building site
[Wed Dec 06 20:12:06.90207 2017][info] finished building site with 0 artefacts
g
qgoda-quickstart $
```

Did you notice the warning about the missing configuration file? What are these defaults that were mentioned in the warning? Try it out:

```bash
qgoda-quickstart $ qgoda config
---
case-sensitive: 0
defaults: []
exclude: []
exclude_watch: []
helpers: {}
index: index
latency: 0.5
location: /{directory}/{basename}/{index}{suffix}
...
```

Qgoda configuration is written in [YAML](http://www.yaml.org/), which is a more readable superset of [JSON](https://www.json.org/).  But since it is a strict superset, you can also write JSON, when you are more comfortable with JSON syntax.  You can also name the configuration file `P:_config.json` if you like.

Anyway, the configuration you have seen does probably not make a lot of sense to you at the moment, and so continue without a `P:_config.yaml` for now.  Let's make something happen instead.

## Basics

Like most static site generators, textual content in Qgoda is normally written in [Markdown](https://daringfireball.net/projects/markdown/syntax), a very simple markup language that resembles to email conventions.  Create a text file `index.md` in the directory:

```markdown
This is my first blog created with Qgoda.

## Blog Posts
```

See what happens now:

```bash
qgoda-quickstart $ qgoda build
[Wed Dec 06 10:31:38.23463 2017][warning][config] config file '_config.yaml' not found, proceeding with defaults.
[Wed Dec 06 10:31:38.23598 2017][info][plugin-loader] initializing plug-ins.
[Wed Dec 06 10:31:38.23609 2017][info] start building site
[Wed Dec 06 10:31:38.23796 2017][info] finished building site with one artefact
qgoda-quickstart $
```

Inspect your directory.  You should see that there is a new file `P:_timestamp` and a directory `P:_site`.  The file `P:_timestamp` contains the time of the last build of the site as seconds since the <q-term>epoch</q-term>.

In `P:_site` you find the file `_site/index.md` which is an identical copy of the file `index.md` that you have created.

The directory `P:_site` is Qgoda's default output directory.  By default, Qgoda just copies whatever it finds in your source directory to the output directory `P:_site`.  `index.md` has become `_site/index.md` and a file `images/xmas-tree.jpeg` would be copied to `_site/images/xmas-tree.jpeg`.

In fact, not all files are copied.  Top-level files and directories whose names start with an underscore `_` are omitted.  Hidden files and directories (their names start with a dot `.`) are always omitted, not only in the top-level directory.

[% WRAPPER components/infobox.html
           type='info' title='Excluding More Files' %]
You can configure Qgoda to exclude more (or less) files than that.  See <a href="[% q.llink(name='excluding-files') %]">"[% q.lxref('title', name='excluding-files') %]"</a> for more information.
[% END %]

### Watch Mode

It's a little bit awkward to always type `qgoda build` after we have changed something.  Try the watch mode instead:

```bash
qgoda-quickstart $ qgoda watch
[warning][config] config file '_config.yaml' not found, proceeding with defaults.
[info][plugin-loader] initializing plug-ins.
[info] start building site
[info] finished building site with one artefact
```

[% WRAPPER components/infobox.html
           type='info' title='Log Timestamps' %]
The timestamp will be omitted from now on in the log output, so that long lines are easier to read.
[% END %]

This is the same as before but the program no longer terminates but waits for changes instead.  It actually waits infinitely.  Type `CTRL-C` or close the terminal window, if you want to stop it.

### Front Matter

One question remained: The output file `_site/index.md` is an identical copy of the input file.  But we want it to be converted to HTML, right?

That requires a little change to the input file.  Change `index.md` so that it looks like this:

```markup
---
title: My Blog
---
This is my first blog created with Qgoda.

## Blog Posts
```

You can replace "My Blog" with a "Jane Appleseed's Cooking Experience" but you may have guessed that already.

Qgoda will only run a file through the Markdown processor (*cook* it) if a file starts with three hypens `---`.  Everything up to the next line that contains of just three hyphens is now interpreted as *front matter* in [YAML](http://www.yaml.org/) resp. [JSON](https://www.json.org/) syntax.

Save the file and something will happen in the terminal window:

```bash
[info] start rebuilding site because of file system change
[info] start building site
[error][builder] /tmp/qgoda-quickstart/index.md: error reading view '/tmp/qgoda-quickstart/_views/default.html': No such file or directory.
[error][builder] >>>>>>>>>>>>>>>>>>>
[error][builder] one artefact has not been built because of errors (see above)
[error][builder] >>>>>>>>>>>>>>>>>>>
[info] finished building site with 0 artefacts
```

Qgoda complains about a missing HTML file.  Why? Because converting Markdown to HTML is almost never enough because that will normally just create an HTML fragment.  A usable HTML document also needs a head with meta information, and some decoration like navigations, a header, a footer and so on.

So, let's create a minimal HTML wrapper template (called a *view* in Qgoda):

[% TAGS [@ @] %]

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>[% asset.title %]</title>
  </head>
  <body>
    <h1>[% asset.title %]</h1>
    [% asset.content %]
  </body>
</html>
```

Save it as `_views/default.html`.  Qgoda will notice the new file and trigger a re-generation of the site.  Look into the output directory `_site`.  You will see that `_site/index.md` is gone, because Qgoda always cleans up (*prunes*).  But there is a new file `_site/index/index.md`.

Cooked content is subject to [path translation]([@ q.llink(name='output-location') @]).  Qgoda tries to guess a suitable location for the output file, and in the current case that guess was wrong.  Yes, bad start, but you will see that it will get better.

But the error is simple to fix.  Just edit `index.md` once more:

```markdown
---
title: My Blog
location: /index.html
---
This is my first blog created with Qgoda.

## Blog Posts
```

A quick glance at the output directory `P:_site` shows that the trick worked.  The file is now `_site/index.html`.

Time to look at the file that Qgoda has created:

<figure class="figure w-100">
  <img src="/images/qgoda-in-15-minutes/processor-chains.svg"
       alt="Qgoda Processor Chains">
  <figcaption class="figure-caption text-xs-center">
    The view template (left) and the Markdown/YAML content (right) are combined into the output html file (center).
  </figcaption>
</figure>

To be continued ...