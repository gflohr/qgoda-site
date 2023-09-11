---
title: PO Translations 
name: po-translations 
section: multilanguage
view: docs.html
description: Documents that are typically edited and modified many times during their life-cycle should better be translated in manageable chunks using a sophisticated translation workflow with a professional toolset.
---
[% USE q = Qgoda %]
[% TAGS [@ @]%]
In such cases it is better to focus on the content in 
the main language and manage the translations with the 
normal
[translation workflow]([% q.llink(name="translation-workflow")]).

You will also find that necessary, when you let 
translations be done by external translators as they 
will not be very happy to edit markdown files.

As an additional benefit, the translation process is 
also cheaper and more efficient, even when you do the
translations yourself.

[@ WRAPPER components/infobox.html
           type='info' title="It's Your Choice" @]
Nobody forces you to use this approach for every document on your site. You
can switch between the two methods, whenever you see the need. You should
just keep in mind that switching from the
<a href="[@ q.llink(name='simple-content-translation') @]">simple
approach</a> to the one described here using PO files will require manual work.
There is no way to get the translation from the translated markdown file into a
`.po` file.
[@ END @]

## Trigger Documents

The central idea of content inernationalization in Qgoda are so-called trigger documents.  They have no content 
but only <q-term>front matter</q-term>:

```yaml
---
master: /en/about-strawberries.md
lingua: de
title: Über Erdbeeren
---
```

The interesting variable here is `V:asset.master`. It just
points to the same document in the main language.

The `V:asset.lingua` variable is also crucial to specify because Qgoda has to
know for which language it has to pull translations. But you normally specify
`V:asset.lingua` in the [defaults]([@ q.llink(name='defaults')@])
of your `P:_qgoda.yaml`.

All other variables that you add to the front matter are
just added to the document and available as regular
asset variables.

## Translating Front Matter

But you don't have to manually translated the front
matter from the original document. Instead you can
extract the relevant parts of it to the `.po`
file.  This is done with the special variable
`V:asset.translate`:

```yaml
---
master: /en/about-strawberries.md
translate:
    - title
    - description
---
```

This has the effect that the values of the front matter 
variables `title` and `description` are extracted from
the main document into the `.po` file, and their 
translations will be used, when generating the 
translated document.

[@ WRAPPER components/infobox.html
           type='info' title='Message Context' @]
All front-matter variables that get extracted will have the variable name
as their so-called message context. Identical strings with different 
message contexts may have individual translations.
[@ END @]

You will normally always want to translate the same set of front matter
variables for every document. This is normally done by specifying
[defaults]([@ q.llink(name='defaults') @]):

```yaml
defaults:
  - files:
      - /*/**
    values:
      translate:
        - title
        - description
```

There is no problem specifying variables that don't appear in every one of
your documents. List entries that don't exist for a particular document are
simply ignored.

[@ WRAPPER components/infobox.html
           type='warning' title='Do <em>not</em> translate <code>V:asset.name</code>!' @]
The variable <code>V:asset.name</code> is the constant link between language
versions. By assigning the same value to it for every language version of the
document, you can create references between them. If you translate it, the
mechanism will fail.
[@ END @]

## Missing Translations

What if a certain string has not been 
[translated]([@ q.llink(name='translation-workflow') @]) yet? The gettext way of
handling that situation is to use the original string, that is the string
in the main language of your site. That's not perfect but better than nothing
and you can always remedy it by providing a translation.

## What Else?

Nothing! It's as simple as that. Just set the
[defaults]([@ q.llink(name='defaults') @]) for `V:asset.translate` and
`V:asset.lingua` in `P:_qgoda.yaml`. And then creating a translated version
of every document is as simple as:

```yaml
---
master: /en/qgoda-rocks.md
---
```

This site itself is translated into German using exactly this technique.
