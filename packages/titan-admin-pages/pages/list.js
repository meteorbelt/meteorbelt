Template.adminPageList.helpers({
  allPages: function () {
    return Pages.find(Session.get('pageQuery'), Session.get('pageOptions'));
  },
  page: function () {
    return Pages.findOne(Session.get('pageId'));
  }
});
