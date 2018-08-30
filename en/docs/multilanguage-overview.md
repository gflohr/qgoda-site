---
title: Overview
name: multilanguage-overview
section: multilanguage
view: docs.html
description: Overview of Qgoda's Multilanguage and Internationalization (I18N) features
---
[% USE q = Qgoda %]
[% TAGS [@ @] %]
Multi-lingualism in Qgoda is an integral, built-in feature mostly built upon easy to follow conventions.

In a typical website there are two types of translatable content.  You usually have common texts, typically in headers, footers, navigations, sidebars and so on.  Most of the time, these texts come from templates.  And then there is your actual content, your blog posts, articles or other editorial content.

<qgoda-toc/>

## Configuration

Before you start internationalizing your site, read which [configuration]([@ q.llink(name = 'multilanguage-configuration') @]) is necessary.

## Template Texts

Common texts in templates are translated with [Template::Plugin::Gettext](https://github.com/gflohr/Template-Plugin-Gettext) an internationalization plug-in for the [Template Toolkit](http://www.template-toolkit.org/).

Take the following template snippet as an example:

```tt2
<h1>Welcome to My Site</h1>
```

For an internationalized site you would write instead:

```tt2
<h1>[% gtx.gettext('Welcome to My Site') %]</h1>
```

The English text is simply turned into an argument to a function.  That function returns the translation, when the document is rendered, and it also serves as a marker for translatable strings, so that you can extract them into a `.po` file, a standard format for translations.

See [@ q.lanchor(name = 'translating-templates') @] for more information!

## Editorial Content

For content, you have two options which both have their pros and cons.

### The Simple Approach

You can simply copy the documents from the main language into a separate file and translate it. This is a simple approach and usually sufficient, when the document in question rarely changes. A blog post, a news article or similar documents are usually written just once and then never touched again.

See [@ q.lanchor(name = 'language-copies') @] for information about this approach.

### Advanced Translation Using PO Files

Other documents are expected to change frequently. One example is documentation, like the one that you are reading. If you are translating such documents as a whole, no matter whether it is markdown, HTML, Microsoft Word or just plain text, a translator always has to find the differences in the original document and modify the translation accordingly.  This is a tedious and therefore expensive task.

A much better approach in these cases is to split a document into more manageable smaller chunks. Modern translation frameworks like [GNU Gettext](https://www.gnu.org/software/gettext/) - the system that internationalization with Qgoda is built upon - aids even more in translation by marking the differences to older versions and even allowing machine translations at least as a starting point.

See [@ q.lanchor(name = 'po-translations') @] for more in-depth information about this !

## Referencing Documents in Specific Languages

For listings, you usually want to display documents in one language. You also often want to link to another document in a particular language, most of the time the current one. All this is very easy to achieve with Qgoda, see [@ q.lanchor(name = 'referencing-other-languages') @].

## Translation Workflow

Once your site is internationalized you have to get the content translated and to install the translation. The first, initial shot at this is usually simple, also with other systems. But maintaining the site, updating translations after content has changed, adding more languages are tasks that separate the men from the boys. 

Qgoda also offers you the possibility to extract the translatable content from the master document into a `.po` file.  Instead of a complete, translated copy of the original document, you just create a minimal *trigger document*:

```yaml
---
master: /en/about.md
translate: [title, description]
lingua: de
author: John Doe
---
```

The variable `V:master` references the master document, the document containing the original content.

With `V:translate` you specify which properties from the master front matter should be extracted into the catalog for translation.  You will normally set the variable `V:translate` once and for all documents as a default in `P:_config.yaml`.

The variable `V:lingua` is by convention used for identifying the language of a document.  You can pick another name if you prefer but that will end in a little bit more typing.

All other variables are copied from the master front matter into the translated document.  If it contains for example a property `V:name`, this property will be copied into the translation unless the front matter of the trigger document overrides it (for example as shown above with `V:author`).

The content of the master document is not copied but gets split up into paragraphs, and each paragraph becomes an entry in the `.po` file:

```bash
#: ../en/docs/multi-language-overview.md:11
msgid "Multi-lingualism in Qgoda is an integral, built-in feature mostly built upon easy to follow conventions."
msgstr ""
```

Provided, the entries have been translated, the translated content gets rendered.

That sounds more complicated than the first approach.  So why the hassle?

First of all, it sounds a lot more complicated than it actually is in reality.  And the big advantage is maintainability.  When translating entire documents, every change to the original document requires a new translation, not from scratch but translators have to find out what exactly has changed in the original.  This is error-prone and cumbersome.

With `.po` files on the other hand individual paragraphs are handled as an individually translated unit which greatly simplifies the update process.  And besides, you have a lot of tools at hand, like translation caches, automatic or semi-automatic translations and so on.

Still, it depends on the nature of the site which approach is better.  For a blog where posts are written once and rarely changed afterwards, the simple approach will often be sufficient.  But for software documentation that gets updated on a regular basis and requires exact translations, an approach based on professional translation tools probably pays out soon.

## Listings and Links

The rest is a piece of cake.  Creating a listing of posts for the tag "JavaScript" looks like this for a single-language site:

```tt2
[% FOREACH post IN q.list('tags', ['contains', 'JavaScript']) %]
<a href="[% post.permalink %]">[% post.title | html %]</a>
[% END %]
```

A multi-language site requires just one more filter:

```tt2
[% FOREACH post IN q.list('lingua' = asset.lingua
                          'tags', ['contains', 'JavaScript']) %]
<a href="[% post.permalink %]">[% post.title | html %]</a>
[% END %]
```

And since this is such a common task, you can just use the method `q.llist` (think "language list") instead that adds that filter automatically:

```tt2
[% FOREACH post IN q.llist('tags', ['contains', 'JavaScript']) %]
<a href="[% post.permalink %]">[% post.title | html %]</a>
[% END %]
```

So in the end, a multi-language site requires just a single letter more of template code.

Likewise, for links resp. cross-references you add the additional filter for the language or just use `q.lxref()` instead of `q.xref()` and you are done.
