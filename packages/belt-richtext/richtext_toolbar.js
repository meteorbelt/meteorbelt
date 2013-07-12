// XXX we shouldn't be using a global here. Find a better way.
var global = this;


Template.beltRichtextToolbar.events({
  'click #rt-image-button': function (e) {
    e.preventDefault();
    Belt.File.pick({
      mimetypes: ['image/*'],
      services: ['COMPUTER']
    }, function (file) {
      $('#belt-richtext-image-dialog').foundation('reveal', 'open');
      $('#belt-richtext-image-dialog input[name="image-url"]').val(file.url);
      $('#belt-richtext-image-dialog input[name="name"]').val(file.filename);
    }, function (err) {
      Meteor._debug('beltRichtextToolbar: Belt.File.pick err: ', err);
    });
  },

  'click #rt-link-button': function (e) {
    debugger;
    e.preventDefault();
    $('#belt-richtext-link-dialog').modal();
    $('#belt-richtext-link-dialog input[name="link-url"]').focus();
  }
});
