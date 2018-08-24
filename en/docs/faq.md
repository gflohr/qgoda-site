---
title: Frequently Asked Questions
name: faq
section: lists-and-indices
view: docs.html
description: Caveats and pitfalls that often occur and not always have an immediate explanation
---
<qgoda-toc/>
[% TAGS [@ @] %]

## Technical Problems

### Why does `Template::Plugin::Gettext` not work?

See the next question and answer ...

### Why does `Template::Plugin::Qgoda` not work?

Sometimes, the plug-in does not seem to work and produces no output at all. But most probably you forgot to load the plug-in. Did you include the following?

```tt2
[% USE q = Qgoda %]
...
See [% q.lanchor(name="faq") %p] for more information!
```

If you forget to `USE` the plug-in, Template Toolkit will silently ignore the directive.  The same problem can occur with translations, when you forgot to `USE Gettext`.

Watch https://github.com/gflohr/qgoda/issues/42 for a possible progress on the issue.

### Why do I see HTML source code in the output?

Markdown allows HTML inside source code. But Markdown also has the feature that text indented with four space characters or more is 

Watch https://github.com/gflohr/qgoda/issues/43 for possible progress on the issue.

### Why do I see the original markdown in the output?

Look into the console window where Qgoda is running. You probaly have a syntax error in your template.

## General Questions

### How is Qgoda pronounced?

It is pronounced "yagoda" with the stress on the first syllable. 

### What does Qgoda mean?

It means strawberry or sometimes just berry in almost every Slavic language.

### How is Qgoda spelled in cyrillic script?

Ягода.