// Routes
// ------
function setSession(cntx, key) {
  var slug = cntx.params.slug;
  var _id = cntx.params._id;
  var tag = cntx.params.tag;
  var sessionKey = key + 'Query';

  Session.set(key + 'Opts', {sort: [['publishedAt', 'desc']]});

  if (_id) {
    return Session.set(sessionKey, {_id: _id});
  }
  if (slug) {
    return Session.set(sessionKey, {slug: slug});
  }
  if (tag) {
    return Session.set(sessionKey, {tags: tag});
  }
  return Session.set(sessionKey, {});
}

function setSettingQuery() {
  setSession(this, 'setting');
}

function setProductQuery() {
  setSession(this, 'product');
}

function setPostQuery() {
  setSession(this, 'post');
}

function setUserQuery() {
  setSession(this, 'user');
}

// Run before routes
Meteor.Router.beforeRouting = function () {
  // clears all seen flash messages.
  Belt.Flash.clear();
  // clear PostId
  Session.set('postId', null);

  Session.set('postQuery', null);
  Session.set('postFilter', null);
};

// Admin
Meteor.Router.add({
  // Static
  '/admin':       'adminHome',

  '/admin/users': 'adminUserList',
  '/admin/users/:_id': { to: 'adminUserDetail',   and: setUserQuery },

  '/admin/settings':      { to: 'adminSettingList',   and: setSettingQuery },
  '/admin/settings/new':  { to: 'adminSettingCreate', and: setSettingQuery },
  '/admin/settings/:_id': { to: 'adminSettingList',   and: setSettingQuery, as: 'adminSettingDetail' },

  '/admin/posts':           { to: 'adminPostList',   and: setPostQuery },
  '/admin/posts/new':       { to: 'adminPostDetail', and: setPostQuery, as: 'adminPostNew' },
  '/admin/posts/:_id':      { to: 'adminPostDetail', and: setPostQuery },
  '/admin/posts/tags/:tag': { to: 'adminPostList',   and: setPostQuery },
  '/admin/products':           { to: 'adminProductList',   and: setProductQuery },
  '/admin/products/new':       { to: 'adminProductCreate', and: setProductQuery },
  '/admin/products/:_id':      { to: 'adminProductDetail', and: setProductQuery },
  '/admin/products/tags/:tag': { to: 'adminProductList',   and: setProductQuery },
});

// Filters
// -------
Meteor.Router.filters({
  // isAdmin filter check to see if the current user is an admin.
  // If they are not the login pages is show.
  isAdmin: function (page) {
    // TODO: this should work?
    // function willTryToLogin() {
    //   return !!(localStorage && localStorage['Meteor.userId']);
    // }
    // if the user is still loading wait until ready to check roles;
    // otherwise we will get a false negative.
    if (Meteor.loggingIn()) {
      var loggingInCheck = function () {
          if (Meteor.loggingIn()) {
            return Meteor.setTimeout(loggingInCheck, 100);
          }
        };
      // start it off
      loggingInCheck();
    }
    // Now that we have a logged in user check if they are an admin
    if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
      return page;
    }
    Belt.Flash.error('You do not have access to this page. Try logging in.');
    return 'accountLogin';
  }
});

// applies to admin pages
Meteor.Router.filter('isAdmin', {
  only: [
    //'adminHome',
    //'adminPostList',
    //'adminPostDetail',
    //'adminUserList'
  ]
});
