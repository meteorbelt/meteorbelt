var fs = Npm.require('fs');
var path = Npm.require('path');
var sass = Npm.require('node-sass');

Plugin.registerSourceHandler("scss", function (compileStep) {

  // return partials e.g. _headers.scss
  if (path.basename(compileStep.inputPath)[0] === '_') return;
  console.log("compileStep.inputPath: ", path.basename(compileStep.inputPath));

  var source = compileStep.read().toString('utf8');

  var p = path.dirname(compileStep._fullInputPath)
  console.log("p: ", p);
  var options = {
    file: compileStep._fullInputPath,
    sourceComments: 'map',
    includePaths: [path.dirname(compileStep._fullInputPath)] // for @import
  };

  try {
    var css = sass.renderSync(options);
    console.log("css: ", css);
    compileStep.addStylesheet({
      path: compileStep.inputPath + ".css",
      data: css
    });
  } catch (e) {
    throw new Error("\n" + compileStep._fullInputPath + 
      "\n\nScss compiler error:\n\n" + e.message);
  }
});

// Register scssimport files with the dependency watcher, without actually
// processing them.
Plugin.registerSourceHandler("scssimport", function () {
  // Do nothing
});
