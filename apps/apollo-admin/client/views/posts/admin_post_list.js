Template.adminPostList.helpers({
  allPosts: function () {
    return Posts.find(Session.get('postQuery'), Session.get('postOptions'));
  },
  post: function () {
    return Posts.findOne(Session.get('postId'));
  }
});
