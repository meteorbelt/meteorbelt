Template.adminPostDetail.rendered = function () {
  var post;
  if (Session.get('postId'))
    post = Posts.findOne(Session.get('postId'));
  // if not post; set the post var to a new object
  if (!post)
    post = Posts.create();
  this.post = post;
};

Template.adminPostDetail.helpers({
  // post returns the current post
  post: function () {
    return Posts.findOne(Session.get('postId'));
  }
});

// parse a date in yyyy-mm-dd format
function parseDate(input) {
  if (!input) return;
  var parts = input.match(/(\d+)/g);
  // new date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
}

function populatePost(post, tmpl) {
  post.title = tmpl.find("#post-title").value;
  post.body = tmpl.find("#belt-richtext-textarea").value;
  post.slug = tmpl.find("#post-slug").value;
  post.publishedAt = parseDate(tmpl.find("#post-published-at").value);
  post.tags = _.map(tmpl.find('#post-tags').value.split(','), function (x) {
    return x.trim();
  });
  return post;
}

Template.adminPostDetail.events({

  'click .publish': function (e, tmpl) {
    e.preventDefault();
    
    var post = populatePost(tmpl.post, tmpl);
    post.isPublished = true;
    post.save(function (err, id) {
      if (err) {
        _.each(err.details, function (v, k) {
          Flash.error(k + " " + v);
        });
        return;
      }
      // if no error...
      Meteor.Router.to('adminPostList');
    });
  },

  'click .save': function (e, tmpl) {
    e.preventDefault();

    var post = populatePost(tmpl.post, tmpl);
    post.save(function (err, id) {
      if (err) {
        Flash.clear();
        _.each(err.details, function (v, k) {
          Flash.error(k + " " + v);
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
