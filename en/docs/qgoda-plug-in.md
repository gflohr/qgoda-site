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

<a name="#filters"></a>
Many of the following functions expect <code>FILTERS</code>.
Please see [@ q.lanchor(name => 'filters') @] for more information!

## Methods

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
