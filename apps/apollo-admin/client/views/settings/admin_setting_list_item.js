Template.adminSettingListItem.helpers({});

Template.adminSettingListItem.events({
  'click .delete': function (e, tmpl) {
    e.preventDefault();
    var remove = window.confirm("Are you sure you want to remove this post?");
    if (remove === true) {
      Settings.remove(tmpl.data._id, function (err, post) {
        if (err) {
          return Belt.Flash.error(err.reason);
        }
        // if no error...
        console.log('post deleted successfully');
      });
    }
  }
});
