---
title: Configuration 
name: multilanguage-configuration
section: multilanguage
view: docs.html
description: All configuration variables required for a fully internalized site
---
Internationalization (i18n) in Qgoda has to be explicitely activated in the configuration file `P:_config.yaml`.

<qgoda-toc/>

## Global Configuration

A typical multilanguage configuration in `P:_config.yaml` looks like this:

```yaml
linguas: [en-us, bg, de]
po:
  textdomain: net.qgoda.www
  msgid_bugs_address: Guido Flohr <guido.flohr@cantanea.com>
  copyright_holder: cantanea EOOD <http://www.cantanea.com/>
  reload: 1
```

### `linguas`

This is a list of language identifiers complying to [RFC4647 section 2.1](https://tools.ietf.org/html/rfc4647#section-2.1) but without any asterisk (`*`) characters. An asterisk would not make sense here anyway.

The first language is the default language of your site.

The variable is mandatory!

### `po.textdomain`

An arbitrary identifier for your website. The only restriction is that it has to be a valid filename for your operating system. Popular choices are the reverse hostname of your site (like `net.qgoda.www`) or just a simple string like `messages`. It really doesn't matter much.

This variable is also mandatory.

### `po.msgid_bugs_address`

An address where translators should report problems with the original text to translate. The variable is optional.

### `po.copyright_holder`

The copyright holder of the original content. The variable is optional.

### `po.reload`

Set to 1 if you want translations to be visible immediately after they have been compiled into `.mo` files.

Normally translations are loaded only, when Qgoda starts and then cached. Setting `C:po.reload` to 1 results in a little performance penalty but may be useful while you are translating the site.

### `po.md_extra`

A list of [file name patterns]([% q.llink(name='pattern-lists') %]) for additional markdown files. By default, all documents with front matter are potentially considered translatable. If your site has other markdown files that should also be searched, you can list them here.

This variable is optional and rarely used. 

### `po.views`

A list of [file name patterns]([% q.llink(name='pattern-lists') %]) for template files to search for translatable strings. It defaults to just `P:_views` or whatever the configuration variable `C:path.views` points to.

### `po.xgettext_tt2`

The location of the `xgettext_tt2` program if it is not in `$PATH`. The `xgettext_tt2` ships with [Template-Plugin-Gettext](https://github.com/template-plugin-gettext) which is automatically installed with Qgoda.

### `po.xgettext`

The location of the `xgettext` program if it is not in `$PATH`. The `xgettext` program is normally installed as part of a software package called `gettext` or `gettext-tools`.

### `po.msgfmt`

The location of the `msgmerge` program if it is not in `$PATH`. The `msgmerge` program is normally installed as part of a software package called `gettext` or `gettext-tools`.

### `po.msgmerge`

The location of the `msgmerge` program if it is not in `$PATH`. The `msgmerge` program is normally installed as part of a software package called `gettext` or `gettext-tools`.

### `po.qgoda`

The location of the `qgoda` program if it is not in `$PATH`.

### `po.from_code`

The character set of your content, defaults to `utf-8`. Setting this variable to anything else but `utf-8` is a recipie for trouble.

## Configuring the Document Language

Qgoda has to know which language a particular document is written in. This mean in practice that you have to set the `V:asset.lingua` to an appropriate value, that is a language identifier complying to [RFC4647 section 2.1](https://tools.ietf.org/html/rfc4647#section-2.1) but without any asterisk (`*`) characters.

You have several options to set `V:asset.lingua`:

### Per Document

You can set the language in the document front matter:

```yaml
---
title: Kalevala
lingua: fi
---
```

### Per Directory/Pattern

You can save typing by specifying defaults for `V:asset.lingua` in the global configuration file `P:_config.yaml`:

```yaml
defaults:
  - files: 
      - /en
      - *.en.md
    values:
      lingua: en
```

This would set `V:asset.lingua` to `en` for all files in the top-level directory `/en` and addtionally for all files that have names ending in `.en.md`. See [% q.lanchor(name='defaults') %] and [% q.lanchor('pattern-lists') %] for more information.