---
view: landing-about.html
title: Main Technologies
chain: html
wrapper: html
---
<!--qgoda-no-xgettext-->
[% USE q = Qgoda %]
[% q.include('_includes/' _ asset.lingua _ '/landing-page/about-perl.md', asset) %]
[% q.include('_includes/' _ asset.lingua _ '/landing-page/about-nodejs.md', asset) %]
[% q.include('_includes/' _ asset.lingua _ '/landing-page/about-yeoman.md', asset) %]
[% q.include('_includes/' _ asset.lingua _ '/landing-page/about-duktape.md', asset) %]
<!--/qgoda-no-xgettext-->
