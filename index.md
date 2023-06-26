---
view: landing.html
title: Qgoda - The Multilingual Static Site Generator
location: /index.html
permalink: /
chain: html
wrapper: html
description: Qgoda (Ягода) is a static site generator with a strong focus on multi-linguism and flexibility, written in Perl and JavaScript and extensible with Python, Ruby, Java, and more.
lingua: en
scripts: [/js/negotiate-language.js]
name: 'language-negotiator'
multilang: false
---
<qgoda-no-xgettext>
<script>
var lingua,
	default_lingua = '[% config.linguas.0 %]',
	supported = {};
[% FOREACH lingua IN config.linguas %]
	supported['[% lingua %]'] = true;
[% END %]

for (i = 0;  
	 navigator.languages != null && i < navigator.languages.length; 
	 ++i) {
	var lang = navigator.languages[i].substr(0, 2);
	if (supported[lang]) {
		lingua = lang;
	}
}

if (lingua == null) {
	lingua = navigator.language || navigator.userLanguage;
	if (lingua != null) {
		lingua = lingua.substr(0, 2);
	}
}

if (!supported[lingua])
	lingua = default_lingua;

// This is based on the assumption that the start URI for language 'xy'
// is '/xy'. Change that to your needs!
document.location.href = '/' + lingua;
</script>
[% USE q = Qgoda %]
[% q.include('_includes/' _ asset.lingua _ '/landing-page/header.md', asset) %]
[% q.include('_includes/' _ asset.lingua _ '/landing-page/main-features.md', asset) %]
[% q.include('_includes/' _ asset.lingua _ '/landing-page/about.md', asset) %]
</qgoda-no-xgettext>
