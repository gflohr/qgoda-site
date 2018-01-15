---
title: Excluding Files
name: excluding-files
section: basics
view: docs.html
description: How to exclude (or include) additional paths in Qgoda.
---
By default, Qgoda does not process hidden files and directories (name starts with a dot `.`).  Top-level files and directories that have names beginning with an underscore `_` are also excluded.

<!--QGODA-NO-XGETTEXT--><qgoda-toc /><!--/QGODA-NO-XGETTEXT-->

## Excluding Additional Files

You can change this default behavior by configuring additional file name patterns in the variable `C:exclude` in the configuration file `P:_config.yml`.

Example:

<!--QGODA-NO-XGETTEXT-->
```yaml
exclude:
- /node_modules
- /package.json
- /webpack.config.js
- assets/images/**/*.xcf
```
<!--/QGODA-NO-XGETTEXT-->

This will also exclude the top-level directory `node_modules`, and the top-level files `package.json` and `webpack.config.js`.  Likewise, all XCF files (the image format of [The Gimp](http://www.gimp.org/) in the directory `assets/images` and all of its descendant directories are excluded.

## Automatically Excluded Files

Internally, Qgoda does not use the configured exclusion list directly but a slightly extended one.  For the above example it looks like this:

<!--QGODA-NO-XGETTEXT-->
```yaml
exclude:
- .*
- /_*
- /node_modules
- /package.json
- /webpack.config.js
- assets/images/**/*.xcf
- /_site
```
<!--/QGODA-NO-XGETTEXT-->

The first two lines files and directories that have names beginning with a dot (`.`) or top-level files and directories that have names beginning with an underscore.

If you have invoked Qgoda with the command-line option `--drafts`, an addtional line `!/_drafts` (resp. the value of the configuration variable `directories.drafts`) is added.

The last line is always appended and a safe-guard against configuration errors.  Unintentionally including the output directory `_site` (or whatever you have configured in the variable `outdir`) would lead to an infinite recursion.  The output directory is therefore always added to the exclusion list.

## Including Files

There is no configuration variable `include`.  You can exclude otherwise excluded files by prepending a pattern with an exclamation mark `!`.  The pattern is then negated:

<!--QGODA-NO-XGETTEXT-->
```yaml
exclude:
- /node_modules
- /package.json
- /webpack.config.js
- assets/images/**/*.xcf
- "!/_posts"
```
<!--/QGODA-NO-XGETTEXT-->

This would now enable processing of all the files in the top-level directory `_posts`.

Beware though that you cannot re-include files or directories, when one of their parent directories is already excluded.

Example:

<!--QGODA-NO-XGETTEXT-->
```yaml
exclude:
- /archive
- "!/archive/2017"
```
<!--/QGODA-NO-XGETTEXT-->

The second pattern is invalid and ignored because `/archive` is a parent directory of `/archive/2017`.

This behavior has performance reasons.  When Qgoda collects files, it does not descend into excluded directories.  In the above example, it would not read the contents of `archive` and would therefore never see the subdirectory `archive/2017`.

That leads to a little problem if you want to re-include a subdirectory of an automatically excluded directory, for example `_experiments/stable`.  The top-level directory `_experiments` is automatically excluded by Qgoda.  In order to re-include it, you would have to do the following:

<!--QGODA-NO-XGETTEXT-->
```yaml
exclude:
- "!/_experiments"
- /_experiments/*
- "!/_experiments/stable"
```
<!--/QGODA-NO-XGETTEXT-->

You have to keep in mind that Qgoda has prepended this list with `/_*` (see above).  Line 1 re-includes `_experiments`.  Line 2 excludes all its subdirectories again.  And line 3 selectively re-includes `_experiments/stable`.

## Excluding Files From Being Watched

There is another configuration variable `C:exclude_watch` that specifies files and directories that should not be watched.  If you omit that variable, the contents of `exclude` is taken instead.

Note that Qgoda by default re-includes the directories `P:_views` and `P:_includes`.

Example:

<!--QGODA-NO-XGETTEXT-->
```yaml
exclude_watch:
- assets/movies
```
<!--/QGODA-NO-XGETTEXT-->

The list that is really used by Qgoda looks like this:

<!--QGODA-NO-XGETTEXT-->
```yaml
exclude_watch:
- .*
- /_*
- "!/_views"
- "!/_includes"
- assets/movies
- /_site
```
<!--/QGODA-NO-XGETTEXT-->

You can see that the directories `_views` and `_includes` have been re-included.  They typically contain layout/design files.  They deserve a ... do they?????

## Gory Details Of Pattern Matching

The patterns you can use for the variable `exclude` follow the convention of [gitignore](https://git-scm.com/docs/gitignore), only that you put your configuration in [YAML](http://yaml.org/) file `_config.yaml`.

### Special Characters

Some characters in patterns have a special meaning.

#### The Star/Asterisk "*"

The star or asterisk stands for an arbitrary number of characters except for a slash:

<!--QGODA-NO-XGETTEXT-->
```yaml
exclude:
- images/*.xcf
```
<!--/QGODA-NO-XGETTEXT-->

This will exclude all XCF files in the subdirectory `images` for example `images/logo.xcf` but *not* `images/ci/logo.xcf` (because the star/asterisk does not match a slash).

Note that `*.xcf` also matches the file `.xcf`.  The star stands for an arbitrary number of characters and that includes zero characters.

#### The Double Star/Asterisk "**"

Two consecutive stars `**` stand for any sequence of characters including the slash.

<!--QGODA-NO-XGETTEXT-->
```yaml
exclude:
- images/**/*.xcf
```
<!--/QGODA-NO-XGETTEXT-->

This now matches `images/ci/logo.xcf` *and* `images/logo.xcf` and also `images/nothing/beats/nesting/logo.xcf`.  The pattern `**` matches recursively.

#### The Exclmation Mark "!"

The exclamation mark negates a pattern.  See [below](#negating-patterns) for details.

[% WRAPPER components/infobox.html
           type = "warning" title = "The exclamation mark is special to YAML" %]
The exclamation mark <code>!</code> is a special character in YAML and JSON.  You therefore have to put negated patters into quotes, for example "!a/b".
[% END %]

#### The Question Mark "?"

The question mark standard for any character except for a slash.

<!--QGODA-NO-XGETTEXT-->
```yaml
exclude:
- images/corporate?logos
```
<!--/QGODA-NO-XGETTEXT-->

This matches `images/corporate-logos` and `images/corporate_logos` and `images/corporatedQlogos` and `images/corporate&logos`.

#### Character [Ranges]

It's getting esoteric.

<!--QGODA-NO-XGETTEXT-->
```yaml
exclude:
- images/[abc].jpeg
```
<!--/QGODA-NO-XGETTEXT-->

This matches exactly `images/a.jpeg`, `images/b.jpeg`, and `images/c.jpeg`.  Instead, you could also write this:

<!--QGODA-NO-XGETTEXT-->
```yaml
exclude:
- images/[a-c].jpeg
```
<!--/QGODA-NO-XGETTEXT-->

Read the `[a-c]` as "all characters from a to c".

You can combine ranges:

<!--QGODA-NO-XGETTEXT-->
```yaml
exclude:
- images/[a-z0-9].jpeg
```
<!--/QGODA-NO-XGETTEXT-->

This would now match `x.jpeg` and `3.jpeg`.

Note that `[]` does not stand for no character.  It is simply not special.  Use `[]abc]` if you want to match "a", "b", "c", and a closing square bracket.

And put the hyphen at the front if you want to match it: `[-a-zA-Z0-9]`.  That matches all alphanumeric characters and the hyphen.

You can also use named character classes like `[a-zA-Z[:digit:]]` where `[:digit]` stands for any digit in the current locale.  Using this feature is discouraged unless you understand it.

#### The Backslash "\"

You can escape any character by preceding it with a backslash "\".

<!--QGODA-NO-XGETTEXT-->
```yaml
exclude:
- images/Quo Vadis\?.jpeg
```
<!--/QGODA-NO-XGETTEXT-->

This matches only `images/Quo Vadis?.jpeg` but not `images/Quo VadissX.jpeg`.  The question mark has lost its special meaning by the preceding backslash.

### Negating Patterns

### Slashes
