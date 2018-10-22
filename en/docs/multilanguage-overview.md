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

## Template Texts

Common texts in templates are translated with [Template::Plugin::Gettext](https://github.com/gflohr/Template-Plugin-Gettext) an internationalization plug-in for the [Template Toolkit](http://www.template-toolkit.org/).

Take the following template snippet as an example:

<qgoda-no-xgettext>
```html
<h1>Welcome to My Site</h1>
```
</qgoda-no-xgettext>

For an internationalized site you would write instead:

<qgoda-no-xgettext>
```tt2
<h1>[% gtx.gettext('Welcome to My Site') %]</h1>
```
</qgoda-no-xgettext>

The English text is simply turned into an argument to a function.  That function returns the translation, when the document is rendered, and it also serves as a marker for translatable strings, so that you can extract them into a `.po` file, a standard format for translations.

## Editorial Content

For content, you have two options which both have their pros and cons.

### The Simple Approach

You can simply copy the documents from the main language into a separate file and translate it. This is a simple approach and usually sufficient, when the document in question rarely changes. A blog post, a news article or similar documents are usually written just once and then never touched again.

### Advanced Translation Using PO Files

Other documents are expected to change frequently. One example is documentation, like the one that you are reading. If you are translating such documents as a whole, no matter whether it is markdown, HTML, Microsoft Word or just plain text, a translator always has to find the differences in the original document and modify the translation accordingly.  This is a tedious and therefore expensive task.

A much better approach in these cases is to split a document into more manageable smaller chunks. Modern translation frameworks like [GNU Gettext](https://www.gnu.org/software/gettext/) - the system that internationalization with Qgoda is built upon - aids even more in translation by marking the differences to older versions and even allowing machine translations at least as a starting point.

## Referencing Documents in Specific Languages

For listings, you usually want to display documents in one language. You also often want to link to another document in a particular language, most of the time the current one.

Qgoda allows you to identify a document by arbitrary properties including the language of the document. The details will be explained later in the chapter [@ q.lanchor(name = 'referencing-languages') @].

## Translation Workflow

Once your site is internationalized you have to get the content translated and to install the translation. The first, initial shot at this is usually simple, also with other systems. But maintaining the site, updating translations after content has changed, adding more languages are tasks that separate the men from the boys.

The translation workflow for Qgoda is a standard GNU gettext workflow, in other words, the same workflow that is used to internationalize the vast majority of open source software.

## Getting Started

The next chapters will guide you through the necessary steps to make your Qgoda site multilanguage. Start with the chapter [@ q.lanchor(name='multilanguage-configuration') @].