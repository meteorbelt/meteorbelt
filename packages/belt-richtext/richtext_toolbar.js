// XXX we shouldn't be using a global here. Find a better way.
var global = this;


Template.beltRichtextToolbar.events({
  'click #rt-image-button': function (e) {
    e.preventDefault();
    Belt.File.pick({
      mimetypes: ['image/*'],
      services: ['COMPUTER']
    }, function (file) {
      $('#belt-richtext-image-modal').foundation('reveal', 'open');
      $('#belt-richtext-image-modal input[name="image-url"]').val(file.url);
      $('#belt-richtext-image-modal input[name="name"]').val(file.filename);
    }, function (err) {
      Meteor._debug('beltRichtextToolbar: Belt.File.pick err: ', err);
    });
  },

  'click #rt-link-button': function (e) {
    e.preventDefault();
    $('#belt-richtext-link-modal').foundation('reveal', 'open');
    $('#belt-richtext-link-modal input[name="link-url"]').focus();
  }
});
