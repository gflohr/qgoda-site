---
title: Translating Templates
name: translating-templates
section: multilanguage
view: docs.html
description: How to get text inside templates translated
---
Internationalizing Template Toolkit templates is very easy with the help of the module [`Template-Plugin-Gettext`](https://github.com/gflohr/Template-Plugin-Gettext).

<qgoda-toc/>

## Activating the Plug-In

Before you can use translation functions, you have to activate the plug-in:

[% USE q = Qgoda %]
[% TAGS [@ @] %]
```tt2
[% USE gtx = Gettext('com.example.www', asset.lingua) %]
```

This is done with the `USE` directive which takes two arguments. the The first argument is the so-called *textdomain*, an arbitrary string identifying your translation database.  The second one is the language of the file.  This is usually stored in the document property `V:lingua`.

Since you must always store your textdomain in the configuration variable `C:po.textdomain`, you can use the value of that variable instead of hard-coding the textdomain:

```tt2
[% USE gtx = Gettext(config.po.textdomain, asset.lingua) %]
```

Now you can easily change the textdomain without touching every template.

## Translating Strings

### Constant Strings

Strings are translated by passing them to the template function `gtx.gettext()`:

```tt2
<h1>[% gtx.gettext('Welcome to My Site') %]</h1>
```

When rendering, the function returns the translation for the string or the original string, when there is no translation for it. But it also serves as a marker, that is later used to extract all translatable strings so that they can be sent to translators.

If you prefer, you can also use Template Toolkit filters for translation:

```tt2
<h1>[% 'Welcome to My Site' | gettext %]</h1>
```

This does exactly the same.

### Variable Strings

Sometimes strings contain variable parts:

```tt2
<small>Written by [% asset.author %] ([% asset.organization %])</small>
```

The recommended way to translate such strings uses the function `gtx.xgettext()`:

```tt2
<small>[% gtx.xgettext('Written by {author} ({organization})',
                       author = asset.author
                       organization = asset.organization) %]</small>
```

You use placeholders for the variable part, and pass the value for each placeholder as named arguments to the function. Placeholders can be arbitrary identifiers.

### Plural Forms

Languages largely differ in the way they handle plural forms and strings. If a string contains a (cardinal) number you should try to help translators by using the specialized plural function `gtx.nxgettext()`:

```tt2
<em>[% gtx.ngettext('One comment', '{num} comments', 
                    asset.num_comments,
                    num = asset.num_comments) %]</em>
```

The first argument is the singular form of the string, the second one is the plural form. The third argument is the number of items used (so that the function can pick the correct plural form for a particular language).

The other arguments are the values for the placeholder(s) used.

Yes, this is a little bit tedious but still as simple as this problem can probably be solved. You might think, why not just use an `IF` clause?

```tt2
[% IF assset.num_comments == 1 %]
<em>[% gtx.gettext('One comment') %]</em>
[% ELSE %]
<em>[% gtx.xgettext('{num} comments', 
                    num = asset.num_comments) %]</em>
[% ENDIF %]
```

That will in fact work for a number of languages but for example for Russian your translator will contact you and tell you that it cannot be accurately translated.

### Other Variants

There are a lot more variants of the translation functions, for example strings containing plural forms. See the [documentation for the Gettext plugin](https://github.com/gflohr/Template-Plugin-Gettext) and its [API documentation](https://github.com/gflohr/Template-Plugin-Gettext/blob/main/lib/Template/Plugin/Gettext.pod#user-content-FUNCTIONS) for details.

## Complicated Strings

One golden rule in (software) internationalization is: Do not assemble strings!

Do *not* do this:

```tt2
[% gtx.gettext('See the documentation at') %]
<a href="http://www.a.com/">A</a>
[% gtx.gettext('and') %]
<a href="http://www.b.com/">B</a>
[% gtx.gettext('for more information!') %]
```

This gives your translators a hard time, and sometimes it will not be possible at all to translate such constructs into a particular language.

Do this instead:

```tt2
[% xgettext('See the documentation at <a href="{link1}">A</a>
             or <a href="{link2}">B</a> for more information!',
            link1 = 'http://www.a.com',
            link2 = 'http://www.b.com') %]
```

## Missing Translations

What if a certain string has not been 
[translated]([@ q.llink(name='translation-workflow') @]) yet? The gettext way of
handling that situation is to use the original string, that is the string
in the main language of your site. That's not perfect but better than nothing
and you can always remedy it by providing a translation.

## Troubleshooting

A very common problem is that `gtx.gettext()` seems to return an empty string. The reason is almost always that you have forgotten to activate the `Gettext` plug-in. See [above](#activating-the-plug-in) how to fix that.
