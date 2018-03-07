---
title: Qgoda - Ein Static Site Generator
location: /{lingua}/talks/dpw-2018/index.html
start: 1
---
## [ˌyaːgoda]

<ol>
[% FOREACH section IN asset.nav.sections %]
  <li>[% section.title | html %]
    <ol>
  [% FOREACH doc IN section.docs %]
      <li><a href="[% doc.asset.permalink %]">[% doc.asset.title | html %]</a></li>  
  [% END %]
    </ol>
  </li>
[% END %]
</ol>
