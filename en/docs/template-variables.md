---
title: Template Variables
name: template-variables
section: lists-and-indices
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
   variable="asset" type="hash" %]
The variable `asset` is the container for all variables specific to
the asset currently being processed.
[%- END %]

[% WRAPPER "components/template-variable.html"
   variable="asset.draft" type="boolean (0 or 1)" %]
Set to a truth value (for example 1 if the document is a draft.  Drafts only get processed when the command-line option [% q.llink(name = 'command-line-interface') %] `-D` or `--drafts` was specified.
[%- END %]

[% WRAPPER "components/template-variable.html"
   variable="asset.lingua" type="RFC4647 language identifier" %]
An identifier of the language of the document. You should use a language identifier that conforms to <a href="https://www.ietf.org/rfc/rfc4647.txt">RFC4647</a>, something like "en", "en-us", or "fr-ca". It is strongly recommended that you stick to the variable name `lingua` because this convention is built into Qgoda at many places.
[%- END %]

[% WRAPPER "components/template-variable.html"
   variable="asset.priority" type="integer" %]
All artifacts are built sorted by their priority.  A higher value means that they are generated first.  Normally, you should assign a low priority, for example -999 to listings so that they are generated after other pages and can access all of their data.
[%- END %]

[% WRAPPER "components/template-variable.html"
   variable="asset.virtual" type="boolean (0 or 1)" %]
Virtual documents to not get published, to be more exact, they do not go through the second pass of processing (the HTML wrapping) and hence are not written to disk.
[%- END %]

[% WRAPPER "components/template-variable.html"
   variable="config" type="hash" %]
`config` gives you access to the site configuration from `P:_config.yaml`.
The configuration variable `C:paths.views` in `P:_config.yaml` is
accessible from a template as `config.paths.views`.  See
[% q.lanchor(name='configuration-variables') %] for a complete list.
[%- END %]
