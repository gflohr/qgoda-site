---
title: Listings and Links
name: listings
section: basics
order: 30
view: docs.html
description: Qgoda generates listings based on taxonomies.
---
Link lists are crucial for the navigation on most web sites.  Qgoda 
generates listings based on taxonomies.  Taxonomies partition your
site into groups of documents which share common properties.  Link
lists are such groups.

## Template Code

Listings are created by the template functions `list()` or `listPosts()`.

[% WRAPPER components/infobox.html
           type="info" title="These Instructions Are For the Template Toolkit!" %]
    The instructions given here assume that you use the template toolkit as
    the main template processor.  If you are using another template processor,
    please refer to the respective documentation.
[% END %]

[% TAGS [- -] %]
```markup
[% USE q = Qgoda %]
[% FOREACH post IN q.llistPosts %]
  <a href="[% post.permalink %]">
    <div class="blog-post">
      <h3>[% post.title %]</h3>
      <h4>[% post.date %] - [% post.author %]</h4>
      <p>[% post.excerption %]</p>
    </div>
  </a>
[% END %]
```
[- TAGS [% %] -]

[% WRAPPER components/infobox.html
     title="Difference to Jekyll"
     type="warning" %]
Lists in Jekyll are pre-computed and pre-sorted by date and available as 
template variables.  Qgoda uses template functions instead, and these
functions return unsorted lists.
[% END %]
