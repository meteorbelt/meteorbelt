// Portions of this code have been adopted from
// jade-angularjs-brunch (https://github.com/GulinSS/jade-angularjs-brunch)
// (c) 2013 Gulin Serge

var templateRecord = function(result, path) {
  var parseStringToJSArray = function(str) {
    var stringArray = '[';
    str.split('\n').map(function(e, i) {
      return stringArray += "\n'" + e.replace(/'/g, "\\'") + "',";
    });
    return stringArray += "''" + '].join("\\n")';
  };
  return "\n.run(['$templateCache', function($templateCache) {\n" +
         "  return $templateCache.put('" + path + "', " + (parseStringToJSArray(result)) + ");\n" +
         "}])";
};

buildModule = function(module) {
  var addEndOfModule, content, moduleHeader, templateRecord;
  moduleHeader = function(name) {
    return "angular.module('" + name + "', [])";
  };
  addEndOfModule = function() {
    return ";\n";
  };
  content = moduleHeader(module.name);
  _.each(module.templates, function(template) {
    return content += templateRecord(template.result, template.path);
  });
  return content += addEndOfModule();
};

precompile = function (compiledTemplateString, moduleName, modulePath) {
  return compiledTemplateString;
};

