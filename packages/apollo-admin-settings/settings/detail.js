
Template.adminSettingDetail.helpers({
  setting: function () {
    return Belt.Settings.findOne(
      Session.get('settingQuery'));
  }
});

Template.adminSettingDetail.events({

  'click input[type="submit"]': function (e, tmpl) {
    e.preventDefault();
    var f = form2js('setting-form');
    var s = Belt.Settings.findOne(
      Session.get('settingQuery'));
    s._populate({data: f});
    s.save(function (err, id) {
      if (err) {
        return Flash.error(err);
      }
      return Flash.success('Setting update successfully');
    });
  },

  'click .cancel': function (e) {
    e.preventDefault();
    Meteor.Router.to('adminHome');
  }
});
