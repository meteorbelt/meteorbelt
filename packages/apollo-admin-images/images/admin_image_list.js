Template.adminImageList.events({

  'click .add-image': function (e, tmpl) {
    e.preventDefault();

    Belt.File.pick({
      mimetypes: ['image/*'],
      services: ['COMPUTER']
    }, function (file) {
      var i = Images.create(file);
      // XXX this should be handled by the plugin
      i.owner = Meteor.userId();
      i.save(function (err, id) {
        if (err)
          Belt.Flash.error(err);
      });
    }, function (err) {
      Meteor._debug('Admin Image error: ', err);
    });
  }

});
