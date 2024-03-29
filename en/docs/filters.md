---
title: Filters
name: filters
section: basics
view: docs.html
description: Learn how to filter a collection of arguments by taxonomies respectively document variables.
---
<!--qgoda-no-xgettext-->
[% USE q = Qgoda %]
[% TAGS [@ @] %]
<!--/qgoda-no-xgettext-->

Many template functions of the
[Qgoda Plug-in]([@ q.llink(name='qgoda-plug-in') @]) have filters as their
argument. Filters allow you to specify a group of documents or even one
single document.

<qgoda-toc />

## Filters Are Key-Value Pairs

A typical filter looks like this:

```tt2
Read this page in [German]([% q.link(name=asset.name lingua='de') %]). 
```

The above snippet calls the template function `M:q.llink()` with two named
arguments `name` and `lingua`.

All of these arguments specify conditions that a document must fulfill to
pass the filter.  In the above case that would be documents whose `name`
variable has the same value as the current document, and the `lingua`
variable should have the hard-coded value `de`.

## Broken and Ambiguous Links

If you specify a filter that produces no results, you will normally see a warning
in the console. Likewise, for methods that should produce exactly one hit,
you will get a warning if more than one matching document exists.

Such functions are `M:q.link()`, `M:q.anchor()`, and `M:q.xref()` and their
multilanguage equivalents `M:q.llink()`, `M:q.lanchor()`, and `M:q.lxref()`.

## Conditions

The equality check is the default condition for filters but there are more
at your disposal with a slightly more complicated syntax:

```tt2
See the [API docs]([% q.link(name='api-docs') %]).
See the [API docs]([% q.link(name=['eq', 'api-docs']) %]).
```

The second example uses the advanced syntax. Instead of a single value,
you specify a list of two values.  The first one is the comparison operator,
and the second one the value.

In fact both lines do exactly the same, because `eq` as the default
comparison operator.

So, the advanced syntax is:

```tt2
VARIABLE=[OPERATOR, VALUE]
```

<!--qgoda-no-xgettext-->
### `eq`
<!--/qgoda-no-xgettext-->

Returns true if the values are string-wise equal.

<!--qgoda-no-xgettext-->
### `ne`
<!--/qgoda-no-xgettext-->

Returns true if the values are string-wise not equal.

<!--qgoda-no-xgettext-->
### `ge`
<!--/qgoda-no-xgettext-->

Returns true if the value of the variable in the other document is (string-wise) greater or equal than the value specified. For example "bbb" is string-wise greater than "aaa".

<!--qgoda-no-xgettext-->
### `gt`
<!--/qgoda-no-xgettext-->

Returns true if the value of the variable in the other document is (string-wise) greater than the value specified. For example "bbb" is string-wise greater than "aaa".

<!--qgoda-no-xgettext-->
### `le`
<!--/qgoda-no-xgettext-->

Returns true if the value of the variable in the other document is (string-wise) less or equal than the value specified. For example "aaa" is string-wise less than "bbb".

<!--qgoda-no-xgettext-->
### `lt`
<!--/qgoda-no-xgettext-->

Returns true if the value of the variable in the other document is (string-wise) less than the value specified. For example "aaa" is string-wise less than "bbb".

 <!--qgoda-no-xgettext-->
### `ieq`
<!--/qgoda-no-xgettext-->

Like [`eq`](#eq) but ignores case for the comparison.

<!--qgoda-no-xgettext-->
### `ine`
<!--/qgoda-no-xgettext-->

Like [`ne`](#ne) but ignores case for the comparison.

<!--qgoda-no-xgettext-->
### `ige`
<!--/qgoda-no-xgettext-->

Like [`ge`](#ge) but ignores case for the comparison.

<!--qgoda-no-xgettext-->
### `igt`
<!--/qgoda-no-xgettext-->

Like [`gt`](#gt) but ignores case for the comparison.

<!--qgoda-no-xgettext-->
### `ile`
<!--/qgoda-no-xgettext-->

Like [`le`](#le) but ignores case for the comparison.

<!--qgoda-no-xgettext-->
### `ilt`
<!--/qgoda-no-xgettext-->

Like [`lt`](#lt) but ignores case for the comparison.

<!--qgoda-no-xgettext-->
### `==`
<!--/qgoda-no-xgettext-->

Returns true if the value of the variable in the other document is numerically equal to the value specified.
For example `1.0` and `1` and `+1` are all numerically equal.

<!--qgoda-no-xgettext-->
### `!=`
<!--/qgoda-no-xgettext-->

Returns true if the value of the variable in the other document is numerically not equal to the value specified.

<!--qgoda-no-xgettext-->
### `>=`
<!--/qgoda-no-xgettext-->

Returns true if the value of the variable in the other document is numerically greater or equal than the value specified.

<!--qgoda-no-xgettext-->
### `>`
<!--/qgoda-no-xgettext-->

Returns true if the value of the variable in the other document is numerically greater than the value specified.

<!--qgoda-no-xgettext-->
### `<=`
<!--/qgoda-no-xgettext-->

Returns true if the value of the variable in the other document is numerically less or equal than the value specified.

<!--qgoda-no-xgettext-->
### `<`
<!--/qgoda-no-xgettext-->

Returns true if the value of the variable in the other document is numerically less than the value specified.

<!--qgoda-no-xgettext-->
### `=~`
<!--/qgoda-no-xgettext-->

Returns true if the value of the variable in the other document matches the value specified as a Perl regular expression.

<!--qgoda-no-xgettext-->
### `!~`
<!--/qgoda-no-xgettext-->

Returns true if the value of the variable in the other document does not match the value specified as a Perl regular expression.

<!--qgoda-no-xgettext-->
### `contains`
<!--/qgoda-no-xgettext-->

Returns true if the value of the variable in the other document is an array (a list) the value specified is contained in that array.

<!--qgoda-no-xgettext-->
### `icontains`
<!--/qgoda-no-xgettext-->

Like [`contains`](#contains) but case is ignored for the comparison.

## Filtering Results are Cached

Applying filters to a large set of documents is potentially expensive. However,
you pay the price only once. All results of filtering operations are cached
in memory, even when you shuffle the order of the conditions in the filter.

## Can Filters Be ORed Together?

No.

This is a deliberate design decision that favors a simple and comprehensible
syntax over flexibility. If you need a logical or, you can achieve that by template code
yourself. [Template Toolkit](http://www.template-toolkit.org/) gives you all
the operators you need.

Besides, it seems to be hard to find a use case for ORed conditions.
