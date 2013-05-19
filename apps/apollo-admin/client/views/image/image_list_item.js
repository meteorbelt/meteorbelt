Template.imageListItem.events({
  'click .img-remove': function (e, tmpl) {
    e.preventDefault();

    var remove = window.confirm("Are you sure you want to remove this image?");
    if (remove === true) {
      Belt.File.remove(tmpl.data, {}, function () {
        Products.update(Session.get('productId'), {
          $pull: {
            images: tmpl.data
          }
        });
      }, function (err) {
        Products.update(Session.get('productId'), {
          $pull: {
            images: tmpl.data
          }
        });
        if (err) {
          return Belt.Flash.error(err);
        }
      });
    }
  }
});
