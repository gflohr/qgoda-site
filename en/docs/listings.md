---
title: Listings and Links
name: listings
section: basics
view: docs.html
description: Qgoda generates listings based on taxonomies.
---
Link lists are crucial for the navigation on most web sites.  Qgoda 
generates listings based on taxonomies.  Taxonomies partition your
site into groups of documents which share common properties.  Link
lists are such groups.

<qgoda-toc/>

[% WRAPPER components/infobox.html
           type="info" title="These Instructions Are For the Template Toolkit!" %]
    The instructions given here assume that you use the template toolkit as
    the main template processor.  If you are using another template processor,
    please refer to the respective documentation.
[% END %]

## Listings

### Generic Listings With `q.list(FILTERS)`

The most basic form of creating a listing is the template function `M:q.list()`:

<!--qgoda-no-xgettext-->
[% USE q = Qgoda %]
[% TAGS [@ @] %]
```tt2
[% USE q = Qgoda %]
...
[% FOREACH post IN q.list(type='post' lingua='en' date.year='2018') %]
  <a href="[% post.permalink %]">
    <div class="blog-post">
      <h3>[% post.title %]</h3>
      <h4>[% post.date %] - [% post.author %]</h4>
      <p>[% post.excerption %]</p>
    </div>
  </a>
[% END %]
```
<!--qgoda-no-xgettext-->

Without any arguments, the function `M:q.list()` would return all documents
of the site including images, stylesheets and so on. You will normally
pass a set of [filters]([% q.link(name='filters') %]) to restrict the number
of documents found. In the above case, this would be documents of type "post",
language "en" and the year "2018".

### Specialized Listing Functions

Many filters are very common and have their own filter functions to save
you typing:

* `q.listPosts(FILTERS)`: returns only assets of type 'post'.
  Equivalent to `q.list(type='post' FILTERS)`. See `M:q.listPosts()`.
* `q.llist(FILTERS)`: returns only assets that have the same language.
  Equivalent to `q.list(lingua=asset.lingua FILTERS)`. See `M:q.llist()`.
* `q.llistPosts(FILTERS): A combination of the two methods above,
  equivalent to `q.list(type='post' lingua=asset.lingua FILTERS)`. See
  `M:q.llistPosts()`.

### Sort Listings

[@ WRAPPER components/infobox.html
     title="Difference to Jekyll"
     type="warning" @]
Lists in Jekyll are pre-computed and pre-sorted by date and available as 
template variables.  Qgoda uses template functions instead, and these
functions return unsorted lists.
[@ END @]

Since listings in Qgoda are unsorted, you will usually sort the results:

<!--qgoda-no-xgettext-->
```tt2
[% USE q = Qgoda %]
...
[% FOREACH post IN q.list(type='post').nsortBy('date.epoch') %]
  <a href="[% post.permalink %]">
    <div class="blog-post">
      <h3>[% post.title %]</h3>
      <h4>[% post.date %] - [% post.author %]</h4>
      <p>[% post.excerption %]</p>
    </div>
  </a>
[% END %]
```
<!--qgoda-no-xgettext-->

This will (numerically) sort all posts by their <q-term>epoch</q-term> .
Use `M:sortBy()` instead, if you want to sort alphanumerically.

[@ WRAPPER components/infobox.html
     title="Magic Dates"
     type="info" @]
Dates in Qgoda are magic. <code>asset.date</code> converted to a string
is just the <q-term>epoch</q-term> of the date, and therefore the above
call <code>nsortBy('date.epoch')</code> is equivalent to just
<code>nsortBy('date')</code>. But you can also sort by <code>date.year</code>
or <code>date.w3c</code> or similar. See [@ q.lanchor(name='dates') @] for
more information.
[@ END @]

### Manipulate Listings

The [Template Toolkit](http://http://www.template-toolkit.org/) has a lot
more virtual array methods that you can use to manipulate listings, see
http://www.template-toolkit.org/docs/manual/VMethods.html#section_List_Virtual_Methods
for details.

The methods [`reverse()`](http://www.template-toolkit.org/docs/manual/VMethods.html#section_reverse)
and
[`splice()`](http://www.template-toolkit.org/docs/manual/VMethods.html#section_splice)
are particularly interesting:

<!--qgoda-no-xgettext-->
```tt2
[% posts = q.llistPosts.nsortBy('date').reverse.splice(70, 10) %]
```
<!--/qgoda-no-xgettext-->

The variable `posts` will contain all posts of the same language
(`M:q.llistPosts`), numerically sorted by their date, then reversed and
finally *spliced*.  The method call `splice(70, 10)`, returns 10 assets
starting at asset number 70 from the collection.

## Links

Links are very similar to listings. In fact they are just
[filter]([@ q.llink(name='filters') @]) combinations that (should) trigger
exactly one result.

Another important difference is that the linking methods return the
`V:permalink` of the found asset, and not the entire asset.

### Generic Link Function `q.link(FILTERS)`

The method `M:q.link()` is to links what `M:q.list()` is to filters:

<!--qgoda-no-xgettext-->
```tt2
[% USE q = Qgoda %]
...
Go to homepage [% q.link(name='home' lingua='en') %]!
```
<!--/qgoda-no-xgettext-->

Just kidding. This would produce something like "Go to homepage /!". What we
really want is this:

<!--qgoda-no-xgettext-->
```tt2
Go to <a href="[% q.link(name='home' lingua='en') %]">homepage</a>!
```
<!--/qgoda-no-xgettext-->

And since we are using Markdown, we can also write it like this:

<!--qgoda-no-xgettext-->
```tt2
Go to [homepage]([% q.link(name='home' lingua='en') %])!
```
<!--/qgoda-no-xgettext-->

`M:q.link()` will warn you in two cases:

1. The set of filters produces no results. This is a broken link.
2. The set of filters produces more than one result.  This is an
   ambiguous link. In that case an arbitrary hit is returned.

### Specialized Linking Functions

Many filters are very common and have their own filter functions to save
you typing:

* `q.linkPost(FILTERS)`: returns an assets of type 'post' that matches
  the filters. Equivalent to `q.link(type='post' FILTERS)`. See `M:q.linkPost()`.
* `q.llink(FILTERS)`: returns an assets of the same language that matches
  the filters. Equivalent to `q.lingua(lingua=asset.lingua FILTERS)`.
  See `M:q.llink()`.
* `q.llinkPost(FILTERS): A combination of the two methods above,
  equivalent to `q.link(type='post' lingua=asset.lingua FILTERS)`. See
  `M:q.llinkPost()`.

### Checking If a Document Exists

As seen above, the linking functions print ugly warnings if a link is
broken or ambiguous. But you can check whether a certain link exists with
`M:q.existsLink()`, `M:q.lexistsLink`, `M:q.existsPost`, and
`M:q.lexistsPost()`:

<!--qgoda-no-xgettext-->
```tt2;line-numbers
[% USE q = Qgoda %]
...
exists: [% q.existsLink(name='start' lingua=asset.lingua type='post') %]
exists: [% q.lexistsLink(name='start' type='post') %]
exists: [% q.existsLinkPost(name='start' lingua=asset.lingua) %]
exists: [% q.lexistsLinkPost(name='start') %]
```
<!--/qgoda-no-xgettext-->

Lines 3-6 are all exactly equivalent.

You will almost always use the results of these methods as a condition in
an `[% IF %]`.

### Anchor Functions

It is very common that you want to link to another document and use the
the title of that document as the label of the link.  This is very simple:

<!--qgoda-no-xgettext-->
```tt2;line-numbers
[% USE q = Qgoda %]
...
See [% q.anchor(name='appendix-c' lingua=asset.lingua type='post') %]!
See [% q.lanchor(name='appendix-c' type='post') %]!
See [% q.anchorPost(name='appendix-c' lingua=asset.lingua) %]!
See [% q.lanchorPost(name='appendix-c') %]
```
<!--/qgoda-no-xgettext-->

Lines 3-6 are all exactly equivalent. They will produce something like:

<!--qgoda-no-xgettext-->
```markup
...
See <a href="/docs/appendix-c/">Appendix C</a>!
See <a href="/docs/appendix-c/">Appendix C</a>!
See <a href="/docs/appendix-c/">Appendix C</a>!
See <a href="/docs/appendix-c/">Appendix C</a>!
```
<!--/qgoda-no-xgettext-->

## Cross-References

The [linking](#links) functions above always return the `V:permalink`
attribute of the matching document. But you can access arbitrary properties
of the matching document with the function `M:q.xref()`.

<!--qgoda-no-xgettext-->
```tt2
[% USE q = Qgoda %]
...
Go to homepage
<a href="[% q.xref('permalink', name='home' lingua='en') %]">
[% q.xref('title', name='home' lingua='en') %]!
</a>
```
<!--/qgoda-no-xgettext-->

Like for [listings](#listings) and [links](#links), there are also methods
for searching only in posts (`M:q.xrefPost()`), only in documents that have
the same language (`M:q.lxref()`) and only in posts that have the same
language (`M:q.lxrefPost()`).

## Tips and Tricks

### Use the L-Methods!

You will have noticed that a leading l (think lingua or language) in the
method name automatically adds a filter that restricts the search to the
language of the current document.

Unless you are 100 % sure that your site will never have more than one
language (and you never know that), always use the "l-versions" of the
methods. Adding another language to your site, will then essentially
become a no-brainer.

### Do Not Hardcode Links!

You are probably used to hardcoding links to other documents:

<!--qgoda-no-xgettext-->
```markdown
See the [Data Privacy Policy](/data-privacy-policy/)!
```
<!--/qgoda-no-xgettext-->

Admittedly, it's a little bit more complicated to write this instead:

<!--qgoda-no-xgettext-->
```markdown
See the [Data Privacy Policy]([% q.llink(name='data-privacy-policy') %])!
```
<!--/qgoda-no-xgettext-->

But you can often use this simpler version:

<!--qgoda-no-xgettext-->
```markdown
See the [% q.lanchor(name='data-privacy-policy') %])!
```
<!--/qgoda-no-xgettext-->

That's really not that hard. And you will never have to touch your links, when
you decide to move the target of the link.
