// Portions of this code have been adopted from
// jade-angularjs-brunch (https://github.com/GulinSS/jade-angularjs-brunch)
// (c) 2013 Gulin Serge

var parseStringToJSArray = function(str) {
  var stringArray = '[';
  str.split('\n').map(function(e, i) {
    return stringArray += "\n'" + e.replace(/'/g, "\\'") + "',";
  });
  return stringArray += "''" + '].join("\\n")';
};

precompile = function (templateString, moduleName, modulePath) {
  return "if (typeof PartialsModule === 'undefined') {\n" +
         "  PartialsModule = angular.module('partials', []);\n" +
         "}\n" +
         "PartialsModule.run(['$templateCache', function($templateCache) {\n" +
         "  return $templateCache.put('" + modulePath + "', " + (parseStringToJSArray(templateString)) + ");\n" +
         "}]);\n";
};

