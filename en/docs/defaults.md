---
title: Defaults
name: defaults
section: basics
view: docs.html
description: How to set default values for multiple documents at once.
---
Variables like `V:asset.title` or `V:asset.description`
are usually specific to just one document. But you 
often want to set variables for a whole group of 
documents based on their file name or the directory they
reside in.

Such default values can be set with the configuration
variable `C:defaults` in `P:_config.yaml` using the 
powerful syntax of
[pattern lists]([% q.llink(name='pattern-lists') %]).

The default values are just used for initialization.
You can always override them in the document 
<q-term>front matter</q-term>.

The configuration variable `C:defaults` is a list (an
array) that contains rules that are processed one by
one for each matching document.

Each rule is a *hash* with the two keys `files` and
`values`. With `files` you specify the matching
documents, with `values`, the values you want to set for
them.

Example:

<!--qgoda-no-xgettext-->

```yaml;line-numbers
defaults:
    - files: /en
      values:
        lingua: en
    - files: /de
      values:
        lingua: de
        translate: ['title', 'description']
```

<!--/qgoda-no-xgettext-->

The value for `files` specifies the pattern, in
`values` you set the default values for arbitrary
variables.

You can also specify multiple patterns in `files`,
simply by specifying an array instead of a single value:

<!--qgoda-no-xgettext-->

```yaml;line-numbers
defaults:
    - files:
        - index.*
        - listing.*
        - '!/index.md'
      values:
        type: listing
```

<!--/qgoda-no-xgettext-->

The above example would set the default value for `type`
to "listing" for all files that match `index.*` and
`listing.*` but *not* for `/index.md`. See
[% q.lanchor(name='pattern-lists') %] for all the gory
details of file name pattern matching.
