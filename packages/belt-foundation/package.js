Package.describe({
  summary: "Provides Foundation 4.0 complete with SCSS files. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.use('deps', 'client');
  api.use('jquery', 'client');

  api.add_files([
    'foundation/js/vendor/custom.modernizr.js',
    'foundation/js/foundation/foundation.js',
    'foundation/js/foundation/foundation.alerts.js',
    'foundation/js/foundation/foundation.clearing.js',
    'foundation/js/foundation/foundation.cookie.js',
    'foundation/js/foundation/foundation.dropdown.js',
    'foundation/js/foundation/foundation.forms.js',
    'foundation/js/foundation/foundation.joyride.js',
    'foundation/js/foundation/foundation.magellan.js',
    'foundation/js/foundation/foundation.orbit.js',
    'foundation/js/foundation/foundation.reveal.js',
    'foundation/js/foundation/foundation.section.js',
    'foundation/js/foundation/foundation.tooltips.js',
    'foundation/js/foundation/foundation.topbar.js',
    'foundation/js/foundation/foundation.interchange.js',
    'foundation/js/foundation/foundation.placeholder.js'
  ], 'client');
});
