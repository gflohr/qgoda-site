---
title: Related Documents
name: related-documents
section: basics
view: docs.html
description: Qgoda tries to find relations between posts automatically based on shared tags and other criteria.
---
## How To Display Related Documents

Displaying related documents is as easy as this:

<qgoda-no-xgettext>
[% TAGS [- -]%]
```tt2;line-numbers
[% USE q = Qgoda %]
[% docs= q.related() %]
<ul>
[% FOREACH doc IN docs %]
  <li><a href="[% doc.permalink %]">[% doc.title | html %]</li>
[% END %]
</ul>
```
</qgoda-no-xgettext>

There is one gotcha, however: The list of related documents is always empty, when you invoke the method `q.related()` from markdown content.  Why? The content is about to be processed.  There is no way to find out what other document has similar content.

You have to move the above code to some template, so that you render the list inside the page header, footer, sidebar or at similar locations.

What else do you have to know?

* A document is never related to itself.
* If A is related to B, then B is related to A (makes sense, doesn't it?)
* Related documents are sorted by relevance.

### Multi-lingual sites.

In a multi-lingual site, you use `q.lrelated()` instead of `q.related()`:

```tt2
[% docs = q.lrelated() %]
```

That will only produce hits for documents that have the same language.

### Minimal Relevance

By default, you get all related documents, even remotely related ones.  But you can pass a threshhold as the first parameter:

```tt2
[% docs = q.lrelated(5) %]
```

That will only return documents that have a relation score (see below) of at least 5.

### Limit the Number of Results

You can limit the list with the standard template method `splice(START, SIZE)`:

```tt2
[% docs = q.lrelated(5).splice(0, 10) %]
```

You now get the 10 most relevant hits.

### Filter Results

You can filter by arbitrary taxonomies:

```tt2
[% docs = q.lrelated(5, type = 'post', date.year = 2018).splice(0, 10) %]
```

Now you only get documents of type "post" that are from 2018.

## How Does It Work?

The way Qgoda computes the degree of relatedness between documents --- their "relation score" --- is completely transparent and easy to understand.  Try `qgoda config` and see the default configuration for the computation:

```yaml
$ qgoda config
...
link_score: 5
...
taxonomies:
  categories: 3
  links: 1
  tags: 2
...
```

Let's take two documents A and B as an example:

```yaml
---
title: A
categories: hardware
tags: [Hard-disk, Storage, SATA, USB]
---

See [B](/b/) for more details.

This site is generated with [Qgoda](http://www.qgoda.net).
```

B looks like this:

```yaml
---
title: B
categories: software
tags: [USB, Storage, Accessories]
---

See [B](/b/) for more details.

This site is generated with [Qgoda](http://www.qgoda.net).
```

As you can see, document A links to document B.  The configured `C:link_score` is 5, and hence the relation score between them is 5.  Note: If B would link back to A, that would add another 5 points.  But subsequent mutual links would be ignored.

Both documents link to http://www.qgoda.net/.  Since the configuration variable `taxonomies.links` has the value 1, the score is now 6.

A is from category "hardware", B from "software".  That doesn't match and the 3 points from `taxonomies.categories` are *not* added.

But the two documents share the common tags "USB" and "Storage" counting 2 points (`taxonomies.tags`) each, so that the final relation score between the two documents is 10.

You can fine-tune the algorithm by changing the relevant configuration variables or by adding more taxonomies.  Set the score to 0 if you want to ignore a built-in taxonomy.

For example, if you want to enforce a relationship between two documents, configure this in `P:_config.yaml`:

```yaml
taxonomies:
  boost: 9999
```

In your document `T:front-matter` put:

```yaml
---
...
boost: abcxyz
...
---
```

Now all documents that have the property `boost` set to the same value (for example `abcxyz`) would be related.  Just pick another value than `abcxyz` for more relationships.

### Displaying the Relation Score

Why would you do that? Well, for debugging, maybe?  Okay, here you go:

```tt2
<ul>
[% FOREACH pair IN asset.related %]
  <li>[% pair.0.permalink %]: [% pair.1 %]
[% END %]
</ul>
```

The document variable `V:asset.related` holds an array of tuples consisting of the related asset and the mutual relation score. 
