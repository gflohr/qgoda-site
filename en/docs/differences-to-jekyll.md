---
title: Differences to Jekyll
name: differences-to-jekyll
section: miscellaneous
view: docs.html
description: This page explains where Qgoda differs from Jekyll and why.
---
[% USE q = Qgoda %]
[% TAGS [- -] %]
Qgoda was heavily inspired by [Jekyll](https://jekyllrb.com/) and initially very similar to Jekyll but over time it has veered away significantly.

<!--QGODA-NO-XGETTEXT--><qgoda-toc /><!--/QGODA-NO-XGETTEXT-->

## General Differences

Qgoda's philosophy significantly differs from Jekyll's.  Creating simple web sites should be just as simple as with Jekyll but it should be possible to also fulfill more complex requirements, preferably out of the box.

### Taxonomies

Jekyll can structure a site with tags and categories.  Qgoda has arbitrary taxonomies and *you* decide what their semantics and usage.

### Listings

Qgoda can create lists with arbitrary filters, not just for categories.  Example:

<!--QGODA-NO-XGETTEXT-->
```tt2
[% posts = q.list(lingua = asset.lingua
                  type = 'post'
                  'tags', ['contains', 'Development']
                 ) %]
```
<!--/QGODA-NO-XGETTEXT-->

See [- q.lanchor(name='listings') -] for more information.

### Links and Cross-References

These work essentially the same as listings, only that you define the filters so that they will produce a single result instead of a list.  For example, the last sentence of the previous paragraph was created like this:

```tt2
See [% q.lanchor(name='listings') %] for more information.
```

The function `q.lanchor()` creates a link to the document with the name "listings", no matter where that document is currently located.  In Jekyll, links always have hard-coded targets.  Using the functions has the advantage that you don't have to update refering documents, when the target document changes.

### No Web-Server Included

Qgoda does not come with a web server.  Why? Lazy developer?

Kind of.  And, by the way, lazy developers are good developers.

Qgoda is a tool for generating static web sites and it follows the Unix concept of DOTADIW, or "Do One Thing and Do It Well".  Web development nowadays is done using a tool-chain based on [Node.js](https://nodejs.org/) and the Node.js ecosystems has no shortage of development web servers like [http-server](https://www.npmjs.com/package/http-server), [Browsersync](https://www.browsersync.io/), [webpack-dev-server](https://github.com/webpack/webpack-dev-server), and so on.  All of them are very easy to integrate in a Qgoda development site.

And to be honest, the current web servers written in Perl, Python, or Ruby all look pretty lame compared to their brethren for Node.js.

### Sass? Helpers!

Jekyll has a built-in <q-term>sass:Sass</q-term> compiler built on the Ruby Sass implementation.

But modern web development is a lot more than pre-processing CSS.  First of all chances are that you also want to use JavaScript, do you? And maybe you don't want to use Sass but [Less](http://lesscss.org/) or you even opt for [PostCSS](http://postcss.org/) only.

All these assets should be syntax-checked, minified, optimized and bundled and, again, the Node.js eco system has the best tools for the job, first [Grunt](https://gruntjs.com/), then [Gulp](https://gulpjs.com/), today [Webpack](https://webpack.js.org/), and who knows what tool will be leader of the pack in three weeks?

Qgoda allows you to configure an arbitrary number of helper processes while watching your site for changes.  You typically have one of the build tools like webpack running in watch mode as one helper, and a development web server as a second.  And you have the choice.  You decide whether you want gulp or webpack, yarn or npm, or just plain Makefiles.

### Multi-Language Sites

Jekyll does not have built-in support for multilingual web sites.  Qgoda also has no explicit support for multi-lingual web sites.  It just works out of the box.

All you have to do is to store the language (resp. language code) of a particular document or asset in a standard variable.  If you follow convention and use `V:lingua`, you can safe some typing, but you can store the language in any variable you want, and filter by that variable.  That's all.

Under normal circumstances, not only regular content differs between languages.  You also want to translate certain strings in your template.  The quick and dirty way is to store translations in your configuration file `P:_config.yaml`:

<!--QGODA-NO-XGETTEXT-->
```yaml
translations:
  en:
    privacy: Data Privacy
    go_to_top: To top of the page
  de:
    privacy: Datenschutz
    go_to_top: Zum Seitenanfang
  bg:
    privacy: Конфиденция
    go_to_top: На горе
```
<!--/QGODA-NO-XGETTEXT-->

In the template you write:

<!--QGODA-NO-XGETTEXT-->
```tt2
[% l = asset.lingua %]

<a href="./privacy/">[% config.translations.$l.privacy %]</a>
|
<a href="#top">[% config.translations.$l.go_to_top %]</a>
```
<!--/QGODA-NO-XGETTEXT-->

This is okay for a handful of strings but a maintainance nightmare for larger sites.  You should rather write all strings in the base language of your site and mark them:

<!--QGODA-NO-XGETTEXT-->
```tt2
[% USE gtx = Gettext('your-site-id', asset.lingua) %]

<a href="./private/">[% gtx.gettext('Privacy Policy') %]</a>
|
<a href="#top">[% Go to top %]</a>
```
<!--/QGODA-NO-XGETTEXT-->

You can extract these strings into `.po` files for translations, and install the compiled translations in the site.  This is following the standard process for [GNU gettext](https://www.gnu.org/software/gettext/), the de-facto standard for localization of open-source software.

### Default Ignores

In Qgoda, a file `_logs/access.log` is ignored, in Jekyll it would be processed.
The default ignore rule in Qgoda is "ignore all top-level files and directories
the names of which start with an underscore". Rationale: Qgoda's default makes a whole lot of sense.

### Rebuild Triggers

Qgoda will accumulate all rebuild triggers during a rebuild.  All changes
made while Qgoda is rebuilding a site will result in a single rebuild attempt
after the changes.  Jekyll will remember, whenever a modification is recorded
after the grace period, and create a snapshot, whenever you hit `CTRL-S`.
This is <del>almost</del> never what you want or need.  Contrary to Jekyll,
Qgoda will also honor `CTRL-C` while it is busy ignoring your wishes.

## Template System

Qgoda uses [The Template Toolkit](http://www.template-toolkit.org/) as its primary templating system, Jekyll uses [Liquid](https://shopify.github.io/liquid/).

### Syntax

Liquid uses double curly braces for *objects* (`{{ variable }}`) and curly braces and percent signs for *tags* (`{% if logged_in %} `).

The Template Toolkit uses only `[% ... %]`.  *Directives* (comparable to Liquid tags) are using upper case letters (`[% IF logged_in %]`).

### Data Types

Liquid only allows one level of nesting variables.  You cannot do something like `{{ user.address.street }}`.  Variables for the Template Toolkit can be nested to arbitrary depth.  They can also reference Perl objects.

### Code in Templates

Since Template Toolkit variables can also hold Perl objects it is possible to call methods on them.  Qgoda makes heavy use of this feature and a lot of things that are impossible in Jekyll are trivial in Qgoda for exactly that reason.

## Configuration

The default name of the qgoda configuration file is `P:_config.yaml`, not `_config.yml` as for Jekyll.  That can make a possible migration from Jekyll to Qgoda  a little bit easier.

### Default Values

Default values in Qgoda are configured via flat lists of pattern (as opposed to nested data structures in Jekyll). Example:

<!--QGODA-NO-XGETTEXT-->
```yaml
defaults:
  - files: /posts
    values:
      type: post
  - files: /posts/en
    values:
      lingua: en
  - files: /posts/de
    values:
      lingua: de
  - files: /images/**/*.png
    values:
      view: raw
```
<!--/QGODA-NO-XGETTEXT-->
