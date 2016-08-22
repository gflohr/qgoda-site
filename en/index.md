---
view: landing.html
title: Qgoda Static Site Generator
location: /{lingua}/index.html
permalink: /{lingua}/
chain: html
wrapper: html
---
<h1>Lingua: [% asset.lingua %]
[% USE q = Qgoda %]
[% q.include('_includes/landing-page/header.md') %]
[% q.include('_includes/landing-page/main-features.md') %]
[% q.include('_includes/landing-page/about.md') %]
