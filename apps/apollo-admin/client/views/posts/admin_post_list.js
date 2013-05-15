Template.adminPostList.helpers({
  allPosts: function () {
    console.log('findAll called');
    return Posts.find(Session.get('postQuery'), Session.get('postOptions'));
  },
  post: function () {
    return Posts.findOne(Session.get('postId'));
  }
});
