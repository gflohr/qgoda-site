---
title: Terms and Concepts 
name: terms-and-concepts 
section: lists-and-indices
order: 900
view: docs.html
description: Explanation of frequently used terms and concepts
---
<!--qgoda-no-xgettext-->
[% USE q = Qgoda %]
[% PROCESS "functions/css-modules.tt" %]
<ul>
<!--/qgoda-no-xgettext-->

[% WRAPPER components/term.html term="epoch" -%]
A certain date and time is often expressed as seconds elapsed since the
<em>epoch</em>, where epoch stands for 1 January 1970 00:00:00 UTC.
This has the advantage that such timestamps are completely independent
of time zones and daylight savings time rules.
[%- END %]

[% WRAPPER components/term.html term="front matter" -%]
A block of document properties in <a href="http://yaml.org/">YAML</a> format at
the beginning of the page. This block has to be enclosed in two lines
consisting of just three hyphens <code>---</code>, the first of which has to be
the first line of the file.  See the
<a href="[% q.llink(name='qgoda-in-15-minutes') %]#front-matter)">introduction</a>
for more information.
for more information.
[%- END %]

[% WRAPPER components/term.html term="sass" -%]
<a href="http://sass-lang.com/" target="_blank">SASS</a> is a popular
CSS pre-processor and its original syntax.  The syntax is nowadays
usually superseded by <q-term>SCSS</q-term>.
[%- END %]

[% WRAPPER components/term.html term="scss" -%]
<a href="http://sass-lang.com/documentation/file.SCSS_FOR_SASS_USERS.html"
target="_blank">SCSS</a> is a <q-term>SASS</q-term> syntax introduced in
Sass 3.  It is a strict superset of CSS, so that every valid CSS file is
also a valid SCSS file.
[%- END %]

<!--qgoda-no-xgettext-->
</ul>
<!--/qgoda-no-xgettext-->
