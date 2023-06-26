---
title: Dates
name: dates
section: lists-and-indices
view: docs.html
description: >
    Asset dates in Qgoda are magic. They are at the same time numbers
    (seconds since the epoch) and objects with methods that give you
    the year, the month, the day, or the date formatted according to
    certain specifications, for example RFC822 or W3C.
---
Every Qgoda document or asset has a `date` property, either implicitely or
explicitely.

<qgoda-toc/>

## Specifying the Document Date

The variable `V:asset.date` contains the date of the document as seconds
since the <q-term>epoch</q-term>. If you want to use it in a document, you
should always explicitely specify in the document <q-term>front matter</q-term>:

```yaml
---
title: Qgoda Rocks!
date: 2018-11-07
---
It's a sad and beautiful world.
```

The way you specify the date is pretty much free-form, and you can also
include the hour, minutes and seconds. See
https://metacpan.org/pod/Date::Parse#EXAMPLE-DATES for various supported
formats.

If you do not specify an explicit value for the date and time of a document
it defaults to the last modification time of the originating file.

## Using the Date

You can use the date and time like any other template variable:

[% USE q = Qgoda %]
[% TAGS [@ @] %]
```tt2
Document created: [% asset.date %].
```

This would generate output like "Document created: 1541622661". The number
1541622661 are the seconds since the <q-term>epoch</q-term>. That is great
for computers but not so great for humans. But you can do better by calling
methods of the magic date object:

<!--qgoda-no-xgettext-->
```tt2
Document created: [% asset.date.year %]-[% asset.date.month %]-[% asset.date.mday %]
```
<!--/qgoda-no-xgettext-->

This would now give something like "Document created: 2018-11-07".

The following methods are available:

| Name                | Meaning                                               |
| ------------------- | ----------------------------------------------------- |
| epoch               | The seconds since the <q-term>epoch</q-term>.  You can just as well omit it because it is the default.
| year                | The year part.
| month               | The zero-padded month, "01", "02", ... "12".
| imonth              | The month as a number, "1", "2", ... "12".
| mday                | The zero-padded day of the month, "01", "02", ... "31".
| imday               | The day of the month as a number , "1", "2", ... "31".
| day                 | The same as `mday`.
| iday                | The same as `imday`.
| hour                | The zero-padded hour of the day, "01", "02", ... "24".
| ihour               | The hour of the day, "1", "2", ... "24".

As you can see, a leading `i` (think: integer) stands for numbers as regular
integers. Without it, they are zero-padded.
