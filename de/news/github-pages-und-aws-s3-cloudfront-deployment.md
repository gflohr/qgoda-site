---
title: GitHub-Pages- und AWS S3/CloudFront-Deployment
name: github-pages-and-aws-s3-cloudfront-deployment
view: docs.html
date: 2025-03-03 
category: Tutorial
tags:
    - Deployment 
    - GitHub Pages
    - AWS
    - S3
    - CloudFront
---
Eine neue [GitHub Action](https://github.com/features/actions)
[qgoda-action](https://github.com/gflohr/qgoda-action) erlaubt auf einfache
Weie ein Deployment von Qgoda-generiertem Content zu [GitHub
Pages](https://pages.github.com/). GitHub Pages sind ein kostenloser
Hosting-Service [GitHub](https://github.com), der in erster Linie für die
Dokumentation von auf GitHub gehosteten Repositories verwendet wird.

Falls der eigene GitHub Username `ich-selbst` und der Name des
GitHub-Repositories `mein-projekt` sind, ist der Content unter
https://ich-selbst.github.io/mein-projekt verfügbar. Es ist auch möglich,
eine eigene Domain zu registrieren und den Content unter diesem Domain-Namen
zu veröffentlicht.

Die genaue Vorgehensweise ist ausführlich in der
[Qgoda-Dokumentation]([% q.llink(name='github-pages') %]) beschrieben.

Eine Alternative zu GitHub Pages, die mehr Kontrolle erlaubt, ist das Hosten
des Contents in der Cloud mit S3 und CloudFront von Amazon Web Services (AWS).
Das Vorgehen ist ebenfalls in der
[Qgoda-Dokumentation]([% q.llink(name='aws-s3-cloudfront') %]) erläutert.
