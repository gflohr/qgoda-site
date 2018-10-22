---
title: Referencing Languages
name: referencing-languages
section: multilanguage
view: docs.html
description: Referencing some document in a particular language or the current document in another language is very easily achieved with Qgoda.
---
[% USE q = Qgoda %]
[% TAGS [@ @] %]
Since the `V:asset.lingua` variable is just a taxonomy, referencing a particular document in a certain language is just a matter of adding the language to the [filter]([@ q.llink(name='filters') @]) set you are using.

That means that language links are just a special case of [@ q.lanchor(name="listings") @]. Read there for the full picture. This page just outlines the general idea.

## Listings and Links for the Current Language ("l-methods")

All methods of the [Qgoda plug-in]([@ q.llink(name='qgoda-plug-in') @]) that take a set of filters as an argument have a corresponding version with the letter "l" prepended to the name that automatically adds a [filter]([@ q.llink(name='filters') @]) for the current language.

Example:

Creating a listing of posts for the tag "JavaScript" looks like this for a single-language site:

<!--qgoda-no-xgettext-->
```tt2;line-numbers
[% FOREACH post IN q.list('tags', ['contains', 'JavaScript']) %]
<a href="[% post.permalink %]">[% post.title | html %]</a>
[% END %]
```
<!--/qgoda-no-xgettext-->

For a multi-language site you would add one more filter:

<!--qgoda-no-xgettext-->
```tt2;line-numbers
[% FOREACH post IN q.list('lingua' = asset.lingua
                          'tags', ['contains', 'JavaScript']) %]
<a href="[% post.permalink %]">[% post.title | html %]</a>
[% END %]
```
<!--/qgoda-no-xgettext-->

And since this is such a common task, you can just use the method `q.llist` (think "language list") instead that adds that filter automatically:

<!--qgoda-no-xgettext-->
```tt2;line-numbers
[% FOREACH post IN q.llist('tags', ['contains', 'JavaScript']) %]
<a href="[% post.permalink %]">[% post.title | html %]</a>
[% END %]
```
<!--/qgoda-no-xgettext-->

So in the end, a multi-language site requires just a single letter more of template code.

## Language Switches

Another common tasks is to create a list of all language variants of a particular document. That can be achieved like this:

<!--qgoda-no-xgettext-->
```tt2;line-numbers
<ul>
[% FOREACH lingua IN config.linguas %]
  <li><a href="[% q.link(name=asset.name lingua=lingua) %]">[% lingua %]</a>
[% END %]
</ul>
```
<!--/qgoda-no-xgettext-->

This is using two filters. The first one is restricting the hits to those documents that have the same `V:name` property. The second one `lingua=lingua` further restricts to the language from the loop variable. Note that `lingua=lingua` is equivalent to `'lingua'=lingua`; the left `lingua` is the name of the asset variable of the "other" document, the right one is the lopp variable.

