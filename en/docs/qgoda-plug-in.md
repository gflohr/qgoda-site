---
title: The Qgoda Plug-In
name: qgoda-plug-in
section: lists-and-indices
view: docs.html
description: Functions provided by the Qgoda Plug-In
---
[% USE q = Qgoda %]
[% PROCESS "functions/css-modules.tt" %]

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

TODO!
