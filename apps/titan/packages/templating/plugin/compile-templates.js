
var path = Npm.require('path');

var path = Npm.require('path');

CompileAngularTemplates = function (p, compileStep, contents) {
  // get the path on the other side of templates minus the ext., e.g.
  // 'template/todo/index.html' -> 'todo/index'
  var templateName = p.match(/templates\/(.+)\.(html|handlebars|hbs|hbars)/)[1];
  var precompiled = Package['belt-angular-precompile'].precompile(contents, templateName);

  var path_part = path.dirname(compileStep.inputPath);
  var ext = path.extname(compileStep.inputPath);
  var basename = path.basename(compileStep.inputPath, ext);
  compileStep.addJavaScript({
    path: path.join(path_part, "ember.template." + basename + ".js"),
    sourcePath: compileStep.inputPath,
    data: precompiled
  });
  return;
};

var compileTemplate = function (compileStep) {
  // XXX use archinfo rather than rolling our own
  if (! compileStep.arch.match(/^browser(\.|$)/))
    // XXX might be nice to throw an error here, but then we'd have to
    // make it so that packages.js ignores html files that appear in
    // the server directories in an app tree.. or, it might be nice to
    // make html files actually work on the server (against jsdom or
    // something)
    return;

  // XXX the way we deal with encodings here is sloppy .. should get
  // religion on that
  var contents = compileStep.read().toString('utf8');

  // If the path contains "templates" then we want to render Ember.TEMPLATES
  var p = compileStep.inputPath;
  if (p.indexOf("templates") !== -1) {
    CompileAngularTemplates(p, compileStep, contents);
    return;
  }

  // Normal Meteor Template Behavior
  try {
    var results = html_scanner.scan(contents, compileStep.inputPath);
  } catch (e) {
    if (e instanceof html_scanner.ParseError) {
      compileStep.error({
        message: e.message,
        sourcePath: compileStep.inputPath,
        line: e.line
      });
      return;
    } else
      throw e;
  }

  if (results.head)
    compileStep.appendDocument({ section: "head", data: results.head });

  if (results.body)
    compileStep.appendDocument({ section: "body", data: results.body });

  if (results.js) {
    var path_part = path.dirname(compileStep.inputPath);
    if (path_part === '.')
      path_part = '';
    if (path_part.length && path_part !== path.sep)
      path_part = path_part + path.sep;
    var ext = path.extname(compileStep.inputPath);
    var basename = path.basename(compileStep.inputPath, ext);

    // XXX generate a source map

    compileStep.addJavaScript({
      path: path.join(path_part, "template." + basename + ".js"),
      sourcePath: compileStep.inputPath,
      data: results.js
    });
  }
};

Plugin.registerSourceHandler("html", function (compileStep) {
  compileTemplate(compileStep);
});

Plugin.registerSourceHandler("hbs", function (compileStep) {
  compileTemplate(compileStep);
});

Plugin.registerSourceHandler("handlebars", function (compileStep) {
  compileTemplate(compileStep);
});
