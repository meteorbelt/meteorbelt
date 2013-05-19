Package.describe({
  summary: "Provides Bootstrap 3.0 complete with LESS files. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.use('belt');
  api.use('deps', 'client');
  api.use('jquery', 'client');

  api.add_files([
    // 'bootstrap/fonts/glyphiconshalflings-regular.eot',
    // 'bootstrap/fonts/glyphiconshalflings-regular.otf',
    // 'bootstrap/fonts/glyphiconshalflings-regular.svg',
    // 'bootstrap/fonts/glyphiconshalflings-regular.ttf',
    // 'bootstrap/fonts/glyphiconshalflings-regular.woff',

    'bootstrap/js/affix.js',
    'bootstrap/js/alert.js',
    'bootstrap/js/button.js',
    'bootstrap/js/carousel.js',
    'bootstrap/js/collapse.js',
    'bootstrap/js/dropdown.js',
    'bootstrap/js/modal.js',
    'bootstrap/js/popover.js',
    'bootstrap/js/scrollspy.js',
    'bootstrap/js/tab.js',
    'bootstrap/js/tooltip.js',
    'bootstrap/js/transition.js'
  ], 'client');
});
