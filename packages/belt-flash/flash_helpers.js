if (typeof Handlebars !== 'undefined') {
  Handlebars.registerHelper('flashes', function(name, options) {
    // TODO test
    return new Handlebars.SafeString(Template.beltFlashes());
  });
}

