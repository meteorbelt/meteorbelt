Template.imageList.helpers({
  'images': function () {
    return Images.find(Session.get('imageQuery'));
  }
});
