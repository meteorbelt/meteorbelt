Template.adminSettingListItem.helpers({
  isSelected: function () {
    var q = Session.get('settingQuery');
    var match = q && q._id === this._id;
    return match ? 'active' : '';
  }
});

Template.adminSettingListItem.events({
  'click .delete': function (e, tmpl) {
    e.preventDefault();
    var remove = window.confirm("Are you sure you want to remove this post?");
    if (remove === true) {
      Belt.Settings.remove(tmpl.data._id, function (err, post) {
        if (err) {
          return Flash.error(err.reason);
        }
        // if no error...
        console.log('post deleted successfully');
      });
    }
  }
});
