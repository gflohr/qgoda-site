---
title: Language Copies
name: language-copies 
section: multilanguage
view: docs.html
description: Documents that are typically written once and then never touched again can simply be copied and translated as a whole.
---
This is a simple approach that fits best for blog posts or other non-volatile content.

[% USE q = Qgoda %]
[% TAGS [@ @] %]
<qgoda-toc/>

## How?

It's as easy as copying the markdown file, and then translate it. As such, there is really nothing special to say about it.

## Alternative Approach

Alternatively, you can let Qgoda split the content of a document into smaller parts and extract them into a PO file, so that they can be translated separately. Check out [@ q.lanchor(name = 'po-translations') @] if you are not sure whether your content will have to be frequently modified later.

[@ WRAPPER components/infobox.html
           title="Switching to PO-Based Translations" @]
<p>
Just copying a markdown file and getting it translated is simple in the begin but can turn into a maintainance nightmare if you have to change the original later. In this case translators will have to figure out what has changed and update translations accordingly.
</p><p>
Unfortunately, there is no way how you can easily change plans, once you have done the translation. 
</p>
[@ END @]
