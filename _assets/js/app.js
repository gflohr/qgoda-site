if (0) {
// Prismjs.
var Prism = require('prismjs');
var plugins = [
     'custom-class', 'line-numbers', 'autolinker', 'command-line',
     'normalize-whitespace'
];
require('../../node_modules/prismjs/plugins/custom-class/prism-custom-class');
require('../../node_modules/prismjs/plugins/line-numbers/prism-line-numbers');
require('../../node_modules/prismjs/plugins/autolinker/prism-autolinker');
require('../../node_modules/prismjs/plugins/command-line/prism-command-line');
require('../../node_modules/prismjs/plugins/normalize-whitespace/prism-normalize-whitespace');

require('../../node_modules/prismjs/components/prism-markup.js');
require('../../node_modules/prismjs/components/prism-yaml.js');
require('../../node_modules/prismjs/components/prism-markdown.js');
require('../../node_modules/prismjs/components/prism-perl.js');
require('../../node_modules/prismjs/components/prism-bash.js');
require('../../node_modules/prismjs/components/prism-javascript.js');

require('./prism-theme.css');

$(document).ready(function() {
    Prism.highlightAll();    
});
}
