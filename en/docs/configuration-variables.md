---
title: Configuration Variables
name: configuration-variables
doc-section: Lists and Indices
order: 999
view: docs.html
description: Complete List Of Configuration Variables
---
[% USE gtx = Gettext %]
[% USE q = Qgoda %]
The following configuration variables from the file `_config.yml` are understood by Qgoda:

<ul>
[% WRAPPER components/variable.html
   variable="case-sensitive" type=gtx.gettext('0 or 1') 
   default='0' -%]
Set to 0 if you want to ignore case of filenames, 1 otherwise.  It is probably wise to keep the default value of 0 even on a case-sensitive file system.  Otherwise, you may run into problems, when you copy the site on another machine or some storage medium such as a USB stick.
[%- END %]

[% WRAPPER components/variable.html
   variable="exclude" type=gtx.gettext('Array') 
   default=gtx.gettext('empty') -%]
A list of files and directories that should not be processed.  Patterns are allowed.  See <a href="[% q.llink(name = 'excluding-files') %]">[% q.lxref('title', name = 'excluding-files') %]</a>!
[%- END %]

[% WRAPPER components/variable.html
   variable="exclude_watch" type=gtx.gettext('Array') 
   default=gtx.gettext('same as "exclude" above') -%]
A list of files and directories that should not trigger a rebuild, when they change.  Patterns are allowed.  See <a href="[% q.llink(name = 'excluding-files') %]">[% q.lxref('title', name = 'excluding-files') %]</a>!
[%- END %]

[% WRAPPER components/variable.html
   variable="title" type=gtx.gettext('String') 
   default=gtx.gettext('"A New Qgoda Powered Site"') -%]
The name of the site.  Qgoda itself does not use this variable.
[%- END %]

</ul>
