---
title: Configuration 
name: multilanguage-configuration
section: multilanguage
view: docs.html
description: All configuration variables required for a fully internationalized site.
---
Internationalization (i18n) in Qgoda has to be explicitely activated in the
configuration file `P:_config.yaml`. Although there are many options
available to customize your multilingual setup, you can get started with
setting just two configuration variables `C:linguas` and `C:po.textdomain`.

<!--qgoda-no-xgettext-->
<qgoda-toc/>
[% USE q = Qgoda %]
[% TAGS [@ @] %]
<!--/qgoda-no-xgettext-->

## Global Configuration

A typical multilanguage configuration in `P:_config.yaml` looks like this:

<!--qgoda-no-xgettext-->
```yaml;line-numbers
linguas: [en-us, bg, de]
po:
  textdomain: net.qgoda.www
  msgid-bugs-address: Guido Flohr <guido.flohr@cantanea.com>
  copyright-holder: cantanea EOOD <http://www.cantanea.com/>
  reload: 1
```
<!--/qgoda-no-xgettext-->

<!--qgoda-no-xgettext-->
### `linguas`
<!--/qgoda-no-xgettext-->

This is a list of language identifiers complying to [RFC4647 section 2.1](https://tools.ietf.org/html/rfc4647#section-2.1) but without any asterisk (`*`) characters. An asterisk would not make sense here anyway.

The first language is the default language of your site.

The variable is mandatory!

<!--qgoda-no-xgettext-->
### `po.textdomain`
<!--/qgoda-no-xgettext-->

An arbitrary identifier for your website. The only restriction is that it has to be a valid filename for your operating system. Popular choices are the reverse hostname of your site (like `net.qgoda.www`) or just a simple string like `messages`. It really doesn't matter much.

This variable is also mandatory.

<!--qgoda-no-xgettext-->
### `po.msgid-bugs-address`
<!--/qgoda-no-xgettext-->

An address where translators should report problems with the original text to translate. The variable is optional.

<!--qgoda-no-xgettext-->
### `po.copyright-holder`
<!--/qgoda-no-xgettext-->

The copyright holder of the original content. The variable is optional.

<!--qgoda-no-xgettext-->
### `po.reload`
<!--/qgoda-no-xgettext-->

Set to 1 if you want translations to be visible without a restart of Qgoda after they have been compiled into `.mo` files and installed.

Normally translations are loaded only, when Qgoda starts and then cached. Setting `C:po.reload` to 1 results in a little performance penalty but may be useful while you are translating the site.

<!--qgoda-no-xgettext-->
### `po.mdextra`
<!--/qgoda-no-xgettext-->

A list of [file name patterns]([@ q.llink(name='pattern-lists') @]) for additional markdown files. By default, all documents with front matter are potentially considered translatable. If your site has other markdown files that should also be searched, you can list them here.

This variable is optional and rarely used. 

<!--qgoda-no-xgettext-->
### `po.views`
<!--/qgoda-no-xgettext-->

A list of [file name patterns]([@ q.llink(name='pattern-lists') @]) for template files to search for translatable strings. It defaults to just `P:_views` or whatever the configuration variable `C:paths.views` points to.

<!--qgoda-no-xgettext-->
### `po.xgettext-tt2`
<!--/qgoda-no-xgettext-->

The location of the `xgettext-tt2` program if it is not in `$PATH`. The `xgettext-tt2` program ships with [Template-Plugin-Gettext](https://github.com/template-plugin-gettext) which is automatically installed as a Qgoda dependency.

<!--qgoda-no-xgettext-->
### `po.xgettext`
<!--/qgoda-no-xgettext-->

The location of the `xgettext` program if it is not in `$PATH`. The `xgettext` program is normally installed as part of a software package called `gettext` or `gettext-tools`.

<!--qgoda-no-xgettext-->
### `po.msgfmt`
<!--/qgoda-no-xgettext-->

The location of the `msgmerge` program if it is not in `$PATH`. The `msgmerge` program is normally installed as part of a software package called `gettext` or `gettext-tools`.

<!--qgoda-no-xgettext-->
### `po.msgmerge`
<!--/qgoda-no-xgettext-->

The location of the `msgmerge` program if it is not in `$PATH`. The `msgmerge` program is normally installed as part of a software package called `gettext` or `gettext-tools`.

<!--qgoda-no-xgettext-->
### `po.qgoda`
<!--/qgoda-no-xgettext-->

The location of the `qgoda` program if it is not in `$PATH`.

## Configuring the Document Language

Qgoda has to know which language a particular document is written in. This means in practice that you have to set the `V:asset.lingua` to an appropriate value, that is a language identifier complying to [RFC4647 section 2.1](https://tools.ietf.org/html/rfc4647#section-2.1) but without any asterisk (`*`) characters.

You have several options to set `V:asset.lingua`:

### Per Document

You can set the language in the document front matter:

<!--qgoda-no-xgettext-->
```yaml;line-numbers
---
title: Kalevala
lingua: fi
name: kalevala
---
```
<!--/qgoda-no-xgettext-->

### Per Directory/Pattern

You can save typing by specifying [defaults]([@ q.llink(name='defaults') @]) for `V:asset.lingua` in the global configuration file `P:_config.yaml`:

<!--qgoda-no-xgettext-->
```yaml;line-numbers
defaults:
  - files: 
      - /en
      - *.en.md
    values:
      lingua: en
```
<!--/qgoda-no-xgettext-->

This would set `V:asset.lingua` to `en` for all files in the top-level directory `/en` and addtionally for all files that have names ending in `.en.md`. See [@ q.lanchor(name='defaults') @] and [@ q.lanchor(name='pattern-lists') @] for more information.

## Language-Independent Identifier `asset.name`

All language variants of the same content should share a common property that acts as a link between them. Although you are free to use any variable name you like, `V:asset.name` is used throughout this documentation.

For obvious reasons, this identifier will always be configured in the document front matter.

Take for example a markdown file `special-relativity.md`:

<!--qgoda-no-xgettext-->
```yaml;line-numbers
---
title: Special Relativity
lingua: en
name: special-relativity
...
```
<!--/qgoda-no-xgettext-->

If the German translation of that file is `spezielle-relativitaetstheorie.md`, that translation's front matter will look like this:

<!--qgoda-no-xgettext-->
```yaml;line-numbers
---
title: Spezielle Relativitätstheorie
lingua: de
name: special-relativity
...
```
<!--/qgoda-no-xgettext-->

Both documents are alternate versions of the same content. They differ in the property `V:asset.lingua` but they share a common  value for the  `V:asset.name` property.

Now it is trivial to link from the English version of that document to the German version:

<!--qgoda-no-xgettext-->
```tt2
<a href="[% q.link(name=asset.name lingua='fr') %]>German version</a>
```
<!--/qgoda-no-xgettext-->

And you can link from other documents to the document about Einstein's special relativity regardless of the language like this:

<!--qgoda-no-xgettext-->
```tt2
See [% q.anchor(name='special-relativity' lingua=asset.lingua) %]!
```
<!--/qgoda-no-xgettext-->

And since you almost always want to link to documents in the same language as the current one, there is a shortcut version for the above:

<!--qgoda-no-xgettext-->
```tt2
See [% q.lanchor(name='special-relativity') %]!
```
<!--/qgoda-no-xgettext-->

By using `M:q.lanchor()` instead of `M:q.anchor()` you can omit the `lingua` parameter as it is implied. See [@ q.lanchor(name='referencing-languages') @] for more information about this.

## File and Directory Structure

There are many different conventions for the directory structure and the file names on internationalized sites:

* You can use per-language top-level directories like `/en`, `/de`, `/fr` and
  so on. This is a simple and robust approach.
* Especially, when you are doing [content negotiation](#content-negotiation) with the [apache](http://httpd.apache.org/), web server you may consider encoding the language into the filename.  You would then not name your documents `index.html` but for example `index.html.en` or even `index.en.html`.
* You can also make do with encoding the language into the filename or directory of the output document. Qgoda will assist you with this approach by issuing a warning if one document overwrites another.

## The Home Page

In a multilingual site, every document can be available in one or more languages. Unfortunately, there is only one `/index.html` and therefore the sites home page or start page can exist in only one language.

One way to solve this problem is to use your site's default language for `/index.html`.  But there are smarter options:

You can use JavaScript to determine the user's preferred language and redirect them:

<!--qgoda-no-xgettext-->
```tt2;line-numbers
---
location: index.html
view: raw
---
<!DOCTYPE html>
<html>
  <head>
    <title>Qgoda Static Site Generator</title>
  </head>
  <body>
<script>
    var lingua,
        default_lingua = '[% config.linguas.0 %]',
        supported = {};
    [% FOREACH lingua IN config.linguas %]
        supported['[% lingua %]'] = true;
    [% END %]

    for (i = 0;  
         navigator.languages != null && i < navigator.languages.length; 
         ++i) {
        var lang = navigator.languages[i].substr(0, 2);
        if (supported[lang]) {
            lingua = lang;
        }
    }

    if (lingua == null) {
        lingua = navigator.language || navigator.userLanguage;
        if (lingua != null) {
            lingua = lingua.substr(0, 2);
        }
    }

    if (!supported[lingua])
        lingua = default_lingua;

    // This is based on the assumption that the start URI for language 'xy'
    // is '/xy'. Change that to your needs!
    document.location.href = '/' + lingua + '/';
    </script>
    <noscript>
<p>Please select your preferred language:</p>
<ul>
[% FOREACH lingua IN config.linguas %]
  <li><a href="/[% lingua %]/">[% lingua %]</a></li>
[% END %]
</ul>
    </noscript>
  </body>
</html>
```
<!--/qgoda-no-xgettext-->

The above code assumes that you have top-level per-language directories like `/en/`, `/fr/`, and so on. If you choose a different directory layout, you have to change the link targets in lines 40 and 46 accordingly.

The best solution is to let the server redirect the user to their preferred language. Read on about content negotiation below.

## Content Negotiation

Content negotiation happens when a web server ([nginx](http://www.nginx.com/), [apache](http://httpd.apache.org/), ...) selects the appropriate language version of a piece of content based on the visitor's preference laid forth in their browser language preferences.  See [Simple Content Negotiation for Nginx](http://www.guido-flohr.net/simple-content-negotiation-for-nginx/) for all the gory details of that. Contrary to what the name of the article suggests, it will shed sufficient light on the topic also for users of other web servers than nginx.

Content negotiation can be made arbitrarily complicated. In practice there is one single valid strategy: A visitor of your start page `http://YOURDOMAIN` should be redirected to the start page in their preferred language and from that moment on they should be pinpointed to that language until they change it. That means that you have to implement content negotiation only for the start page which simplifies things a lot. This is because there is only room for one `/index.html` and the best strategy is to make that just an entry point that brings you to the content in your preferred language.

Server-side solutions are described at the above mentioned blog post [Simple Content Negotiation for Nginx](http://www.guido-flohr.net/simple-content-negotiation-for-nginx/) but as a fallback and short of better ideas feel free to steal the start page for this site from https://github.com/gflohr/qgoda-site/blob/main/index.html.
