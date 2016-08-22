---
title: Mode Of Operation
name: mode-of-operation
doc-section: Introduction
order: 10
view: docs.html
description: Qgoda basically copies files for deployment, optionally cooking the content with processor plug-ins.
---
Qgoda's general mode of operation is very similar to other static site 
generators for example Jekyll or Hugo.  It recursively copies all files
it finds from the source directory (configuration variable `srcdir`) into
the destination directory `_site`(configuration variable `outdir`).  The
destination directory is usually the document root of a web server.  Files 
enhanced by additional meta information found in front matter are piped through
configurable chains of processor plug-ins.

## Asset Selection

Files to be copied are selected using a simple naming convention.  All files
or directories starting with an underscore (`_site`, `_include`, `_views`,
...) are ignored, everything else gets copied.  You can modify this with
the configuration variables `exclude` and `include`.

## What are Assets?

All files selected for copying are called <em>assets</em> in Qgoda.  Files
enriched with additional meta information in the document front matter are
conventionally called <em>cooked content</em>, <em>cooked assets</em> or
simply <em>documents</em>.  Unqualified content is called <em>raw</em>.

## Path Translation

[% USE q = Qgoda %]

Cooked assets are subject to [path translation]([% 
q.link(['name', 'output-location']) %]).  One reason is that input files
typically have a different file format than the resulting output files,
they are - for example - compiled from `.md`
<a href="https://daringfireball.net/projects/markdown/">Markdown</a> files
into `.html` files.  Another reason is link modelling.  Many people
prefer a link like `/news/new-version-released/` over
`/news/new-version-released.html`.

## Default Processor Chain

By default, documents are first processed by the Markdown plug-in and
then expanded with the Template Toolkit.  The resulting output is
then wrapped into a layout template, normally also processed with the
Template Toolkit.  You normally do not have to wrack your brains about
the exact order of things.  Most of the time, it is enough to assume that
you can freely mix Markdown with Template Toolkit syntax.
