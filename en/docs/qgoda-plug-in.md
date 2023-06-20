---
title: The Qgoda Plug-In
name: qgoda-plug-in
section: lists-and-indices
view: docs.html
description: Functions provided by the Qgoda Plug-In
---
[% USE q = Qgoda %]

A lot of Qgoda's functionality is available from the Qgoda plug-in.  You
activate like this in a template:

[% TAGS [@ @] %]

```tt2
[% USE q = Qgoda %]
```

Using the shortcut `q` for the plug-in is a well-established convention.

You can then use all methods of the plug-in like this:

```tt2
[% USE q = Qgoda %]
...
Last generated: [% q.strftime('%c') %].
```

<qgoda-toc/>

## Methods

<a name="#filters"></a>
Many of the following functions expect <code>FILTERS</code>.
Please see [@ q.lanchor(name => 'filters') @] for more information!

[@ WRAPPER "components/plug-in-functions.html"
   name="q.list" args="FILTERS" @]
Returns a list (an array) of all documents matching <code>FILTERS</code>.
This is equivalent to calling
<a href="#q.list"><code>q.list()</code></a> with the arguments
<code>type = "post"</code>.
[@- END @]

[@ WRAPPER "components/plug-in-functions.html"
   name="q.listPosts" args="FILTERS" @]
Returns a list (an array) of all posts matching <code>FILTERS</code>.
This is equivalent to calling <a href="#q.list"><code>q.list()</code></a> with
the arguments <code>type = "post"</code>.
[@- END @]

## Virtual Methods

[Virtual methods](http://www.template-toolkit.org/docs/manual/VMethods.html)
are methods that are directly applied to a variable by adding a dot
and the method invocation, for example:

```tt2
The slugs of '[% asset.title | html %]' is '[% asset.title.slugify() %]'.
```

The Qgoda plug-in extends the list of [standard vmethods in
Template Toolkit](http://www.template-toolkit.org/docs/manual/VMethods.html)
by a number of useful methods:

### Virtual Array Methods

The following methods are available on arrays:

[@ WRAPPER "components/plug-in-functions.html"
   name="sortBy()" args="string" @]
Sorts the array alpha-numerically by the property specified. The call
<code>q.listPosts.sortBy('date.year')</code> would sort all posts by their
year.  It is wrong to specify <code>asset.date.year</code> because the objects
returned by `M:q.listPosts()` *are* all assets. You have to specify the
key, the object *property*.
[@- END @]

[@ WRAPPER "components/plug-in-functions.html"
   name="sortBy" args="string" @]
Same as <code>M:sortBy()</code> but sorts numerically. For example "2" is
numerically less than "10", but alpha-numerically greater than "10" because
the digit "2" is alphanumerically greater than "1" just as the letter
"b" is alphanumerically greater than "a".
[@- END @]

[@ WRAPPER "components/plug-in-functions.html"
   name="vmap" args="string" @]
When applied to an array of objects (hashes), it returns the *values* of
the property specified by the string argument.  For example
<code>q.listPosts.vmap('permalink')</code> gives you an array of the 
`V:permalink` attribute of all posts.
[@- END @]

### Virtual Hash Methods

The following methods are available on hashes (also known as objects in JSON or
JavaScript or formally as associative arrays):

[@ WRAPPER "components/plug-in-functions.html"
   name="vmap" args="string" @]
Like <code>M:vmap()</code> above but the collection is a hash. The values
are visited in alphanumerical order or their corresponding keys.
[@- END @]
