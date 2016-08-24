---
view: landing.html
title: Qgoda Static Site Generator
location: /{lingua}/index.html
permalink: /{lingua}/
chain: html
wrapper: html
---
[% USE q = Qgoda %]
[% q.include('_includes/landing-page/header.md', asset) %]
[% q.include('_includes/landing-page/main-features.md', asset) %]
[% q.include('_includes/landing-page/about.md', asset) %]
