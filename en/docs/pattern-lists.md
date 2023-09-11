---
title: Pattern Lists
name: pattern-lists
section: lists-and-indices
view: docs.html
description: File name patterns and lists of file name patterns are used throughout Qgoda for definining sets of files and directories.
---
<!--qgoda-no-xgettext-->
[% USE q = Qgoda %]
[% TAGS [@ @] %]
<!--/qgoda-no-xgettext-->

Lists of search patterns in Qgoda follow the convention of [gitignore](https://git-scm.com/docs/gitignore), only that you put your configuration in a [YAML](http://yaml.org/) file `P:_qgoda.yaml` and not in a file `P:.gitignore`.

<!--qgoda-no-xgettext--><qgoda-toc /><!--/qgoda-no-xgettext-->

As an example we use the configuration variable `C:exclude` which is used for [excluding files from being processed]([@ q.llink(name = 'excluding-files') @]).

## Special Characters

Some characters in patterns have a special meaning.

### The Star/Asterisk "*"

The star or asterisk stands for an arbitrary number of characters except for a slash:

<!--qgoda-no-xgettext-->
```yaml
exclude:
- images/*.xcf
```
<!--/qgoda-no-xgettext-->

This will exclude all XCF files in the subdirectory `images` for example `images/logo.xcf` but *not* `images/ci/logo.xcf` (because the star/asterisk does not match a slash).

Note that `*.xcf` also matches the file `.xcf`.  The star stands for an arbitrary number of characters and that includes zero characters.

### The Double Star/Asterisk "**"

Two consecutive stars `**` stand for any sequence of characters including the slash.

<!--qgoda-no-xgettext-->
```yaml
exclude:
- images/**/*.xcf
```
<!--/qgoda-no-xgettext-->

This now matches `images/ci/logo.xcf` *and* `images/logo.xcf` and also `images/nothing/beats/nesting/logo.xcf`.  The pattern `**` matches recursively.

### The Exclamation Mark "!"

The exclamation mark negates a pattern.  See [below](#negating-patterns) for details.

[@ WRAPPER components/infobox.html
           type = "warning" title = "The exclamation mark is special to YAML" @]
The exclamation mark <code>!</code> is a special character in YAML and JSON.  You therefore have to put negated patters into quotes, for example "!a/b".
[@ END @]

### The Question Mark "?"

The question mark standard for any character except for a slash.

<!--qgoda-no-xgettext-->
```yaml
exclude:
- images/corporate?logos
```
<!--/qgoda-no-xgettext-->

This matches `images/corporate-logos` and `images/corporate_logos` and `images/corporatedQlogos` and `images/corporate&logos`.

### Character [Ranges]

It's getting esoteric.

<!--qgoda-no-xgettext-->
```yaml
exclude:
- images/[abc].jpeg
```
<!--/qgoda-no-xgettext-->

This matches exactly `images/a.jpeg`, `images/b.jpeg`, and `images/c.jpeg`.  Instead, you could also write this:

<!--qgoda-no-xgettext-->
```yaml
exclude:
- images/[a-c].jpeg
```
<!--/qgoda-no-xgettext-->

Read the `[a-c]` as "all characters from a to c".

You can combine ranges:

<!--qgoda-no-xgettext-->
```yaml
exclude:
- images/[a-z0-9].jpeg
```
<!--/qgoda-no-xgettext-->

This would now match `x.jpeg` and `3.jpeg`.

Character ranges cannot be empty, and therefore `[]` does not stand for no character.  It is simply not special.  Use `[]abc]` if you want to match "a", "b", "c", and a closing square bracket.

And put the hyphen at the front if you want to match it: `[-a-zA-Z0-9]`.  That matches all alphanumeric characters and the hyphen.

You can also use named character classes like `[a-zA-Z[:digit:]]` where `[:digit]` stands for any digit in the current locale.  Using this feature is discouraged unless you understand it.

### The Backslash "\"

You can escape any character by preceding it with a backslash "\".

<!--qgoda-no-xgettext-->
```yaml
exclude:
- images/Quo Vadis\?.jpeg
```
<!--/qgoda-no-xgettext-->

This matches only `images/Quo Vadis?.jpeg` but not `images/Quo VadissX.jpeg`.  The question mark has lost its special meaning by the preceding backslash.

## Negating Patterns

It is possible to negate patterns with a leading exclamation mark:

<!--qgoda-no-xgettext-->
```yaml
exclude:
- /_*
- "!/_posts"
```
<!--/qgoda-no-xgettext-->

This would exclude all files and directories with names starting with an underscore but *not* the directory `_posts`.

[@ WRAPPER components/infobox.html
           type = "warning" title = "The exclamation mark is special to YAML" @]
The exclamation mark <code>!</code> is a special character in YAML and JSON.  You therefore have to put negated patters into quotes, for example "!a/b".
[@ END @]

### Exclusion and Inclusion Mode

Search patterns behave slightly different, when they are used for *excluding* files (as opposed to including files).  With pattern lists used for excluding files, you cannot re-include files or directories, when one of their parent directories is already excluded.

Example:

<!--qgoda-no-xgettext-->
```yaml
exclude:
- /archive
- "!/archive/2017"
```
<!--/qgoda-no-xgettext-->

The second pattern is invalid and ignored because `/archive` is a parent directory of `/archive/2017`.

This behavior has performance reasons.  When Qgoda collects files, it does not descend into excluded directories.  In the above example, it would not read the contents of `archive` and would therefore never see the subdirectory `archive/2017`.

That leads to a little problem if you want to re-include a subdirectory of an automatically excluded directory, for example `_experiments/stable`.  The top-level directory `_experiments` is automatically excluded by Qgoda.  In order to re-include it, you would have to do the following:

<!--qgoda-no-xgettext-->
```yaml
exclude:
- "!/_experiments"
- /_experiments/*
- "!/_experiments/stable"
```
<!--/qgoda-no-xgettext-->

You have to keep in mind that Qgoda has prepended this list with `/_*` (see [@ q.lanchor(name = 'excluding-files') @]).  Line 1 re-includes `_experiments`.  Line 2 excludes all its subdirectories again.  And line 3 selectively re-includes `_experiments/stable`.

## Slashes

### Leading Slashes

A leading slash anchors the pattern to the source directory.

Example:

<!--qgoda-no-xgettext-->
```yaml
exclude:
- /package.json
- TODO
```
<!--/qgoda-no-xgettext-->

The first patterns starts with a slash.  It therefore excludes the top-level file `package.json` but it would not exclude `a/b/c/package.json`.

The second pattern is not anchored to the source directory.  It would therefore match `TODO` as well as `a/TODO` or `a/b/TODO`.

### Trailing Slashes

A trailing slash causes a pattern only to match directories:

<!--qgoda-no-xgettext-->
```yaml
exclude:
- /src/lib/
```
<!--/qgoda-no-xgettext-->

This would exclude `src/lib` *only* if it is a directory.  A regular file `src/lib` would not be affected.

### Other Slashes

Every slash inside a pattern causes the entire file name to be taken into account when matching:

<!--qgoda-no-xgettext-->
```yaml
exclude:
- posts/experiments/dangerous-minds.md
```
<!--/qgoda-no-xgettext-->

This would exclude `posts/experiments/dangerous-minds.md`.  It does *not* exclude a file `dangerous-minds.md` in other locations.  It also does not exclude `a/b/posts/experiments/dangerous-minds.md`.

As you can see, a slash in the middle of a pattern effectively anchors the pattern to the source directory, and you can therefore almost always omit a leading slash, when there are more slashes following.  The following two patterns are absolutely equivalent:

<!--qgoda-no-xgettext-->
```yaml
exclude:
- posts/experiments/dangerous-minds.md
- /posts/experiments/dangerous-minds.md
```
<!--/qgoda-no-xgettext-->
