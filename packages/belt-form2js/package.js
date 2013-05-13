Package.describe({
  summary: "Form2js for use with MeteorBelt Apps"
});

Package.on_use(function (api) {
  api.add_files("form2js/src/form2js.js", "client");
});
