//var $ = require('jquery');
var classMap = require('../../node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css.json');
var classLineNumbers = classMap['line-numbers'];
var classLineNumbersRows = classMap['line-numbers-rows'];
Prism.hooks.add('before-highlight', function(env) {
     env.element.classList.add('line-numbers');
     env.element.parentElement.classList.add(classLineNumbers);
});

Prism.hooks.add('complete', function(env) {
     env.element
        .getElementsByClassName('line-numbers-rows')[0]
        .classList.add(classLineNumbersRows);
});
