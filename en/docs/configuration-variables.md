---
title: Configuration Variables
name: configuration-variables
section: lists-and-indices
view: docs.html
description: Complete List Of Configuration Variables
---
<!--qgoda-no-xgettext-->
[% USE q = Qgoda %]
<!--/qgoda-no-xgettext-->

The following configuration variables from the file `P:_config.yml` are understood by Qgoda:

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
   variable="exclude-watch" type='Array'
   default='same as "exclude" above' -%]
A list of files and directories that should not trigger a rebuild, when they change.  Patterns are allowed.  See <a href="[% q.llink(name = 'excluding-files') %]">[% q.lxref('title', name = 'excluding-files') %]</a>!
[%- END %]

[% WRAPPER components/variable.html
   variable="linguas" type='Array'
   default='undefined' -%]
A list of language codes for your site like "en", "fr", and so on.  It is recommended that you use <a href="https://tools.ietf.org/html/rfc3066">HTTP language identifiers</a>.
[%- END %]

[% WRAPPER components/variable.html
   variable="link-score" type='Integer'
   default=5 -%]
The relation score that two documents that have a link between each other get.  Note that this is counted from each document's side.  So, if document A links to B and B links to A, the overall relation score between A and B is 10.
[%- END %]

[% WRAPPER components/variable.html
   variable="no-scm" type='List of patterns'
   default='none' -%]
A list of file name patterns that should be processed although not being under version control.  This only makes sense in conjunction with <code>C:scm</code>.
[%- END %]

[% WRAPPER components/variable.html
   variable="title" type='String'
   default='"A New Qgoda Powered Site"' -%]
The name of the site.  Qgoda itself does not use this variable.
[%- END %]

[% WRAPPER components/variable.html
   variable="po" type='Hash'
   default='see below' -%]
Container for various <q-term>i18n</q-term> settings, see below.
[%- END %]

[% WRAPPER components/variable.html
   variable="po.copyright-holder" type='String'
   default='none' -%]
See <a href="[% q.llink(name='multilanguage-configuration') %]#po.copyright-holder-code-"><code>po.copyright-holder</code> in Multilanguage Configuration</a>.
[%- END %]

[% WRAPPER components/variable.html
   variable="po.from-code" type='String'
   default='utf-8' -%]
See <a href="[% q.llink(name='multilanguage-configuration') %]#po.from-code-code-"><code>po.from-code</code> in Multilanguage Configuration</a>.
[%- END %]

[% WRAPPER components/variable.html
   variable="po.msgfmt" type='String'
   default='msgfmt' -%]
See <a href="[% q.llink(name='multilanguage-configuration') %]#po.msgfmt-code-"><code>po.msgfmt</code> in Multilanguage Configuration</a>.
[%- END %]

[% WRAPPER components/variable.html
   variable="po.msgid-bugs-address" type='String'
   default='none' -%]
See <a href="[% q.llink(name='multilanguage-configuration') %]#po.msgid-bugs-address-code-"><code>po.msgid-bugs-address</code> in Multilanguage Configuration</a>.
[%- END %]

[% WRAPPER components/variable.html
   variable="po.qgoda" type='String'
   default='msgfmt' -%]
See <a href="[% q.llink(name='multilanguage-configuration') %]#po.msgfmt-code-"><code>po.msgfmt</code> in Multilanguage Configuration</a>.
[%- END %]

[% WRAPPER components/variable.html
   variable="po.msgmerge" type='String'
   default='msgfmt' -%]
See <a href="[% q.llink(name='multilanguage-configuration') %]#po.msgmerge-code-"><code>po.msgmerge</code> in Multilanguage Configuration</a>.
[%- END %]

[% WRAPPER components/variable.html
   variable="po.qgoda" type='string or list'
   default='0' -%]
See <a href="[% q.llink(name='multilanguage-configuration') %]#po.qgoda-code-"><code>po.qgoda</code> in Multilanguage Configuration</a>.
[%- END %]

[% WRAPPER components/variable.html
   variable="po.refresh" type='Boolean (0 or 1)'
   default='0' -%]
See <a href="[% q.llink(name='multilanguage-configuration') %]#po.refresh-code-"><code>po.refresh</code> in Multilanguage Configuration</a>.
[%- END %]

[% WRAPPER components/variable.html
   variable="po.textdomain" type='String'
   default='none' -%]
The textdomain of your site.  The master translation catalog for your site will be <code>TEXTDOMAIN.pot</code> and the invocation of the template toolkit Gettext plug-in has to use the same value.  The easiest way to achieve that is by invoking the Gettext plug-in with <code>[[%'%'%] USE gtx = Gettext(config.po.textdomain, asset.lingua) [%'%'%]]</code>.
[%- END %]

[% WRAPPER components/variable.html
   variable="po.xgettext" type='String'
   default='xgettext' -%]
Location of the <code>xgettext</code> program if not in <code>$PATH</code>.
[%- END %]

[% WRAPPER components/variable.html
   variable="po.xgettext-tt2" type='String'
   default='xgettext-tt2' -%]
Location of the <code>xgettext-tt2</code> program if not in <code>$PATH</code>.
[%- END %]

[% WRAPPER components/variable.html
   variable="scm" type='String'
   default='none' -%]
Source Code Management (SCM) system in use.  The only supported variable at the moment is "git".  That has the effect that only files under version control are processed.  This check is done *after* filtering with the contents of the configuration variable <code>C:exclude</code>.
[%- END %]

[% WRAPPER components/variable.html
   variable="url" type='String'
   default='none' -%]
The url (<code>http://...</code>) of the site, normally without a trailing slash (so that you can safely append <code>V:asset.permalink</code> to it).  Qgoda itself does not use this variable.
[%- END %]
</ul>
