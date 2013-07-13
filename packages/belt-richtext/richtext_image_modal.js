// XXX we shouldn't be using a global here. Find a better way.
Template.beltRichtextImageModal.events({
  'click input[type="submit"]': function (e, template) {
    e.preventDefault();
    var cls;
    var convert = '';
    var filename = template.find('input[name="name"]').value;
    var caption = template.find('textarea[name="caption"]').value;
    var url = template.find('input[name="image-url"]').value;
    var width = template.find('input[name="width"]').value;
    var height = template.find('input[name="height"]').value;
    var position = template.find('select[name="position"]').value;
    if (width || height) {
      convert += '/convert?';
      var attrs = [];
      if (width) {
        attrs.push('width=' + width);
      }
      if (height) {
        attrs.push('heigth=' + height);
      }
      convert += attrs.join('&');
    }
    //global.beltRichtextEditorInstance.currentView.element.focus();
    // save to an image object
    if (position) {
      cls = 'pull-' + position;
    }
    var url = url + convert;
    var imgTag = '<img class="' + cls + '" src="' + url + '" alt="' + filename + '">';
    var html = '<div class="thumbnail">' + imgTag + '<div class="caption">' + caption + '</div></div>';
    console.log('markup', html);
    beltRichtextEditorInstance.composer.commands.exec("insertHTML", html);
    $('#belt-richtext-image-modal').foundation('reveal', 'close');
  },

  'click .cancel-dialog': function (e) {
    e.preventDefault();
    $('#belt-richtext-image-modal').foundation('reveal', 'close');
  }
});
