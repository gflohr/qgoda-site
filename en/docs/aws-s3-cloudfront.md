---
title: AWS S3/Cloudfront
name: aws-s3-cloudfront
section: deployment
description: >
    AWS S3 and optionally CloudFront offer a simple and inexpensive way of
    publishing a static website.
---
[% USE q = Qgoda %]
If you need more control over your published content, the combination of the
cloud storage service S3 and the content delivery network (CDN) CloudFront
by Amazon Web Services AWS are a popular choice for hosting static sites.

<qgoda-toc/>

## General

We assume that you store your Qgoda sources in a repository on
[GitHub](https://github.com/) and want to use a [GitHub
Action](https://github.com/features/actions) workflow to automatically build
and deploy your content.  The process is very similar as the one described
for [% q.lanchor(name='github-pages') %].

It is assumed that you are familiar with S3 and optionally CloudFront and how
to host a static site with these services. If not, have a look at the blog
post [Authenticating Access to Private Content Hosted with AWS
CloudFront](https://www.guido-flohr.net/authenticating-access-to-private-content-hosted-with-aws-cloudfront/).
That blog post assumes that you want to also limit access to the site but
you can simply skip the sections about authentication if you want to make your
content publicly available.

### Why CloudFront?

CloudFront is a content delivery network. Its main purpose is to make your
content available on multiple servers distributed over the world. Whenever
a visitor hits your site, the AWS name servers will supply an IP address that
is geographically close to the visitor's location.

This feature may not be your priority but CloudFront has the additional
advantage that it uses encrypted connections, whereas web sites only based on
S3 are http-only, and search engines will give a penalty for that. But you
can, of course, just go with S3 if that fits better to your needs.

## Authentication

The instructions given here follow the recommendations by Amazon for
long-term credentials. There are many other ways to achieve that, see
the documentation for
[`aws-actions/configure-aws-credentials`](https://github.com/aws-actions/configure-aws-credentials)
for a discussion of the different options.


