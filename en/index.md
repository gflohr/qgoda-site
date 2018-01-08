---
view: landing.html
title: Qgoda Static Site Generator
location: /{lingua}/index.html
permalink: /{lingua}/
chain: html
wrapper: html
description: Qgoda is a static site generator with a strong focus on multi-linguism and flexibility, written in Perl but extensible with JavaScript, Python, Ruby, Java, and more.
---
[% USE q = Qgoda %]
[% q.include('_includes/landing-page/header.md', asset) %]
[% q.include('_includes/landing-page/main-features.md', asset) %]
[% q.include('_includes/landing-page/about.md', asset) %]
