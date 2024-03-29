---
title: Files and Directories
name: files-and-directories
section: lists-and-indices
view: docs.html
description: Complete List of Files and Directories
---
<!--qgoda-no-xgettext-->
[% USE q = Qgoda %]
<!--/qgoda-no-xgettext-->

A typical Qgoda site contains a couple of standard files and directories.
They are described in the following list.

[% WRAPPER components/infobox.html
           type='info' title='Sorting of This List' %]
The list is sorted alphanumerically but case-insensitive, and a leading
underscore of the name is ignored.
[% END %]

<!--qgoda-no-xgettext-->
<ul>

[% WRAPPER components/file.html
   name="_assets" type='directory' -%]
<!--/qgoda-no-xgettext-->
This directory usually keeps the source files for assets, for example
JavaScript files or (S)CSS files.  Qgoda does not use this name internally.  It is just a convention.
<!--qgoda-no-xgettext-->
[%- END %]

[% WRAPPER components/file.html
   name="_qgoda.yaml" type='file' -%]
<!--/qgoda-no-xgettext-->
Qgoda's main configuration file.
<!--qgoda-no-xgettext-->
[%- END %]

[% WRAPPER components/file.html
   name="_qgoda.yml" type='file' -%]
<!--/qgoda-no-xgettext-->
Qgoda's secondary configuration file.  It is only used if <code>P:_qgoda.yaml</code>
does not exist.
<!--qgoda-no-xgettext-->
[%- END %]

[% WRAPPER components/file.html
   name="_includes" type='directory'
   overridable="paths.includes" -%]
<!--/qgoda-no-xgettext-->
Directory for included content snippets.  You use that for example
like <code>[&#37; q.include("_includes/footer.md") &#37;]</code>.  Using the
name `_includes` is not enforced by Qgoda.  But you should use a name that starts with an underscore (so that the files are not misinterpreted as regular content) and add the negated name to the configuration variable `C:exclude-watch`.
<!--qgoda-no-xgettext-->
[%- END %]

[% WRAPPER components/file.html
   name="_plugins" type='directory'
   overridable="paths.plugins" -%]
<!--/qgoda-no-xgettext-->
Directory for site-specific plug-ins.  Plug-Ins in this directory are
automatically activated.
<!--qgoda-no-xgettext-->
[%- END %]

[% WRAPPER components/file.html
   name="_site" type='directory'
   overridable="paths.site" -%]
<!--/qgoda-no-xgettext-->
The output directory.  This will normally be the document root of your
web server.  Files and directories in <code>P:_site</code> are 
overwritten without warning.
<!--qgoda-no-xgettext-->
[%- END %]

[% WRAPPER components/file.html
   name="_stop" type='file' -%]
<!--/qgoda-no-xgettext-->
If a file named `_stop` is found in the top-level source directory, it gets
deleted and Qgoda terminates immediately. The content of the file will be
reported as the reason for the termination in the logs.  You can use this
feature for programmatically terminating Qgoda without signalling it.
<!--qgoda-no-xgettext-->
[%- END %]

[% WRAPPER components/file.html
   name="_timestamp" type='file'
   overridable="paths.timestamp" -%]
<!--/qgoda-no-xgettext-->
This file contains the time, when <code>P:_site</code> was last
re-created as seconds since the <q-term>epoch</q-term>.  If you 
automatically re-load pages in the browser, for example with
<a href="https://www.browsersync.io/")>browser-sync</a>, you should 
specify  <code>P:_timestamp</code> as the file to watch for changes.
<!--qgoda-no-xgettext-->
[%- END %]

</ul>
<!--/qgoda-no-xgettext-->
