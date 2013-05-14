Template.postDetail.post = function () {
  // use the 'postSlug' session variable to retrieve the correct session
  // based on the url.
  return Posts.findOne({
    slug: Session.get('postSlug')
  });
};
