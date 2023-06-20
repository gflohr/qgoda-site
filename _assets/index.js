// Bootstrap.
require('bootstrap');

require('./scss/bootstrap.scss');
require('./scss/font-awesome.scss');
require('./scss/prism.scss');

// Prism.
var Prism = require('prismjs');

// Prism languages.
require('prismjs/components/prism-clike');
require('prismjs/components/prism-markup-templating');
require('prismjs/components/prism-tt2');
require('prismjs/components/prism-yaml');
require('prismjs/components/prism-markdown');
require('prismjs/components/prism-perl');
require('prismjs/components/prism-bash');
require('prismjs/components/prism-javascript');
require('prismjs/components/prism-json');

// Prism plug-ins.
require('prismjs/plugins/line-numbers/prism-line-numbers');
require('prismjs/plugins/autolinker/prism-autolinker');

// Custom SCSS.
require('./scss/qgoda.scss');
require('./scss/toc.scss');

// Custom JS.
require('./js/code-language');
