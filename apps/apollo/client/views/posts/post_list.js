Template.postList.allPosts = function () {
  // return the posts matching the query set in the routes.
  return Posts.find(Session.get('postQuery'));
};
