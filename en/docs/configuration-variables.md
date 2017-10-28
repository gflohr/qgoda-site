---
title: Configuration Variables
name: configuration-variables
doc-section: Documentation
order: 999
view: docs.html
description: Complete List Of Configuration Variables
---
[% USE gtx = Gettext %]
[% USE q = Qgoda %]
The following configuration variables from the file `_config.yml` are understood by Qgoda:

<ul>

[% WRAPPER components/variable.html
   variable="exclude" type=gtx.gettext('Array') 
   default=gtx.gettext('empty') %]
A list of files and directories that should not be processed.  See <a href="[% q.llink(asset.lingua, ['name', 'excluding-files']) %]">Excluding Files</a>!
[% END %]

[% WRAPPER components/variable.html
   variable="exclude_watch" type=gtx.gettext('Array') 
   default=gtx.gettext('same as "exclude" above') %]
A list of files and directories that should not trigger a rebuild, when they change.  Patterns are allowed.  See <a href="[% q.llink(asset.lingua, ['name', 'excluding-files']) %]">Excluding Files</a>!
[% END %]

</ul>
