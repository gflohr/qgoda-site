---
title: Files and Directories
name: files-and-directories
doc-section: Lists and Indices
order: 930
view: docs.html
description: Complete List of Files and Directories
---
[% USE q = Qgoda %]
[% PROCESS "functions/css-modules.tt" %]

A typical Qgoda site contains a couple of standard files and directories.
They are described in the following list.

[% WRAPPER components/infobox.html
           type='info' title='Sorting of This List' %]
The list is sorted alphanumerically but case-insensitive, and a leading
underscore of the name is ignored.
[% END %]

<ul>

[% WRAPPER components/file.html
   name="_assets" type='directory' -%]
This directory usually keeps the source files for assets, for example
JavaScript files or (S)CSS files.
[%- END %]

[% WRAPPER components/file.html
   name="_config.yaml" type='file' -%]
Qgoda's main configuration file.
[%- END %]

[% WRAPPER components/file.html
   name="_config.yml" type='file' -%]
Qgoda's secondary configuration file.  It is only used if <code>P:config.yaml</code>
does not exist.
[%- END %]

[% WRAPPER components/file.html
   name="_includes" type='directory'
   overridable="paths.includes" -%]

Directory for included content snippets.  You use that for example
like <code>[&#37; q.include("_includes/footer.md") &#37;]</code>.  You 
can actually include such snippets from everywhere, but a modifcation 
of files ore directories in `_includes` trigger a site rebuild.
[%- END %]

[% WRAPPER components/file.html
   name="_plugins" type='directory'
   overridable="paths.plugins" -%]

Directory for site-specific plug-ins.  Plug-Ins in this directory are
automatically activated.
[%- END %]

[% WRAPPER components/file.html
   name="_site" type='directory'
   overridable="paths.site" -%]

The output directory.  This will normally be the document root of your
web server.  Files and directories in <code>P:_site</code> are 
overwritten without warning.
[%- END %]

[% WRAPPER components/file.html
   name="_timestamp" type='file'
   overridable="paths.timestamp" -%]

This file contains the time, when <code>P:_site</code> was last
re-created as seconds since the <q-term>epoch</q-term>.  If you 
automatically re-load pages in the browser, for example with
<a href="https://www.browsersync.io/")>browser-sync</a>, you should 
specify  <code>P:_timestamp</code> as the file to watch for changes.
[%- END %]

</ul>
