---
title: Template Variables
name: template-variables
doc-section: Lists and Indices
order: 910
view: docs.html
description: Standard and Pre-Defined Template Variables
---
[% USE q = Qgoda %]
[% PROCESS "functions/css-modules.tt" %]
Not all of the following variables are necessarily available everywhere.
Many of them like `V:asset.name` are mere conventions.

Qgoda passes all template variables inside the <q-term>hash:hashes</q-term> (resp. 
<q-term>object:objects</q-term> if
you prefer that term) `V:asset` and `V:config`.  All other
variables, especially top-level variables are free for your use.

[% WRAPPER components/infobox.html
   type="warning" title='Overwriting Internal Variables' %]
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
   variable="asset.priority" %]
All artifacts are built sorted by their priority.  A higher value means that they are generated last.  Normally, you should assign a high priority, for example 999 to listings so that they are generated after other pages and can access all of their data.
[%- END %]

[% WRAPPER "components/template-variable.html"
   variable="config" type='hash' %]
`config` gives you access to the site configuration from `P:_config.yaml`.
The configuration variable `C:paths.views` in `P:_config.yaml` is
accessible from a template as `config.paths.views`.  See
[q.llink(name='configuration-variables'] for a complete list.
[%- END %]
