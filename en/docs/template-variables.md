---
title: Template Variables
name: template-variables
doc-section: Lists and Indices
order: 910
view: docs.html
description: Standard and Pre-Defined Template Variables
---
[% USE gtx = Gettext %]
[% USE q = Qgoda %]
[% PROCESS "functions/css-modules.tt" %]
Not all of the following variables are necessarily available everywhere.
A few of them like `V:asset.name` are mere conventions.

Qgoda passes all template variables inside the `V:hash:hashes` (resp. 
`V:object:objects` if
you prefer that term) `V:asset` and `V:config`.  All other
variables, especially top-level variables are free for your use.

[% WRAPPER components/infobox.html
   type="warning" title=gtx.gettext('Overwriting Internal Variables') %]
Qgoda allows overwriting these internal variables which may also affect
documents processed afterwards.  This feature can lead to interesting
results if you know what you are doing.  In general, it is a recipe
for trouble.
[%- END %]

[% WRAPPER "components/template-variable.html"
   variable="asset" %]
The variable `asset` is the container for all variables specific to
the asset currently being processed.
[%- END %]

[% WRAPPER "components/template-variable.html"
   variable="config" type=gtx.gettext('hash') %]
`config` gives you access to the site configuration from `F:_config.yaml`.
The configuration variable `C:paths.views` in `F:_config.yaml` is
accessible from a template as `config.paths.views`.  See
[q.llink(name='configuration-variables'] for a complete list.
[%- END %]
