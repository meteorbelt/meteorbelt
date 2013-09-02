Template.adminSettingList.helpers({
  allSettings: function () {
    return AppSettings.find();
  }
});
