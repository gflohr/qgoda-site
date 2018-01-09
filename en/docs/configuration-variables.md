---
title: Configuration Variables
name: configuration-variables
section: lists-and-indices 
view: docs.html
description: Complete List Of Configuration Variables
---
[% USE q = Qgoda %]
[% PROCESS "functions/css-modules.tt" %]

The following configuration variables from the file `_config.yml` are understood by Qgoda:

<ul>
[% WRAPPER components/variable.html
   variable="case-sensitive" type='0 or 1' 
   default='0' -%]
Set to 0 if you want to ignore case of filenames, 1 otherwise.  It is probably wise to keep the default value of 0 even on a case-sensitive file system.  Otherwise, you may run into problems, when you copy the site on another machine or some storage medium such as a USB stick.
[%- END %]

[% WRAPPER components/variable.html
   variable="exclude" type='Array' 
   default='empty' -%]
A list of files and directories that should not be processed.  Patterns are allowed.  See <a href="[% q.llink(name = 'excluding-files') %]">[% q.lxref('title', name = 'excluding-files') %]</a>!
[%- END %]

[% WRAPPER components/variable.html
   variable="exclude_watch" type='Array' 
   default='same as "exclude" above' -%]
A list of files and directories that should not trigger a rebuild, when they change.  Patterns are allowed.  See <a href="[% q.llink(name = 'excluding-files') %]">[% q.lxref('title', name = 'excluding-files') %]</a>!
[%- END %]

[% WRAPPER components/variable.html
   variable="link_score" type='Integer' 
   default=5 -%]
The relation score that two documents that have a link between each other get.  Note that this is counted from each document's side.  So, if document A links to B and B links to A, the overall relation score between A and B is 10.
[%- END %]

[% WRAPPER components/variable.html
   variable="title" type='String' 
   default='"A New Qgoda Powered Site"' -%]
The name of the site.  Qgoda itself does not use this variable.
[%- END %]

[% WRAPPER components/variable.html
   variable="tours" type='Hash' -%]
TODO!
[%- END %]
</ul>
