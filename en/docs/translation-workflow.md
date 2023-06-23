---
title: Translation Workflow
name: translation-workflow
section: multilanguage
view: docs.html
description: Creating translation catalogs, translating and updating them.
---
Somehow translating something from language into another by software and some
kind of translation database is a trivial thing. This is the reason why there
are countless translation frameworks out there.

Almost all of them have at least one of two common problems:

* They ignore that translatable strings should be automatically extracted from
source code. But copying strings manually into a translation file is a tedious
and errorprone task.
* Source code, be it programming code or the markdown code of your blog posts
may change over time. Whenever the original is touched, you want to apply these
changes with minimal effort to the other language variants. You certainly
don't want to start with the translation from scratch, neither for the entire
project or a particular string.

Qgoda's internationalization (i18n) is based on
[GNU gettext](https://www.gnu.org/software/gettext/). GNU gettext is the
de-facto standard for translating free and open-source software, and it
really shines by its set of mature tools that automate the task of
translation management to the extent possible.

If you want to dig deeper into the topic or if something is unclear, you can
always consult the [GNU gettext documentation](https://www.gnu.org/software/gettext/manual/gettext.html)
for the "big picture". This page covers mostly the qgoda-specific topics
only. But it should be enough to get you started.

<qgoda-toc/>

[% USE q = Qgoda %]
[% TAGS [@ @] %]

## Prerequisites

### GNU Gettext

Since Qgoda's internationalization is based on
[GNU gettext](https://www.gnu.org/software/gettext/) you have to install
it first. GNU gettext is available for every platform, including Microsoft
Windows. But it is often split up into two packages "gettext-runtime" and
"gettext-tools". Make sure that you install "gettext-tools" which contains
the necessary tools.

### Git

You also need [git](https://git-scm.com/). Git is available on all platforms.

### Minimal Configuration

It is also assumed that you have read the chapters 
[@ q.lanchor(name='multilanguage-configuration') @] and
[@ q.lanchor(name='translating-templates') @] so that there is something to
translate.

The minimal configuration you need are the variables `C:linguas` and
`C:po.textdomain`. Put something like this into `P:_config.yaml`:

```yaml;line-numbers
linguas:
    - en
    - de
    - fr
po:
    textdomain: com.your-site.www
```

The order of languages (line 1) matters! The first one is the default language
of your site. If you want to follow the examples on this page, make sure that
`C:linguas` contains at least two languages, one for your default language and
at least one that can contribute translations.

The textdomain is not really important. You can pretty much pick any identifier
you want.

## The `po` Sub-Command

Most tasks are done with the sub-command `qgoda po`. Try `qgoda po --help`
for a reference.

Please note that you have to run the command `qgoda po` from the top-level
directory of your site! Failure to do so will usually result in an error
message "configuration variable “po.textdomain” not set" (because Qgoda cannot
find your configuration).

## Stages Of the Workflow

The translation workflow consists of several steps.  You can perform the 
steps individually (that is described below) or you all at once with the
command `qgoda po all`, which will do all necessary steps at once.  This
will usually result in some unnecessary actions but is easier to remember

Nevertheless, you should go at least once over the rest of the page so that
you understand what is going on and how to translate things.

[@ WRAPPER components/infobox.html
           type='warning' title='Create at least one translation file!' @]
The command <code>qgoda po all</code> will fail until you have created your
first translation file! See
<a href="#adding-a-language">Adding a Language</a> below how to do this.
[@ END @]

### Creating the POTFILES

The subdirectory `P:_po` will later contain everything that is needed for
translating your site. The file `_po/POTFILES` should contain a list of files
that have translatable strings. You can create it by hand or easier like
this:

```shell;line-numbers
$ qgoda po potfiles
[info][config] reading configuration from '_config.yaml'
[info] creating “_po”
[info] creating “_po/Makefile”
[info] cloning git repository “https://github.com/gflohr/Template-Plugin-Gettext-Seed”
Cloning into '/var/folders/54/b5jrb7hs2191y9nh2w5d0j7w0000gn/T/0ObN0NZ837'...
remote: Enumerating objects: 21, done.
remote: Counting objects: 100% (21/21), done.
remote: Compressing objects: 100% (15/15), done.
remote: Total 21 (delta 4), reused 0 (delta 0)
Receiving objects: 100% (21/21), 11.18 KiB | 11.18 MiB/s, done.
Resolving deltas: 100% (4/4), done.
[info] creating “_po/PACKAGE”
[info] creating “_po/PLFILES”
[info] creating “_po/.gitignore”
[info] creating “_po/qgoda.inc”
[info] writing “_po/POTFILES”
[info][plugin-loader] initializing plug-ins.
[info] writing “_po/MDPOTFILES”
```

As you can see in line 5 a git repository with the necessary infrastructure
is cloned.  All files reside in the directory `P:_po`. The file `_po/POTFILES`
will contain a list of files that can potentially contain translatable strings.

There are two more "POTFILES":

* `_po/PLFILES`: If your side uses internatioinalized Perl code, list the
file names here, so that their strings get automatically translated, too.
* `_po/MDPOTFILES`: This will contain all of your content files that have to
be translated if you also want to translate your content with PO files.
See [@ q.lanchor(name='po-translations') @] for more information..

[@ WRAPPER components/infobox.html
           type='info' title='Use a Makefile' @]
You may have noticed that Qgoda has also created a
<code>Makefile</code> for all the `make` aficionados
out there (like me). You can <code>cd</code> into
<code>_po</code> and type <code>make</code> to see
all the targets that the Makefile supports. You are,
however, on your own creating the various `POTFILES`,
pull requests welcome!
[@ END @]

### Creating the PO Template (`.pot`) File

The main translation catalog is stored as a so-called PO template 
file under `_po/TEXTDOMAIN.pt`, where `TEXTDOMAIN` is the textdomain you have
configured in the configuration variable `C:po.textdomain`.

A `.pot` file has the same format as normal `.po` files only that it contains
only the original strings and no translations. You should never edit it,
because it gets overwritten, whenever you extract new strings.

You create the file like this:

```bash
$ qgoda po pot
[info][config] reading configuration from '_config.yaml'
[info] execute: xgettext 
...
```

You will see *a lot* of output which you can safely ignore as long as you
don't see an error message.

### Adding a Language

While setting up i18n and then whenever you add a language to your site
you have to initialize a `.po` file for that language and add it to the
configuration variable `C:linguas` in `P:_config.yaml`:

```yaml
linguas:
    - en
    - fr
    - de
```

You also have to initialize a `.po` file for it:

```bash;line-numbers
$ cd /path/to/your/site
$ cd _po
$ msginit --input=com.example.www.pot --locale=de
The new message catalog should contain your email address, so that users can
give you feedback about the translations, and so that maintainers can contact
you in case of unexpected technical problems.

Is the following your email address?
  guido@yourcomputer.local
Please confirm by pressing Return, or enter your email address.
guido.flohr@cantanea.com
Retrieving http://translationproject.org/team/index.html... done.
A translation team for your language (de) does not exist yet.
If you want to create a new translation team for de, please visit
  http://www.iro.umontreal.ca/contrib/po/HTML/teams.html
  http://www.iro.umontreal.ca/contrib/po/HTML/leaders.html
  http://www.iro.umontreal.ca/contrib/po/HTML/index.html

Created de.po.
```

You will be prompted for your email address so that the copyright
information in the `.po` file can be initialized.

The command `msginit` has two mandatory arguments (see line 3 above):

* `--input` is the name of your `.pot` file
* `--locale` is the language identifier

The command has created a `.po`  file for your language (see line 19) that
can now be translated.

### Updating Translations

When strings are added or modified, the translations have to be updated.
That requires the following steps:

* a new `POTFILES` that contains the updated list of source files
* a new `.pot` file that contains the new set of translatable strings
* mergint the `.pot` file into the existing `.po` translation files with the
  command `msgmerge`

This is done with `qgoda po update-po`:

```bash
$ qgoda po update-po
[info][config] reading configuration from '_config.yaml'
[info] merging de.po
[info] rename “de.po” to “de.old.po”
[info] execute: msgmerge de.old.po com.example.www.pot --previous -o de.po
. done.
[info] unlink “de.old.po”
```

When you have more content to translate this may take considerable time 
because `msgmerge` is trying to do the merge in a smart manner so that you
don't lose existing translations.

After this step, your translation files are up-to-date and can be translated.

### Translating the `.po` Files

The `.po` format is accepted by many professional translators. If you want
to translate the file yourself, do not use your normal text editor (unless
it is emacs) but use a specialized tool for it. Search the web for "PO
Editor" and you will find a number of free programs.

For now, just open the `.po` file in your editor. You will see lots of 
entries like this:

```bash
#: ../_views/partials/body.html:4
msgid "Hello, world!"
msgstr "Hallo, Welt!"
```

The string after `msgstr` is the translation. Try to translate at least one
string that is easy to recognize, when you rebuild your site.

### Compile the `.po` Files

The `.po` files are not immediately used for looking up translations but are
compiled into binary `.mo` files. The compilation also checks the `.po` file
for syntax errors and semantic errors.

You can perform this step with `qgoda po mo`:

```bash;line-numbers
$ qgoda po update-mo
[info][config] reading configuration from '_config.yaml'
[info] execute: msgfmt --check --statistics --verbose -o de.gmo de.po
de.po:7: warning: header field 'Project-Id-Version' still has the initial default value
de.po: 1 translated message.
```

You can fix the warning (line 4) by editing the first entry of the `.po`
file and fill in the missing information.

In the last line you will see statistics about your translations, in particular
the number of translated and untranslated strings and fuzzy translations.

[@ WRAPPER components/infobox.html
           type='info' title='Fuzzy Translations' @]
Fuzzy translations are translations that have been automatically created
by <code>msgmerge</code> but have to be reviewed by a human. These translations
are *not* used until the fuzzy mark is removed from them. See the documentation
of your PO editor for more information.
[@ END @]

### Install the Translations

The last step is to install and use the translation:

```bash
$ qgoda po install
[info][config] reading configuration from '_config.yaml'
[info] create directory “/path/to/your/site/LocaleData/de/LC_MESSAGES”
[info] copy “de.gmo” to “/path/to/your/site/LocaleData/de/LC_MESSAGES/com.example.www.mo”
```

The directory `P:LocaleData` contains the compiled translations. You should
add it to the [files to be excluded]([@ q.lanchor(name='excluding-files') @]) by
Qgoda.

The next time you rebuild your site with `qgoda watch` or `qgoda build`
the translated strings should be visible in their respective document
versions.

[@ WRAPPER components/infobox.html
           type='warning' title='Translations are cached!' @]
By default, translations are cached, and new translations are not automatically
visible. You can prevent that at the prize of a minimal performance penalty
by setting the configuration variable <code>C:po.reload</code> to 1.
[@ END @]

## Conclusion

The above explanation is relatively detailed. Under normal circumstances you
can just type `qgoda po all` before everything that has to do with
translations and you're done.
