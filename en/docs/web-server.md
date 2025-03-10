---
title: Web Server
name: web-server
section: deployment
description: >
    The static websites generated by Qgoda can be served by almost every
    web server available on the market.
---
[% USE Highlight %]
The simplest way to deploy a Qgoda site is to publish the rendered pages
to a web-server, no matter whether this web server runs in the cloud or
on premise.

If you have access to a web server like [nginx](https://nginx.org) or
[Apache](https://httpd.apache.org/) you just have to copy the contents of
the directory `_site` (or whatever path you have configured in
`C:paths.site`) into the document root of that web server.

The easiest way to do that is using [`rsync`](https://linux.die.net/man/1/rsync).
The advantage over plain `scp` or `ftp` is that it is able to also delete
files that no longer exist. A typical deployment script would look like
this:

[% FILTER $Highlight "language-bash" %]
$ rsync -avz --delete _site/ user@www.example.com:/usr/share/nginx/html
[% END %]

The trailing slash in `_site/` is important! It means that the contents of the
directory `_site` is synched, not the directory itself. If you omit the slash,
you would end up creating a directory `/usr/share/nginbx/html/_site` on the
server which is not what you want.
