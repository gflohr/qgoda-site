---
title: Mode Of Operation
name: mode-of-operation
section: introduction
view: docs.html
description: Qgoda basically copies files for deployment, optionally cooking the content with processor plug-ins.
---
Qgoda's general mode of operation is very similar to other static site 
generators for example [Jekyll](https://jekyllrb.com/) or [Hugo](https://gohugo.io/).  It recursively copies all files
it finds from the source directory (configuration variable `C:srcdir`) into
the destination directory `P:_site` (configuration variable `C:site`).  The
destination directory is usually the document root of a web server.  Files 
enhanced by additional meta information found in front matter are piped through
configurable chains of processor plug-ins.

```yaml
---
title: The Importance of Being Awesome
description: Everything has to be awesome.
---
## About Awesomeness

This blog post is about being awesome.
```

The part between the two lines consisting of `---` is the front matter as [YAML](https://www.yaml.org/).

## Asset Selection

Files to be copied are selected using a simple naming convention.  All files
or directories starting with an underscore (`P:_site`, `P:_include`, `P:_views`,
...) are ignored, everything else gets copied.

## What are Assets?

All files selected for copying are referred to as *assets* in Qgoda.  Files
enriched with additional meta information in the document front matter are
conventionally called *cooked content*, *cooked assets* or
simply *documents*.  Unqualified content is called *raw*.

## Default Processor Chain

Documents are generally processed in two passes in Qgoda. 

### Pass 1 - Markdown

[% TAGS [- -] %]

In the first pass, your markdown input files are converted to HTML with a Markdown processor:

```markdown
---
title: About Me
---
## About Me

I am *here*.
```

That will result in the following HTML code:

```html
<h2>About Me</h2>

<p>I am <em>here</em>.</p>
```

The front matter is stored as meta information and not directly rendered.

### Pass 2 - HTML Wrapping with Template Toolkit

The current output is still an incomplete HTML document.  It will almost always be *wrapped* into a complete document with the [Template Toolkit](http://www.template-toolkit.org/) using a *view template*, by default `_views/default.html`:

```markup
<!doctype html>
<html>
  <head>
    <title>[% asset.title | html %]</title>
  </head>
  <body>
    <h1>[% asset.title | html %]</title>
    <div>
      [% asset.content %]
    </div>
  </body>
</html>
```

Everything between `[% ... %]` is template syntax.  `[% asset.content %]` is the result of pass 1, the markdown content transformed to HTML, while `[% asset.title %]` is the document title.  It it is a good idea to pipe it through the `html` filter so that special characters get properly escaped.

In reality, the default chain is slightly more complex but the details of it are most of the time not important for you.  In general, everything follows the Do-What-I-Mean™ paradigm.
