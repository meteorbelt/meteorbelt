Template.imageModal.helpers({
  'image': function () {
    return Images.findOne({ _id: Session.get('imageId') });
  }
});

Template.imageModal.events({
  'click .close-reveal-modal': function (e, tmpl) {
    $('#apollo-image-modal').foundation('reveal', 'close');
  }
});
