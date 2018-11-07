---
title: Pagination
name: pagination
section: basics
view: docs.html
description: How to distribute listings over multiple pages.
---
Functions for paginating listings are often very complicated and limited
in other systems. In Qgoda it is a no-brainer.

<qgoda-toc/>

## General Idea

Pagination consist of two tasks:

1. Cut the set of documents for the current page of the listing out of the
   collection of all documents
2. Compute the data for the previous and next page, the total number of pages
   and so on.

Number 2 is 3rd grade math, number 1 can give serious headaches.

In Qgoda, the automatic creation of another page is very simple. The
template function `M:q.clone()` does exactly that: It creates an exact
copy of the current page and just modifies values that you specify in
the call to it:

<!--qgoda-no-xgettext-->
[% USE q = Qgoda %]
[% TAGS [@ @] %]
```tt2
[% USE q = Qgoda %]
...
[% q.clone(location='/other.html' start=start + 10) %]
```
<!--qgoda-no-xgettext-->

This would create a copy of the current document but store it as `/other.html`
and set the variable `start` to the current value plus 10.

The only problem here is that you create a clone unconditionally. That means
that the cloned document will also clone itself. You have created an endless
loop.

You therefore have to put the call to `M:q.clone()` into an `[% IF %]`
directive, so that the cloning stops at one point.

In the case of paginated listings, this point is very clear: You reach it,
when you list the last document of the collection on the current page.
You will see that below.

## Example

Let's begin with a minimal working example:

<!--qgoda-no-xgettext-->
```tt2;line-numbers
[% USE q = Qgoda %]
[% posts = q.listPosts.nsortBy('date').reverse() %]

[% start = asset.start || 0 %][% asset.start = 0 %]
[% p = q.paginate(start = start total = posts.size) %]

<ul>
[% FOREACH post IN posts.splice(p.start, p.per_page) %]
  <li><a href=[% post.href %]>[% post.title | html %]</a></li>
[% END %]
<ul>

<nav>
  <ul>
    <li><a href="[% p.previous_link %]">Newer</a></li>

    [% page = 0 %]
    [%- FOREACH link IN p.links -%]
    <li>
      <a href="[% p.links.$page %]">[% page + 1 %]</a>
      [% page = page + 1 %]
    </li>
    [%- END -%]

    <li><a href="[% p.next_link %]">Older</a></li>
  </ul>
  [%- IF p.next_start -%]
    [% q.clone(location = p.next_location start = p.next_start) %]
  [%- END -%]
</nav>
```
<!--/qgoda-no-xgettext-->

This will produce a complete listing with pagination.

Line 2 creates a sorted collection of all posts of your site, most recent
first. See [@ q.lanchor(name = 'listings') @] if you want to create a listing
of pages from a certain date rage, from a certain category, pages containing
a tag or a combination thereof.

In line 4 the variable `start` gets initialized from the document variable
`asset.start`. It is the (zero-based) index of the first document shown
on this page of the listing. Initially it is `null` which is fine because
it evaluates to 0. Still in line 4, the document variable `asset.start`
is reset to 0. Ths is not important here but when you create listings of
tags, where you will have clones of cloned documents.

Line 5 contains the call to `M:q.paginate()` which is documented below. You
pass it at list the named argument `total` that contains the total number
of pages and `start` which contains the (zero-based) index of the first
document in the collection on *this* page. The function returns an object
which contains all information that you need for creating a pagination over
the listing pages.

Lines 7-11 just contain a minimal listing of a paged subset of the current
page. See in line 8, how that subset is created. The method
[`splice()`](http://www.template-toolkit.org/docs/manual/VMethods.html#method_splice)
cuts out those documents from the collection that should be displayed on
this page. The first argument is the (zero-based) index of the first document,
the second one is the number of documents you want.

For both arguments you simply use the values `p.start` and `p.per_page` that
you have received from the call to `M:q.paginate()` above.

Below that, the pagination navigation begins. In line 15 we create a link
to the previous listing simply by using the path from `p.previous_link`.

Lines 17-23 loop over all listing pages, link to them, und use the
precomputed array `p.links` as the link targets.

Line 25 is like line 15, but creates the link to the next listing page.

The actual magic happens in lines 27-29. Iff there are more documents to
display, a copy of the current listing page is created with
`M:q.clone()`. The clone is an exact copy of the current page. Only two
properties are overwritten.

One is the `V:asset.location` of the clone which is precomputed as something
like `index-3.html` for the third listing so that the copy will not overwrite
the current page.

The other one is our variable `start` which will contain the starting
document of this page plus the number of documents displayed on this page.

In other words: The listing creates a copy of itself with the next starting
document, until all documents have been displayed.

That's it! In reality, you may notice that this example has a couple of flaws.
For example, the links to the previous and next page should only be
displayed, when there actually *is* a previous or next page. You will also
want to style the navigation and may add aria-attributes but that's just
template code.

You can take a
[full-fledged example](https://github.com/gflohr/qgoda-multilang/blob/master/_views/components/listing.html)
from the [Qgoda Multilanguage Theme](https://github.com/gflohr/qgoda-multilang)
as a starting point for your own listing and pagination module.

## The `q.clone()` Method

This method creates an identical copy of the current document. Its usage is
not limited to pagination. You use it whenever you have to dynamically create
documents. Another typical use case are tag listings, where you clone the
listing for the current tag, so that you can create a listing for the next
tag, until there are no more tags.

A typical usage looks like this:

<!--qgoda-no-xgettext-->
```tt2;line-numbers
[% USE q = Qgoda %]
[% IF (have_to_create_more_pages)]
[% q.clone(location = next_location start = start + 10) %]
[% END %]
```
<!--/qgoda-no-xgettext-->

Whatever named arguments you pass, will become (changed) variables of the
cloned document.
 
Simply creating clones of the current document would lead to an endless loop,
where each clone would overwrite its parent with an identical copy. You
therefore have to adhere to two rules:

1. Always put the call to `q.clone()` into an `[% IF %]` directive that will
at one point yield a false value.
2. You *must* override the `V:asset.location` property of the clone so that
it will not overwrite the current document.

The rules are simple but you will notice sooner or later that they are easy
to forget. If you have the impression that you have created an endless loop,
re-run qgoda with the option `--verbose` to better understand what is going
on.

## The `q.paginate()` Method

The `M:q.paginate()` template function only performs some simple
computations that helps you create the navigation for the listing pages
in HTML. It could also be implemented with Template Toolkit functions,
only that this would be slower and more complicted.

### Usage

<!--qgoda-no-xgettext-->
```tt2;line-numbers
[% USE q = Qgoda %]
[% posts = q.listPosts.nsortBy('date').reverse() %]

[% start = asset.start || 0 %][% asset.start = 0 %]
[% p = q.paginate(total = posts.size start = start) %]
```
<!--/qgoda-no-xgettext-->

The actual call is done in line 5. But you typically invoke it with two
named arguments `total` (total number of items) and `start` (index of the
first item).

Therefore you normally create a collection of documents like in line 3. See
[@ q.lanchor(name='listings') @] for details about that. The size of that
collection is then used for the argument `total`.

The other argument that you normally need is `start`. It defaults to 0.
For subsequent listings that were created with
[`q.clone()`](#the-q.clone-method) you increase
this parameter by the number of documents (resp. items) shown in the
current listing.

### Input Parameters.

The following named arguments are supported:

#### `total`

The total number of items, resp. the size of the collection. This argument
is mandatory and must be greater than zero.

#### `start`

The first item that is displayed in the current listing. The count starts
at zero not at one!

If omitted, this parameter defaults to zero.

#### `per_page`

The number of items that are displayed on one page. Defaults to 10.

#### `stem`

The filename stem used for creating subsequent listings. Defaults to the
basename without extender of the original document. If the original document
has the file name `index.html`, the stem defaults to `index`, and the
subsequent listing pages will be saved as `index-2.html`, `index-3.html`,
and so on.

#### `extender`

The extender used for creating subsequent listings. Defaults to the extender
of the current document.

### Output

The returned value is an object, a hash with the following properties:

| Property/Key  | Value                                                       |
| ------------- | ----------------------------------------------------------- |
| start         | Where the next listing should start. This is the last starting point plus the number of items per page.
| page          | The page number of the current page. The count starts at 1. |
| page0         | The zero-based page number of the current page. That is `page` minus 1.
| per_page      | The number of items per page.  That just echoes the corresponding input parameter.
| total_pages   | The total number of pages needed to display all items.
| previous_link | A link to the previous page or `null/undef` if this is the first page.
| next_link     | A link to the next page or `null/undef` if this is the last page.
| links         | An array of links to all listing pages. This will be something like `['index.html', 'index-2.html', 'index-3.html', 'index-4.html']
| tabindices    | This will be [0, 0, -1, 0] is this is listing page number 3 of 4 pages in total. You can use the corresponding value for the `tabindex` attribute of the corresponding `a` anchor linking to that page.
| tabindexes    | The same as `tabindices` if you prefer that spelling.
| next_start    | If you call `M:q.clone()`, use this as the `start` property of the cloned listing.
| next_location | If you use `M:q.clone()`, use this as the `location` property of the cloned listing.

If you are using Qgoda from git or at least version 0.9.5, you can do this
to get a reminder of all data available inside the page:

<!--qgoda-no-xgettext-->
```tt2;line-numbers
[% p = q.paginate(total = posts.size start = start) %]
<pre>[% q.json.encode(p) | html %]</pre>
```
<!--/qgoda-no-xgettext-->

This will dump the return value of `M:q.paginate()` into the page so that
you can see the actual values.