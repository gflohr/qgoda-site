---
location: /{lingua}/news/index.html
title: News 
view: docs.html
readMore: Read More 
dateFormat: "%b, %d %Y"
---
<!--QGODA-NO-XGETTEXT-->
[% USE q = Qgoda %]
[% PROCESS "functions/css-modules.tt" %]
[% posts = q.llistPosts().nsortBy('date.epoch') %]
[% FOREACH post IN posts %]
<div class="[% css.qgoda.teaser %]">
  <h2>
    <a href="[% post.permalink %]" class="[% css.qgoda.teaser_link %]">
  [% post.title %]
    </a>
  </h2>

  <div class="[% css.qgoda.teaser_date %]">
    <a href="[% post.permalink %]" class="[% css.qgoda.teaser_link %]">
      <i class="fa fa-clock-o"></i>&nbsp;[% q.strftime(asset.dateFormat, asset.date, asset.lingua) %]
    </a>
  </div>

  <p>
    <a href="[% post.permalink %]" class="[% css.qgoda.teaser_link %]">
      [% post.excerpt %]
    </a>
  </p>

  <a href="[% post.permalink %]" class="btn btn-warning">[% asset.readMore %]</a>
</div>
[% END %]
<!--/QGODA-NO-XGETTEXT-->
