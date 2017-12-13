---
title: Qgoda in 15 Minutes
name: qgoda-in-15-minutes
doc-section: Introduction
order: 15  
view: docs.html
description: Learn the basic concepts of Qgoda in 15 minutes by building an ugly but simple site from scratch. 
---
[% USE q = Qgoda %]
Qgoda is a [command-line tool](http://www.guido-flohr.net/en/command-line/). Create an empty directory `qgoda-quickstart` somewhere and open a command-line window in it. Well-behaving command-line tools do not do anything destructive, when invoked without arguments.  Let's try whether qgoda is well-behaving:

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
[warning][config] config file '_config.yaml' not found, proceeding with defaults.
[info][plugin-loader] initializing plug-ins.
[info] start building site
[info] finished building site with 0 artefacts
g
qgoda-quickstart $
```

[% WRAPPER components/infobox.html
           type='info' title='Log Timestamps' %]
Actually, the log messages are prepended by timestamps.  They are discarded here, so that the log output is easier to read.
[% END %]

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
This is my great blog.

## Blog Posts
```

See what happens now:

```bash
qgoda-quickstart $ qgoda build
[warning][config] config file '_config.yaml' not found, proceeding with defaults.
[info][plugin-loader] initializing plug-ins.
[info] start building site
[info] finished building site with one artefact
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

By default, Qgoda processes the content in these stages:

1. Front matter (here `title` and `location`) is stripped off and turned into document properties.

2. The Markdown file is run through the Markdown processor, turning strings like `## Blog Posts` into HTML code (`<h2>Blog Posts</h2>`).

3. The output of the previous step is run through the template processor Template Toolkit.  In the above case there was no template code and that step was unnecessary.

4. The *view template* (defaults to `_views/default.html`) gets processed, and the output of steps 2 and 3 above is inserted for `[% asset.content %]`.

It's a slight fib.  Actually the whole process except for step 1 is completely configurable.

## Start a Web Server (Browsersync)

You can double-click the generated html file in order to see it but it would actually be nicer to see it automatically. Let's install a mini web server for that purpose.

### Initializing a Node.js Project

You now have to install Node.js and either `yarn` or `npm`.  Read [[% q.llink(name = 'installation') %]]([% q.lxref(name = 'installation') %]) unless you haven't done so already.  Open a second terminal window:

```shell
$ cd /path/to/qgoda-quickstart
qgoda-quickstart $ yarn init --yes
yarn init v1.3.2
warning The yes flag has been set. This will automatically answer yes to all questions which may have security implications.
success Saved package.json
✨  Done in 0.03s.
qgoda-quickstart $
```

Alternatively you can use the command is `npm init --yes`.

The file `P:package.json` contains some basic information about your project.  Have a look inside if you want to.

### Installing Browsersync

Browsersync is a small but powerful web server written in Javascript, perfectly suited for us:

```shell
$ yarn add browser-sync
yarn add v1.3.2
info No lockfile found.
[1/4] 🔍  Resolving packages...
...
```

That may take a minute untill the server and all of its dependencies have been installed.

But something else has happened.  Qgoda is throwing error messages in the console because a directory `P:node_modules` was created.  That is where `yarn` or `npm` save local dependencies of your web project. 

You have to tell qgoda to ignore that directory.  Create a file `P:_config.yaml` like this:

```yaml
helpers:
  server: yarn run server
exclude:
  - /node_modules
  - /package.json
  - /package-json.lock
  - /yarn.lock
```

Now add `P:package.json`.  You have to configure the command `server`:

```json
{
  "scripts": {
    "server": "browser-sync start --server _site --files _timestamp"
  },
  "name": "qgoda-quickstart",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "browser-sync": "^2.18.13"
  }
}
```

The key `scripts` is new.  If you have used `npm`, there is already a `scripts` section.  Delete it or overwrite it.

Google for `yarn`, `npm`, `browsersync`, `nodejs`, ... if anything of the above is unclear to you.

### Start the Web Server

Stop qgoda in the other terminal window with `CTRL-C` or close the terminal window, and restart it.  You will see that the message about the missing configuration file has vanished.

And then the magic happens:

<figure class="figure w-100">
  <img src="/images/qgoda-in-15-minutes/browsersync.png"
       alt="Browsersync has opened a browser window">
  <figcaption class="figure-caption text-xs-center">
    Browsersync has started a web server listening on port 3000
    and displays the start page
  </figcaption>
</figure>



## A Recipe Blog

Let's add some more documents.  Create a file `cherry-tart.md` next to `index.md`:

### Writing Blog Posts and Other Documents

```yaml
---
title: Cherry Tart
name: cherry-tart
type: recipe
---
## Ingredients

* 1 cherry
* 1 tart

## Preparation

Put the cherry on the tart.  Serve fresh!
```

And one more `hard-boiled-egg.md`:

```yaml
---
title: Hard Boiled Egg
name: hard-boiled egg
type: recipe
---
## Ingredients

* 1 egg size M
* 1 l water

## Preparation

1. Put the egg in the water.
2. Bring the water to boil.
3. Turn off the heat and wait 12 minutes.
```

By the way, that really works.

Writing the recipe for a cucumber sandwich is left as an exercise to the reader.

Take a look into the output directory `P:_site`.  Qgoda has created the files `_site/cherry-tart/index.html` and `_site/hard-boild-egg/index.html` and maybe `_site/cucumber-sandwich/index.html`.

As you can see, it now also guesses the name of the output file correctly.

### Listings

You know that the new documents are there.  But how can you see them in the browser? You have to create links to them from the start page.

This is the most complicated part, as it involves  a little programming with the Template Toolkit.  Edit the file `index.md` until it reads like this:

```html
---
title: My Blog
location: /index.html
---
This is my first blog created with Qgoda.

## Blog Posts

[% USE q = Qgoda %]
<ul>
[% FOREACH post IN q.list(type = 'recipe').nsortBy('date') %]
  <li>
    <h3>[% post.title %]</h3>
    <p>[% post.excerpt %]</p>
    <p>
      <a href="[% post.permalink %]">Read more</a>
    </p>
  </li>
[% END %]
</ul>
```

The first line asking for explanation is `[% USE q = Qgoda %]`.  The <a href="http://www.template-toolkit.org/docs/manual/Directives.html#section_USE"><code>USE</code></a> keyword loads a plug-in for the Template Toolkit, in this case the Qgoda plug-in that ships with Qgoda.  This plug-in lets you access all Qgoda features from within your templates and documents.  By convention, you alias the plug-in with the letter `q`.

The <a href="http://www.template-toolkit.org/docs/manual/Directives.html#section_FOREACH"><code>FOREACH</code></a> keyword iterates over lists.  The list used here is produced by the plug-in method `q.list()` which --- when called without arguments --- gives you all documents that Qgoda knows about.

[@ WRAPPER components/infobox.html
             type = 'warning' 
             title = "Template Code Is Case-Sensitive!" @]
You have to write "FOREACH" and "IN" and not "foreach" or "in".  You will seldom mis-spell "FOREACH" but writing "in" instead of "IN" is a common mistake that is hard to spot.  Whenever a listing is empty without obvious reason, check your spelling!
[@ END @]

But we want just recipe documents.  Remember that the recipes contained a line `type: recipe` in the YAML front matter? We filter by that property so that only recipes appear in the list.

Check the result in the browser.  Your recipes should now appear on the start page, sorted by last modification date.

By the way, you can add more filters to further restrict the list:

```html
[% q.list(type = 'recipe' lingua = asset.lingua) %]
```

This would now only list documents that have a property `V:lingua` with the same value as the current page's `V:lingua`.  The property lingua is used by convention for the language code of a document.  Right now, that would lead to an empty list, because we didn't use the property `V:lingua`.

### Links

Sometimes, you want to link to a particular document.  Imagine, you want to recommend a cherry tart as a dessert to the hard-boiled egg.  You can, of course do this in `hard-boiled-egg.md`:

```html
---
title: Hard Boiled Egg
name: hard-boiled egg
type: recipe
---
## Ingredients

* 1 egg size M
* 1 l water

## Preparation

1. Put the egg in the water.
2. Bring the water to boil.
3. Turn off the heat and wait 12 minutes.

Recommendation for dessert: [Cherry Tart](/cherry-tart/).
```

The syntax `[LABEL](href)` is used for links in Markdown.  Hard-coding links like this works perfectly, and if you like to keep it simple, just stick with it.

The disadvantage is that the link will be broken, if you decide to rename the cherry tart recipe, for example from `cherry-tart.md` to `cherry-on-the-tart.md`.  You can prevent that by using "symbolic" links.  By convention, you use the property `V:name` to identify a document independently of its concrete location.  Since we had given the `V:name` `cherry-tart` to the cherry tart recipe, you can write:

```html
[% USE q = Qgoda %]
Recommendation for dessert:
[Cherry Tart]([% q.link(name = 'cherry-tart') %])
```

That produces the same link as before but the link will now stay intact if you decide to relocate the cherry tart recipe.

[@ WRAPPER components/infobox.html
             type = 'info' title = "USE Qgoda" @]
The line "[% USE q = Qgoda %]" is only needed once per document.  But if you forget it, the Template Toolkit will silently fail and just return empty strings for all calls to plug-in methods.
[@ END @]

A link is just a special case of a cross-reference, and just like you can refer to another document's `V:permalink` property, you can also retrieve its title, making the link completely immune against changes in the target:

```html
[% USE q = Qgoda %]
Recommendation for dessert:
[[% q.xref('title', name = 'cherry-tart' %]]([% q.link(name = 'cherry-tart') %]).
```

And since this is such a common use case, you can safe some typing with this shortcut version:

```html
[% USE q = Qgoda %]
Recommendation for dessert: [% q.anchor(name = 'cherry-tart') %].
```

## Where To Go From Here

You know almost everything about Qgoda by now.  You combine the simplicity of Markdown with the power of the Template Toolkit and you wire everything together with the Qgoda plug-in for the Template Toolkit.

Explore the rest of the documentation for further details, and check out Qgoda demo themes for advanced functionality.
