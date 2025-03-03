---
title: GitHub Pages and AWS S3/CloudFront Deployment 
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
A new [GitHub Action](https://github.com/features/actions)
[qgoda-action](https://github.com/gflohr/qgoda-action) now allows an easy
deployment of your Qgoda generated content to [GitHub
Pages](https://pages.github.com/). GitHub Pages is a free hosting service
by [GitHub](https://github.com), mostly used for documentation of repositories
hosted on GitHub.

If your GitHub username is `my-self` and your GitHub repository is `my-project`,
your content will be available under https://my-self.github.io/my-project.
It is also possible to register your own domain and publish the content under
that domain name.

The setup is described in detail in the [Qgoda
documentation]([% q.llink(name='github-pages') %]).

An alternative to GitHub Pages that allows more control is to host your content
in the cloud with S3 and CloudFront by Amazon Web Services (AWS).  The setup
is also described in the [Qgoda
documentation]([% q.llink(name='aws-s3-cloudfront') %]).
