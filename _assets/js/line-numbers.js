//var $ = require('jquery');
var classMap = require('../scss/prism.scss.json');
var classLineNumbers = classMap['line-numbers'];
var classLineNumbersRows = classMap['line-numbers-rows'];
Prism.hooks.add('before-highlight', function(env) {
     var cl = env.element.classList;
     for (var i = 0; i < cl.length; ++i) {
        if (cl.item(i).match(/^;/)) {
            var plugins = cl.item(i).split(';');
            for (var j = 0; j < plugins.length; ++j) {
                switch(plugins[j]) {
                    case "line-numbers":
                        env.element.classList.add('line-numbers');
                        env.element.parentElement.classList.add(classLineNumbers);
                        break;
                }
            }
        }
     }
});

Prism.hooks.add('complete', function(env) {
     var rowElements = env.element.getElementsByClassName('line-numbers-rows');
     if (rowElements && rowElements[0]) {
        rowElements[0].classList.add(classLineNumbersRows);
     }
});
