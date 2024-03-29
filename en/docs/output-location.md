---
title: Output Location
name: output-location
section: basics
view: docs.html
description: Learn how input locations are translated to output locations in Qgoda.
---
Please note that determining the output location for assets differs
significantly from other systems for example Jekyll.  Whereas in Jekyll you
normally set the permalink of an asset, in Qgoda you normally set the 
output path and the permalink is computed from the path.  The result is
very similar but maybe more flexible.

By default, an asset's location is simply preserved.  That means if you have an
asset `{srcdir}/assets/images/logo.jpeg` it will be copied to
`{sitedir}/assets/images/logo.jpeg`. 

<!--qgoda-no-xgettext--><qgoda-toc /><!--/qgoda-no-xgettext-->

## Path Translation

Processed assets are subject to path translation.  Their relative path to
the site directory is by default modified.  With the default configuration
the asset `{srcdir}/pages/en/about-qgoda.htm` would end up as 
`{sitedir}/pages/en/about-qgoda/index.htm` and the markdown input file
`{srcdir}/posts/en/version-0.2-released.md` would end up as
`{sitedir}/posts/en/version-0.2-released/index.html`.

For the gory details of the process, let's take the input location 
`{srcdir}/posts/en/version-0.2-released.md` as an example.

The starting point is the relative path to the source directory
`/posts/en/version-0.2-released.md` which has the following components:

<dl>
  <dt>posts/en</dt>
  <dd>The directory portion.</dd>
  <dt>version-0.2-released</dt>
  <dd>The basename, that is the filename portion without the suffix or suffixes.</dd>
  <dt>md</dt>
  <dd>The suffix or filename extension.</dd>
</dl>

By default the output location of a document in Qgoda relative to the 
configured site directory is
`{directory}/{basename}/{index}.{suffix}`.  The variable `index`
has the default value "index" which is no coincidence but the default value
used by all common web servers.

## Suffix Translation

Asset processing is triggered by the suffixes of the source file.  The triggers
are defined in the variable `C:processors.triggers` in the site configuration
file `P:_qgoda.yaml`.  Look at this excerpt of the Qgoda default configuration:

```yaml
processors:
    triggers:
        md: markdown
        html: html
        htm: html
    chains:
        markdown:
            modules: [Markdown, HTML]
            suffix: html
            wrapper: html
        html:
            modules: HTML
   modules:
       Markdown: Markdown
       HTML: Template::Toolkit
```

The suffix `md` triggers the processor chain `markdown`.  This chain
has configured an output suffix `html`.  The translated filename of the
output file is therefore not `index.md` but `index.html`.

The processor chain `html` does *not* define an output suffix.  The suffix is 
therefore left untouched.

## Multiple Suffixes

A filename can have multiple suffixes, for example 
`what-is-qgoda.md.utf8.fr`.  This is useful for content negotiation as
implemented in the popular Apache web server.  When doing suffix translation,
Qgoda translates the rightmost suffix.  The example filename would therefore
be translated into `what-is-qgoda/index.md.utf8.fr`. 

It is also important to note that all suffixes are considered for processor 
chain selection.  The rightmost suffix "wins".  If you have a filename
`example.html.md` the markdown processor chain will be selected because
`md` is right of `html`.

## Gory Details of Suffix Parsing

You may have noticed in one the above example the filename 
`version-0.2-released.md` which gets translated into 
`version-0.2-released/index.md`.  Obviously only `md` is considered a suffix
and `2-released` is not.

Qgoda's notion of a suffix is a string of one or more alphanumerical
characters.  Since `2-released` contains a hyphen, it is not considered
a suffix.

Suffixes are extracted right to left, stopping at the first false positive.
Take `version-0.22.beta-released.utf8.en.md` as a rather esoteric example.
The software would consider `md`, `en`, `utf8` suffixes and stop then
because `beta-released` contains a non-alphanumerical character.  Although
`22` (before the string "beta") contains only alphanumerical characters
because the suffix extraction had already stopped.

## Permalinks

Permalinks are computed from the output location.  By default, they are 
simply the relative path to the site directory.  If the filename portion
of the output location matches the configured index string (normally
"index") followed by one or more suffixes the filename is stripped off.

For example `posts/en/about-qgoda/index.utf8.md` would be translated into
the permalink `/posts/en/about-qgoda/`.

## Customization

You can fully customize both output location and permalinks by setting the
variables `C:location` or `C:permalink` respectively in the front matter of an
asset, as a default for a certain directory or site wide in `C:_qgoda.yaml`.

You can interpolate all kinds of asset variables into the configured string
by placing them inside {curly} braces.  For example the default configuration
for the variable `C:location` is `/{directory}/{basename}/{config.index}.{suffix}`.

The following variables are meaningful for location and permalink 
customization:

<dl>
  <dt>path</dt>
  <dd>The absolute path of the asset.</dd>
  <dt>relpath</dt>
  <dd>The relative path of the asset, without a leading slash.</dd>
  <dt>directory</dt>
  <dd>The directory portion of "path" without a leading or trailing slash.  
      This will be the empty string for assets in the top-level source
      directory.</dd>
  <dt>filename</dt>
  <dd>The current filename</dd>
  <dt>basename</dt>
  <dd>The basename portion of the filename (without suffix/suffixes).</dd>
  <dt>suffix</dt>
  <dd>The suffix (resp. suffixes) with a leading dot, subject to translation.
      If there are no suffixes the variable does not exist.</dd>
  <dt>config</dt>
  <dd>The site configuration as read from "_qgoda.yaml"</dd>
  <dt>date</dt>
  <dd>The date of the asset.  Do not use directly but one of the
      subkeys below.</dd>
  <dt>date.epoch</dt>
  <dd>Seconds since the Epoch (00:00:00 UTC, January 1, 1970)</dd>
  <dt>date.year</dt>
  <dd>The four-digit year.</dd>
  <dt>date.month</dt>
  <dd>The two-digit month (01-12).</dd>
  <dt>date.imonth</dt>
  <dd>The month (1-12) without the leading zero.</dd>
  <dt>date.mday</dt>
  <dd>The two-digit day of the month (01-31).</dd>
  <dt>date.imday</dt>
  <dd>The day of the month (1-31) without the leading zero.</dd>
  <dt>date.day</dt>
  <dd>A synonym for "date.mday".</dd>
  <dt>date.iday</dt>
  <dd>A synonym for "date.imday".</dd>
  <dt>date.hour</dt>
  <dd>The hour of the day (01-24).</dd>
  <dt>date.ihour</dt>
  <dd>The hour of the day (1-24) without the leading zero.</dd>
  <dt>date.hour12</dt>
  <dd>The hour of the day (01-12) on a 12-hour clock.</dd>
  <dt>date.ihour12</dt>
  <dd>The hour of the day (1-12) on a 12-hour clock without the leading zero.</dd>
  <dt>date.ampm</dt>
  <dd>The national representation of either "ante meridiem"
      (a.m.)  or "post meridiem" (p.m.)  as appropriate.  This can be
      an empty string, depending on the currently selected locale.</dd>
  <dt>date.min</dt>
  <dd>The minutes (01-59).</dd>
  <dt>date.imin</dt>
  <dd>The minutes (1-59) without the leading zero.</dd>
  <dt>date.sec</dt>
  <dd>The seconds (01-60).</dd>
  <dt>date.isec</dt>
  <dd>The seconds (1-60) without the leading zero.</dd>
  <dt>date.dst</dt>
  <dd>The string "DST" (may be translated!) if Daylight Savings Time is in use</dd>
  <dt>location</dt>
  <dd>The computed location of the document.  Before the location is computed,
      the variable is a synonym for "path".</dd>
  <dt>permalink</dt>
  <dd>The computed permalink of the document.  Before the permalink is computed,
      the variable is a synonym for `location`.</dd>
</dl>

Note that variables are not necessarily plain old strings but can be more
complicated.  Take this example configuration in YAML:

```yaml
dictionary:
    foo: 1 # dictionary.foo
    bar: 2 # dictionary['bar']
    baz: 3 # dictionary["baz"]
array:
    - Tom    # array[0]
    - Dick   # array.1 also works.
    - Harry  # array['2'], you can also use double quotes.
```

Quoted strings have JavaScript semantics!
