Template.adminPostListItem.helpers({
  selected: function () {
    return Session.equals('postId', this._id) ? 'active' : '';
  }
});

Template.adminPostListItem.events({

  'click .post-list-item': function (e, tmpl) {
    Session.set('postId', tmpl.data._id );
  }
});
