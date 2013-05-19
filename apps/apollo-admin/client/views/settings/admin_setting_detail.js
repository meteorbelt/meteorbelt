Template.adminSettingDetail.helpers({
  setting: function () {
    return Belt.Settings.findOne(
      Session.get('settingQuery'));
  }
});

Template.adminSettingDetail.events({

  'click input[type="submit"]': function (e, tmpl) {
    e.preventDefault();
    var f = form2js('product-form');
  },

  'click .cancel': function (e) {
    e.preventDefault();
    Meteor.Router.to('/admin/products');
  }
});
