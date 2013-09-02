Template.home.helpers({
  'welcomeMessage': function () {
    Session.set('pageQuery', { slug: 'about' });
    return Pages.findOne(Session.get('pageQuery'));
  }
});
