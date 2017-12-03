---
title: Taxonomies
name: taxonomies
order: 20
doc-section: Documentation
view: docs.html
description: Taxonomies partition your site according to arbitrary aspects.
---
Taxonomies group assets into groups sharing common properties.  Qgoda supports
an arbitrary number of taxonomies.  Every asset property can be promoted to a 
taxonomy.

The concept of taxonomies is best understood by a typical example.  Consider
a document with the following front matter:

```yaml
---
title: Qgoda Pygments Plug-In
lingua: en
tags:
  - Syntax Highlighting
  - Plug-Ins
  - Python 
  - Qgoda
categories: Development
---
```

Three default taxonomies are used here, `lingua`, `tags`, and `categories`.
By convention, taxonomies that are typically single-valued use the singular
(for example `lingua` because a document can be written in only one
language), taxonomies that can have multiple values usually use the
plural form.

Taxonomies allow you to partition or divide your web site into groups of
related documents.  For example, you can identify all English documents
with the condition `lingua="en"`.

<figure class="figure w-100">
  <img src="/images/taxonomies/taxonomy-lingua.svg"
       class="large-image figure-img img-fluid img-rounded d-block m-x-auto"
       alt="All assets/documents with lingua 'en' establish a group of documents." />
  <figcaption class="figure-caption text-xs-center">
    All English documents.
  </figcaption>
</figure>

Likewise, you can identify all documents that are tagged with "Qgoda"
and "Plug-Ins".

<figure class="figure w-100">
  <img src="/images/taxonomies/taxonomy-tags.svg"
       class="large-image figure-img img-fluid img-rounded d-block m-x-auto"
       alt="You can also group all documents tagged with &quot;Qgoda&quot; and &quot;Plug-Ins&quot;." />
  <figcaption class="figure-caption text-xs-center">
    All documents tagged with "Qgoda" or "Plug-Ins". 
  </figcaption>
</figure>

By combining taxonomies you can define arbitrary subsets of a site's documents.
You can for example identify all English documents tagged with "Qgoda" or
"Plug-Ins" by `OR`'-ing the two above conditions.

<figure class="figure w-100">
  <img src="/images/taxonomies/taxonomies-combined.svg"
       class="large-image figure-img img-fluid img-rounded d-block m-x-auto"
       alt="Combining taxonomies can create arbitrary partitions of a site." />
  <figcaption class="figure-caption text-xs-center">
    All English documents tagged with "Qgoda" or "Plug-Ins". 
  </figcaption>
</figure>


