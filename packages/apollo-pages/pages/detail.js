Template.pageDetail.page = function () {
  return Pages.findOne(Session.get('pageQuery'));
};
