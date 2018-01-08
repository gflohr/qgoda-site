---
title: Table Of Contents
name: table-of-contents
doc-section: basics
view: docs.html
description: Creating a table of contents with Qgoda is very easy.  And every aspect of it can be styled to your needs.
---
[% USE q = Qgoda %]

<qgoda-toc/>

## Usage

### Location of the Table of Contents

First you have to mark, where in your document you want the table of contents to appear:

```markdown
This is a long article with a lot of sections.

<qgoda-toc/>

Use the above table of contents to find your way.
```

The custom tag `<qgoda-toc/>` is expanded into a table of contents like the one you can see at the top of this page, when rendering the document.

[% WRAPPER components/infobox.html
           type='info' title='Format of the tag' %]
It doesn't matter whether you write <code>&lt;qgoda-toc/&gt;</code>, <code>&lt;qgoda-toc /&gt;</code>, <code>&lt;qgoda-toc&gt;&lt;/qgoda-toc&gt;</code>, or just <code>&lt;qgoda-toc&gt;</code>.  They will all work the same.
[% END %]

You can place the the tag inside of the markdown documents you write or inside the view templates.  You can even place it multiple times.

### Marking the Content Range

[% TAGS [- -] %]
The table of contents is generated over only a part of the document.  This will normally be the content area, the part of the document that you write in markdown.  Search for `[% asset.content %]` in the files `P:_views` directory:

```markup
<div class="container">
  [% asset.content %]
</div>
```

Surround it with the custom tag `<qgoda-content>`:

```markup
<div class="container">
  <qgoda-content>
  [% asset.content %]
  </qgoda-content>
</div>
```

Qgoda will now create a document structure from all `<h2>` to `<h6>` elements found between `<qgoda-content>` and `</qgoda-content>` and render it as a table of contents, wherever you put the tag `<qgoda-toc>`.

### Table of Contents Template

When you render a page with a table of contents for the first time you may notice the following log output:

```bash
[warning] writing default template '_views/components/toc/level.html'
[warning] writing default template '_views/components/toc.html'
```

You can see that the template files `_views/components/toc/level.html` and `_views/components/toc.html` have been automatically generated for you.  They are meant as a starting point and hint.  You normally have to at least add some general styling in your <q-term>CSS</q-term> files for the classes uses.  The table of contents that you can see at the top of this page was styled with the following <q-term>CSS</q-term>:

```css
.toc {
    border: 1px dotted #818a91;
    background-color: #f7f7f9;
    margin-bottom: 1rem;
    padding: 0.5rem;
    padding-bottom: 0rem;
}

.toc ul {
    list-style-type: none;
}

.toc .toc-title {
    font-weight: bold;
    font-size: 110%;
    padding-bottom: 0.5rem;
}

ul.toclevel-1 {
   padding-left: 0;
}
```

## Gory Details and Configuration

The table of contents generation is implemented as a <q-term>HTMLFilter</q-term> plug-in.  That means it is executed at the very end of the rendering process.

### Internal Logic

The plug-in finds all `<h2>` to `<h6>` elements and generates a hierarchy from the tags found.  It is quite strict.  For example, an `<h4>` tag after an `<h3>` tag is ignored because the hierarchy level `<h3>` is missing.

It collects the document structure and passes it in the variable `V:asset.toc` to the plug-in that renders the table of contents.  See the source code of the auto-generated default templates `_views/components/toc.html` and `_views/components/toc/level.html` for details.

Inside all `<h2>` to `<h6>` elements that have been recognized a named anchor `<a id="SLUG" name="SLUG" href="#">` is inserted, where `SLUG` is the <q-term>slugified:slug</q-term> text inside of the headline element.  These named anchors are the targets of the links in the rendered table of contents.

### Configuration

Since it is an HTMLFilter plug-in, you configure it in the options for the plug-in.  The command `qgoda config` should print something like this:

```yaml
  options:
    HTMLFilter:
    - AnchorTarget
    - Generator
    - CleanUp
    - - TOC
      - content_tag
      - qgoda-content
      - toc_tag
      - qgoda-toc
      - start
      - 2
      - end
      - 6
      - template
      - components/toc.html
```

A more readable but equivalent form would look like this:

```yaml
  options:
    HTMLFilter:
    - AnchorTarget
    - Generator
    - CleanUp
    - [TOC,
       content_tag, qgoda-content,
       toc_tag, qgoda-toc
       start, 2,
       end, 6,
       template, components/toc.html] 
```

The configuration variables are passed as key-value pairs.  Their meaning is as follows:

<dl>
  <dt><code>content_tag</code></dt>
  <dd>The name of the tag that surrounds the content, defaults to <code>qgoda-config</code>.
  <dt><code>toc_tag</code></dt>
  <dd>The name of the placeholder tag of the table of contents, defaults to <code>qgoda-toc</code>.
  <dt><code>start</code></dt>
  <dd>The start level of the table of contents, defaults to 2 so that the 1st level will be built by <code>&lt;h2&gt;</code> elements.
  <dt><code>end</code></dt>
  <dd>The end level of the table of contents, defaults to 6 so that the last level will be built by <code>&lt;h6&gt;</code> elements.
  <dt><code>template</code></td>
  <dd>The template for rendering the table of contents, defaults to <code>components/toc.html</code> (that is the file <code>_views/components/toc.html</code>).
</dl>

You will find that it is rarely necessary to change any of the defaults.
