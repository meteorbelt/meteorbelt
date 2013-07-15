Template.adminSettingList.helpers({
  allSettings: function () {
    return Belt.Settings.find();
  }
});
