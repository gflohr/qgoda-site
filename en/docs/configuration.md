---
title: Configuration
name: configuration
section: miscellaneous
view: docs.html
description: How to modify the behavior of Qgoda.
---
The Qgoda configuration is straightforward and has sane defaults. In fact,
Qgoda runs without any configuration and you only have to configure Qgoda,
when you want to change a certain behavior.

## Configuration Files

Qgoda has two optional configuration files, `P:_config.yaml` and
`P:_localconfig.yaml`. You can also use the file extension `.yml` if you
prefer.

<figure>
  <img src="/images/configuration/configuration-layers.svg"
       alt="Qgoda Configuration Layers">
  <figcaption class="figure-caption text-xs-center">
    The different configuration layers of Qgoda
  </figcaption>
</figure>

The configuration found in `P:_config.yaml` overrides the built-in defaults,
and the configuration found in `P:_localconfig.yaml` overrides both
`P:_config.yaml` and the the built-in defaults.

More precisely, each layer of configuration is merged with the previous one
and overrides only those parts that differ.

You can always check the actual configuration used with the command
`qgoda config` which dumps the resulting configuration to the console.

## Why `_localconfig.yaml`?

Qgoda, like most static site generators, works very well with
[git](https://git-scm.com/) and you may want to publish the site sources
to a public git repository.

But what if you have to put API keys, secrets, private information, local
hostnames or local debugging settings into the configuration? In all these
cases you can use `_localconfig.yaml`. You will normally not commit that
file to the public repository but use it for local use only.

## Accessing Configuration Variables From Templates

The entire configuration of the site is accessible in the template variable
`V:config`:

<!--qgoda-no-xgettext-->
[% TAGS [@ @] %]
```tt2;line-numbers
<html>
  <head>
    <title>[% config.title | html %]
  </head>
  <body>
    <h1>[% config.title | html %]</h1>
    <div>[% asset.content %]</div>
  </body>
</html>
```
<!--/qgoda-no-xgettext-->

This is how you would access the configuration variable `C:title` from a
template.

## JSON Schema

In order to protect you against incorrect configurations, your settings are
validated against a [JSON schema](https://json-schema.org/). You can even
see that schema with the command `qgoda schema`.  Try `qgoda schema --help`
for information about different output formats of the schema.

While writing a schema is not that trivial, reading it is relatively easy.

### Implementation

Reading the configuration and validating it against the schema is done in
JavaScript with [Ajv](https://ajv.js.org/), an advanced and fast validator.
The Qgoda configuration schema complies to draft 07 of the JSON schema
specification.

### Defaults

The defaults for all configuration options are part of the schema.

### Type Coercion

JSON schema is strict about data types. If an array is expected for a certain
configuration variable it would normally be a mistake to give a string.  But
Qgoda uses type coercion and will automatically convert a single value into
an array for you.

Likewise, a boolean option actually requires either `true` or `false`. With
type coercion you can use `0`, an empty string or `null` as an alias for
`false`, and pretty much everything else is interpreted as `true`. See the
complete table at https://github.com/ajv-validator/ajv/blob/master/COERCION.md
for the complete story.

## Program Paths

It is very often necessary to configure a path to a program in `P:_config.yaml`
for example in `C:helpers` or `C:po.xgettext` or others. This is a special
case where [type coercion](#type-coercion) helps you to simplify the
configuration.

### Without Arguments

If the program does not take any arguments, you can pass it as a single
string, for example:

<!--qgoda-no-xgettext-->
```yaml
helpers:
  assets: webpack
```
<!--/qgoda-no-xgettext-->

### With Arguments

If the program should be invoked with arguments, use an array instead:

<!--qgoda-no-xgettext-->
```yaml
helpers:
  assets:
  - webpack
  - --progress
  - --colors
  - --watch
```
<!--/qgoda-no-xgettext-->

Or use this equivalent syntax for arrays:

<!--qgoda-no-xgettext-->
```yaml
helpers:
  assets: ['webpack', '--progress', '--colors', '--watch']
```
<!--/qgoda-no-xgettext-->

## Adding Your Own Configuration Variables

You can add your own configuration variables in the "slots" `C:global`,
`C:site`, `C:local`, and in every other slot that starts with an underscore
"_".  This rule is currently not enforced but it will be in the future.

A "slot" is a top-level configuration key. All "slots" used by Qgoda have a
fixed syntax and you must adhere to it. This is a meant as a protection against
typos.  As a consquence, you cannot add a configuration variable `paths.home`
because the "slot" or namespace `C:paths` is already taken by Qgoda.

This, however, would be safe:

<!--qgoda-no-xgettext-->
```yaml
local:
  paths:
    images: _assets/images
  author: Yours truly <yours.truly@example.com>
  noodle:
    api-key: eC0GFio3Tz==
```
<!--/qgoda-no-xgettext-->
