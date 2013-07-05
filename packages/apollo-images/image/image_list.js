Template.imageList.events({

  'click .new-product-image': function (e, tmpl) {
    e.preventDefault();
    Belt.File.pick({
      mimetypes: ['image/*'],
      services: ['COMPUTER']
    }, function (file) {
      Products.update(Session.get('productId'), {
        $addToSet: {
          images: file
        }
      });
    }, function (err) {
      Meteor._debug('Belt.File.pick error: ', err);
    });
  }

});
