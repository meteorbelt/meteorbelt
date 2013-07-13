Template.imageListItem.events({
  'click .image-thumbnail': function (e, tmpl) {
    Session.set('imageId', tmpl.data._id);
    $('#apollo-image-modal').foundation('reveal', 'open');
  },

  'click .image-remove': function (e, tmpl) {
    e.preventDefault();

    var remove = window.confirm("Are you sure you want to remove this image?");
    if (remove === true) {
      Images.remove(tmpl.data._id);
    }
  }
});
