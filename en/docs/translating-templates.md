---
title: Translating Templates
name: translating-templates
section: multilanguage
view: docs.html
description: How to get text inside templates translated
---
Internationalizing Template Toolkit templates is very easy with the help of the module [`Template-Plugin-Gettext`](https://github.com/gflohr/Template-Plugin-Gettext).

<qgoda-toc/>

## Template Texts

Common texts in templates is usually translated with [Template::Plugin::Gettext](https://github.com/gflohr/Template-Plugin-Gettext) an internationalization plug-in for the [Template Toolkit](http://www.template-toolkit.org/).

[% USE q = Qgoda %]
[% TAGS [@ @] %]
```tt2
[% USE gtx = Gettext('com.example.www', asset.lingua) %]
<h1>[% gtx.gettext('Welcome to My Site') %]</h1>
```

The first line imports the plug-in with two arguments.  The first one is the so-called *textdomain*, an arbitrary string identifying your translation database.  The second one is the language of the file.  This is usually stored in the document property `V:lingua`.

The second line serves two purposes.  The function `gtx.gettext()` first marks a string as being translatable, so that the string can be extracted into a `.po` file, a standard format for translation catalogs used by most open-source and many commercial projects.

But it also returns the translation for the string, when the document is rendered.
