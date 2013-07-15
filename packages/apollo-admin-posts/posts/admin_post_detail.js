Template.adminPostDetail.rendered = function () {
  var post;
  if (Session.get('postQuery'))
    post = Posts.find(Session.get('postQuery')).fetch()[0];
  // if not post; set the post var to a new object
  if (!post)
    post = Posts.create();
  this.post = post;
  return;
};

Template.adminPostDetail.helpers({
  // post returns the current post
  post: function () {
    return Posts.findOne(Session.get('postQuery'));
  }
});

// parse a date in yyyy-mm-dd format
function parseDate(input) {
  var parts = input.match(/(\d+)/g);
  // new date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
}

function postPopulate(post, tmpl) {
//  // if slug is present return an error if it is in use
//  if (opts.slug) {
//    p.slug = Belt.Slug.unique(opts.slug, Posts, true);
//  } else {
//    // use the title, don't care if the slug is an exact match
//    p.slug = Belt.Slug.unique(opts.title, Posts);
//  }
  post.title = tmpl.find("#post-title").value;
  post.body = tmpl.find("#belt-richtext-textarea").value;
  // post.slug = tmpl.find("#post-slug").value;
  // post.publishedAt = parseDate(tmpl.find("#post-published-at").value);
  // post.tags = _.map(tmpl.find('#post-tags').value.split(','), function (x) {
  //   return x.trim();
  // });
  post.owner = Meteor.userId();
  return post;
}

Template.adminPostDetail.events({
  // TODO: add this.
  // 'keyup #post-title': function (e, tmpl) {
  //   // TODO mark post as dirty on #richtext-textarea, #post-tags,
  //   // #post-slug change
  //   //Session.set('postSlug', tmpl.find("#post-title").value);
  //   Session.set('postIsDirty', true);
  // },

  'click .publish': function (e, tmpl) {
    e.preventDefault();
    
    var post = postPopulate(tmpl.post, tmpl);
    post.isPublished = true;
    post.save(function (err, id) {
      if (err) {
        _.each(err.details, function (v, k) {
          Belt.Flash.error(k + " " + v);
        });
        return;
      }
      // if no error...
      Meteor.Router.to('adminPostList');
    });
  },

  'click .save': function (e, tmpl) {
    e.preventDefault();

    var post = postPopulate(tmpl.post, tmpl);
    post.save(function (err, id) {
      if (err) {
        Belt.Flash.clear();
        _.each(err.details, function (v, k) {
          Belt.Flash.error(k + " " + v);
        });
        return;
      }
      // if the post is new redirect to the correct url
      if (!post._id) {
        Meteor.Router.to('adminPostDetail', id);
      }
    });
  },

  // we are using the class "cancel" instead of "close" because bootstrap
  // has special styling for the "close" class
  'click .cancel': function (e) {
    e.preventDefault();

    Meteor.Router.to('adminPostList');
    // If the post has been modified notify the user the their changes will
    // be lost
    if (this.post) {
      var exit = window.confirm("You have unsaved changes that will be lost");
      if (exit === true) {
        return Meteor.Router.to('adminPostList');
      }
    } else {
      Meteor.Router.to('adminPostList');
    }
  }
});
