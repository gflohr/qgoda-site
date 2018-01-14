---
title: Configuration Variables
name: configuration-variables
section: lists-and-indices 
view: docs.html
description: Complete List Of Configuration Variables
---
<!--QGODA-NO-XGETTEXT-->
[% USE q = Qgoda %]
[% PROCESS "functions/css-modules.tt" %]
<!--/QGODA-NO-XGETTEXT-->

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
   variable="po" type='Hash' 
   default='see below' -%]
Container for various <q-term>i18n</q-term> settings, see below.
[%- END %]

[% WRAPPER components/variable.html
   variable="po.copyright_holder" type='String' 
   default='none' -%]
Default copyright holder of generated <code>.po</code> files.  This will
be written into the PO header of the file.
[%- END %]

[% WRAPPER components/variable.html
   variable="po.from_code" type='String' 
   default='utf-8' -%]
Encoding for documents and templates.
[%- END %]

[% WRAPPER components/variable.html
   variable="po.msgfmt" type='String' 
   default='msgfmt' -%]
Location of the <code>msgfmt</code> program if not in <code>$PATH</code>.
[%- END %]

[% WRAPPER components/variable.html
   variable="po.msgid_bugs_address" type='String' 
   default='none' -%]
Email address for reporting bugs in message ids in <code>.po</code> files.  This will be written into the PO header of the file.
[%- END %]

[% WRAPPER components/variable.html
   variable="po.msgmerge" type='String' 
   default='msgfmt' -%]
Location of the <code>msgmerge</code> program if not in <code>$PATH</code>.
[%- END %]

[% WRAPPER components/variable.html
   variable="po.qgoda" type='String' 
   default='msgfmt' -%]
Location of the <code>qgoda</code> program if not in <code>$PATH</code>.
[%- END %]

[% WRAPPER components/variable.html
   variable="po.refresh" type='Boolean (0 or 1)' 
   default='0' -%]
Set to 1 if you want to reload translations before every rebuild.  By default, they are loaded only once at program start.  If you reload them on every rebuild, freshly installed translations are immediately visible.
[%- END %]

[% WRAPPER components/variable.html
   variable="po.tt2" type='Pattern list' 
   default='[_views, _includes]' -%]
List of patterns where to search for template files.
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
   variable="po.xgettext_tt2" type='String' 
   default='xgettext-tt2' -%]
Location of the <code>xgettext-tt2</code> program if not in <code>$PATH</code>.
[%- END %]

[% WRAPPER components/variable.html
   variable="url" type='String' 
   default='none' -%]
The url (<code>http://...</code>) of the site, normally without a trailing slash (so that you can safely append <code>V:asset.permalink</code> to it).  Qgoda itself does not use this variable.
[%- END %]
</ul>
